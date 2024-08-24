import { Request, Response } from "express";
import { sendResponse } from '../utils/handleResponse'
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"
import { 
    fetchJobType,
    addShiftDetails,
    getShiftDetails,
    updateShiftDetails,
    removeShiftDetails,
    addFloorDetails,
    getFloorDetails,
    updateFloorDetails,
    removeFloorDetails,
    getInchargeDetails,
    getAllFloorDetails,
    getAllShiftDetails
 } from '../services/CommonService'

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

const addShift = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await addShiftDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}
const getShift = async (request:Request, response:Response)=>{
    try{
        let inputs = request.query
        let data = await getShiftDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const updateShift = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await updateShiftDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const removeShift = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await removeShiftDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const addFloor = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await addFloorDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const getFloor = async (request:Request, response:Response)=>{
    try{
        let inputs = request.query
        let data = await getFloorDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const updateFloor = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await updateFloorDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const removeFloor = async (request:Request, response:Response)=>{
    try{
        let inputs = request.body
        let data = await removeFloorDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const getIncharge = async (request:Request, response:Response)=>{
    try{
        let inputs = request.query
        let data = await getInchargeDetails(inputs);
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const getAllFloor = async (request:Request, response:Response)=>{
    try{
        let data = await getAllFloorDetails();
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}

const getAllShift  = async (request:Request, response:Response)=>{
    try{
        let data = await getAllShiftDetails();
        return sendResponse(request,response,data);
    }catch(e){
        return sendResponse(request,response,{
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        });
    }
}


export {
        getJobType,
        addShift,
        getShift,
        updateShift,
        removeShift,
        addFloor,
        getFloor,
        updateFloor,
        removeFloor,
        getIncharge,
        getAllFloor,
        getAllShift,
       }