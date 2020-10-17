const validateBody = (validBody) => {
  return (req, res, next) => {
    const body = Object.keys(req.body);
    if (validBody.every((value) => body.includes(value))) {
      return next();
    }
    res.status(403).json({ message: "Invalid body" });
  };
};

const partiallyValidateBody = (validBody) => {
  return (req, res, next) => {
    const body = Object.keys(req.body);
    if (body.every((value) => validBody.includes(value))) {
      return next();
    }
    res.status(403).json({ message: "Invalid body" });
  };
};

const validateSubmitForm = (validBody) => {
  return (req, res, next) => {
    const invalid = req.body.submitForm.some(q => {
      const questionBody = Object.keys(q);
      return !validBody.every((value) => questionBody.includes(value))
    });

    if (!invalid) {
      return next();
    }

    res.status(403).json({ message: "Invalid body" });
  };
}

module.exports = {
  validateBody,
  partiallyValidateBody,
  validateSubmitForm
};
