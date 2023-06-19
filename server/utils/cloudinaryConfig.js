const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");

// configure cloudinary with access keys
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDAPI_SECRETE,
//   secure: true,
});

// configure cloudinary configs with multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "thoughtLog",
  },
});

// exported to the post routes file and inserted as a middleware
const upload = multer({storage});

//Takes the image url and extracts the folder and file name
// in the required format for deleting - folderName/fileName
const cloudinaryDelete = (url) => {
    const splitUrl = url.split("/");
    const fileFolderAndNameArray = [splitUrl[7], splitUrl[8]];
    const fileFolderAndNamePath = fileFolderAndNameArray.join("/");
    const deletePath = fileFolderAndNamePath.split(".")[0]; // remove extension

    return cloudinary.uploader.destroy(deletePath, (error) => {
        if (error) {
        throw new Error(error.message);
        }
    });
};


module.exports = {
  upload,
  cloudinaryDelete,
};