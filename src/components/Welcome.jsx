// src/components/Welcome.jsx
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const tournamentDetails = {
    name: "Free Fire Pro Championship 2025",
    date: "15th December 2025",
    time: "2:00 PM IST",
    venue: "Online Tournament (Remote)",
    address: "Play from anywhere in India",
    poolPrize: "₹50,000",
    entryFee: "100",
    maxTeams: 100,
    registrationDeadline: "10th December 2025",
    tournamentFormat: "Squad (4 Players)",
    gameMode: "Classic Squad",
    map: "Bermuda",
    rules: [
      "No teaming with other teams",
      "No use of hacks or cheats",
      "Stable internet connection required",
      "All team members must be present",
      "Screenshots may be required for verification"
    ],
    prizes: [
      { position: "1st", prize: "₹25,000" },
      { position: "2nd", prize: "₹15,000" },
      { position: "3rd", prize: "₹10,000" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 animate-pulse"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400/10 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-400/10 rounded-full animate-pulse"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-16">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              🔥 FREE FIRE 🔥
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
              PRO CHAMPIONSHIP
            </h2>
            <p className="text-2xl text-gray-300 mt-4">2025 Edition</p>
          </div>

          {/* Tournament Badge */}
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-xl mb-8 animate-bounce">
            🏆 ₹50,000 Prize Pool 🏆
          </div>
        </div>

        {/* Tournament Details Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Tournament Info */}
            <div className="space-y-8">
              
              {/* Basic Details */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">�� Tournament Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-gray-300">Date & Time</p>
                      <p className="text-white font-semibold">{tournamentDetails.date} at {tournamentDetails.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-gray-300">Venue</p>
                      <p className="text-white font-semibold">{tournamentDetails.venue}</p>
                      <p className="text-gray-400 text-sm">{tournamentDetails.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-gray-300">Format</p>
                      <p className="text-white font-semibold">{tournamentDetails.tournamentFormat}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <p className="text-gray-300">Game Mode</p>
                      <p className="text-white font-semibold">{tournamentDetails.gameMode} - {tournamentDetails.map}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prize Pool */}
              <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">💰 Prize Pool</h3>
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-4xl font-bold text-yellow-400">{tournamentDetails.poolPrize}</p>
                    <p className="text-gray-400">Total Prize Pool</p>
                  </div>
                  <div className="space-y-3">
                    {tournamentDetails.prizes.map((prize, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                          </span>
                          <span className="text-white font-semibold">{prize.position} Place</span>
                        </div>
                        <span className="text-yellow-400 font-bold text-xl">{prize.prize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Registration Info */}
              <div className="bg-gradient-to-br from-green-400/10 to-blue-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-green-400 mb-6">📝 Registration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Entry Fee</span>
                    <span className="text-green-400 font-bold text-xl">100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Max Teams</span>
                    <span className="text-white font-semibold">{tournamentDetails.maxTeams}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Deadline</span>
                    <span className="text-orange-400 font-semibold">{tournamentDetails.registrationDeadline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Rules & CTA */}
            <div className="space-y-8">
              
              {/* Tournament Rules */}
              <div className="bg-gradient-to-br from-red-400/10 to-purple-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-8">
                <h3 className="text-3xl font-bold text-red-400 mb-6">📋 Tournament Rules</h3>
                <div className="space-y-3">
                  {tournamentDetails.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">•</span>
                      <p className="text-gray-300">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration CTA */}
              <div className="bg-gradient-to-br from-blue-400/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8 text-center">
                <h3 className="text-3xl font-bold text-blue-400 mb-6">🚀 Ready to Compete?</h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Join the ultimate Free Fire tournament and compete for glory!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="group relative inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/50"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🎮</span>
        Register Now
                      <span className="ml-2">🎮</span>
                    </span>
                  </Link>
                  
                  <Link
                    to="/status"
                    className="group relative inline-block px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-xl rounded-full hover:from-purple-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-400/50"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🔍</span>
                      Check Status
                      <span className="ml-2">🔍</span>
                    </span>
                  </Link>
                </div>

                <div className="mt-6 text-gray-400">
                  <p className="text-sm">Registration closes on {tournamentDetails.registrationDeadline}</p>
                  <p className="text-sm mt-2">Limited spots available!</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">📊 Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-400">100</p>
                    <p className="text-gray-400 text-sm">Max Teams</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">4</p>
                    <p className="text-gray-400 text-sm">Players/Team</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">₹50K</p>
                    <p className="text-gray-400 text-sm">Prize Pool</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">100</p>
                    <p className="text-gray-400 text-sm">Entry Fee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-800">
  <p className="text-gray-400 mb-4">
    🎮 Free Fire Pro Championship 2025 • Powered by Tournament Management System
  </p>
  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
    <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/terms" target="_blank" rel="noopener noreferrer">
      Terms & Conditions
    </a>
    <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/privacy" target="_blank" rel="noopener noreferrer">
      Privacy Policy
    </a>
    <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/refund" target="_blank" rel="noopener noreferrer">
      Refund Policy
    </a>
    <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/shipping" target="_blank" rel="noopener noreferrer">
      Shipping Policy
    </a>
    <a href="https://merchant.razorpay.com/policy/OJuvVXJAnJzqpd/contact_us" target="_blank" rel="noopener noreferrer">
      Contact Us
    </a>
  </div>
</div>
      </div>
    </div>
  );
};

export default Welcome;
