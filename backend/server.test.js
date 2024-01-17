const { MongoClient } = require('mongodb');
const { expect } = require('chai');

describe('Server', () => {
  let connection;
  let db;

  before(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017');
    db = connection.db('test');
  });

  after(async () => {
    await connection.close();
  });

  it('should insert a new user into the database', async () => {
    const usersCollection = db.collection('users');

    const username = 'testuser';
    const hashedPassword = 'hashedpassword';

    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
    });

    expect(result.insertedCount).to.equal(1);
    expect(result.ops[0].username).to.equal(username);
    expect(result.ops[0].password).to.equal(hashedPassword);
  });
});