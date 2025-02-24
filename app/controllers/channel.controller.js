const Channel = require("../models/channel.model");
const generateApiKey = require("../utils/generateApiKeys");
const checkDataSpike = require("../utils/notification");

exports.createChannel = async (req, res) => {
  try {
    const { name, field1, field2, field3, field4, minThreshold, maxThreshold, description } = req.body;
    const apiKey = generateApiKey();
    const userId = req.userId;

    const newChannel = new Channel({
      name,
      field1,
      field2,
      field3,
      field4,
      minThreshold,
      maxThreshold,
      description,
      apiKey,
      userId,
    });

    await newChannel.save();
    res.status(201).json({ apiKey });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChannelsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const channels = await Channel.find({ userId });
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateChannelField = async (req, res) => {
  try {
    const { api_key, field1 } = req.body;
    const channel = await Channel.findOne({ apiKey: api_key });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    checkDataSpike(channel.maxThreshold, channel.minThreshold, field1);
    // Initialize fieldData if it is undefined
    if (!channel.fieldData) {
      channel.fieldData = [];
    }

    channel.fieldData.push({ field1, timestamp: new Date() });
    await channel.save();
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChannelData = async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
