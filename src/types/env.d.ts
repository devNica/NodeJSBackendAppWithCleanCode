declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number // puerto en que se expone la aplicacion
      DB_DIALECT: 'mysql' | 'postgres' // dialecto de la base de datos
      DB_NAME: string // nombre de la base de datos
      DB_HOST: string // nombre del host de la base de datos
      DB_PORT: number // puerto de conexion a la base de datos
      DB_PASSWORD: string // contrasenia del usuario para conexion a la base de datos
      DB_USER: string // usuario para la conexion a la base de datos
      NODE_ENV: 'development' | 'production' // entornos disponibles
      JWT_SECRET: string
      JWT_SECRET_REFRESH: string
      JWT_SECRET_EXPIRATION_SEC: string
      JWT_SECRET_REFRESH_EXPIRATION_SEC: string
    }
  }
}

export {}
