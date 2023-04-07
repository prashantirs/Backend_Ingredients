import User from '../models/user.js'

export const getAllUsers = async(req,res)=>{
    const user = await User.create({
        name:'Prashant',
        email:'prashantsrivastava381@gmail.com',     
    })
    if(!user){
        return res.status(400).json({success:false})
    }else{
        return res.status(200).json({success:true,data:user})
    }
};