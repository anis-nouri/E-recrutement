const config = {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION || "us-east-1",
    USER_POOL_ID: process.env.USER_POOL_ID,
    USER_POOL_APP_CLIENT_ID: process.env.USER_POOL_APP_CLIENT_ID
  };
  
  module.exports = config;
  