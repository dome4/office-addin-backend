const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema(
    {
        // ToDo autoincrement
        id: { type: Number, required: true, unique: true },
        name: String,
        content: String
    }
);

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;