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
        includeSymbols: ['-', "_"],
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
            [id,  data?.personal_info?.first_Name,
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
        return result.rows;
    } catch (err) {
        console.log("================>", err)
        throw err;
    }
}

export async function getRegisteredUser() {
    try {
        const result = await pool.query(`SELECT * FROM register_info`)
        return result.rows;
    } catch (e) {
        console.log("================>", e)
        throw e;
    }
}

export async function insertRentStatus(value:any) {
    try {
        const result = await pool.query(`UPDATE  register_info set rent_status = ($1) WHERE id=($2) `, [value?.status, value?.id])
        return result.rows;
    } catch (err) {
        console.log("----------", err);        
    }
}