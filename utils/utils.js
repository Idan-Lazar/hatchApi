
const sysNameFormat = (sysname) =>{
    const splitSystemName = sysname.split('-');
    const dbSystemName = splitSystemName.length === 3 ? `${splitSystemName[0]}-${splitSystemName[2]}` : splitSystemName
    return dbSystemName
}

const IntToString = (arr) =>{
    return arr.map((element)=> element.toString())
}
function getDateTime() {

    let date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let msec = date.getMilliseconds()
    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec + "." + msec;

}
/**
 * Validates the xml content.
 * @param {Buffer} fileContent - The xml body.
 * 
 * @returns {Boolean} - Returns if the xml content is valid.
 */
 function validateXML(fileContent) {
    try {
        const response = xmlParser.validate(fileContent)
        if(response.err) {
            throw response.err.msg;
        }
        if(fileContent.includes('!DOCTYPE')) {
            throw "File includes !DOCTYPE";
        }
    } catch(exception) {
        throw "XML file is not valid";
    }
}

const excludedStatuses = ['Waiting For Sanitation', 'Sanitation Failed', 'File Was Deleted', 'Conversion to tiff failed']

module.exports = {
    sysNameFormat, IntToString , getDateTime, excludedStatuses, validateXML
}