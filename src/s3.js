import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const region = import.meta.env.VITE_REGION;
const bucketName = import.meta.env.VITE_BUCKET_NAME;
const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const generateUploadUrl = (file) => {
  const ext = file.type.split("/")[1];
  const imageName = uuidv4() + "." + ext;
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentType: file.type,
  };
  const uploadUrl = s3.getSignedUrl("putObject", params);
  return uploadUrl;
};

export const uploadImage = async (file) => {
  if (!(file instanceof Object)) {
    return null;
  }
  const s3url = generateUploadUrl(file);
  await axios.put(s3url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  const imageUrl = s3url.split("?")[0];
  return imageUrl;
};

