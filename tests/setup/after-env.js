import { TestUtil } from '../utils/util.js';
import { MongoTest } from './mongo.js';

beforeAll(async () => {
  await MongoTest.connect();
  global.authUser = await TestUtil.createAuthUser();
});

afterAll(async () => {
  await MongoTest.destroy();
});
