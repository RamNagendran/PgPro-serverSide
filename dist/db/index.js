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
exports.newRegisteration = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
function newRegisteration(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function* () {
        console.log("------------------------------------------------------", data.documentation.uploaded);
        let address = {
            houseNo_streetName: data.contact_details.houseNo_streetName,
            city_village_name: data.contact_details.city_village_name,
            pincode: data.contact_details.pincode,
            district: data.contact_details.district,
            state: data.contact_details.state,
            country: data.contact_details.country,
        };
        let uploadedId_proofs = { id_proofs: (_a = data === null || data === void 0 ? void 0 : data.documentation) === null || _a === void 0 ? void 0 : _a.uploaded };
        try {
            const result = yield pool.query(`INSERT INTO Personal_info 
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
        photo_obj) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`, [(_b = data === null || data === void 0 ? void 0 : data.personal_info) === null || _b === void 0 ? void 0 : _b.first_Name, (_c = data === null || data === void 0 ? void 0 : data.personal_info) === null || _c === void 0 ? void 0 : _c.last_Name, data === null || data === void 0 ? void 0 : data.personal_info['father_Name'], (_d = data === null || data === void 0 ? void 0 : data.personal_info) === null || _d === void 0 ? void 0 : _d.DOB, data === null || data === void 0 ? void 0 : data.personal_info['marital status'], address, (_e = data === null || data === void 0 ? void 0 : data.contact_details) === null || _e === void 0 ? void 0 : _e.emergency_contactNo, data === null || data === void 0 ? void 0 : data.professional_info, (_f = data === null || data === void 0 ? void 0 : data.documentation) === null || _f === void 0 ? void 0 : _f.adhar_no, uploadedId_proofs, (_g = data === null || data === void 0 ? void 0 : data.documentation) === null || _g === void 0 ? void 0 : _g.signData, (_h = data === null || data === void 0 ? void 0 : data.personal_info) === null || _h === void 0 ? void 0 : _h.joining_date, (_j = data === null || data === void 0 ? void 0 : data.personal_info) === null || _j === void 0 ? void 0 : _j.room_no, (_k = data === null || data === void 0 ? void 0 : data.contact_details) === null || _k === void 0 ? void 0 : _k.phone_no, (_l = data === null || data === void 0 ? void 0 : data.contact_details) === null || _l === void 0 ? void 0 : _l.email_id, (_m = data === null || data === void 0 ? void 0 : data.personal_info) === null || _m === void 0 ? void 0 : _m.uploadedImg
            ]);
            return result.rows;
        }
        catch (err) {
            console.log("============================================================================>", err);
            throw err;
        }
    });
}
exports.newRegisteration = newRegisteration;
