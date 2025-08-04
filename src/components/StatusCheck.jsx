import React, { useState } from "react";
import axios from "axios";

const StatusCheck = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: result
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamData, setTeamData] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post('https://razorpay-intigration-project-backen.vercel.app/api/user/check-status', {
        leaderEmail: email
      });

      if (response.data.success) {
        setTeamData(response.data.team);
        setStep(2);
      } else {
        setError("Team not found with this email");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to find team");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post('https://razorpay-intigration-project-backen.vercel.app/api/user/verify-otp', {
        leaderEmail: email,
        otp: otp
      });

      if (response.data.success) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">🔍 Team Status Check</h1>
          <p className="text-gray-300">Check your team registration status and details</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">📧 Enter Team Leader Email</h2>
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Team Leader Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-colors"
                  placeholder="leader@email.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg hover:from-purple-500 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Checking...
                  </span>
                ) : (
                  "Check Team Status"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-green-400 mb-6">🔐 OTP Verification</h2>
            <p className="text-gray-300 mb-6">
              We found a team registered with this email. Please enter the OTP sent to your email.
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">OTP Code *</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-colors text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
 
        {/* Step 3: Team Details */}
        {step === 3 && teamData && (
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">📊 Team Details</h2>
            
            {/* Team Status */}
            <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{teamData.teamName}</h3>
                  <p className="text-gray-400">Team Leader: {teamData.leaderName}</p>
                </div>
                <div className={`text-right ${getStatusColor(teamData.verificationStatus)}`}>
                  <div className="text-2xl mb-1">{getStatusIcon(teamData.verificationStatus)}</div>
                  <div className="font-bold capitalize">{teamData.verificationStatus}</div>
                </div>
              </div>
            </div>

            {/* Team Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 p-4 rounded-lg border border-blue-400/30">
                <h4 className="text-lg font-bold text-blue-400 mb-3">📋 Team Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Team Size:</span>
                    <span className="text-white font-semibold">{teamData.teamSize} Players</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration Date:</span>
                    <span className="text-white font-semibold">
                      {new Date(teamData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration Token:</span>
                    <span className="text-yellow-400 font-mono text-sm">{teamData.registrationToken}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-400/10 to-teal-500/10 p-4 rounded-lg border border-green-400/30">
                <h4 className="text-lg font-bold text-green-400 mb-3">👥 Team Members</h4>
                <div className="space-y-2">
                  {teamData.members.map((member, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-white font-semibold">{member.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({member.gameId})</span>
                        <span className="text-gray-400 text-sm ml-2">({member.email})</span>
                      </div>
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tournament Updates */}
            {teamData.tournamentUpdates && teamData.tournamentUpdates.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 p-4 rounded-lg border border-yellow-400/30 mb-6">
                <h4 className="text-lg font-bold text-yellow-400 mb-3">📢 Tournament Updates</h4>
                <div className="space-y-3">
                  {teamData.tournamentUpdates.map((update, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-white">{update.message}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {new Date(update.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setStep(1);
                  setEmail("");
                  setOtp("");
                  setTeamData(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors"
              >
                Check Another Team
              </button>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-lg mb-2">🔍 Check Status • 📧 Email Verification • 📊 Team Details</p>
          <p className="text-sm">Enter your team leader's email to check registration status</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCheck; 