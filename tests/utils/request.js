import supertest from 'supertest';

import { app } from '../../src/app.js';
import { TestUtil } from './util.js';

export class TestRequest {
  constructor(auth = true) {
    this.agent = supertest.agent(app);

    if (auth) {
      this.agent = this.agent.set('Authorization', `Bearer ${global.authUser.accessToken}`);
    }
  }

  static public() {
    return new TestRequest(false);
  }

  static auth() {
    return new TestRequest();
  }

  set(key, value) {
    this.agent = this.agent.set(key, value);
    return this;
  }

  request(method, path) {
    return this.agent[method](TestUtil.apiEndpoint(path));
  }

  get(path) {
    return this.request('get', path);
  }

  post(path) {
    return this.request('post', path);
  }

  delete(path) {
    return this.request('delete', path);
  }

  put(path) {
    return this.request('put', path);
  }

  patch(path) {
    return this.request('patch', path);
  }
}
