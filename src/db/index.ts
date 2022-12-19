import {Pool} from 'pg';
import {regDetails} from './interface';
const generateUniqueId = require('generate-unique-id');

const pool = new Pool;

export async function newRegisteration(data: regDetails, mansionNum: any) {

    const client = await pool.connect()

    let address = {
        houseNo_streetName: data.contact_details.houseNo_streetName,
        city_village_name: data.contact_details.city_village_name,
        pincode: data.contact_details.pincode,
        district: data.contact_details.district,
        state: data.contact_details.state,
        country: data.contact_details.country,
    }

    let photo_id;

    if (Object.keys(data?.personal_info?.uploadedImg).length > 0 &&
        data?.personal_info?.uploadedImg.imgUrl !== null && data?.personal_info?.uploadedImg.imgName !== null) {
        photo_id = data?.personal_info?.uploadedImg
    } else {
        photo_id = data?.personal_info?.captureImg
    }

    let uploadedId_proofs;
    if (Array.isArray(data?.documentation?.uploaded) && data?.documentation?.uploaded?.length > 0) {
        uploadedId_proofs = {id_proofs: data?.documentation?.uploaded}
    } else {
        uploadedId_proofs = {id_proofs: data?.documentation?.captureImg}
    }

    const id = generateUniqueId({
        length: 20,
        useLetters: true,
        useNumbers: true,
        includeSymbols: [ "_" ],
    });

    try {
        const result = await client.query(`INSERT INTO hostel${parseInt(mansionNum)}_register_info 
        (id, first_name, 
        last_name, 
        father_name, 
        dob, 
        marital_status, 
        address, 
        emergency_contact, 
        status_org_details, 
        adhar_no, 
        id_proofs, 
        signature, 
        joining_date, 
        room_no, 
        phone_no, 
        email_id, 
        photo_obj) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
            [ id, data?.personal_info?.first_Name,
                data?.personal_info?.last_Name,
                data?.personal_info[ 'father_Name' ],
                data?.personal_info?.DOB,
                data?.personal_info[ 'marital_status' ],
                address,
                data?.contact_details?.emergency_contactNo,
                data?.professional_info,
                data?.documentation?.adhar_no,
                uploadedId_proofs,
                data?.documentation?.signData,
                data?.personal_info?.joining_date,
                data?.personal_info?.room_no,
                data?.contact_details?.phone_no,
                data?.contact_details?.email_id,
                photo_id
            ]);
        let emp_arr: any = [];
        let rent_status_id_update = client.query(`INSERT INTO hostel${parseInt(mansionNum)}_rent_status (user_id, monthly_rent_details, advance_amt) VALUES ($1, $2, $3) RETURNING *`, [ id, emp_arr, data?.payment_info?.advance_amount ])
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("================>", err)
        throw err;
    }
}

export async function getRegisteredUser(mansionNum: any) {
    
    const client = await pool.connect();

    try {
        const result = await client.query(`select * from hostel${parseInt(mansionNum)}_register_info INNER JOIN hostel${parseInt(mansionNum)}_rent_status on hostel${parseInt(mansionNum)}_register_info.id = hostel${parseInt(mansionNum)}_rent_status.user_id`)
        await client.release();
        return result.rows;
    } catch (e) {
        console.log("================>", e)
        throw e;
    }
}

export async function updateUser(value: any, mansionNum: any) {
    const client = await pool.connect()

    let data = value?.data
    let user_id = value?.usr_id
    let address = {
        houseNo_streetName: data?.contact_details?.houseNo_streetName,
        city_village_name: data?.contact_details?.city_village_name,
        pincode: data?.contact_details?.pincode,
        district: data?.contact_details?.district,
        state: data?.contact_details?.state,
        country: data?.contact_details?.country,
    }
    let uploadedId_proofs = {id_proofs: data?.documentation?.uploaded}
    try {
        const result = await client.query(`
            UPDATE hostel${parseInt(mansionNum)}_register_info set 
                first_name=($1), 
                last_name=($2), 
                father_name=($3), 
                dob=($4), 
                marital_status=($5), 
                address=($6), 
                emergency_contact=($7), 
                status_org_details=($8), 
                adhar_no=($9), 
                id_proofs=($10), 
                signature=($11), 
                joining_date=($12), 
                room_no=($13), 
                phone_no=($14), 
                email_id=($15), 
                photo_obj=($16) 
                WHERE id=($17)
            `, [
            data?.personal_info?.first_Name,
            data?.personal_info?.last_Name,
            data?.personal_info?.father_Name,
            data?.personal_info?.DOB,
            data?.personal_info?.marital_status,
            address,
            data?.contact_details?.emergency_contactNo,
            data?.professional_info,
            data?.documentation?.adhar_no,
            uploadedId_proofs,
            data?.documentation?.signData,
            data?.personal_info?.joining_date,
            data?.personal_info?.room_no,
            data?.contact_details?.phone_no,
            data?.contact_details?.email_id,
            data?.personal_info?.uploadedImg,
            user_id
        ]
        )
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("=======", err)
    }
}

export async function insertRentStatus(value: any, mansionNum:any) {

    const client = await pool.connect()

    try {
        const result1 = await client.query(`UPDATE hostel${parseInt(mansionNum)}_register_info set rent_status=($1) WHERE id=($2)`, [ value?.status, value?.id ])
        let monthdata = value?.monthly_update
        const result3 = await client.query(`
            UPDATE hostel${parseInt(mansionNum)}_rent_status set balance_amt=($1), 
            monthly_rent_details = monthly_rent_details || '[{"Month": "${monthdata?.month}", "rent_amount":${monthdata.rent_amount}}]'::jsonb 
            WHERE user_id=($2)`,
            [
                value?.balance_amt,
                value?.id
            ]
        )
        await client.release();
        return result1.rows;
    } catch (err) {
        console.log("----------", err);
    }
}

export async function setVaccatedUser(value: any, mansionNum:any) {

    const client = await pool.connect()

    try {
        const result = await client.query(`UPDATE hostel${parseInt(mansionNum)}_register_info set vaccated=($1) WHERE id=($2)`, [ true, value?.id ])
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("==========", err)
    }
}

export async function getRooms_details(mansionNum: any) {

    const client = await pool.connect()

    try {
        const result = await client.query(`select * from hostel${parseInt(mansionNum)}_room_info`)
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("======", err);
    }
}

export async function insertingRoom(value: any, mansionNum: any) {

    const client = await pool.connect()

    try {
        const result = await client.query(`INSERT INTO hostel${parseInt(mansionNum)}_room_info (room_no, total_beds) VALUES ($1, $2) RETURNING *`, [ value.room_num, value.total_beds ])
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("======", err);

    }
}

export async function roomNoWithId(mansionNum: any) {

    const client = await pool.connect()

    try {
        const result = await client.query(`SELECT id, first_name, last_name, rent_status, joining_date, room_no, vaccated FROM hostel${parseInt(mansionNum)}_register_info`)
        await client.release();
        return result.rows;
    } catch (err) {
        console.log("=========", err);
    }
}

export async function updateBalance(value: any, mansionNum:any) {

    const client = await pool.connect()
    
    try {
        const result = await client.query(`UPDATE hostel${parseInt(mansionNum)}_rent_status set balance_amt=($1) WHERE user_id=($2)`, [ value?.balance_amt, value?.user_id ])
        await client.release();
        return result.rows
    } catch (err) {
        console.log("=======", err);
    }
}

export async function updateExpense(value: any, mansionNum:any) {

    const client = await pool.connect()

    let bills_img;
    if (Array.isArray(value?.uploaded) && value?.uploaded?.length > 0) {
        bills_img = {id_proofs: value?.uploaded}
    } else {
        bills_img = {id_proofs: value?.captureImg}
    }

    try {
        const result = await client.query(`
        INSERT INTO hostel${parseInt(mansionNum)}_expense_records 
        (
            date, 
            category,
            notes, 
            bills_img, 
            amount
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [
                value.date,
                value.category,
                value.notes,
                bills_img,
                value.amount
            ])
        await client.release();
    } catch (err) {
        console.log("=========", err);

    }
}

export async function getExpDet(mansionNum: any) {

    const client = await pool.connect()

    try {
        const result = await client.query(`SELECT * from hostel${parseInt(mansionNum)}_expense_records`)
        await client.release();
        return result.rows
    } catch (err) {
        console.log("======", err);
    }
}  