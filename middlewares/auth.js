import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

export const  auth = (req, res, next) => {
  
  const token =req.cookies.access_token || req.query.access_token || req.headers["access_token"];
  
  if (!token) return next(errorHandler(403,"please login first"));

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return next(errorHandler(403,"something went wrong , try again by login"));
    req.user = decoded;
  } catch (err) {
    return next();
  }
  next();
};

export const isAdmin = (req, res, next) => {

    console.log(req.user.isAdmin)

    if(req.user.isAdmin != true) {
      return next(errorHandler(401,"you can not access to this resources"))
    } 

    next();
}

