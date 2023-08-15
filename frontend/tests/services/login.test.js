import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { login } from "../../src/services/login";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("login service", () => {
  test("calls the backend url for a token", async () => {
    const testEmail = "test@testEmail.com";
    const testPassword = "12345678";

    fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
      status: 201,
    });

    await login(testEmail, testPassword);

    // This is an array of the arguments that were last passed to fetch
    const fetchArguments = fetch.mock.lastCall;
    const url = fetchArguments[0];
    const options = fetchArguments[1];

    expect(url).toEqual(`${BACKEND_URL}/tokens`);
    expect(options.method).toEqual("POST");
    expect(options.body).toEqual(
      JSON.stringify({ email: testEmail, password: testPassword })
    );
    expect(options.headers["Content-Type"]).toEqual("application/json");
  });

  test("returns the token if the request was a success", async () => {
    const testEmail = "test@testEmail.com";
    const testPassword = "12345678";

    fetch.mockResponseOnce(JSON.stringify({ token: "testToken" }), {
      status: 201,
    });

    const token = await login(testEmail, testPassword);
    expect(token).toEqual("testToken");
  });

  test("throws an error if the request failed", async () => {
    const testEmail = "test@testEmail.com";
    const testPassword = "12345678";

    fetch.mockResponseOnce(JSON.stringify({ message: "Wrong Password" }), {
      status: 403,
    });

    try {
      await login(testEmail, testPassword);
    } catch (err) {
      expect(err.message).toEqual(
        "Received status 403 when logging in. Expected 201"
      );
    }
  });
});
