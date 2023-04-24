import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ResponseS3 } from './types/response-s3.types';

@Injectable()
export class FileUploadService {
  async upload(file): Promise<ResponseS3> {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
    const result = await this.uploadS3(file.buffer, bucketS3, originalname);

    return result as ResponseS3;
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const newName = Date.now() + name;

    const params = {
      Bucket: bucket,
      Key: String(newName),
      Body: file,
      ACL: 'public-read',
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
