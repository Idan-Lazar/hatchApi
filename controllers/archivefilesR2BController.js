const getDb = require("../db");
const axios = require("axios");
const { archiveFuncs } = require('../config')

exports.getFilesByName = async (req, res) => {
  const { projects, role } = req.user;
  const { fileName } = req.body;
  try {
    const db = await getDb();
    const projectsNames = (await db.SubSystem.findAll(projects, role)).map((project) => project.subsystemname);
    const data = await db.ArchiveFilesR2B.findByName(projectsNames, role, fileName);
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

exports.getFilesByFilters = async (req, res) => {
  const { startDate, endDate, worldContents , subSystems} = req.body;
  try {
    const db = await getDb();
    const data = await db.ArchiveFilesR2B.findAllByFilters(startDate, endDate, worldContents , subSystems);
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
exports.getFileContent = async (req, res) => {
  const { guid } = req.body;
  try {
    const db = await getDb();
    const sysid = (await db.ArchiveFilesR2B.getFileByGuid(guid))[0].sysid.toString();
   
    const response = await axios.put(`${archiveFuncs}/func-getFileFromRed`,{
      fileId: guid,
      sysId: sysid
    })
    return res.send({
      status: "success",
      data: response.data
    });
    
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};
exports.updateFileStatus = async (req, res) => {
  const { guid } = req.body;
  try {
    const db = await getDb();
    const data = await db.ArchiveFilesR2B.updateStatus(guid);
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