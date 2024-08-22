import { prisma } from '../prisma/lib'
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"

const fetchJobType = async()=>{
    try{
        const job = await prisma.joType.findMany();
        let response = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Job type has been fetched successfully",
            data : { job }
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


export { fetchJobType }