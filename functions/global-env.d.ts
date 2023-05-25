declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      FAUNA_PREFIX: string;
      FAUNA_API_KEY: string;
      APP_PORT: string;
      APP_DOMAIN: string;
      APP_API_KEY: string;
    }
  }
}

export { }
