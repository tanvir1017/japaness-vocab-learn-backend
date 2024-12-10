import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import fs from "fs";
import path from "path";
import env from "../config";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// TODO => Upload image to cloudinary
const sendImgToCloudinary = (
  imagePath: string,
  imageName: string,
): Promise<UploadApiErrorResponse | UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      {
        public_id: imageName,
      },

      // * delete or unlink after upload the picture
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);

          // TODO => Delete file from folder after successfully uploaded to cloudinary
          fs.unlink(imagePath, function (error) {
            if (error) {
              reject(error);
            } else {
              console.log(
                `file is deleted from ${path.join(process.cwd() + "/public/uploads")} ✅`,
              );
            }
          });
        }
      },
    );
  });
};

export default sendImgToCloudinary;
