import { prisma } from '../prisma/lib'
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"

const fetchJobType = async()=>{
    try{
        const job = await prisma.jobType.findMany();
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Job type has been fetched successfully",
            data : {job}
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const addShiftDetails = async(inputs:any)=>{
    try{
        await prisma.shift.create({
            data : inputs
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Shift has been Added successfully",
            data : []
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const getShiftDetails = async(query:any)=>{
    try{
        const page = query?.page ? parseInt(query?.page) : 1;
        const limit = query?.limit ? parseInt(query?.limit) : 10;
        const shift = await prisma.shift.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Shift has been fetched successfully",
            data : shift
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const getAllShiftDetails = async()=>{
    try{
       
        const shift = await prisma.shift.findMany();
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Shift has been fetched successfully",
            data : shift
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const updateShiftDetails = async(inputs:any)=>{
    try{
        const shift = await prisma.shift.update({
            where : {
                id : parseInt(inputs.id)
            },
            data : {
                name : inputs.name
            }
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Shift has been updated successfully",
            data : shift
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const removeShiftDetails = async(inputs:any)=>{
    try{
        await prisma.shift.delete({
            where : {
                id : parseInt(inputs.id)
            }
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Shift has been removed successfully",
            data : []
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const addFloorDetails = async(inputs:any)=>{
    try{
        await prisma.floor.create({
            data : inputs
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been added successfully",
            data : []
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const getFloorDetails = async(query:any)=>{
    try{
        const page = query?.page ? parseInt(query?.page) : 1;
        const limit = query?.limit ? parseInt(query?.limit) : 10;
        const floor = await prisma.floor.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been fetched successfully",
            data : floor
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const getAllFloorDetails = async()=>{
    try{

        const floor = await prisma.floor.findMany();
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been fetched successfully",
            data : floor
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const updateFloorDetails = async(inputs:any)=>{
    try{
        const floor = await prisma.floor.update({
            where : {
                id : parseInt(inputs.id)
            },
            data : {
                name : inputs.name
            }
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been updated successfully",
            data : floor
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const removeFloorDetails = async(inputs:any)=>{
    try{
        await prisma.floor.delete({
            where : {
                id : parseInt(inputs.id)
            }
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been removed successfully",
            data : []
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}

const getInchargeDetails = async(query:any)=>{
    try{
       let shift = query?.shift ? query?.shift : ""
       let where:any = {}
       if(shift){
        where.shiftId = parseInt(shift)
       }
        const incharge = await prisma.user.findMany({
            where : {
                role : "2",
                ...where
            }
        });
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Floor has been fetched successfully",
            data : incharge
        }
        return response
    }catch(errors){
        console.log('err',errors)
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}


export { 
        fetchJobType,
        addShiftDetails,
        getShiftDetails,
        updateShiftDetails,
        removeShiftDetails,
        addFloorDetails,
        getFloorDetails,
        updateFloorDetails,
        removeFloorDetails,
        getAllShiftDetails,
        getAllFloorDetails,
        getInchargeDetails
     }