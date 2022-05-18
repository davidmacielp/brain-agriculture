declare namespace NodeJS {
  export interface ProcessEnv {
    // App Config
    APP_PORT: string;
    SECRET_KEY: string;

    // Redis Config
    REDIS_HOST: string;
    REDIS_PORT: number;

    // PostgresConfig
    POSTGRES_DATABASE: string;
    POSTGRES_HOST: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: number;
  }
}
