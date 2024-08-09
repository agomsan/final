module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoleName = req.tokenData.userRoleName;

    

    if (allowedRoles.includes(userRoleName)) {
      return next();
    }

    res.status(403).json({
      success: true,
      message: "Unauthorized access",
    });
  };
};
