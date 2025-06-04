const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "1c191be3-dce3-4e3d-9ead-3705e7695e6a",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

/**
 * Get запрос
 * @param {string} url путь от базового адреса
 * @returns
 */
const getRequest = (uri) => {
  const url = config.baseUrl + uri;
  return fetch(url, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse);
};

export const getUserInfo = async () =>  {
  const urlUserInfo = "/users/me";
  return getRequest(urlUserInfo);
}

export const getInitialCards = () => {
  const uri = `/cards`;
  return getRequest(uri);
}

export const editProfile = (profileData) => {
  const profileDataBody = JSON.stringify(profileData);
  return fetch(
    `${config.baseUrl}/users/me`,
    {
      method: 'PATCH',
      headers: config.headers,
      body: profileDataBody
    }
    
  ).then(handleResponse);
}

export const addCard = (cardData) => {
  const cardDataBody = JSON.stringify(cardData);
  return fetch(
    `${config.baseUrl}/cards`,
    {
      method: 'POST',
      headers: config.headers,
      body: cardDataBody
    }
  ).then(handleResponse);
}

export const deleteCard = (cardID) => {
  return fetch(
    `${config.baseUrl}/cards/${cardID}`,
    {
      method: 'DELETE',
      headers: config.headers,
    }
  ).then(handleResponse);
}

export const setLike = (cardID) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${cardID}`,
    {
      method: 'PUT',
      headers: config.headers,
    }
  ).then(handleResponse);
}

export const unsetLike = (cardID) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${cardID}`,
    {
      method: 'DELETE',
      headers: config.headers,
    }
  ).then(handleResponse);
}

export const updateAvatar = (avatarUrl) => {
  const avatarBody = JSON.stringify({
    avatar: avatarUrl,
  });
  return fetch(
    `${config.baseUrl}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: config.headers,
      body: avatarBody
    }
  ).then(handleResponse);
}