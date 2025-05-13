
export const ENVIRONMENT = process.env.NODE_ENV;
 export const IS_PROD = ENVIRONMENT === "dev"; // Anything else is treated as 'dev'
//export const IS_PROD = true; // Anything else is treated as 'dev'
export const REPORT_DB_CONNECTION_NAME = process.env.REPORTS_DB_NAME;
export const HASH_IV = process.env.HASH_IV ;
export const HASH_ALGORITHM = process.env.HASH_ALGORITHM;
export const COGNITO_CONNECT_ROUTE = process.env.COGNITO_CONNECT_ROUTE;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;

export interface CognitoConfig {
 region: string;
 accessKeyId: string;
 secretAccessKey: string;
 userPoolId: string;
 clientId: string;
}
export const AWSCONFIG: CognitoConfig = {
 region: process.env.AWS_REGION || "",
 accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
 userPoolId: process.env.AWS_USER_POOL || "",
 clientId: process.env.AWS_CLIENT_ID || ""
}

