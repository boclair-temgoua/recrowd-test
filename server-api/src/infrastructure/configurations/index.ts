import * as dotenv from 'dotenv';
dotenv.config();

export const isTesting = () => process.env.NODE_ENV === 'development';

export const configurations = {
  /**
   * Node environment
   */
  environment: process.env.NODE_ENV || 'development',
  /**
   * Site
   */
  datasite: {
    name: process.env.NODE_NAME,
    url: process.env.NODE_APP_URL,
    pricingBilling: Number(process.env.PRICING_BILLING_VOUCHER),
    urlClient: process.env.NODE_CLIENT_URL,
  },
  /**
   * Api
   */
  api: {
    prefix: '/api',
    version: process.env.API_VERSION,
    headerSecretKey: process.env.HEADER_API_SECRET_KEY,
  },
  /**
   * Server port
   */
  port: process.env.PORT || 5400,
  /**
   * Database
   */
  database: {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
    ssl: process.env.POSTGRES_SSL,
    logging: process.env.POSTGRES_LOG,
  },
};
