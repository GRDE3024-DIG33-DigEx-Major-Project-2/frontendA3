/**
 * Client-side data storage handlers
 */

/**
 * Gets user data from session storage
 * @returns User data
 */
export const getUser = function () {
  const user = sessionStorage.getItem("user");
  if (user === "undefined" || !user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};


/**
 * Sets user data in session storage
 * @param {*} user The user data to store
 */
export const setUserSession = function (user) {
  sessionStorage.setItem("user", JSON.stringify(user));
};

/**
 * Clears user data from session storage
 */
export const resetUserSession = async function () {
  sessionStorage.setItem("user", null);
  sessionStorage.removeItem("user");
};

/**
 * Gets access token from session storage
 * @returns Access token
 */
export const getAccessToken = function () {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken === "undefined" || !accessToken) {
    return null;
  } else {
    return JSON.parse(accessToken);
  }
};

/**
 * Sets access token in session storage
 * @param {*} accessToken The access token to store
 */
export const setAccessToken = function (accessToken) {
  sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
};

/**
 * Clears access token from session storage
 */
export const resetTokenSession = async function () {
  sessionStorage.setItem("accessToken", null);
  sessionStorage.removeItem("accessToken");
};

/**
 * Gets the organizer's draft events from session storage
 * @returns draft events
 */
export const getDrafts = function () {
  const drafts = sessionStorage.getItem("drafts");
  if (drafts === "undefined" || !drafts) {
    return null;
  } else {
    return JSON.parse(drafts);
  }
};

/**
 * Sets the organizer's draft events in session storage
 * @param {*} drafts The draft events to store
 */
export const setDrafts = function (drafts) {
  sessionStorage.setItem("drafts", JSON.stringify(drafts));
};

/**
 * Clears draft events from session storage
 */
export const resetDrafts = async function () {
  sessionStorage.setItem("drafts", null);
  sessionStorage.removeItem("drafts");
};

/**
 * Add draft event to session storage
 * @param {*} draft The draft event to add
 */
export const addDraft = function (draft) {
  let drafts = getDrafts();
  drafts.push(draft);
  setDrafts(drafts);
};

/**
 * Remove draft event from session storage
 * @param {*} draftNo The index of the draft to remove
 */
export const removeDraft = function (draftNo) {
  let drafts = getDrafts();
  drafts.splice(draftNo, 1);
  setDrafts(drafts);
};