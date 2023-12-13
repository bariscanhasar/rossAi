import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";


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
    console.log(await Body!.transformToString());
    return Body;
  }

  async listObjects() {
    const paginator = paginateListObjectsV2(
      { client: this.s3Client },
      { Bucket: bucketName }
    );

    for await (const page of paginator) {
      const objects = page.Contents;
      console.log(objects);
    }
  }
}

export default new S3Repo();

// export async function main() {
//     // A region and credentials can be declared explicitly. For example
//     // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
//     //initialize the client with those settings. However, the SDK will
//     // use your local configuration and credentials if those properties
//     // are not defined here.
//
//
//
//     // Create an Amazon S3 bucket. The epoch timestamp is appended
//     // to the name to make it unique.
//     const bucketName = `test-bucket-${Date.now()}`;
//     await s3Client.send(
//         new CreateBucketCommand({
//             Bucket: bucketName,
//         })
//     );
//
//     // Put an object into an Amazon S3 bucket.
//     await s3Client.send(
//         new PutObjectCommand({
//             Bucket: bucketName,
//             Key: "my-first-object.txt",
//             Body: "Hello JavaScript SDK!",
//         })
//     );
//
//     // Read the object.
//     // const { Body } = await s3Client.send(
//     //     new GetObjectCommand({
//     //         Bucket: bucketName,
//     //         Key: "my-first-object.txt",
//     //     })
//     // );
//
//     const { Body } = await s3Client.send(
//       new GetObjectCommand({
//         Bucket: bucketName,
//         Key: "my-first-object.txt",
//       })
//     );
//
//     console.log(await Body?.transformToString())
//
//
//
// }

// Call a function if this file was run directly. This allows the file
// to be runnable without running on import.
// import { fileURLToPath } from "url";
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//     main();
// }
