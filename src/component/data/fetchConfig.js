export const requestOption = (method, objectBody, token) => {
  let request = {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objectBody),
  };

  return request;
};
