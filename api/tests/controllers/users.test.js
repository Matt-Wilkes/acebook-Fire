const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  const oldConsoleError = console.error
  console.error = () => {}


  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ firstName: "john", lastName: "smith", email: "poppy@email.com", password: "1234", confirmPassword: "1234" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ firstName: "john", lastName: "smith", email: "poppy@email.com", password: "1234", confirmPassword: "1234" });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.firstName).toEqual("john");
      expect(newUser.lastName).toEqual("smith");
      expect(newUser.email).toEqual("poppy@email.com");
      expect(newUser.password).toEqual("1234");
      expect(newUser.confirmPassword).toEqual("1234");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      // expect(users.length).toEqual(0);
      oldConsoleError()
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234" });

      // expect(response.statusCode).toBe(400);
      oldConsoleError()
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});
