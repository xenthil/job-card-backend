import { Request, Response } from "express"
import { auth, saveUser } from '../services/AuthService'
import { sendResponse } from '../utils/handleResponse'
import { userValidations, loginValidations } from "../validations/UserValidations"
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"

const login = async(request:Request, response:Response)=>{
    try{
        let inputs = request.body;
        const { error, value, errMsg } =loginValidations(inputs)
        if(error){
           return sendResponse(request,response,{
                status:STATUS_CODE.BAD_REQUEST_CODE,
                message:RESPONSE_MESSAGE.VALIDATION_ERROR,
                data:errMsg
           });
        }
        let data = await auth(value,response);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
} 

const register = async(request:Request, response:Response)=>{
    try{
        let inputs = request.body;
        const { error, value, errMsg } =userValidations(inputs)

        if(error){
            return sendResponse(request,response,{
                status:STATUS_CODE.BAD_REQUEST_CODE,
                message:RESPONSE_MESSAGE.VALIDATION_ERROR,
                data:errMsg
            });
        }
        let res = await saveUser(value);
        return response.send(res);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

export { login, register }