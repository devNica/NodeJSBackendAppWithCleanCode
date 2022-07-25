import 'dotenv/config'

export default {
  ENVIROMENT: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  PREFIX: '/api/v1',
  DB: {
    NODE_ENV: process.env.NODE_ENV,
    DBNAME: process.env.DB_NAME,
    DBPORT: process.env.DB_PORT,
    DBUSER: process.env.DB_USER,
    DBPASSWORD: process.env.DB_PASSWORD,
    DIALECT: process.env.DB_DIALECT,
    DBHOST: process.env.DB_HOST
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH,
  JWT_SECRET_EXPIRATION_SEC: process.env.JWT_SECRET_EXPIRATION_SEC,
  JWT_SECRET_REFRESH_EXPIRATION_SEC: process.env.JWT_SECRET_REFRESH_EXPIRATION_SEC,
  ROL: {
    COMMON_USERS: 1
  }
}
