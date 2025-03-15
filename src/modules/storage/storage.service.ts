import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import env from '../../environment/env'


@Injectable()
export class StorageService {
    private storage: Storage;
    private bucketName: string = env.GOOGLE_STORAGE_BUCKET_NAME;

    constructor() {
        this.storage = new Storage({
            keyFilename: env.GOOGLE_APPLICATION_CREDENTIALS
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        const bucket = this.storage.bucket(this.bucketName);
        const blob = bucket.file(uniqueFileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
                size : file.size,
                uploadedAt : new Date().toISOString()
            },
        });

        return new Promise((resolve, reject) => {
            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${uniqueFileName}`;
                resolve(publicUrl);
            });

            blobStream.on('error', (err) => {
                reject(`An error occurred while loading files: ${err.message}`);
            });

            blobStream.end(file.buffer);
        });
    }

    async listFiles(): Promise<string[]> {
        const [files] = await this.storage.bucket(this.bucketName).getFiles();
        return files.map(file => file.name);
    }

    async downloadFile(fileName: string, destPath: string): Promise<string> {
        const file = this.storage.bucket(this.bucketName).file(fileName);
        await file.download({ destination: destPath });
        return `File downloaded as ${destPath}`;
    }

    async deleteFile(fileName: string): Promise<string> {
        await this.storage.bucket(this.bucketName).file(fileName).delete();
        return `${fileName} successfuly deleted.`;
    }
}
