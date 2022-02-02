const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);

const Path = require('../models/path');
const User = require('../models/user');

beforeEach(async () => {
  await Path.deleteMany({});
  await Path.insertMany(helper.initialPaths);
});

describe('when there is initially some paths saved', () => {
  test('paths are returned as JSON', async () => {
    await api
      .get('/api/paths')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('all paths are returned', async () => {
    const response = await api.get('/api/paths');
  
    expect(response.body).toHaveLength(helper.initialPaths.length);
  });
  
  test('a specific path is within the returned paths ', async () => {
    const respone = await api.get('/api/paths')
  
    const title = respone.body.map(t => t.title);
    expect(title).toContain('Test title second path');
  });  
});

describe('viewing a specific path', () => {
  test('a specific path can be viewd', async () => {
    const pathsAtStart = await helper.pathsInDb();

    const pathToView = pathsAtStart[0];

    const resultPath = await api  
      .get(`/api/paths/${pathToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedPathToView = JSON.parse(JSON.stringify(pathToView));

    expect(resultPath.body).toEqual(processedPathToView);
  });

  test('fail with status 404 if a path does not exist', async () => {
    const validNonexistingID = await helper.noExistingId();

    await api
      .get(`/api/paths/${validNonexistingID}`)
      .expect(404);
  });

  test('fail with status 400 if id is invalid', async () => {
    const invalidID = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/paths/${invalidID}`)
      .expect(400);
  });

})

describe('addition of new path', () => {
  test('succeeds with valid data', async () => {
    const newPath = {
      title: 'new path add test with async',
      description: 'This is the new path added by test description',
      km: 22.12,
      duration: '11:30',
      differenceAltitude: 1000,
      difficult: 'Difficult',
      date: new Date(),
    };
  
    await api
      .post('/api/paths')
      .send(newPath)
      .expect(201)
      .expect('Content-type',/application\/json/);
  
    const pathsAtEnd = await helper.pathsInDb();
    expect(pathsAtEnd).toHaveLength(helper.initialPaths.length + 1);
  
    const titles = pathsAtEnd.map(p => p.title);
    expect(titles).toContain('new path add test with async');
    
  });
  
  test('faild with status code 400 if data invalid', async () => {
    const newPath = {
      description: 'This is the new path added by test description',
      km: 22.12,
      duration: '11:30',
      differenceAltitude: 1000,
      difficult: 'Difficult',
      date: new Date(),
    };
  
    await api
      .post('/api/paths')
      .send(newPath)
      .expect(400);
  
    const pathsAtEnd = await helper.pathsInDb();
  
    expect(pathsAtEnd).toHaveLength(helper.initialPaths.length);
  });

});

describe('delete of a path', () => {
  test('a note can be deleted',async () => {
    const pathsAtStart = await helper.pathsInDb();
    const pathToDelete = pathsAtStart[0];
  
    await api
      .delete(`/api/paths/${pathToDelete.id}`)
      .expect(204)
    
    const pathsAtEnd = await helper.pathsInDb();
  
    expect(pathsAtEnd).toHaveLength(helper.initialPaths.length - 1);
  
    const titles = pathsAtEnd.map(p => p.title);
    expect(titles).not.toContain(pathToDelete.title);
  });
  
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekkeke', 10);
    const user = new User({ username: 'root', passwordHash});

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: 'lucalet',
      name: 'Luca Lettiri',
      password: 'zingar'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/);
    
    const userAtEnd = await helper.userInDb();
    expect(userAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = userAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);

  });

  test('creation fails with proper statuscode and message if username already take ', async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'zingar'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type',/application\/json/);
    
    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.userInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    
  });
});

afterAll(() => {
  mongoose.connection.close();
});
