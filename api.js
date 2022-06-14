const Donors = require("./models/donors");

async function listDonors(req, res, next) {
    const { group = Donors.BloodGroup.All, offset = 0, limit = 10 } = req.query;

    try {
        res.json(await Donors.list({ group, offset, limit }));
    } catch (err) {
        next(err);
    }
};

async function getDonor(req, res, next) {
    const { id } = req.params;

    try {
        const donor = await Donors.get(id);
        if (!donor) return next();
        res.json(donor);
    } catch (err) {
        next(err);
    }
}

async function createDonor(req, res, next) {
    const donor = await Donors.create(req.body);
    res.json(donor);
}

async function editDonor(req, res, next) {
    const change = req.body;
    const donor = await Donors.edit(req.params.id, change);

    res.json(donor);
}

async function deleteDonor(req, res, next) {
    await Donors.remove(req.params.id);
    res.json({ success: true });
}



module.exports = { listDonors, getDonor, createDonor, editDonor, deleteDonor };