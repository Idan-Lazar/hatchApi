const {
  getSenderContainerClient,
  getBlobClient,
  getBlobClientInContainer,
  getContainerClient,
  getBlobClientFromContainerClient,
} = require("./blobClients");
const { senderContainer } = require("../config");

/**
 * Uploading content to specific file path
 * @param {String} filePath - The path of the file.
 * @param {String} fileContent - The content to put in the file.
 *
 * @returns {Promise<void>} - The promise of the uploading process.
 */
async function upload(filePath, fileContent) {
  try {
    const blobClient = await getBlobClient(filePath);
    await blobClient.upload(fileContent, fileContent.length);
  } catch (error) {
    throw {
      message: "Error uploading Blob",
    };
  }
}

/**
 * Reading file in specific path
 * @param {String} filePath - The path to read from.
 *
 * @returns {Promise<Buffer>} - The file content.
 */
async function read(filePath) {
  try {
    const blobClient = await getBlobClient(filePath);
    const fileContent = await blobClient.downloadToBuffer();

    return fileContent;
  } catch (error) {
    throw {
        message: "Error reading Blob",
      };
  }
}

/**
 * Remove the blob from the storage.
 * @param {String} filePath - The path of the file.
 *
 * @returns {Promise<void>} = The promise of the removing process.
 */
async function remove(filePath) {
  const blobClient = await getBlobClient(filePath);
  await blobClient.delete();
}

/**
 * Move file from one path to another.
 * @param {String} currentPath - The current path of the file.
 * @param {string} newPath - The new path of the file.
 *
 * @returns {Promise<void>} - The process of the moving process.
 */
async function move(currentPath, newPath) {
  const fileContent = await read(currentPath);
  await Promise.all([remove(currentPath), upload(newPath, fileContent)]);
}

/**
 * Read all files in container that are under done/error folders
 * @param {String} containerName - The name of the container to scan.
 *
 * @returns {Promise<String[]>} - Paths to all matching files.
 */
async function readAllFilesInContainer(containerName) {
  let files = [];
  const containerClient = await getContainerClient(containerName);
  if (await containerClient.exists()) {
    for await (const blob of containerClient.listBlobsFlat()) {
      const splittedPath = blob.name.split("/");
      // Check if path is under 2 folders, and under done or error folders.
      if (
        splittedPath.length === 2 &&
        ["error", "done"].includes(splittedPath[0])
      ) {
        files.push(blob.name);
      }
    }
  }

  return files;
}

async function uploadToContainer(containerName, filePath, fileContent) {
  const blobClient = await getBlobClientInContainer(containerName, filePath);
  await blobClient.upload(fileContent, fileContent.length);
}

async function deleteFromContainer(containerName, filePath) {
  const blobClient = await getBlobClientInContainer(containerName, filePath);
  await blobClient.delete();
}

/**
 * Move the file from its current container to the sending container.
 * @param {String} currentPath - The current path of the file.
 * @param {ContainerClient} currentContainer - The client of the current container where the file is located in.
 * @param {String} targetPath - The path to put the file at in sending container.
 *
 * @returns {Promise<void>} - The promise of the moving process.
 */
async function moveFileFromContainer(
  currentPath,
  currentContainer,
  targetPath
) {
  const blobClient = await getBlobClientFromContainerClient(
    currentContainer,
    currentPath
  );
  console.log(`Successflly got client of ${currentPath}`);
  const fileContent = await blobClient.downloadToBuffer();
  console.log(`Successfully read file ${currentPath}`);
  await uploadToContainer(senderContainer, targetPath, fileContent);
  console.log(`Successfully uploaded file to path ${targetPath}`);
  blobClient.delete();
}

module.exports = {
  read,
  upload,
  move,
  readAllFilesInContainer,
  uploadToContainer,
  moveFileFromContainer,
  deleteFromContainer,
};
