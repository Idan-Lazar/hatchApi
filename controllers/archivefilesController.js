const getDb = require("../db");

exports.getFileById = async (req, res) => {
  const { projects, role } = req.user;
  const { fileName, viewMode } = req.body;
  try {
    const db = await getDb();
    const projectsNames = (await db.SubSystem.findAll(projects, role)).map((project) => project.subsystemname);
    const data = await db.ArchiveFiles.findByName(projectsNames, role, fileName, viewMode);
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
