const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsers = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    console.log(response.status)

    if (response.status !== 200) {
        throw new Error("Unable to fetch posts");
    }

    const data = await response.json();
    return data;
};