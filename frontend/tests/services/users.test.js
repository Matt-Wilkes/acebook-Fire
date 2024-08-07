import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getUsers, getUser, updateUser } from "../../src/services/users";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("users service", () => {
  describe("getUsers", () => {
    test("includes a token with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ users: [], token: "newToken" }), {
        status: 200,
      });

      await getUsers("testToken");

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/users`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getUsers("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch users");
      }
    });
  });

  describe("getUser", () => {
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Mock response" }), {
        status: 400,
      });

      try {
        await getUser("66b1f5a2fb4815db163af8a4");
      } catch (err) {
        expect(err.message).toEqual("No user found in backend");
      }
    });
  });

  describe("updateUser", () => {
    const mockPayload = {
      user_id: "qwerty12345",
      firstName: "Potato",
      lastName: "Tomato",
      email: "john.doe@email.com",
      city: "Vegshire",
      bio: "I grew up on the fields",
      image:
        "https://i.natgeofe.com/n/8271db90-5c35-46bc-9429-588a9529e44a/raccoon_thumb_square.JPG?wp=1&w=357&h=357",
    };

    test("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Mock response" }), {
        status: 400,
      });

      try {
        await updateUser("qwerty12345", mockPayload);
      } catch (err) {
        expect(err.message).toEqual("No user updated in backend");
      }
    });

    test("responds with message when successful", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Profile updated" }), {
        status: 201,
      });

      const data = await updateUser("qwerty12345", mockPayload);
      expect(data).toEqual({ message: "Profile updated" });
    });
  });
});
