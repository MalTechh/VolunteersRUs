import { getProfile, createProfile, updateProfile } from '../../server/controllers/profileController';
import UserProfile from '../../server/models/UserProfile';

jest.mock('../../server/models/UserProfile');

describe('Profile Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      user: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('getProfile', () => {
    it('should return the profile if it exists', async () => {
      req.user.id = 1;
      const profile = {
        UserID: 1,
        FullName: 'John Doe',
        Address1: '123 Main St',
        Address2: '',
        City: 'Sample City',
        State: 'CA',
        ZipCode: '12345',
        Skills: JSON.stringify(['Skill1', 'Skill2']),
        Preferences: 'None',
        Availability: JSON.stringify(['2024-07-20']),
      };

      UserProfile.findOne.mockResolvedValue(profile);

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 if the profile does not exist', async () => {
      req.user.id = 1;
      UserProfile.findOne.mockResolvedValue(null);

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found.' });
    });

    it('should return 500 if there is an error fetching the profile', async () => {
      req.user.id = 1;
      UserProfile.findOne.mockRejectedValue(new Error('Database error'));

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error. Please try again.' });
    });
  });

  describe('createProfile', () => {
    it('should create a profile successfully', async () => {
      req.user.id = 1;
      req.body = {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'Sample City',
        state: 'CA',
        zipCode: '12345',
        skills: ['Skill1', 'Skill2'],
        preferences: 'None',
        availability: ['2024-07-20'],
      };

      const profile = {
        UserID: 1,
        FullName: req.body.fullName,
        Address1: req.body.address1,
        Address2: req.body.address2,
        City: req.body.city,
        State: req.body.state,
        ZipCode: req.body.zipCode,
        Skills: JSON.stringify(req.body.skills),
        Preferences: req.body.preferences,
        Availability: JSON.stringify(req.body.availability),
      };

      UserProfile.create.mockResolvedValue(profile);

      await createProfile(req, res);

      expect(UserProfile.create).toHaveBeenCalledWith(profile);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(profile);
    });

    it('should return 400 if there is an error creating the profile', async () => {
      req.user.id = 1;
      req.body = {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'Sample City',
        state: 'CA',
        zipCode: '12345',
        skills: ['Skill1', 'Skill2'],
        preferences: 'None',
        availability: ['2024-07-20'],
      };

      UserProfile.create.mockRejectedValue(new Error('Database error'));

      await createProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating profile.' });
    });
  });

  describe('updateProfile', () => {
    it('should update the profile successfully', async () => {
      req.user.id = 1;
      req.body = {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: 'Apt 1',
        city: 'Sample City',
        state: 'CA',
        zipCode: '12345',
        skills: ['Skill1', 'Skill2'],
        preferences: 'None',
        availability: ['2024-07-20'],
      };

      const profile = {
        UserID: 1,
        FullName: 'Old Name',
        Address1: 'Old Address1',
        Address2: 'Old Address2',
        City: 'Old City',
        State: 'Old State',
        ZipCode: 'Old ZipCode',
        Skills: JSON.stringify(['OldSkill']),
        Preferences: 'Old Preferences',
        Availability: JSON.stringify(['2024-06-20']),
        update: jest.fn().mockResolvedValue(),
      };

      const updatedProfile = {
        ...profile,
        ...req.body,
        Skills: JSON.stringify(req.body.skills),
        Availability: JSON.stringify(req.body.availability),
      };

      UserProfile.findOne.mockResolvedValue(profile);
      UserProfile.findOne.mockResolvedValueOnce(updatedProfile);

      await updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return 404 if the profile does not exist', async () => {
      req.user.id = 1;
      req.body = {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: 'Apt 1',
        city: 'Sample City',
        state: 'CA',
        zipCode: '12345',
        skills: ['Skill1', 'Skill2'],
        preferences: 'None',
        availability: ['2024-07-20'],
      };

      UserProfile.findOne.mockResolvedValue(null);

      await updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
    });

    it('should return 400 if there is an error updating the profile', async () => {
      req.user.id = 1;
      req.body = {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: 'Apt 1',
        city: 'Sample City',
        state: 'CA',
        zipCode: '12345',
        skills: ['Skill1', 'Skill2'],
        preferences: 'None',
        availability: ['2024-07-20'],
      };

      const profile = {
        UserID: 1,
        FullName: 'Old Name',
        Address1: 'Old Address1',
        Address2: 'Old Address2',
        City: 'Old City',
        State: 'Old State',
        ZipCode: 'Old ZipCode',
        Skills: JSON.stringify(['OldSkill']),
        Preferences: 'Old Preferences',
        Availability: JSON.stringify(['2024-06-20']),
        update: jest.fn().mockRejectedValue(new Error('Database error')),
      };

      UserProfile.findOne.mockResolvedValue(profile);

      await updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error updating profile.' });
    });
  });
});
