import {Pool} from 'pg';
import {regDetails} from './interface';
const generateUniqueId = require('generate-unique-id');

const pool = new Pool();

export async function newRegisteration(data: regDetails) {
    let address = {
        houseNo_streetName: data.contact_details.houseNo_streetName,
        city_village_name: data.contact_details.city_village_name,
        pincode: data.contact_details.pincode,
        district: data.contact_details.district,
        state: data.contact_details.state,
        country: data.contact_details.country,
    }
    let uploadedId_proofs = {id_proofs: data?.documentation?.uploaded}

    const id = generateUniqueId({
        length: 20,
        useLetters: true,
        useNumbers: true,
        includeSymbols: [ "_" ],
    });

    try {
        const result = await pool.query(`INSERT INTO register_info 
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
                data?.personal_info?.uploadedImg
            ]);
            let emp_arr:any = [];
        let rent_status_id_update = pool.query(`INSERT INTO rent_status (user_id, monthly_rent_details) VALUES ($1, $2) RETURNING *`, [id, emp_arr])
        return result.rows;
    } catch (err) {
        console.log("================>", err)
        throw err;
    }
}

export async function getRegisteredUser() {
    try {
        const result = await pool.query(`select * from register_info INNER JOIN rent_status on register_info.id = rent_status.user_id`)
        return result.rows;
    } catch (e) {
        console.log("================>", e)
        throw e;
    }
}

export async function updateUser(value: any) {
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
            UPDATE register_info set 
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

export async function insertRentStatus(value: any) {
    try {
        const result1 = await pool.query(`UPDATE register_info set rent_status=($1) WHERE id=($2)`, [value?.status, value?.id])
        let monthdata = value?.monthly_update
        const result3 = await pool.query(`
            UPDATE rent_status set balance_amt=($1), 
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

export async function setVaccatedUser(value:any) {
    try {
        const result = await pool.query(`UPDATE register_info set vaccated=($1) WHERE id=($2)`, [true, value?.id])
        return result.rows;
    } catch(err) {
        console.log("==========", err)
    }
}

export async function getRooms_details() {
    try {
        const result = await pool.query(`select * from room_info`)
        return result.rows;
    } catch(err) {
        console.log("======", err);
    }
}

export async function insertingRoom(value:any) {
    try {
        const result = await pool.query(`INSERT INTO room_info (room_no, total_beds) VALUES ($1, $2) RETURNING *`, [value.room_num, value.total_beds])
        return result.rows;
    } catch (err) {
        console.log("======", err);
        
    }
}

export async function roomNoWithId() {
    try {
        const result = await pool.query(`SELECT id, first_name, last_name, rent_status, joining_date, room_no FROM register_info`)
        return result.rows;
    } catch(err) {
        console.log("=========", err);
    }
}

export async function updateBalance(value:any) {
    try {
        const result = await pool.query(`UPDATE rent_status set balance_amt=($1) WHERE user_id=($2)`, [value?.balance_amt, value?.user_id])
        return result.rows
    } catch(err) {
        console.log("=======", err);
        
    }
}