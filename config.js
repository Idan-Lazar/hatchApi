const host = process.env.HOST;
const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const dialect = process.env.DIALECT;
const senderContainer = process.env.SENDER_CONTAINER;
const converterContainer = process.env.CONVERTER_CONTAINER;
const storage = process.env.STORAGE_CONNECTION_STRING;
const configPath = process.env.CONFIG_PATH;

module.exports = {
  host,
  database,
  username,
  password,
  dialect,
  senderContainer,
  converterContainer,
  storage,
  configPath,
};
