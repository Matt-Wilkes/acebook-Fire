// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.json();
  return data;
};
