import { Request, Response } from "express"
import { auth, saveUser } from '../services/AuthService'
import { sendResponse } from '../utils/handleResponse'


const login = async(request:Request, response:Response)=>{
    try{
        let data = await auth(request.body);
        sendResponse(request,response,data);
    }catch(e){
        sendResponse(request,response,{
            status : 500,
            message : "Internal server error"
        });
    }
} 

const register = async(request:Request, response:Response)=>{
    try{
        let res = await saveUser(request.body);
        return response.send(res);
    }catch(e){
        sendResponse(request,response,{
            status : 500,
            message : "Internal server error"
        });
    }
}



export { login, register }