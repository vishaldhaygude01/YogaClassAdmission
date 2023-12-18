const BatchData = require('../models/BatchData');

exports.getBatchData = async (req, res) => {
    try {
        const batchData = await BatchData.find();

        res.status(200).json(batchData);
    } catch (error) {
        console.error('Error in getBatchData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addBatchData = async (req, res) => {
    try {
        const { name, age, selectedBatch, startDate } = req.body;
        const newBatchEntry = new BatchData({
            name,
            age,
            selectedBatch,
            startDate,
        });
        await newBatchEntry.save();

        res.status(201).json({ message: 'Batch entry added successfully' });
    } catch (error) {
        console.error('Error in addBatchData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getBatchDataByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userBatchData = await BatchData.find({ userId });

        res.status(200).json(userBatchData);
    } catch (error) {
        console.error('Error in getBatchDataByUser:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
