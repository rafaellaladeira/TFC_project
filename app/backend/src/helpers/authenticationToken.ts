// const jwt = require('jsonwebtoken');
// const errorArray = require('../helpers/error');

// require('dotenv').config();

// const SECRET = process.env.JWT_SECRET;
// const jwtConfig = {
//   expiresIn: '12h',
//   algorithm: 'HS256',
// };

// const authenticationToken = async (req, _res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) next(errorArray[6]);

//   try {
//     const email = await jwt.verify(authorization, SECRET, jwtConfig);
//     req.user = email.email;
//     next();
//   } catch (error) {
//     next(errorArray[7]);
//   }
// };

// export default authenticationToken;
