const { BlobServiceClient } = require("@azure/storage-blob");
const { storage, configPath , senderContainer , converterContainer } = require("../config");
let sender_Container;
let configClient;
let converter_Container;
/**
 * Get the sender's container client if it doesn't exist.
 *
 * @returns {Promise<ContainerClient>} The promise of the getting client process.
 */
async function getSenderContainerClient() {
  if (!sender_Container) {
    sender_Container = await BlobServiceClient.fromConnectionString(
        storage
    ).getContainerClient(senderContainer);
  }

  return sender_Container;
}

/**
 * Get the sender's container client if it doesn't exist.
 * @param {string} containerName - The name of the container to get the client for.
 *
 * @returns {Promise<ContainerClient>} The promise of the getting client process.
 */
async function getContainerClient(containerName) {
  const containerClient = await BlobServiceClient.fromConnectionString(
    storage
  ).getContainerClient(containerName);

  return containerClient;
}

/**
 * Get the converter's container client if it doesn't exist.
 *
 * @returns {Promise<ContainerClient>} The promise of the getting client process.
 */
async function getConverterContainerClient() {
  if (!converter_Container) {
    converter_Container = await BlobServiceClient.fromConnectionString(
      storage
    ).getContainerClient(converterContainer);
  }

  return converter_Container;
}

/**
 * Get the config file client if doens't exist.
 *
 * @returns {Promise<BlockBlobClient>} - The client of the config blob.
 */
async function getConfigClient() {
  await getSenderContainerClient();
  if (!configClient) {
    configClient = await sender_Container.getBlockBlobClient(
      configPath
    );
  }

  return configClient;
}

/**
 * Get the client of a specific file path.
 * @param {String} filePath - The path of the file.
 *
 * @returns {Promise<BlockBlobClient>} - The client of the file.
 */
async function getBlobClient(filePath) {
  let blobClient;
  if (filePath == configPath) {
    blobClient = await getConfigClient();
  } else {
    await getSenderContainerClient();
    blobClient = await sender_Container.getBlockBlobClient(filePath);
  }

  return blobClient;
}

/**
 * Get blob client in a specific container
 * @param {String} containerName - The name of the container.
 * @param {String} filePath - The path of the blob to get the client for.
 *
 * @returns {Promise<BlockBlobClient>} - The client of the file.
 */
async function getBlobClientInContainer(containerName, filePath) {
  let blobClient;
  if (containerName == senderContainer) {
    await getSenderContainerClient();
    blobClient = await sender_Container.getBlockBlobClient(filePath);
  } else {
    await getConverterContainerClient();
    blobClient = await converter_Container.getBlockBlobClient(filePath);
  }

  return blobClient;
}

/**
 * Get blob client from existing container client.
 * @param {ContainerClient} containerClient - The container client to look for the file in.
 * @param {String} filePath - The path to get the client of.
 *
 * @returns {Promise<BlockBlobClient>} - The client of the requested blob.
 */
async function getBlobClientFromContainerClient(containerClient, filePath) {
  const blobClient = containerClient.getBlockBlobClient(filePath);

  return blobClient;
}

module.exports = {
  getSenderContainerClient,
  getBlobClient,
  getBlobClientInContainer,
  getBlobClientFromContainerClient,
  getContainerClient,
};
