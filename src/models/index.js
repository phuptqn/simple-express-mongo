import mongoose from 'mongoose';
import { User } from './user.model.js';
import { config } from '../configs/config.js';

const connectMongoDb = async () => {
  await mongoose.connect(config.database.connectionUrl, {
    serverSelectionTimeoutMS: 3000,
  });
  console.log('MongoDB connected!');
};

export { connectMongoDb, User };
