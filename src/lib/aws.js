import { AWS_ACCESS_KEY_, AWS_ACCESS_SECRET_, AWS_BUCKET_, AWS_REGION_ } from '$env/static/private';

import aws from "aws-sdk";

aws.config.update({
  secretAccessKey: AWS_ACCESS_SECRET_,
  accessKeyId: AWS_ACCESS_KEY_,
  region: AWS_REGION_
})

const s3 = new aws.S3();

export async function saveFile(file, key) {
  let arrayB = await file.arrayBuffer();
  let buffer = Buffer.from(arrayB);

  const params = {
      Bucket: AWS_BUCKET_,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read"
  };

  return await s3.upload(params).promise();
}