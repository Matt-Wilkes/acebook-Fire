require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has a first name", () => {
    const user = new User({
      firstName: "john",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("john");
  });
  it("has a last name", () => {
    const user = new User({
      lastName: "smith",
      password: "password",
    });
    expect(user.lastName).toEqual("smith");
  });
  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });


  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a confirm password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      confirmPassword: "confirmation"
    });
    expect(user.confirmPassword).toEqual("confirmation");
  });

  ////////////

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      firstName: "john",
      lastName: "smith",
      email: "someone@example.com",
      password: "password",
      confirmPassword: "confirmation"
    });

    await user.save();
    const users = await User.find();

    expect(users[0].firstName).toEqual("john");
    expect(users[0].lastName).toEqual("smith");
    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
    expect(users[0].confirmPassword).toEqual("confirmation");
  });
});
