const BASE_URL = "http://localhost:4000/api/";

export const login = async (credentials) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(credentials),
    };

    try {
      const response = await fetch(`${BASE_URL}auth/login`, options);
      
      if (!response.ok) {
        throw new Error('an error occurred while logging in');
      }

      const data = await response.json();
      
      return data.token;
    } catch (error) {
      console.log(error, "an error occurred during login");
      throw error; 
    }
  };


  export const register = async (registerData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };
  
    try {
      const response = await fetch(`${BASE_URL}auth/register`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error, "Not registered");
    }
  };
  