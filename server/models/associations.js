// associations.js
import UserProfile from './UserProfile.js'
import VolunteerHistory from './VolunteerHistory.js';
import EventDetails from './EventDetails.js';

// Setting up associations
UserProfile.hasMany(VolunteerHistory, {
  foreignKey: 'UserID',
  as: 'volunteerHistories'
});

VolunteerHistory.belongsTo(UserProfile, {
  foreignKey: 'UserID',
  as: 'userProfile'
});

VolunteerHistory.belongsTo(EventDetails, {
  foreignKey: 'EventID',
  as: 'eventDetails'
});

// Export all models for easy access
export { UserProfile, VolunteerHistory, EventDetails };