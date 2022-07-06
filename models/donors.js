const fs = require("fs").promises;  
const path = require("path");

const cuid = require("cuid");

const db = require("../db");


// db schema
const Donor = db.model(
    "Donor", {
        _id: { 
            type: String, 
            default: cuid 
        },
        name: { 
            type: String, 
            required: true 
        },
        bloodGroup: { 
            type: String, 
            index: true, 
            required: true, 
            validate: {
                validator: isBloodGroup,
                message: props => `${props.value} is not a valid blood group`
            } 
        },
        age: { 
            type: Number, 
            required: true 
        },
        // location and address needed,
    }
);



const BloodGroup = {
    Opos: "Opos",
    Oneg: "Oneg",
    Apos: "Apos",
    Aneg: "Aneg",
    Bpos: "Bpos",
    Bneg: "Bneg",
    ABpos: "ABpos",
    ABneg: "ABneg",
    All: "all"
};
const AllAgeGroup = -1;



async function create(fields) {
    const newDonor = await new Donor(fields).save();
    return newDonor;
}


async function list(opts = {}) {
    const { group = BloodGroup.All, offset = 0, limit = 10 } = opts;

    const query = group == BloodGroup.All ? {} : { bloodGroup: group };
    const donors = await Donor.find(query).sort({ _id: 1}).skip(offset).limit(limit);
    return donors;
}

async function get(id) {
    const donor = await Donor.findById(id);
    return donor;
}

async function edit(id, change) {
    const donor = await get({ _id: id });
    Object.keys(change).forEach((key) => {
        donor[key] = change[key];
    });
    await donor.save();
    return donor;
}

async function remove(id) {
    await Donor.deleteOne({ _id: id });
}



// validation function for mongoose
function isBloodGroup(group) {
    return group == BloodGroup.Opos ||
        group == BloodGroup.Oneg || 
        group == BloodGroup.Apos || 
        group == BloodGroup.Aneg || 
        group == BloodGroup.Bpos ||
        group == BloodGroup.Bneg ||
        group == BloodGroup.ABpos ||
        group == BloodGroup.ABneg; 
}


module.exports = {
    create,
    list,
    BloodGroup,
    get,
    edit,
    remove
};