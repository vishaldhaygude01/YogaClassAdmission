import React, { useState } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PaymentForm from './PaymentForm';
import Dashboard from './Dashboard';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        selectedBatch: '',
        startDate: '',
    });

    const [errors, setErrors] = useState({});
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPayButton, setShowPayButton] = useState(false);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate age
        if (!formData.age.trim()) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || +formData.age < 18) {
            newErrors.age = 'Age must be a valid number and 18 or older';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Enter a valid email address';
        }

        // Validate password
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        // Validate selectedBatch
        if (!formData.selectedBatch.trim()) {
            newErrors.selectedBatch = 'Select a batch';
        }

        // Validate startDate
        if (!formData.startDate.trim()) {
            newErrors.startDate = 'Start Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Submitting form...');

            if (validateForm()) {
                console.log('Form is valid.');
                setPaymentSuccess(false);
                setShowPayButton(true);


                const response = await axios.post('http://localhost:3001/api/enroll', formData);
                console.log('API Response:', response.data);


            } else {
                console.log('Form validation failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <Router>
            <div>
                <h1>Yoga Class Admission Form</h1>
                <Routes>
                    <Route path="/" element={
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" onChange={handleChange} />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </label>
                            <br />
                            <label>
                                Age:
                                <input type="number" name="age" onChange={handleChange} />
                                {errors.age && <div className="error">{errors.age}</div>}
                            </label>
                            <br />
                            <label>
                                Email:
                                <input type="email" name="email" onChange={handleChange} />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type="password" name="password" onChange={handleChange} />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </label>
                            <br />
                            <label>
                                Select Batch:
                                <select name="selectedBatch" onChange={handleChange}>
                                    <option value="">Select Batch</option>
                                    <option value="6-7AM">6-7AM</option>
                                    <option value="7-8AM">7-8AM</option>
                                    <option value="8-9AM">8-9AM</option>
                                    <option value="5-6PM">5-6PM</option>
                                </select>
                                {errors.selectedBatch && <div className="error">{errors.selectedBatch}</div>}
                            </label>
                            <br />
                            <label>
                                Start Date:
                                <input type="date" name="startDate" onChange={handleChange} />
                                {errors.startDate && <div className="error">{errors.startDate}</div>}
                            </label>
                            <br />
                            <br />
                            {showPayButton && <Link to="/payment"><button type="button">Pay 500 rs</button></Link>}
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    } />
                    <Route path="/payment" element={<PaymentForm onPaymentSuccess={() => setPaymentSuccess(true)} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
                {paymentSuccess && <p>Payment Successful!</p>}
            </div>
        </Router>
    );
}

export default App;
