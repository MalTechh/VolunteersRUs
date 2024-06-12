import EventDetails from '../../server/models/EventDetails.js';

describe('EventDetails Model', () => {
  beforeAll(async () => {
    try {
      await EventDetails.sync({ force: true }); // Ensure the table is created and empty
    } catch (error) {
      console.error('Error syncing EventDetails model:', error);
    }
  });

  test('should create a new event', async () => {
    const event = await EventDetails.create({
      eventName: 'Community Clean Up',
      eventDescription: 'Join us to clean up the park.',
      location: 'Central Park',
      requiredSkills: ['Cleaning'],
      urgency: 'High',
      eventDate: '2024-07-01',
    });

    expect(event.eventName).toBe('Community Clean Up');
  });

  test('should not create an event without required fields', async () => {
    let error;
    try {
      await EventDetails.create({
        eventName: 'Incomplete Event',
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });
});
