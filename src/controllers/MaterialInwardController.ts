import { Request, Response } from "express"
import { create, get, update, remove } from '../services/MaterialInwardService'
import { sendResponse } from '../utils/handleResponse'
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"
import { fileUpload } from "../utils/FileUpload"


const addMaterialInward = async(request:Request, response:Response)=>{
    try{
        let inputs = request.body;
        // let { files} = await fileUpload('materialInward','dcImage',request,response)
        let data = await create(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const getMaterialInward = async(request:Request, response:Response)=>{
    try{
        let query = request.query;
        let data = await get(query);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const updateMaterialInward = async(request:Request, response:Response)=>{
    try{
        let inputs = request.body;
        let data = await update(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const removeMaterialInward = async(request:Request, response:Response)=>{
    try{
        let inputs = request.body;
        let data = await remove(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}





export { addMaterialInward, getMaterialInward,updateMaterialInward, removeMaterialInward  }