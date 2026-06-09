import { Request, Response } from "express";
import { userSchema } from "./auth.schema.js";
import { authServices } from "./auth.services.js";

class AuthController {
    signup = async(req:Request,res:Response)=>{
        try {
            //parse the user inputs 
            const authInput = userSchema.safeParse(req.body);
            if(!authInput.success){
              return res.status(400).json({
              message: "Invalid Input",
              error: authInput.error.issues,
            });
            }
            //pass data to teh auth services
             const userData = authServices.signup(authInput.data);
             return res.status(200).json({
             message: "User Registered successfuly",
             data: userData,
            });
        } catch (error) {
            return res.status(500).json({
                message: error instanceof Error ? error.message : "unkown error occured", 
            })
        }
    }
    signIn = async (req:Request,res:Response) => {
        try{
        //parse the input data
        const authInput = userSchema.safeParse(req.body);

        if(!authInput.success){
            return res.status(400).json({
                message:"Invalid Input",
                error:authInput.error
            })
        }
        //asign data to userServices 
        const userData = authServices.signin(authInput.data);
        return res.status(200).json({
             message: "User Login successfuly",
             data: userData,
            });        
        }catch(error){
            return res.status(500).json({
                message : error instanceof Error ? error.message : "Unkown error occured"
            });
        }
    }
}
export const authController = new AuthController();