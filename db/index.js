const { init: initSystem } = require("./models/system");
const { init: initSubSystem } = require("./models/subsystem");
const { init: initArchiveFiles } = require("./models/archivefiles");
const { getConnection } = require("./connection");

/**
 * @typedef DB
 * @property {System} system
 * @property {boolean} initialized
 */
const db = {
  initialized: false,
  System: null,
  SubSystem: null,
  ArchiveFiles: null,
};

async function getDB() {
  try {
    if (!db.initialized) {
      const connection = getConnection();
      await connection.authenticate();
      db.System = await initSystem(connection);
      db.SubSystem = await initSubSystem(connection);
      db.ArchiveFiles = await initArchiveFiles(connection);
      db.initialized = true;
    }
  } catch (error) {
    db.initialized = false;
  }

  return db;
}

module.exports = getDB;
