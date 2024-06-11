// models/State.js

import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 2,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
});

const State = mongoose.model('State', stateSchema);

export default State;
