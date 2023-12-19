import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-provider-env";


const bucketName = process.env.S3_BUCKET_NAME

class S3Repo {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: "eu-central-1",
      credentials: fromEnv(),
    });
  }

  async createBucket(bucketName: string): Promise<void> {
    try {
      await this.s3Client.send(
        new CreateBucketCommand({
          Bucket: bucketName,
        })
      );
      console.log(`Bucket "${bucketName}" created successfully.`);
    } catch (error) {
      console.error(`Error creating bucket "${bucketName}": ${error}`);
      throw error;
    }
  }

  async uploadImage(fileName: string, file) {
    try {
      const res = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: "rossai-predictions",
          Key: fileName,
          Body: file,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async getImage(fileName: string) {
    const { Body } = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      })
    );

    return Body;
  }

  async listObjects() {
    const paginator = paginateListObjectsV2(
      { client: this.s3Client },
      { Bucket: bucketName }
    );

    for await (const page of paginator) {
      const objects = page.Contents;

    }
  }
}

export default new S3Repo();

