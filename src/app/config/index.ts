import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";
import path from "path";

// Declaring path for specific .env files
dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  FRONTEND_DEV_ENV01: str(),
  FRONTEND_DEV_ENV02: str(),
  FRONTEND_PRO_ENV: str(),
  PORT: num(),
  BCRYPT_SALT_ROUNDS: num(),
  DEFAULT_PASS: str(),
  JWT_ACCESS_EXPIRES_IN: str(),
  JWT_REFRESH_EXPIRES_IN: str(),
  SMTP_PASS: str(),
  SMTP_MAIL: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  ADMIN_PASSWORD: str(),
  JWT_ACCESS_TOKEN: str(),
  JWT_REFRESH_TOKEN: str(),
  DATABASE_URL: str(),
});

export default env;
