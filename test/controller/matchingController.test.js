import { matchVolunteersToEvents, getAllVolunteers, submitVolunteerMatch } from '../../server/controllers/matchingController';
import EventDetails from '../../server/models/EventDetails';
import UserProfile from '../../server/models/UserProfile';
import VolunteerHistory from '../../server/models/VolunteerHistory';

jest.mock('../../server/models/EventDetails');
jest.mock('../../server/models/UserCredentials');
jest.mock('../../server/models/UserProfile');
jest.mock('../../server/models/VolunteerHistory');

describe('Matching Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('matchVolunteersToEvents', () => {
    it('should return 404 if volunteer profile is not found', async () => {
      req.body.userId = 1;
      UserProfile.findOne.mockResolvedValue(null);

      await matchVolunteersToEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Volunteer profile not found' });
    });

    it('should return 500 if there is an error parsing user skills', async () => {
      req.body.userId = 1;
      UserProfile.findOne.mockResolvedValue({ Skills: 'invalid JSON', Availability: ['2024-07-20'] });

      await matchVolunteersToEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error parsing user skills' });
    });

    it('should return matching events successfully', async () => {
      req.body.userId = 1;
      const volunteerProfile = { Skills: JSON.stringify(['Skill1', 'Skill2']), Availability: ['2024-07-20'] };
      const allEvents = [
        { EventDate: '2024-07-20', RequiredSkills: 'Skill1, Skill2' },
        { EventDate: '2024-07-21', RequiredSkills: 'Skill3' },
      ];
      UserProfile.findOne.mockResolvedValue(volunteerProfile);
      EventDetails.findAll.mockResolvedValue(allEvents);

      await matchVolunteersToEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        matchingEvents: [allEvents[0]]
      });
    });

    it('should return 500 if there is an error matching volunteers to events', async () => {
      req.body.userId = 1;
      UserProfile.findOne.mockRejectedValue(new Error('Database error'));

      await matchVolunteersToEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while matching volunteers to events' });
    });
  });

  describe('getAllVolunteers', () => {
    it('should return 404 if no volunteers are found', async () => {
      UserProfile.findAll.mockResolvedValue([]);

      await getAllVolunteers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No volunteers found' });
    });

    it('should return all volunteers successfully', async () => {
      const volunteers = [
        { UserID: 1, FullName: 'John Doe' },
        { UserID: 2, FullName: 'Jane Smith' },
      ];
      UserProfile.findAll.mockResolvedValue(volunteers);

      await getAllVolunteers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(volunteers);
    });

    it('should return 500 if there is an error fetching volunteers', async () => {
      UserProfile.findAll.mockRejectedValue(new Error('Database error'));

      await getAllVolunteers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching volunteers' });
    });
  });

  describe('submitVolunteerMatch', () => {
    it('should return 404 if the event is not found', async () => {
      req.body = { userId: 1, eventId: 999 };
      EventDetails.findOne.mockResolvedValue(null);

      await submitVolunteerMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });

    it('should return 201 and create a new volunteer match successfully', async () => {
      req.body = { userId: 1, eventId: 1 };
      const eventDetails = { EventID: 1, EventDate: '2024-07-20' };
      const newEntry = { UserID: 1, EventID: 1, ParticipationDate: '2024-07-20', Status: 'Pending' };

      EventDetails.findOne.mockResolvedValue(eventDetails);
      VolunteerHistory.create.mockResolvedValue(newEntry);

      await submitVolunteerMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Volunteer matched successfully', newEntry });
    });

    it('should return 500 if there is an error inserting volunteer match', async () => {
      req.body = { userId: 1, eventId: 1 };
      EventDetails.findOne.mockRejectedValue(new Error('Database error'));

      await submitVolunteerMatch(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while matching the volunteer to the event' });
    });
  });
});
