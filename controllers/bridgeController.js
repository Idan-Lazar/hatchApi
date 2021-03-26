const {
  getBridgeTime,
  getOnlineStatus,
  getErrorStatus,
} = require("../utils/snmp");

exports.getBridgeStatus = async (req, res) => {
  if (getErrorStatus()) {
    return res
      .status(500)
      .json({ error: 500, message: "couldn't connect to bridge" });
  }
  return res
    .status(200)
    .json({ bridgeTime: getBridgeTime(), onlineStatus: getOnlineStatus() });
};
