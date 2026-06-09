import  jwt  from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { userT } from "./auth.schema.js";
import bcrypt from 'bcrypt';

const user_jwt = process.env.USER_JWT;

 class AuthServices {
  //Signup
    async signup({userName,password}:userT){
      //check if userName already exists
      const isUserExist = await prisma.user.findUnique({
        where:{
            userName
        }
      })
      if(isUserExist){
        throw new Error("User already exists")
      }
      //hashing password
      const hashPass = await bcrypt.hash(password,10);
      // create user 
      const user = await prisma.user.create({
        data:{
          userName,
          password:hashPass
        }
      })
      return user ;
    }

    //signin
    async signin({userName,password}:userT){
      //check if user Exists
      const isUserExist = await prisma.user.findUnique({
        where:{
          userName
        }
      })
      if(!isUserExist){
        throw new Error("User do not Exist");
      }
      //validate password
      const isPassValid = await bcrypt.compare(password,isUserExist.password);
      if(!isPassValid){
        throw new Error("Invalid Password")
      }
      //generate jwt token 
      const token = jwt.sign(password,user_jwt!,{expiresIn:"4h"});
      if(!token){
        throw new Error("something went wrong please try later")
      } 
      return {token,userName};
    }
}
export const authServices = new AuthServices();