declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Mongo envars
            readonly MONGODB_URI: string

            // Express session envars
            readonly SESSION_SECRET: string

            // Express server envars
            readonly MEDIA: string
            readonly CLIENT_DOMAIN: string
            readonly NODE_ENV: 'development' | 'production'
            readonly PORT: number

            // Minio envars
            readonly MINIO_PORT: number
            readonly MINIO_ENDPOINT: string
            readonly MINIO_BUCKET: string
            readonly MINIO_SECRET_KEY: string
            readonly MINIO_ACCESS_KEY: string
        }
    }
}
  
export {}