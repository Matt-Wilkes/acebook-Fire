const getBody = (request) => {
  const bodyAsString = request.body.toString();
  return JSON.parse(bodyAsString);
};

export default getBody;
