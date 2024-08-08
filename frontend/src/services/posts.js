// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      userId: "66aa5832288a1b5a01d2c5e4"
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

export const updatePostComments = async (token, postData) => {
  const payload = {
    id: postData.id,
    comments: [postData.comment]
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };
  console.log(JSON.stringify(postData));
  console.log(JSON.stringify(payload));
  console.log(JSON.stringify(payload));
  const response = await fetch(`${BACKEND_URL}/posts/add-comment`, requestOptions);
  if (response.status !== 201) {
    throw new Error("Unable to update post");
  }
};
