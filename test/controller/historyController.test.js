import getVolunteerHistory from '../../server/controllers/historyController';
import VolunteerHistory from '../../server/models/VolunteerHistory';
import UserProfile from '../../server/models/UserProfile';

jest.mock('../../server/models/VolunteerHistory');
jest.mock('../../server/models/EventDetails');
jest.mock('../../server/models/UserProfile');

describe('History Controller', () => {
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

  describe('getVolunteerHistory', () => {
    it('should return 400 if UserID is not provided', async () => {
      await getVolunteerHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'UserID is required.' });
    });

    it('should return 404 if no volunteer history is found', async () => {
      req.body.UserID = 1;
      VolunteerHistory.findAll.mockResolvedValue([]);

      await getVolunteerHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No volunteer history found.' });
    });

    it('should return volunteer history successfully', async () => {
      req.body.UserID = 1;

      const mockHistory = [
        { UserID: 1, Status: 'Participated', 'eventDetails.EventName': 'Event 1', 'eventDetails.Description': 'Description 1', 'eventDetails.Location': 'Location 1', 'eventDetails.RequiredSkills': 'Skills 1', 'eventDetails.Urgency': 'High', 'eventDetails.EventDate': '2024-07-20' }
      ];

      const mockUserProfiles = [
        { UserID: 1, FullName: 'John Doe' }
      ];

      VolunteerHistory.findAll.mockResolvedValue(mockHistory);
      UserProfile.findAll.mockResolvedValue(mockUserProfiles);

      await getVolunteerHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        history: [
          {
            FullName: 'John Doe',
            EventName: 'Event 1',
            Description: 'Description 1',
            Location: 'Location 1',
            RequiredSkills: 'Skills 1',
            Urgency: 'High',
            EventDate: '2024-07-20',
            Status: 'Participated'
          }
        ]
      });
    });

    it('should return 500 if there is an error fetching volunteer history', async () => {
      req.body.UserID = 1;
      VolunteerHistory.findAll.mockRejectedValue(new Error('Database error'));

      await getVolunteerHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching volunteer history.' });
    });
  });
});
