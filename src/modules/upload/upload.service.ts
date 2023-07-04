import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ResponseS3 } from './types/response-s3.types';

@Injectable()
export class FileUploadService {
  private s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async upload(
    file: {
      buffer?: any;
      originalname?: any;
    },
    contentType?: string,
  ): Promise<ResponseS3> {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
    const result = await this.uploadS3(
      file.buffer,
      bucketS3,
      originalname,
      contentType,
    );

    return result as ResponseS3;
  }

  async deleteFile(name: string) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async uploadS3(
    file: any,
    bucket: string,
    name: number,
    contentType?: string,
  ) {
    const newName = Date.now() + name;

    const params = {
      Bucket: bucket,
      Key: String(newName),
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err: { message: any }, data: unknown) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
}
