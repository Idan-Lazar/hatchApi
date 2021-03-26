const { createSession, Version2c, isVarbindError, varbindError } = require("net-snmp");
const { hostname, brideOId, communityString, bridgeCheckDelay } = require("../config");
const { getDateTime } = require('./utils');

var isOnline = false;
var BridgeTime = "0"; //default date
var isError=false;

function getOnlineStatus() {
  return isOnline;
};

function setOnlineStatus(newStatus) {
  isOnline = newStatus;
};

function getBridgeTime() {
  return BridgeTime;
}

function setBridgeTime(newTime) {
  BridgeTime = newTime;
};

function getErrorStatus() {
  return isError;
};

function setErrorStatus(NewError){
  isError=NewError;
}

function isOffline(varbind){
  return varbind.value === 0;
}


/**
 * Check the varbind of the bridge to check if it's offline
 * @param {any} varbind The varbind accepted from the bridge
 * @returns {boolean}
 */

/**
 * Check whether the bridge is online (will resolve) or offline (will reject)
 * 
 * The resolve handler  accepts void as the value parameter.
 * 
 * The reject handler accepts an Error object for further handling.
 * 
 * @example
 * ensureOnline().then(onlineHandler).catch(offlineHandler)
 * 
 * @returns {Promise<void>}
 */
function checkOnline() {
  return new Promise((resolvePromise, rejectPromise) => {
   const session = createSession(hostname, communityString, { version: Version2c });
    const reject = (value) => {
      const result = rejectPromise(value);
      session.close();
      console.log('The snmp check failed');
      return result;

    }
    const resolve = (value) => {
      const result = resolvePromise(value);
      session.close();
      setErrorStatus(false);
      console.log('The snmp check succeeded');
      return result;
    }
    session.get([brideOId], (error, varbinds) => {
      if (error) {
        console.log(error);
        setErrorStatus(true);
        return reject(error);
      }
      const [varbind] = varbinds;
      console.log(`Varbind value is ${varbind.value}`);
      if (isVarbindError(varbind)) {
        return reject(new Error(`Varbind error! ${varbindError(varbind)}`));
      }
      if (isOffline(varbind)) {
        return reject("Bridge is offline!");
      }
      return resolve();
    })
  });
}

async function checkBridge() {
  await checkOnline().then(async () => {
    if (isOnline == false)//case snmp has succeeded and data channel was offline before
    {
      console.log('Bridge status has changed from OFFLINE to ONLINE!');
      setBridgeTime(getDateTime());
      console.log("New Bridge time: " + getBridgeTime());
    }
    else {//case snmp has succeeded and data channel was online before
      console.log("Bridge is ONLINE since " + getBridgeTime());
    }
    isOnline = true;
    runSelf();
  }).catch((error) => {
    if (isOnline == true)//case snmp has failed and data channel was online before
    {
      console.log("The bridge has turned off");
    }
    else//case snmp has failed and data channel was offline before
    {
      console.log("Bridge was OFFLINE and still is");
    }
    isOnline = false;
    console.log("The last time the bridge was online was at: " + getBridgeTime());

    runSelf();
  });

}


/**
 * Run the service again
 * @returns {void}
 */
function runSelf() {
  setTimeout(() => checkBridge(), 1000 * bridgeCheckDelay);
}



module.exports = {
  checkOnline, runSelf, checkBridge, getBridgeTime, getOnlineStatus, setBridgeTime, setOnlineStatus ,getErrorStatus
};