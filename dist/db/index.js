"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertRentStatus = exports.updateUser = exports.getRegisteredUser = exports.newRegisteration = void 0;
const pg_1 = require("pg");
const generateUniqueId = require('generate-unique-id');
const pool = new pg_1.Pool();
function newRegisteration(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        let address = {
            houseNo_streetName: data.contact_details.houseNo_streetName,
            city_village_name: data.contact_details.city_village_name,
            pincode: data.contact_details.pincode,
            district: data.contact_details.district,
            state: data.contact_details.state,
            country: data.contact_details.country,
        };
        let uploadedId_proofs = { id_proofs: (_a = data === null || data === void 0 ? void 0 : data.documentation) === null || _a === void 0 ? void 0 : _a.uploaded };
        const id = generateUniqueId({
            length: 20,
            useLetters: true,
            useNumbers: true,
            includeSymbols: ["_"],
        });
        try {
            const result = yield pool.query(`INSERT INTO register_info 
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
        photo_obj) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`, [id, (_b = data === null || data === void 0 ? void 0 : data.personal_info) === null || _b === void 0 ? void 0 : _b.first_Name, (_c = data === null || data === void 0 ? void 0 : data.personal_info) === null || _c === void 0 ? void 0 : _c.last_Name, data === null || data === void 0 ? void 0 : data.personal_info['father_Name'], (_d = data === null || data === void 0 ? void 0 : data.personal_info) === null || _d === void 0 ? void 0 : _d.DOB, data === null || data === void 0 ? void 0 : data.personal_info['marital_status'], address, (_e = data === null || data === void 0 ? void 0 : data.contact_details) === null || _e === void 0 ? void 0 : _e.emergency_contactNo, data === null || data === void 0 ? void 0 : data.professional_info, (_f = data === null || data === void 0 ? void 0 : data.documentation) === null || _f === void 0 ? void 0 : _f.adhar_no, uploadedId_proofs, (_g = data === null || data === void 0 ? void 0 : data.documentation) === null || _g === void 0 ? void 0 : _g.signData, (_h = data === null || data === void 0 ? void 0 : data.personal_info) === null || _h === void 0 ? void 0 : _h.joining_date, (_j = data === null || data === void 0 ? void 0 : data.personal_info) === null || _j === void 0 ? void 0 : _j.room_no, (_k = data === null || data === void 0 ? void 0 : data.contact_details) === null || _k === void 0 ? void 0 : _k.phone_no, (_l = data === null || data === void 0 ? void 0 : data.contact_details) === null || _l === void 0 ? void 0 : _l.email_id, (_m = data === null || data === void 0 ? void 0 : data.personal_info) === null || _m === void 0 ? void 0 : _m.uploadedImg
            ]);
            let rent_status_id_update = pool.query(`INSERT INTO rent_status (user_id, monthly_rent_details) VALUES ($1, $2) RETURNING *`, [id, []]);
            return result.rows;
        }
        catch (err) {
            console.log("================>", err);
            throw err;
        }
    });
}
exports.newRegisteration = newRegisteration;
function getRegisteredUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`select * from register_info INNER JOIN rent_status on register_info.id = rent_status.user_id`);
            return result.rows;
        }
        catch (e) {
            console.log("================>", e);
            throw e;
        }
    });
}
exports.getRegisteredUser = getRegisteredUser;
function updateUser(value) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return __awaiter(this, void 0, void 0, function* () {
        let data = value === null || value === void 0 ? void 0 : value.data;
        let user_id = value === null || value === void 0 ? void 0 : value.usr_id;
        let address = {
            houseNo_streetName: (_a = data === null || data === void 0 ? void 0 : data.contact_details) === null || _a === void 0 ? void 0 : _a.houseNo_streetName,
            city_village_name: (_b = data === null || data === void 0 ? void 0 : data.contact_details) === null || _b === void 0 ? void 0 : _b.city_village_name,
            pincode: (_c = data === null || data === void 0 ? void 0 : data.contact_details) === null || _c === void 0 ? void 0 : _c.pincode,
            district: (_d = data === null || data === void 0 ? void 0 : data.contact_details) === null || _d === void 0 ? void 0 : _d.district,
            state: (_e = data === null || data === void 0 ? void 0 : data.contact_details) === null || _e === void 0 ? void 0 : _e.state,
            country: (_f = data === null || data === void 0 ? void 0 : data.contact_details) === null || _f === void 0 ? void 0 : _f.country,
        };
        let uploadedId_proofs = { id_proofs: (_g = data === null || data === void 0 ? void 0 : data.documentation) === null || _g === void 0 ? void 0 : _g.uploaded };
        try {
            const result = yield pool.query(`
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
                (_h = data === null || data === void 0 ? void 0 : data.personal_info) === null || _h === void 0 ? void 0 : _h.first_Name,
                (_j = data === null || data === void 0 ? void 0 : data.personal_info) === null || _j === void 0 ? void 0 : _j.last_Name,
                (_k = data === null || data === void 0 ? void 0 : data.personal_info) === null || _k === void 0 ? void 0 : _k.father_Name,
                (_l = data === null || data === void 0 ? void 0 : data.personal_info) === null || _l === void 0 ? void 0 : _l.DOB,
                (_m = data === null || data === void 0 ? void 0 : data.personal_info) === null || _m === void 0 ? void 0 : _m.marital_status,
                address,
                (_o = data === null || data === void 0 ? void 0 : data.contact_details) === null || _o === void 0 ? void 0 : _o.emergency_contactNo,
                data === null || data === void 0 ? void 0 : data.professional_info,
                (_p = data === null || data === void 0 ? void 0 : data.documentation) === null || _p === void 0 ? void 0 : _p.adhar_no,
                uploadedId_proofs,
                (_q = data === null || data === void 0 ? void 0 : data.documentation) === null || _q === void 0 ? void 0 : _q.signData,
                (_r = data === null || data === void 0 ? void 0 : data.personal_info) === null || _r === void 0 ? void 0 : _r.joining_date,
                (_s = data === null || data === void 0 ? void 0 : data.personal_info) === null || _s === void 0 ? void 0 : _s.room_no,
                (_t = data === null || data === void 0 ? void 0 : data.contact_details) === null || _t === void 0 ? void 0 : _t.phone_no,
                (_u = data === null || data === void 0 ? void 0 : data.contact_details) === null || _u === void 0 ? void 0 : _u.email_id,
                (_v = data === null || data === void 0 ? void 0 : data.personal_info) === null || _v === void 0 ? void 0 : _v.uploadedImg,
                user_id
            ]);
            return result.rows;
        }
        catch (err) {
            console.log("=======", err);
        }
    });
}
exports.updateUser = updateUser;
function insertRentStatus(value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result1 = yield pool.query(`UPDATE register_info set rent_status=($1) WHERE id=($2)`, [value === null || value === void 0 ? void 0 : value.status, value === null || value === void 0 ? void 0 : value.id]);
            let monthdata = value === null || value === void 0 ? void 0 : value.monthly_update;
            console.log("month data", monthdata);
            const result3 = yield pool.query(`
            UPDATE rent_status set monthly_rent_details = monthly_rent_details || {"Month": "Nov 2022", "Status": "Paid"}::jsonb WHERE user_id=($1)`, [
                value === null || value === void 0 ? void 0 : value.id
                // value?.balance_amt,
            ]);
            console.log("res", result3);
            return result1.rows;
        }
        catch (err) {
            console.log("----------", err);
        }
    });
}
exports.insertRentStatus = insertRentStatus;
