const getDb = require("../db");
const { sysNameFormat } = require("../utils/utils");

exports.getAllSubSystems = async (req, res) => {
  const { projects, role } = req.user;
  try {
    const db = await getDb();
    const data = await db.SubSystem.findAll(projects, role);
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
exports.AddSubSystem = async (req, res) => {
  const { subsysName, system, prefix } = req.body;
  try {
    const sysName = system.split("-")[0];
    const db = await getDb();
    const systems = [
      (await db.System.findByName(sysName + "-PreProd"))?.sysid,
      (await db.System.findByName(sysName + "-Prod"))?.sysid,
    ];
    if(systems.includes(undefined)){
      throw "המערכת לא קיימת"
    }
    const data = await db.SubSystem.create(subsysName, systems, prefix);

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

exports.UpdateSubSystem = async (req, res) => {
  const { subsysName, system, prefix } = req.body;
  try {
    const db = await getDb();
    const data = await db.SubSystem.update(subsysName, system, prefix);
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
exports.DeleteSubSystem = async (req, res) => {
  const { subsysName } = req.body;
  try {
    const db = await getDb();
    const data = await db.SubSystem.delete(subsysName);
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
exports.getAllSubSystemsBySystems = async (req, res) => {
  const { sysname } = req.body;
  let data = [];
  try {
    const db = await getDb();
    await Promise.all(sysname.map(async (name) => {
       const sysid = (await db.System.findByName(sysNameFormat(name))).sysid
       data.push(...await db.SubSystem.findById(sysid))
    }))
    
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