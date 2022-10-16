import {Pool} from 'pg';
import {regDetails} from './interface';

const pool = new Pool();


export async function newRegisteration(data: regDetails) {

    console.log("------------------------------------------------------", data.personal_info[ 'marital status' ]);


    let address = {
        houseNo_streetName: data.contact_details.houseNo_streetName,
        city_village_name: data.contact_details.city_village_name,
        pincode: data.contact_details.pincode,
        district: data.contact_details.district,
        state: data.contact_details.state,
        country: data.contact_details.country,
    }
    let uploadedId_proofs = {id_proofs: data?.documentation?.uploaded}



    try {
        const result = await pool.query(`INSERT INTO Personal_info 
        (first_name, 
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
        photo_obj) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [ data?.personal_info?.first_Name,
            data?.personal_info?.last_Name,
            data?.personal_info[ 'father_Name' ],
            data?.personal_info?.DOB,
            data?.personal_info[ 'marital status' ],
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
        console.log("============================================================================>", err)
        throw err;
    }
}