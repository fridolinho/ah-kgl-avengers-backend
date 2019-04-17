import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';

dotenv.config();

chai.should();
chai.use(chaiHttp);

const facebookToken = process.env.FACEBOOK_TOKEN;
let userToken, userId;

before((done) => {
  chai.request(app)
    .post('/api/v1/oauth/facebook')
    .send({ access_token: facebookToken })
    .end((req, res) => {
      userToken = res.body.token;
      userId = res.body.data.id;
      done();
    });
});

describe('Author should handle article ', () => {
  it('Author should be able to create an article', (done) => {
    chai.request(app)
      .get('/api/v1/article/feeds')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.should.have.property('articles');
        res.body.articles.should.be.an('Array');
        done();
      });
  });

  it('Author should be able get his/her published articles', (done) => {
    chai.request(app)
      .get('/api/v1/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.should.have.property('articles');
        res.body.articles.should.be.an('Array');
        done();
      });
  });

  it('Author should be able get his/her drafted articles', (done) => {
    chai.request(app)
      .get('/api/v1/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.should.have.property('articles');
        res.body.articles.should.be.an('Array');
        done();
      });
  });

  it('should return an object with status 201 when a user creates an article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles')
      .send({
        title: 'Testing Title',
        body: 'Booooooooooooo body',
        author: userId
      })
      .end((err, res) => {
        res.body.should.have.property('status').eql(201);
        res.body.should.be.an('Object');
        done();
      });
  });

  it('Author should be able to delete an article', (done) => {
    const slug = 'this-is-my-first-try-of-article';

    chai.request(app)
      .put(`/api/v1/articles/${slug}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('Object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return an object with status 404 when a user tries to update that doesnot exist', (done) => {
    chai
      .request(app)
      .put('/api/v1/articles/working-now-with-aaradbc007065')
      .send({
        title: 'This is how we update this',
        body: 'I am being updated',
        author: userId
      })
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('errorMessage').eql('Article not found, please create a new article instead');
        done();
      });
  });
});
