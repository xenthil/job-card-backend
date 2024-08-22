import { Request, Response } from "express";
import { sendResponse } from '../utils/handleResponse'
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"
import { fetchJobType } from '../services/CommonService'

const getJobType = async (request:Request, response:Response)=>{
    try{
        let data = await fetchJobType();
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

export { getJobType }