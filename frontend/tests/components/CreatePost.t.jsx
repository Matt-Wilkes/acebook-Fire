import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import React from 'react';
import CreatePost from "../../src/components/CreatePost/CreatePost";
import { createPost } from "../../src/services/posts";
import { BrowserRouter } from "react-router-dom";


// Mock the createPost function from posts service
vi.mock("../../src/services/posts", () => {
  const createPostMock = vi.fn();
  return { createPost: createPostMock };
});

// Mock jwt-decode
vi.mock('jwt-decode', async () => {
  const actual = await vi.importActual('jwt-decode');
  return {
    ...actual,
    default: () => ({ user_id: 123 })
  };
});

describe('CreatePost Component', () => {
  test('submits the correct payload', async () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE1MTYyMzkwMjJ9.sflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    window.localStorage.setItem("token", validToken);

    createPost.mockResolvedValue({ message: "Post created", token: "newToken" });

    const fetchPostsMock = vi.fn();
    render(
      <BrowserRouter>
        <CreatePost fetchPosts={fetchPostsMock} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Create a new post...');
    fireEvent.change(input, { target: { value: 'This is a test post' } });

    const buttonEl = screen.getByRole("button", { name: /submit/i });
    fireEvent.submit(buttonEl);

    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith(validToken, 'This is a test post');
    });

    // console.log(createPost.mockResolvedValue)

    // Wait for fetchPosts to be called
    await waitFor(() => {
      expect(fetchPostsMock).toHaveBeenCalled();
    });
  });
});
