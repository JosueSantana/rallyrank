import dotenv from 'dotenv';

dotenv.config({ path: './config/test.env'});
console.log(process.env.MONGO_URI)