const getDb = require("../db");
const { validateXML } = require("../utils/utils");
const { keepaliveFolder, senderContainer } = require("../config");
const axios = require("axios");
const {
  uploadToContainer,
  deleteFromContainer,
} = require("../blobUtils/blobUtils");
const { getOnlineStatus, getErrorStatus } = require("../utils/snmp");
const { keepAliveURL } = require("../config");
exports.getData = async (req, res) => {
  const { projects, role } = req.user;
  try {
    const db = await getDb();
    const projectsNames = (await db.SubSystem.findAll(projects, role)).map(
      (project) => project.subsystemname
    );
    let data = await db.KeepAlive.findAll(projectsNames, role);
    data = data.sort((a, b) =>
      a.lastresult === false ? -1 : b.lastresult === false ? 1 : 0
    );
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
  const { sysName, schemaName, fileContent, project, fileType } = req.body;
  try {
    const db = await getDb();
    const decodedFileContent = Buffer.from(fileContent, "base64");
    if (!fileType || fileType === "xml") {
      validateXML(decodedFileContent.toString());
    }
    let sysId = (await db.System.findByName(`${sysName}-PreProd`))?.sysid;
    if (!sysId) {
      throw "System doesn't exist";
    }
    const filePath = `${keepaliveFolder}/${sysName}/${schemaName}.${
      fileType || "xml"
    }`;
    await uploadToContainer(senderContainer, filePath, decodedFileContent);
    const fullSysName = `${sysName}-B2R-PreProd`;
    const data = await db.KeepAlive.create(
      sysId,
      fullSysName,
      filePath,
      schemaName,
      project
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
exports.DeleteSchema = async (req, res) => {
  const { sysName, schemaName } = req.body;
  try {
    const db = await getDb();
    let sysId = (await db.System.findByName(`${sysName}-PreProd`))?.sysid;
    if (!sysId) {
      throw "System doesn't exist";
    }
    const filePath = (
      await db.KeepAlive.findByName(sysId.toString(), schemaName)
    )?.filepath;
    if (!filePath) {
      throw "Schema doesn't exist";
    }
    await Promise.all([
      db.KeepAlive.delete(filePath),
      deleteFromContainer(senderContainer, filePath),
    ]);

    return res.send({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};
exports.OnDemand = async (req, res) => {
  try {
    if (getErrorStatus()) {
      return res.status(500).json({
        status: "error",
        message: "couldn't connect to bridge",
      });
    } else if (!getOnlineStatus()) {
      return res.send({
        status: "success",
        data: { onlineStatus: getOnlineStatus() },
      });
    } else {
      callKeepAlive();
    }
    return res.send({
      status: "success",
      data: { onlineStatus: getOnlineStatus() },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};
async function callKeepAlive() {
  try {
    const reqToken = req.headers.authorization.split(" ")[1];
    await axios.get(`${keepAliveURL}/keepAlive/now`, {
      headers: {
        authorization: reqToken,
      },
    });
  } catch (error) {
    throw error?.message || message;
  }
}
