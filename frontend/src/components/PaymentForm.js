import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess }) => {
    const [paymentData, setPaymentData] = useState({
        fullName: '',
        email: '',
        creditCardNumber: '',
    });

    const handlePayment = () => {

        onPaymentSuccess();
    };

    return (
        <div>
            <h2>Payment Form</h2>
            <form>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={paymentData.fullName}
                        onChange={(e) => setPaymentData({ ...paymentData, fullName: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Credit Card Number:
                    <input
                        type="text"
                        name="creditCardNumber"
                        value={paymentData.creditCardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, creditCardNumber: e.target.value })}
                    />
                </label>
                <br />
                <button type="button" onClick={handlePayment}>
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
