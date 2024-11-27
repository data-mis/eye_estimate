export const requestOption = (method, objectBody, token) => {
  let request = {
    method: method,
    headers: {
      "content-type": "application/json",
      // "Cache-Control": "no-cache,no-store,must-revalidate",
      // Pragma: "no-cache",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objectBody),
  };

  return request;
};
