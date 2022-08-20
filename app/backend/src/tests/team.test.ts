import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /teams route', () => {
  describe('route GET', () => {
    it('if returns a status 200 with all the teams', () => {
  
    });
    it('if returns a status 404 with an error msg', () => {
  
    });
  })

  describe(' route GET/teams/id ', ()=> {
    it('if returns a status 200, with the id/s name team', ()=> {

    });
    it('if returns a status 404 with an error msg', ()=> {
      
    });
  })
});