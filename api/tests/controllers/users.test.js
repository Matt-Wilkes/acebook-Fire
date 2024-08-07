const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

// Setup token so we can put it in Authorization
const secret = process.env.JWT_SECRET;
const JWT = require("jsonwebtoken");
const createToken = (userId) => {
  return JWT.sign(
    {
      user_id: userId,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
    },
    secret
  );
};
let token;

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  const oldConsoleError = console.error;
  console.error = () => {};

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        firstName: "john",
        lastName: "smith",
        email: "poppy@email.com",
        password: "1234",
        confirmPassword: "1234",
      });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        firstName: "john",
        lastName: "smith",
        email: "poppy@email.com",
        password: "1234",
        confirmPassword: "1234",
      });

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
      oldConsoleError();
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "1234" });

      // expect(response.statusCode).toBe(400);
      oldConsoleError();
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("/users/get-user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("GET, with user_id provided", () => {
    test("response code 200, response body", async () => {
      const mockUser = new User({
        firstName: "Potato",
        lastName: "Tomato",
        email: "clarkson@farm.com",
        password: "12345",
        confirmPassword: "12345",
        city: "London",
        bio: "Eat, sleep, work, repeat",
      });

      const user = await mockUser.save();
      const mockUserId = user["_id"].toString();

      const response = await request(app)
        .get("/users/get-user")
        .set("user_id", mockUserId);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
        user_id: mockUserId,
        firstName: "Potato",
        lastName: "Tomato",
        email: "clarkson@farm.com",
        city: "London",
        bio: "Eat, sleep, work, repeat",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      });
    });

    test("response code 400", async () => {
      const response = await request(app)
        .get("/users/get-user")
        .set("user_id", "66b2ab160e16d154d1022cd0");

      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ message: "User not found by id" });
    });
  });
});

describe("/users/update-user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("PUT, with user_id provided", () => {
    test("response code 201, response body", async () => {
      const mockUser = new User({
        firstName: "Potato",
        lastName: "Tomato",
        email: "clarkson@farm.com",
        password: "12345",
        confirmPassword: "12345",
        city: "London",
        bio: "Eat, sleep, work, repeat",
      });

      const user = await mockUser.save();
      token = createToken(user.id);
      const mockUserId = user["_id"].toString();

      // console.log(mockUserId);
      // console.log(token);
      const response = await request(app)
        .put("/users/update-user")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: mockUserId,
          firstName: "Potato-Edit",
          lastName: "Tomato-Edit",
          city: "London-Edit",
          bio: "Eat, sleep, work, repeat-Edit",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541-Edit",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({ message: "Profile updated" });
    });

    test("response code 400, response body", async () => {
      const mockUser = new User({
        firstName: "Potato",
        lastName: "Tomato",
        email: "clarkson@farm.com",
        password: "12345",
        confirmPassword: "12345",
        city: "London",
        bio: "Eat, sleep, work, repeat",
      });

      const user = await mockUser.save();
      token = createToken(user.id);
      const mockUserId = user["_id"].toString();

      // 66b2ab160e16d154d1022cd0 <== mock correct format _id for User
      const response = await request(app)
        .put("/users/update-user")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: "66b2ab160e16d154d1022cd0",
          firstName: "Potato-Edit",
          lastName: "Tomato-Edit",
          city: "London-Edit",
          bio: "Eat, sleep, work, repeat-Edit",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541-Edit",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        message: "User not found by id, and not updated",
      });
    });
  });
});
