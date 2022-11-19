export interface regDetails {
    personal_info: {
        captureImg: any
        first_Name: string,
        last_Name: string,
        "father_Name": string,
        DOB: string,
        "marital_status": {
            married: boolean,
            unmarried: boolean
        },
        uploadedImg: {
            imgName: string,
            imgUrl: string
        },
        joining_date: string,
        room_no: number
    },
    contact_details: {
        houseNo_streetName: string,
        city_village_name: string,
        pincode: string,
        district: string,
        state: string,
        country: string,
        email_id: string,
        phone_no: number,
        emergency_contactNo: {
            contact_1: {name: 'asdf', relation: 'sadf', number: '9080716503'},
            contact_2: {number: '6455454545'},
            contact_3: {name: 'dfjhvhj', relation: 'jdnvhn', number: '8787878787'}
        }
    },
    professional_info: {},
    documentation: {
        adhar_no: string,
        uploaded: any,
        captureImg: any, 
        signData: string
    }
}

