declare namespace NodeJS {
  export interface ProcessEnv {
    // App Config
    APP_PORT: string;

    // Redis Config
    REDIS_HOST: string;
    REDIS_PORT: number;
  }
}
