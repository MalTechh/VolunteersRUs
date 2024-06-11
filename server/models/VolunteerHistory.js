// models/VolunteerHistory.js

import mongoose from 'mongoose';

const volunteerHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  participationStatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);

export default VolunteerHistory;
