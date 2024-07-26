import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../server/config/database';
import EventDetailsModel from '../../server/models/EventDetails';

describe('EventDetails Model', () => {
  let EventDetails;

  beforeAll(async () => {
    await sequelize.authenticate();
    EventDetails = EventDetailsModel;
    await sequelize.sync(); // Synchronize all defined models to the DB.
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clear the table before each test
    await EventDetails.destroy({ where: {} });
  });

  it('should create an EventDetails record', async () => {
    try {
      const event = await EventDetails.create({
        EventName: 'Community Cleanup',
        eventDescription: 'Join us for a community cleanup event.',
        location: 'Main Street Park',
        requiredSkills: JSON.stringify(['Event Planning', 'Public Speaking']),
        urgency: 'High',
        eventDate: new Date('2024-07-20'),
      });
      
      expect(event.EventID).toBeDefined();
      expect(event.EventName).toBe('Community Cleanup');
      expect(event.eventDescription).toBe('Join us for a community cleanup event.');
      expect(event.location).toBe('Main Street Park');
      expect(event.requiredSkills).toBe(JSON.stringify(['Event Planning', 'Public Speaking']));
      expect(event.urgency).toBe('High');
      expect(event.eventDate).toEqual(new Date('2024-07-20'));
    } catch (error) {
      console.error('Error creating EventDetails record:', error);
      throw error;
    }
  });

  it('should retrieve an EventDetails record', async () => {
    try {
      const eventData = {
        EventName: 'Community Cleanup',
        eventDescription: 'Join us for a community cleanup event.',
        location: 'Main Street Park',
        requiredSkills: JSON.stringify(['Event Planning', 'Public Speaking']),
        urgency: 'High',
        eventDate: new Date('2024-07-20'),
      };
        EventDetails.create(eventData);

      const event = await EventDetails.findOne({
        where: { EventName: 'Community Cleanup' },
      });

      expect(event).toBeDefined();
      expect(event.EventName).toBe('Community Cleanup');
    } catch (error) {
      console.error('Error retrieving EventDetails record:', error);
      throw error;
    }
  });
});
