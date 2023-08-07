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

// token functions
export const getDrafts = function () {
  const drafts = sessionStorage.getItem("drafts");
  if (drafts === "undefined" || !drafts) {
    return null;
  } else {
    return JSON.parse(drafts);
  }
};

export const setDrafts = function (drafts) {
  sessionStorage.setItem("drafts", JSON.stringify(drafts));
  console.log("HEY", getDrafts())
};

export const resetDrafts = async function () {
  sessionStorage.setItem("drafts", null);
  sessionStorage.removeItem("drafts");
  console.log("drafts removed");
};

export const addDraft = function (draft) {
  let drafts = getDrafts();
  drafts.push(draft);
  console.log("HO", drafts);
  setDrafts(drafts);
}

export const removeDraft = function (draftNo) {
  let drafts = getDrafts();
  drafts.splice(draftNo, 1);
  console.log("REMOVED", drafts);
  setDrafts(drafts);
}