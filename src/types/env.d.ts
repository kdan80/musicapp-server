declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI?: string;
            MEDIA: string,
            NODE_ENV: 'development' | 'production';
            PORT?: string;
        }
    }
}
  
export {}