import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

// mocks fetch
createFetchMock(vi).enableMocks();
