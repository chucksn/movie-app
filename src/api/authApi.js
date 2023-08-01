export const postLogin = async (credentials) => {
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
  return data;
};

export const postSignUp = async (credentials) => {
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
  return data;
};
