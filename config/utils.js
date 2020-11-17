const validateError = (err, res) => {
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    let errors = [];
    err.errors.forEach(element => {
      errors.push(element.message);
    });
    return res.status(400).json({ msg: errors });
  } else if (err.code){
    return res.status(err.code).json({ msg: err.message });
  } else
    return res.status(500).json({ msg: "Internal server error" });
}

const successResponse = (response, res) => {
  return res.status(200).json(response);
}

const isJsonParseable = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

module.exports.validateError = validateError;
module.exports.successResponse = successResponse;
module.exports.isJsonParseable = isJsonParseable;
