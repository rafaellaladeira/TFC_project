import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/user'
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import ILogin from '../interfaces/login.interface'
import { Model } from 'sequelize/types';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /login route', () => {
  let chaiHttpResponse : Response;
  describe('route POST', () => {

    const user = {
      email: "rafaella.ladeira@gmail.com",
      password: "batatinha"
    }
    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(user as unknown as Model)
    })
  
    afterEach(() => {
      Sinon.restore();
    })

    it('if returns a token sucessfully, with a status 200', async () => {
      

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "rafaella.ladeira@gmail.com",
        password: "batatinha"
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('token');

    });
    it('if there is no "email" returns an error 400, with an error msg', async () => {
      
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "",
        password: "123456"
      })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    });
    it('if there is no "password" returns an error 400, with an error msg', async () => {
      
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "user@user.com",
        password: ""
      })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
    });
    it('if the "email" doesnt exist on db, returns an error 401, with an error msg', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "user@gmail.com",
        password: "123456"
      })
      expect(chaiHttpResponse).to.have.status(401)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
    });
    it('if the "password" is incorrect, returns an erro 401, with an error msg', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "rafaella.ladeira@gmail.com",
        password: "batatinh"
      })
      expect(chaiHttpResponse).to.have.status(401)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
    });
  })

  describe(' route GET/login/validate ', ()=> {

    const userDb = {
      token: "eyJhbGciOiJIUzI1NiJ9.dXNlckB1c2VyLmNvbQ.8yAUgfpLRsTuqgg-Yj3YeO66h8PxSQdx1y641jX4JpM",
    }

    beforeEach(() => {
      Sinon.stub(User, "findOne").resolves(userDb as unknown as Model)
    })
  
    afterEach(() => {
      Sinon.restore();
    })

    it('if returns a status 200, with the user role', async ()=> {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send({
        token: "eyJhbGciOiJIUzI1NiJ9.dXNlckB1c2VyLmNvbQ.8yAUgfpLRsTuqgg-Yj3YeO66h8PxSQdx1y641jX4JpM"
      })

      expect(chaiHttpResponse).to.have.status(200)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse).to.have.property('role')
    });
    it('if returns a status 500, with an error msg', async ()=> {
      chaiHttpResponse = await chai.request(app).get('/login/validate').send({
        token: ".8yAUgfpLRsTuqgg-Yj3YeO66h8PxSQdx1y641jX4JpM"
      })

      expect(chaiHttpResponse).to.have.status(500)
      expect(chaiHttpResponse).to.be.json
      expect(chaiHttpResponse.body.message).to.be.equal("jwt must be provided")
    });
  })
});
