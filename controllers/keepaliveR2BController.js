const getDb = require("../db");
const { keepaliveFolder, senderContainer } = require("../config");
const {
  uploadToContainer,
} = require("../blobUtils/blobUtils");
exports.getData = async (req, res) => {
  const { systems , role } = req.user;
  try {
    const db = await getDb();
    let data = await db.KeepAliveR2B.findAll(systems, role);
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

exports.UploadSchema = async (req, res) => {
  const { sysId, sysName, schemaName } = req.body;
  try {
    const db = await getDb();
    const fullSysName = `${sysName}-B2R-PreProd`;    
    const data = await db.KeepAliveR2B.create(
      sysId,
      fullSysName,
      schemaName,
    );
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