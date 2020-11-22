export default {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'http://localhost:7000',
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  }
}
