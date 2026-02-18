import jwt from "jsonwebtoken";

export default function authenticateUser(req,res,next){
    const header = req.header("Authorization")

    if(header != null){
        const token = header.repalce("Bearer","")

        jwt.verify(token, "I-CoMputers10Batch",
          (error,decoded)=>{
            if(decoded == null){
                res.json(
                    {
                        message : "Invalid Token please Login Again"
                    }
                )
            }else{
                req.user = decoded
                next()
            }
          }  
        )
    }else
        next()
}