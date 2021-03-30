const { init: initSystem } = require("./models/system");
const { init: initSubSystem } = require("./models/subsystem");
const { init: initArchiveFiles } = require("./models/archivefiles");
const { init: initArchiveFilesR2B } = require("./models/archivefilesr2b");
const { init: initUser } = require("./models/user");
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
  ArchiveFilesR2B: null,
  User: null
};

async function getDB() {
  try {
    if (!db.initialized) {
      const connection = getConnection();
      await connection.authenticate();
      console.log('DB connection successful!')
      db.System = await initSystem(connection);
      db.SubSystem = await initSubSystem(connection);
      db.ArchiveFiles = await initArchiveFiles(connection);
      db.ArchiveFilesR2B = await initArchiveFilesR2B(connection);
      db.User = await initUser(connection);
      db.initialized = true;
    }
  } catch (error) {
    db.initialized = false;
    console.log('DB connection error!')
    console.log(error.message)
  }

  return db;
}

module.exports = getDB;
