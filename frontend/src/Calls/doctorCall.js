const BASE_URL = "http://localhost:4000/api/";

export const createDoctor = async (doctorData, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doctorData),
  };

  try {
    const response = await fetch(`${BASE_URL}doctors/`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getAllDoctors = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}doctors/`, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDoctorById = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}doctors/${data.id}`, options);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteDoctorById = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}doctors/${id}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};