declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Mongo envars
            readonly MONGODB_URI: string
            readonly MONGODB_URI_DEV: string

            // Express session envars
            readonly SESSION_SECRET: string

            // Express server envars
            readonly MEDIA: string
            readonly CLIENT_DOMAIN: string
            readonly NODE_ENV: 'development' | 'production'
            readonly PORT: number

            // AWS S3 envars
            readonly AWS_BUCKET: string
            readonly AWS_SECRET_KEY: string
            readonly AWS_ACCESS_KEY: string
            readonly CF_ACCESS_KEY: string
            readonly CF_PRIVATE_KEY: string
            readonly CF_URL: string
        }
    }
}
  
export {}