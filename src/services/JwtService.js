const jwt=require("jsonwebtoken")

const SECRET= "4b224ac3f59de2716d915a34991de37e"

const createToken=(payload)=>{
    return jwt.sign(payload, SECRET, {expiresIn:"1h"})
}

const verifyToken=(token)=>{
    try {
        return jwt.verify(token, SECRET)
        
    } catch (error) {
        throw{
            ok:false,
            info:error
        }
    }
}

module.exports={createToken,verifyToken}