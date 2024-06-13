import VolunteerHistories from '../../server/models/VolunteerHistories.js';

describe('VolunteerHistories Model', () => {
  beforeAll(async () => {
    await VolunteerHistories.destroy({ where: {}, truncate: true }); // Ensure the table is empty
  });

  test('should create a new volunteer history record', async () => {
    const history = await VolunteerHistories.create({
      userId: 1,
      eventId: 1,
      participationStatus: 'Participated', // Make sure this field matches the schema
    });

    expect(history.userId).toBe(1);
    expect(history.eventId).toBe(1);
    expect(history.participationStatus).toBe('Participated');
  });
});
