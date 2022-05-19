import * as mongoose from 'mongoose';

const connectDb = () => {
  return mongoose.connect(`${process.env.DB_URL}`);
};

export default connectDb;
