import cloudinary from "../Config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer,folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || "buildstack" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};