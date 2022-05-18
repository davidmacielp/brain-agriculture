const postgresConfig = {
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
};

export { postgresConfig };
