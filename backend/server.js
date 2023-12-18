const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { CompletePayment } = require('./paymentModule');

const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB (adjust the connection string as needed)
mongoose.connect('mongodb://localhost:27017/yogaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schema for enrolled participants
const participantSchema = new mongoose.Schema({
    name: String,
    age: Number,
    selectedBatch: String,
    enrollmentDate: Date,
});

// Create a model based on the schema
const Participant = mongoose.model('Participant', participantSchema);

app.post('/api/enroll', async (req, res) => {
    try {
        const { name, age, selectedBatch } = req.body;

        // Additional conditions for age, you can adjust the age range as needed
        if (!name || !age || !selectedBatch || age < 18 || age > 65) {
            return res.status(400).json({ error: 'Invalid enrollment details' });
        }

        // Check if the participant is already enrolled for the selected batch in the same month
        const existingParticipant = await Participant.findOne({
            name,
            selectedBatch,
        });

        if (existingParticipant) {
            return res.status(400).json({
                error:
                    'Participant is already enrolled for the selected batch in this month',
            });
        }

        // Calculate monthly fee and process payment
        const monthlyFee = 500; // Assuming the fee is fixed
        const paymentResponse = CompletePayment(name, monthlyFee);

        // Create a new participant entry
        const newParticipant = new Participant({
            name,
            age,
            selectedBatch,
            enrollmentDate: new Date(), // Store the enrollment date for tracking purposes
        });

        // Save the participant details to the database
        await newParticipant.save();

        return res.status(200).json({
            message: 'Enrollment successful',
            paymentResponse,
        });
    } catch (error) {
        console.error('Error handling enrollment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
