const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (user_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      user_id: user_id,
    },
  };
  
  const response = await fetch(`${BACKEND_URL}/users/get-user`, requestOptions);
  console.log(response.status);
  if (response.status !== 200) {
    throw new Error("No such user received from API");
  }

  const data = await response.json();
  return data;
};
