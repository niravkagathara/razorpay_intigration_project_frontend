import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({});

  const [form, setForm] = useState({
    leaderName: "",
    leaderEmail: "",
    mobile: "",
    teamName: "",
    teamSize: "",
    members: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    const members = Array.from({ length: size }, (_, index) => ({
      name: "",
      gameId: "",
      email: ""
    }));
    setForm(prev => ({
      ...prev,
      teamSize: size,
      members
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...form.members];
    updatedMembers[index][field] = value;
    setForm(prev => ({ ...prev, members: updatedMembers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Register the team
      const registrationRes = await axios.post('https://razorpay-intigration-project-backen.vercel.app/api/team', {
        leaderName: form.leaderName,
        leaderEmail: form.leaderEmail,
        mobile: form.mobile,
        teamName: form.teamName,
        teamSize: form.teamSize,
        members: form.members
      });

     
      if (registrationRes.data.success) {
        // 2. Prepare payment form data
        const paymentData = {
          teamName: form.teamName,
          leaderName: form.leaderName,
          leaderEmail: form.leaderEmail,
          mobileNumber: form.mobile,
          amount: 100,
        };

        // 3. Create payment order
        const paymentRes = await axios.post("https://razorpay-intigration-project-backen.vercel.app/api/payment/create-order", paymentData);

        const options = {
          key: paymentRes.data.key,
          amount: paymentRes.data.order.amount,
          currency: "INR",
          name: "Free Fire Tournament",
          description: "Tournament Fee",
          order_id: paymentRes.data.order.id,
          handler: async function (response) {
            // 4. Verify payment
            const verifyRes = await axios.post("https://razorpay-intigration-project-backen.vercel.app/api/payment/verify", {
              ...paymentData,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              setSuccess("Payment successful! Check your email for confirmation.");

              alert("Payment successful! Check your mail for confirmation.");
              // 5. Redirect to Thank You page
              // window.location.href = "";
            } else {
              alert("Payment verification failed!");
            }
          },
          prefill: {
            name: paymentData.leaderName,
            email: paymentData.leaderEmail,
            contact: paymentData.mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        // Reset form after opening payment
        setForm({
          leaderName: "",
          leaderEmail: "",
          mobile: "",
          teamName: "",
          teamSize: 1,
          members: [],
        });
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">🔥 Team Registration 🔥</h1>
          <p className="text-gray-300">Join the ultimate Free Fire tournament!</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Leader Information */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 p-6 rounded-lg border border-yellow-400/30">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">👑 Team Leader</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Leader Name *</label>
                  <input
                    type="text"
                    name="leaderName"
                    value={form.leaderName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                    placeholder="Enter leader name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="leaderEmail"
                    value={form.leaderEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                    placeholder="leader@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Team Name *</label>
                  <input
                    type="text"
                    name="teamName"
                    value={form.teamName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                    placeholder="Enter team name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Size Selection */}
            <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 p-6 rounded-lg border border-blue-400/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">👥 Team Size</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Select Team Size *</label>
                <select
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleTeamSizeChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors"
                > <option value="">Select Team Size</option>
                  <option value={1}>1 Player (Solo)</option>
                  <option value={2}>2 Players (Duo)</option>
                  <option value={3}>3 Players (Trio)</option>
                  <option value={4}>4 Players (Squad)</option>
                </select>
              </div>
            </div>

            {/* Team Members */}
            {form.members.map((member, index) => (
              <div key={index} className="bg-gradient-to-r from-green-400/10 to-teal-500/10 p-6 rounded-lg border border-green-400/30">
                <h3 className="text-2xl font-bold text-green-400 mb-4">🎮 Member {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-colors"
                      placeholder="Member name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Game ID *</label>
                    <input
                      type="text"
                      value={member.gameId}
                      onChange={(e) => handleMemberChange(index, 'gameId', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-colors"
                      placeholder="Free Fire Game ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-colors"
                      placeholder="member@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Registration Information */}
            <div className="bg-gradient-to-r from-green-400/10 to-blue-500/10 p-6 rounded-lg border border-green-400/30">
              <h3 className="text-2xl font-bold text-green-400 mb-4">📝 Registration Details</h3>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-gray-300">Registration Type</p>
                    <p className="text-sm text-gray-400">₹100</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400"> ₹100</p>
                  <p className="text-sm text-gray-400">Payment required</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register & Pay"}
            </button>

          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-lg mb-2">📧 Email Confirmation • ✅ Team Verification • 🆓 ₹100 Payment required</p>
          <p className="text-sm">Your team will be verified by admin after registration</p>
        </div>
        <footer className="bg-gray-900 text-gray-400 py-10 px-4 mt-10">
  <div className="max-w-5xl mx-auto text-center">
    <p className="text-lg font-medium mb-4">
      🧑‍💼 Tournament Portal 2025 • Powered by Tournament Management System
    </p>

    <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
      <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
        Terms & Conditions
      </a>
      <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
        Privacy Policy
      </a>
      <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/refund" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
        Refund Policy
      </a>
      <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/shipping" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
        Shipping Policy
      </a>
      <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/contact_us" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
        Contact Us
      </a>
    </div>

    <p className="text-xs">
      © {new Date().getFullYear()} Interview Portal. All rights reserved.
    </p>
  </div>
</footer>
      </div>
    </div>
  );
};

export default RegistrationForm;
