const app = require("../../app");
const supertest = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/tokens", () => {
  beforeAll(async () => {
    const user = new User({
      email: "auth-test@test.com",
      password: "12345678",
    });

    // We need to use `await` so that the "beforeAll" setup function waits for
    // the asynchronous user.save() to be done before exiting.
    // Otherwise, the tests belowc ould run without the user actyakkt being
    // saved, causing tests to fail inconsistently.
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("returns a token when credentials are valid", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "auth-test@test.com", password: "12345678" });

    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("doesn't return a token when the user doesn't exist", async () => {
    const testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "non-existent@test.com", password: "1234" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("User not found");
  });

  test("doesn't return a token when the wrong password is given", async () => {
    let testApp = supertest(app);
    const response = await testApp
      .post("/tokens")
      .send({ email: "auth-test@test.com", password: "1234" });

    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Password incorrect");
  });
});
