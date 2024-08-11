const BASE_URL = "http://localhost:4000/api/";

export const getProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}users/profile/`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error, "Error retrieving profile");
  }
};


export const getAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}users`, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const updateProfile = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}users/profile`, options);
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};



export const updateUserById = async (data, token) => {
  console.log(data, token);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}users/${data.id}`, options);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteUserById = async (id, token) => {
  console.log(id, token, "delete user");
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}users/${id}`, options);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};