const getDb = require("../db");

exports.getUser = async (req, res) => {
  const { userid } = req.user;
  try {
    const db = await getDb();
    const data = (await db.User.findById(userid));
    return res.send({
      status: "success",
      results: data.length,
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};
exports.getUserBySubSystem = async (req, res) => {
  const { subSystemName } = req.body;
  try {
    const db = await getDb();
    const subsystem = await db.SubSystem.findByName(subSystemName);
    const data = (await db.User.findBySubSystemId(subsystem.subsystemid));
    return res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};