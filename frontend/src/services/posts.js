// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  console.log(response.status);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const createPost = async (token, postData) => {
  const payload = {
    message: postData.message,
    userId: postData.userId,
    likes: postData.likes,
    comments: postData.comments,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  console.log(JSON.stringify(payload));
  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
  if (response.status !== 201) {
    throw new Error("Unable to create post");
  }
};

export const updatePost = async (token, postData) => {
  const payload = {
    likes: postData.likes,
    id: postData.id,
    comments: postData.comments
  };

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  console.log(JSON.stringify(payload));
  const response = await fetch(`${BACKEND_URL}/posts/add-like`, requestOptions);
  if (response.status !== 201) {
    throw new Error("Unable to update post");
  }
};
