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
