// token functions
export const getAccessToken = function () {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken === "undefined" || !accessToken) {
    return null;
  } else {
    return JSON.parse(accessToken);
  }
};

export const setAccessToken = function (accessToken) {
  sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
};

export const resetTokenSession = async function () {
  sessionStorage.setItem("accessToken", null);
  sessionStorage.removeItem("accessToken");
  console.log("accessToken removed");
};

// user session functions
export const getUser = function () {
  const user = sessionStorage.getItem("user");
  if (user === "undefined" || !user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export const setUserSession = function (user) {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const resetUserSession = async function () {
  sessionStorage.setItem("user", null);
  sessionStorage.removeItem("user");
  console.log("user removed");
};
