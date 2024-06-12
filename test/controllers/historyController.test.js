import { getVolunteerHistory } from '../../server/controllers/historyController.js';
import VolunteerHistories from '../../server/models/VolunteerHistories.js';

describe('VolunteerHistory Controller', () => {
  let req, res;

  beforeAll(async () => {
    await VolunteerHistories.sync({ force: true }); // Ensure the table is created and empty
  });

  beforeEach(() => {
    req = {
      body: {},
      user: { id: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test('should get volunteer history', async () => {
    await getVolunteerHistory(req, res);

    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
