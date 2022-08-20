import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /login route', () => {
  describe('route POST', () => {
    it('if returns a token sucessfully', () => {
  
    });
    it('if there is no "email" or "password" returns an error 400, with an error msg', () => {
  
    });
    it('if the "email" doesnt exist on db, returns an error 401, with an error msg', () => {
  
    });
    it('if the "password" is incorrect, returns an erro 401, with an error msg', () => {
  
    });
  })

  describe(' route GET/login/validate ', ()=> {
    it('if returns a status 200, with the user role', ()=> {

    });
    it('if return a status 500, with "Invalid Token" msg', ()=> {
      
    });
  })
});
