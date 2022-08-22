import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize/types';

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Teams from '../database/models/team'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /teams route', () => {
  let chaiHttpResponse : Response;

    describe('route GET', () => {
    
      const teams = {
        id: 1,
        teamName: "Time 1" 
        }
    
      beforeEach(() => {
        sinon.stub(Teams, "findAll").resolves(teams as unknown as Model[])
      })
    
      afterEach(()=> {
        sinon.restore();
      })
    
      it('if returns a status 200 with all the teams', async () => {
  
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams)

    });
  })

  describe(' route GET/teams/id ', ()=> {

    const teams = {
      id: 1,
      teamName: "Time 1" 
    }
  
    beforeEach(() => {
      sinon.stub(Teams, "findOne").resolves(teams as unknown as Model)
    })
  
    afterEach(()=> {
      sinon.restore();
    })

    it('if returns a status 200, with the id/s name team', async ()=> {
      
      chaiHttpResponse = await chai.request(app).get('/teams/1')
    
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams)

    });
    it('if returns a status 404 with an error msg', async ()=> {
      
      chaiHttpResponse = await chai.request(app).get('/teams/20');

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid id')

    });
  })
});