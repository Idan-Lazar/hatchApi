const getDb = require("../db");
const { read, upload } = require("../blobUtils/blobUtils");
const { configPath } = require("../config");
const { sysNameFormat } = require("../utils/utils");

exports.getAllSystems = async (req, res) => {
  const { systems, role } = req.user;
  try {
    const db = await getDb();
    const data = await db.System.findAll(systems, role);
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

exports.getAllSystemsUnique = async (req, res) => {
  const { systems, role } = req.user;
  try {
    const db = await getDb();
    const data = (await db.System.findAll(systems, role))
      .filter((element) => element.sysname.includes("PreProd"))
      .map((element) => ({
        sysname: element.sysname.split("-")[0],
        sysid: element.sysid,
      }));
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

exports.getAllSystemsConfig = async (req, res) => {
  try {
    const data = JSON.parse(await read(configPath));
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

exports.UploadSystem = async (req, res) => {
  const { newItem } = req.body;
  let splitName;
  try {
    if (newItem) {
      splitName = newItem.name.split("-");
    }
    // read data from blob
    let data = JSON.parse(await read(configPath)).directories;
    const db = await getDb();
    // check if name exists
    if (data.some((item) => item.name === newItem.name)) {
      return res.status(403).json({
        status: "error",
        message: "שם המערכת כבר קיים!",
      });
    }
    // check if port exists 
    else if (data.some((item) => item.port == newItem.port)) {
      // check if this is the corresponding system
      if (
        data.some(
          (item) =>
            item.name.split("-")[0] == splitName[0] &&
            item.port == newItem.port &&
            item.name.split("-")[2] != splitName[2]
        )
      ) {
        await this.UploadSystemFunc(db, data, newItem);
      } 
      else {
        return res.status(403).json({
          status: "error",
          message: "מספר הפורט כבר קיים!",
        });
      }
    } else {
      await this.UploadSystemFunc(db, data, newItem);
    }
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

exports.UploadSystemFunc = async (db, data, newItem) => {
  try {
    // add new system to db.
    const system = await db.System.create(newItem.name);
    // add new system to data array.
    data.push({
      sysid: system.sysid,
      port: newItem.port.toString(),
      name: newItem.name,
    });
    // upload data array to blob.
    await upload(configPath, JSON.stringify({ directories: data }));
    return system;
  } catch (error) {
    throw error;
  }
};

exports.UpdateSystem = async (req, res) => {
  const { name, rowFields } = req.body;
  try {
    const editItem = { name: rowFields.name, port: rowFields.port.toString() };
    let data = JSON.parse(await read(configPath)).directories;
    // find system index in blob.
    const index = data.findIndex((item) => name == item.name);
    const db = await getDb();
    if (index > -1) {
      const prevItem = data[index];
      // port updated
      if (prevItem.port !== editItem.port) {
        // check if port exists
        if (data.some((item) => item.port === editItem.port)) {
          // check if this is the corresponding system
          if (
            data.some(
              (item) =>
                item.name.split("-")[0] == editItem.name.split("-")[0] &&
                item.port == editItem.port &&
                item.name.split("-")[2] != editItem.name.split("-")[2]
            )
          ) {
            await this.UpdateSystemFunc(db, data, prevItem, editItem, index);
          } else {
            return res.status(403).json({
              status: "error",
              message: "מספר הפורט כבר קיים!",
            });
          }
        } else {
          await this.UpdateSystemFunc(db, data, prevItem, editItem, index);
        }
      }
      // name updated
      else if (prevItem.name !== editItem.name) {
        // check if name exists
        if (data.some((item) => item.name == editItem.name)) {
          return res.status(403).json({
            status: "error",
            message: "שם המערכת כבר קיים!",
          });
        } else {
          data.splice(index, 1);
          // check if port exists for another system
          if (data.some((item) => item.port == editItem.port)) {
            return res.status(403).json({
              status: "error",
              message: "פורט זהה למערכות שונות",
            });
          } else {
            data.push(prevItem);
            await this.UpdateSystemFunc(db, data, prevItem, editItem, index);
          }
        }
      }
      // name & port updated
      else {
        // check if name exists
        if (data.some((item) => item.name == editItem.name)) {
          return res.status(403).json({
            status: "error",
            message: "שם המערכת כבר קיים!",
          });
        } else {
          if (data.some((item) => item.port === editItem.port)) {
            // check if this is the corresponding system
            if (
              data.some(
                (item) =>
                  item.name.split("-")[0] == editItem.name.split("-")[0] &&
                  item.port == editItem.port &&
                  item.name.split("-")[2] != editItem.name.split("-")[2]
              )
            ) {
              await this.UpdateSystemFunc(db, data, prevItem, editItem, index);
            } else {
              return res.status(403).json({
                status: "error",
                message: "מספר הפורט כבר קיים!",
              });
            }
          } else {
            await this.UpdateSystemFunc(db, data, prevItem, editItem, index);
          }
        }
      }
    } else {
      return res.status(403).json({
        status: "error",
        message: "המערכת לעדכון לא נמצאה!",
      });
    }
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

exports.UpdateSystemFunc = async (db, data, prevItem, editItem, index) => {
  try {
    // replace the prev system with new system in data array.
    data.splice(index, 1, { ...prevItem, ...editItem });
    // update system in db.
    const system = await db.System.update(prevItem.name, editItem.name);
    if (!system) {
      throw "Update db Error";
    }
    // upload data to blob.
    await upload(configPath, JSON.stringify({ directories: data }));
    return system;
  } catch (error) {
    throw error;
  }
};

exports.DeleteSystem = async (req, res) => {
  const { name } = req.body;
  try {
    const dbName = sysNameFormat(name);
    const data = JSON.parse(await read(configPath)).directories;
    const db = await getDb();
    // find system in db.
    const system = await db.System.findByName(dbName);
    if (!system) {
      return res.status(403).json({
        status: "error",
        message: "מערכת למחיקה לא נמצאה!",
      });
    }
    // find sub systems in db.
    const subSystems = await db.SubSystem.findById(system.sysid);
    if (subSystems?.length === 0) {
      throw {
        message: "לא ניתן למחוק עולם תוכן שיש לו פרויקטים",
      };
    }
    // find system index in blob.
    const index = data.findIndex((item) => name == item.name);
    if (index > -1) {
      let newData = data;
      // remove system from data.
      newData.splice(index, 1);
      // upload data to blob.
      await upload(configPath, JSON.stringify({ directories: newData }));
      // delete system from db.
      await db.System.delete(system.sysid);
    } else {
      return res.status(403).json({
        status: "error",
        message: "מערכת למחיקה לא נמצאה!",
      });
    }

    return res.send({
      status: "success",
      data: "המערכת נמחקה בהצלחה!",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error?.message || error,
    });
  }
};
