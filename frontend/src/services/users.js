const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

  console.log(response.status);

  if (response.status !== 200) {
    throw new Error("Unable to fetch users");
  }

  const data = await response.json();
  return data;
};

export const getUser = async (user_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      user_id: user_id,
    },
  };

  const response = await fetch(`${BACKEND_URL}/users/get-user`, requestOptions);
  // console.log("getUser response status: " + response.status);
  if (response.status !== 200) {
    throw new Error("No such user received from API");
  }

  const data = await response.json();
  return data;
};

export const updateUser = async (token, formData) => {
  // console.log(formData);
  const title = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const payload = {
    user_id: formData.user_id,
    firstName: title(formData.firstName),
    lastName: title(formData.lastName),
    city: title(formData.city),
    bio: title(formData.bio),
    image: formData.image,
  };

  // console.log(payload);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/users/update-user`, requestOptions);

  const data = await response.json();
  return data;
};
