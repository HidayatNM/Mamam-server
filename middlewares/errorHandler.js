function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      statusCode = 400;
      message = err.errors.map((el) => el.message);
      break;
    case "Invalid credentials":
      statusCode = 400;
      message = "Email or password invalid";
      break;
    case "Unauthorized":
      statusCode = 401;
      message = "Please login first";
      break;
    case "FORBIDDEN":
      statusCode = 403;
      message = "Forbidden Error";
      break;
    case "NOT_FOUND":
      statusCode = 404;
      message = "Data not found";
      break;
  }

  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
