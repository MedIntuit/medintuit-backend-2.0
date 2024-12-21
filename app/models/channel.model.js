const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  field1: { type: String, required: true },
  field2: { type: String, required: false },
  field3: { type: String, required: false },
  field4: { type: String, required: false },
  description: { type: String },
  apiKey: { type: String, required: true, unique: true },
  fieldData: [
    {
      field1: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;