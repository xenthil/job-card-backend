import { prisma } from '../prisma/lib'
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { STATUS_CODE, RESPONSE_MESSAGE } from "../utils/constants/ResponseStatus"

const auth = async(data:any)=>{
   try{
        const user:any = await prisma.user.findFirst({
            where : {
                email :data.email
            }
        })
        if(!user){
            let res = {
                status : STATUS_CODE.UNAUTHORIZED_CODE,
                message : "Email does not exist"
            }
            return res
        }

        const match: boolean = await bcrypt.compare(data.password, user.password);
        if(!match){
            let res = {
                status : STATUS_CODE.UNAUTHORIZED_CODE,
                message : "Password is incorrect"
            }
            return res
        }

        let secret_key:string = process.env.SECRET_KEY || 'job_secret'
        const token = jwt.sign({user_id : user.id.toString()},secret_key,{ expiresIn: '1h' });

        await prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                token
            }
        })

        let res = {
            status : STATUS_CODE.SUCCESS_CODE,
            message : "Authenticated successfully",
            token
        }
        return res

   }catch(e){
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
   }
    
}

const saveUser = async(data:any)=>{
    try{
        data.password = await bcrypt.hash(data.password,8);
        data.status =  true;
        let user = await prisma.user.create({
            data:{
                ...data
            }, 
            select : {
                email :true,
                firstName : true,
                lastName : true
            }
        })
        let response = {
            status : STATUS_CODE.CREATED_CODE,
            message : "User Added successfully",
            data : user
        }
        return response
    }catch(errors){
        if (errors instanceof Prisma.PrismaClientKnownRequestError) {
            let error = {
                status:STATUS_CODE.BAD_REQUEST_CODE,
                message:RESPONSE_MESSAGE.VALIDATION_ERROR,
                data:["Email already exist"]
            }
            return error;
        }
        let error = {
            status : STATUS_CODE.SERVER_ERROR_CODE,
            message : RESPONSE_MESSAGE.INTERNAL_ERROR
        }
        return error;
    }
}


export { auth, saveUser };