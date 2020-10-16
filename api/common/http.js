const bodyValidator = (body, validBody) => {
  return validBody.every((value) => body.includes(value));
};

const partialBodyValidator = (body, validBody) => {
  return body.every((value) => validBody.includes(value));
};

module.exports = {
  bodyValidator,
  partialBodyValidator,
};
