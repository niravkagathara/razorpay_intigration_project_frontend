import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [form, setForm] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    mobileNumber: '',
    amount: 50, // initial amount set by admin
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('https://razorpay-intigration-project-backen.vercel.app/api/payment/create-order', form);

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Free Fire Tournament',
        description: 'Tournament Fee',
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await axios.post('https://razorpay-intigration-project-backen.vercel.app/api/payment/verify', {
            ...form,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert('Payment successful! Check your mail for confirmation.');
            window.location.href = '/thank-you';
          }
        },
        prefill: {
          name: form.leaderName,
          email: form.leaderEmail,
          contact: form.mobileNumber,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Payment Failed!');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">Tournament Registration</h2>

      <input name="teamName" placeholder="Team Name" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="leaderName" placeholder="Leader Name" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="leaderEmail" placeholder="Leader Email" onChange={handleChange} className="border p-2 mb-2 w-full" />
      <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} className="border p-2 mb-2 w-full" />

      <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 w-full">Pay ₹{form.amount}</button>
    </div>
  );
};

export default PaymentForm;
