const {
  createChannel,
  getChannelsByUser,
  updateChannelField,
  getChannelData,
} = require("../controllers/channel.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
  app.post("/create-channel", verifyToken, createChannel);
  app.get("/user-channels", verifyToken, getChannelsByUser);
  app.post("/update-channel", updateChannelField);
  app.get("/get-channel/:id", verifyToken, getChannelData);
};
