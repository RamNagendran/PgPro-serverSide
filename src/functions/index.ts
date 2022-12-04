import {generateToken} from "../controller/auth"
import {getExpDet, getRegisteredUser, getRooms_details, insertingRoom, insertRentStatus, newRegisteration, roomNoWithId, setVaccatedUser, updateBalance, updateExpense, updateUser} from "../db"


export const tokenGenerate = async(req:any, res:any) => {
    try {
        let token = generateToken({userId: req.userId})
        res.json(token)
    } catch (err) {
        console.log("==========", err)
    }
}

export const registeration = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        let registered = await newRegisteration(req.body.value, mansion)
        res.json(registered);
    } catch(err) {
        console.log("-----------", err);        
    }
}

export const getAllUsers = async(req:any, res:any) => {
    const {mansion} = req?.query
    try {
        let users = await getRegisteredUser(mansion);
        res.json(users)
    } catch (err) {
        console.log("==========", err);
    }
}

export const updateRentStatus = async(req:any, res:any) => {
    const {mansion} = req?.query

    try {
        let rentstatus = await insertRentStatus(req.body.value, mansion);
        res.json(rentstatus)
    } catch (err) {
        console.log("========", err);
    }
}

export const editedUser = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        let updateusr = await updateUser(req.body.value, mansion)
        res.json(updateusr)
    } catch(err) {
        console.log("==========", err)
    }
}

export const vaccateUser = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        let vaccate_user = await setVaccatedUser(req.body.value, mansion)
        res.json("user Vaccated")
    } catch(err) {
        console.log("==========", err)
    }
}

export const roomInfo = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        let rooms = await getRooms_details(mansion)
        res.json(rooms)
    } catch(err) {
        console.log("=======", err)
    }
}

export const  addRoom = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        let insert = await insertingRoom(req.body.value, mansion)
        res.json("room inserted sucessfully")
    } catch (err) {
        console.log("=======", err);
    }
}

export const getUserRoomNo = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        const getuserRoom = await roomNoWithId(mansion)
        res.json(getuserRoom)
    } catch(err) {
        console.log("========", err);
        
    }
}

export const updateBalance_amt = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        const editBalance = await updateBalance(req?.body?.value, mansion)
        res.json(editBalance)
    } catch(err) {
        console.log("=========", err);
    }
}
export const insertExpRecord = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        const insertExp = await updateExpense(req.body.value, mansion)
        res.json(insertExp)
    } catch(err) {
        console.log("=========", err)
    }
}

export const allExpRecords = async(req:any, res:any) => {
    const {mansion} = req.query;
    try {
        const getdata = await getExpDet(mansion)
        res.json(getdata)
    } catch(err) {
        console.log("=======", err);
    }
}