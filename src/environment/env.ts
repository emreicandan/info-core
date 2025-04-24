import * as dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_URI: process.env.MONGO_URI || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
    API_KEY: process.env.API_KEY || '',
    GOOGLE_APPLICATION_CREDENTIALS : process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
    GOOGLE_STORAGE_BUCKET_NAME : process.env.GOOGLE_STORAGE_BUCKET_NAME || '',
    GOOGLE_API_KEY : process.env.GOOGLE_API_KEY || '',
    GOOGLE_PROJECT_ID : process.env.GOOGLE_PROJECT_ID || '',
    PROJECT_MAIL :  process.env.PROJECT_MAIL,
    PROJECT_PASSWORD : process.env.PROJECT_PASSWORD
};