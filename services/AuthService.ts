import { prisma } from '../prisma/lib'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = async(data:any)=>{
    
    const user:any = await prisma.user.findFirst({
        where : {
            email :data.email
        }
    })
    if(!user){
        let res = {
            status : 401,
            message : "Email does not exist"
        }
        return res
    }

    const match: boolean = await bcrypt.compare(data.password, user.password);
    if(!match){
        let res = {
            status : 401,
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
        status : 200,
        message : "Authenticated successfully",
        token
    }
    return res
}

const saveUser = async(data:any)=>{
    try{

        data.password = await bcrypt.hash(data.password,8);
        data.status =  data.status === '1';
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
            status : 200,
            message : "User Added successfully",
            data : user
        }
        return response
    }catch(e){
        let error = {
            status : 500,
            message : "Internel server error"
        }
        return error;
    }
}


export { auth, saveUser };