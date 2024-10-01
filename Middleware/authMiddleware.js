import jwt from 'jsonwebtoken'
import Employee from '../Models/employeeSchema.js'
import dotenv from "dotenv"


dotenv.config()

//Midlleware function to verify token
const authMiddleware = async(req,res,next)=>{
    const token =req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Token not found"})
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.employee = decode
        const employee = await Employee.findById(req.employee._id)
        if(!employee){
            return res.status(401).json({message:"Access Denied Not a Valid User"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Invalid Token, Internal Server Error"})
    }
}
export default authMiddleware