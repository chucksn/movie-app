export const postLogin = async (credentials) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/user/auth/login`,
      requestOptions
    );
    const data = await response.json();
    if (response.status === 400) throw data.error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const postSignUp = async (credentials) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/user/auth/sign-up`,
      requestOptions
    );
    const data = await response.json();
    if (response.status === 400) throw data.error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URI}/api/v1/user/auth`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (response.status === 404 || response.status === 401) throw data.error;
    return data;
  } catch (error) {
    throw error;
  }
};
