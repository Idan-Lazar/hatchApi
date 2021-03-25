
const sysNameFormat = (sysname) =>{
    const splitSystemName = sysname.split('-');
    const dbSystemName = splitSystemName.length === 3 ? `${splitSystemName[0]}-${splitSystemName[2]}` : splitSystemName
    return dbSystemName
}

module.exports = {
    sysNameFormat
}