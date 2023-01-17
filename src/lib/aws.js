import { AWS_ACCESS_KEY, AWS_ACCESS_SECRET, AWS_BUCKET, AWS_REGION } from '$env/static/private';

import aws from "aws-sdk";

aws.config.update({
  secretAccessKey: AWS_ACCESS_SECRET,
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_REGION
})

const s3 = new aws.S3();

export async function saveFile(file, key) {
  let arrayB = await file.arrayBuffer();
  let buffer = Buffer.from(arrayB);

  const params = {
      Bucket: AWS_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read"
  };

  return await s3.upload(params).promise();
}