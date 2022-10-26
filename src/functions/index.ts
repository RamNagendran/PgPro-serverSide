import {generateToken} from "../controller/auth"
import {getRegisteredUser, insertRentStatus, newRegisteration} from "../db"


export const tokenGenerate = async(req:any, res:any) => {
    let token = generateToken({userId: req.userId})
    res.json(token)
}

export const registeration = async(req:any, res:any) => {
    try {
        let registered = await newRegisteration(req.body.value)
        res.json(registered);
    } catch(err) {
        console.log("-----------", err);        
    }
}

export const getAllUsers = async(req:any, res:any) => {
    try {
        let users = await getRegisteredUser();
        res.json(users)
    } catch (err) {
        console.log("==========", err);
    }
}

export const updateRentStatus = async(req:any, res:any) => {
    let value = req.body.value
    try {
        let rentstatus = await insertRentStatus(req.body.value);
        res.json(rentstatus)
    } catch (err) {
        console.log("========", err);
        
    }
}