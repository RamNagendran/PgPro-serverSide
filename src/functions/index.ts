import {generateToken} from "../controller/auth"
import {getRegisteredUser, getRooms_details, insertingRoom, insertRentStatus, newRegisteration, roomNoWithId, setVaccatedUser, updateBalance, updateUser} from "../db"


export const tokenGenerate = async(req:any, res:any) => {
    try {
        let token = generateToken({userId: req.userId})
        res.json(token)
    } catch (err) {
        console.log("==========", err)
    }
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
    try {
        let rentstatus = await insertRentStatus(req.body.value);
        res.json(rentstatus)
    } catch (err) {
        console.log("========", err);
    }
}

export const editedUser = async(req:any, res:any) => {
    try {
        let updateusr = await updateUser(req.body.value)
        res.json(updateusr)
    } catch(err) {
        console.log("==========", err)
    }
}

export const vaccateUser = async(req:any, res:any) => {
    try {
        let vaccate_user = await setVaccatedUser(req.body.value)
        res.json("user Vaccated")
    } catch(err) {
        console.log("==========", err)
    }
}

export const roomInfo = async(req:any, res:any) => {
    try {
        let rooms = await getRooms_details()
        res.json(rooms)
    } catch(err) {
        console.log("=======", err)
    }
}

export const  addRoom = async(req:any, res:any) => {
    try {
        let insert = await insertingRoom(req.body.value)
        res.json("room inserted sucessfully")
    } catch (err) {
        console.log("=======", err);
    }
}

export const getUserRoomNo = async(req:any, res:any) => {
    try {
        const getuserRoom = await roomNoWithId()
        res.json(getuserRoom)
    } catch(err) {
        console.log("========", err);
        
    }
}

export const updateBalance_amt = async(req:any, res:any) => {
    try {
        const editBalance = await updateBalance(req?.body?.value)
        res.json(editBalance)
    } catch(err) {
        console.log("=========", err);
    }
}