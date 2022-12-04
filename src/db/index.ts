import {Pool} from 'pg';
import {regDetails} from './interface';
const generateUniqueId = require('generate-unique-id');

const pool = new Pool();

export async function newRegisteration(data: regDetails, mansionType: any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
        mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`

    let rent_status_table = mansionType === "svh_mansion_1" ? `svh1_rent_status` :
        mansionType === "svh_mansion_2" ? `svh2_rent_status` : `svh3_rent_status`

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
        const result = await pool.query(`INSERT INTO ${tablename} 
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
        let rent_status_id_update = pool.query(`INSERT INTO ${rent_status_table} (user_id, monthly_rent_details) VALUES ($1, $2) RETURNING *`, [ id, emp_arr ])
        return result.rows;
    } catch (err) {
        console.log("================>", err)
        throw err;
    }
}

export async function getRegisteredUser(mansionType: any) {
    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
        mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`

    let rent_status_table = mansionType === "svh_mansion_1" ? `svh1_rent_status` :
        mansionType === "svh_mansion_2" ? `svh2_rent_status` : `svh3_rent_status`

    try {
        const result = await pool.query(`select * from ${tablename} INNER JOIN ${rent_status_table} on ${tablename}.id = ${rent_status_table}.user_id`)
        return result.rows;
    } catch (e) {
        console.log("================>", e)
        throw e;
    }
}

export async function updateUser(value: any, mansionType: any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
        mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`

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
        const result = await pool.query(`
            UPDATE ${tablename} set 
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
        return result.rows;
    } catch (err) {
        console.log("=======", err)
    }
}

export async function insertRentStatus(value: any, mansionType:any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
        mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`

    let rent_status_table = mansionType === "svh_mansion_1" ? `svh1_rent_status` :
        mansionType === "svh_mansion_2" ? `svh2_rent_status` : `svh3_rent_status`;

    try {
        const result1 = await pool.query(`UPDATE ${tablename} set rent_status=($1) WHERE id=($2)`, [ value?.status, value?.id ])
        let monthdata = value?.monthly_update
        const result3 = await pool.query(`
            UPDATE ${rent_status_table} set balance_amt=($1), 
            monthly_rent_details = monthly_rent_details || '[{"Month": "${monthdata?.month}", "Status": "Paid"}]'::jsonb 
            WHERE user_id=($2)`,
            [
                value?.balance_amt,
                value?.id
            ]
        )
        return result1.rows;
    } catch (err) {
        console.log("----------", err);
    }
}

export async function setVaccatedUser(value: any, mansionType:any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
    mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`

    try {
        const result = await pool.query(`UPDATE ${tablename} set vaccated=($1) WHERE id=($2)`, [ true, value?.id ])
        return result.rows;
    } catch (err) {
        console.log("==========", err)
    }
}

export async function getRooms_details(mansionType: any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_room_info` :
        mansionType === "svh_mansion_2" ? `svh2_room_info` : `svh3_room_info`;

    try {
        const result = await pool.query(`select * from ${tablename}`)
        return result.rows;
    } catch (err) {
        console.log("======", err);
    }
}

export async function insertingRoom(value: any, mansionType: any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_room_info` :
        mansionType === "svh_mansion_2" ? `svh2_room_info` : `svh3_room_info`;

    try {
        const result = await pool.query(`INSERT INTO ${tablename} (room_no, total_beds) VALUES ($1, $2) RETURNING *`, [ value.room_num, value.total_beds ])
        return result.rows;
    } catch (err) {
        console.log("======", err);

    }
}

export async function roomNoWithId(mansionType: any) {
    let tablename = mansionType === "svh_mansion_1" ? `svh1_register_info` :
        mansionType === "svh_mansion_2" ? `svh2_register_info` : `svh3_register_info`
    try {
        const result = await pool.query(`SELECT id, first_name, last_name, rent_status, joining_date, room_no, vaccated FROM ${tablename}`)
        return result.rows;
    } catch (err) {
        console.log("=========", err);
    }
}

export async function updateBalance(value: any, mansionType:any) {
    
    let rent_status_table = mansionType === "svh_mansion_1" ? `svh1_rent_status` :
        mansionType === "svh_mansion_2" ? `svh2_rent_status` : `svh3_rent_status`;

    try {
        const result = await pool.query(`UPDATE ${rent_status_table} set balance_amt=($1) WHERE user_id=($2)`, [ value?.balance_amt, value?.user_id ])
        return result.rows
    } catch (err) {
        console.log("=======", err);
    }
}

export async function updateExpense(value: any, mansionType:any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_expense_records` :
    mansionType === "svh_mansion_2" ? `svh2_expense_records` : `svh3_expense_records`

    let bills_img;
    if (Array.isArray(value?.uploaded) && value?.uploaded?.length > 0) {
        bills_img = {id_proofs: value?.uploaded}
    } else {
        bills_img = {id_proofs: value?.captureImg}
    }

    try {
        const result = await pool.query(`
        INSERT INTO ${tablename} 
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
    } catch (err) {
        console.log("=========", err);

    }
}

export async function getExpDet(mansionType: any) {

    let tablename = mansionType === "svh_mansion_1" ? `svh1_expense_records` :
        mansionType === "svh_mansion_2" ? `svh2_expense_records` : `svh3_expense_records`

    try {
        const result = await pool.query(`SELECT * from ${tablename}`)
        return result.rows
    } catch (err) {
        console.log("======", err);
    }
}  