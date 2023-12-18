const mongoose = require('mongoose');

const batchDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    selectedBatch: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
});

const BatchData = mongoose.model('BatchData', batchDataSchema);

module.exports = BatchData;
