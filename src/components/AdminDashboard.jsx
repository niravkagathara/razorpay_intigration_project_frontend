import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSubject, setUpdateSubject] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [stats, setStats] = useState({});
  const [sendUpdateLoading, setSendUpdateLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  useEffect(() => {
    fetchTeams();
    fetchStats();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.reload();
  };
  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/teams');
      if (response.data.success) {
        setTeams(response.data.teams);
      }
    } catch (error) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/stats');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleVerifyTeam = async (teamId) => {
    setVerifying(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/admin/verify-team/${teamId}`, {
        verifiedBy: 'Admin'
      });

      if (response.data.success) {
        fetchTeams(); // Refresh teams list
        console.log(response.data);
        console.log(teamId);
        console.log(response.data.success);
        console.log(response.data.message);
        console.log(response.data.team);
        setError("");
      }
    } catch (error) {
      setError('Failed to verify team');
    } finally {
      setVerifying(false);
    }
  };

  const handleTeamSelection = (teamId) => {
    setSelectedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTeams(teams.map(team => team.id));
  };

  const handleClearSelection = () => {
    setSelectedTeams([]);
  };

  const handleSendUpdate = async () => {
    setSendUpdateLoading(true);
    try {
      setSendUpdateLoading(true);
      const response = await axios.post('http://localhost:5000/api/admin/send-update', {
        message: updateMessage,
        subject: updateSubject,
        selectedTeams: selectedTeams
      });

      if (response.data.success) {
        setShowUpdateModal(false);
        setUpdateMessage("");
        setUpdateSubject("");
        setSelectedTeams([]);
        setError("");
      }
    } catch (error) {
      setError('Failed to send update');
    } finally {
      setSendUpdateLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">👑 Admin Dashboard</h1>
          <p className="text-gray-300">Manage Free Fire Tournament Teams</p>
        </div>
        <div className="text-right">
          <button onClick={handleLogout} className="align-right relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed">Logout</button>
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-400/10 to-purple-500/10 p-6 rounded-lg border border-blue-400/30">
            <div className="text-3xl font-bold text-blue-400">{stats.totalTeams || 0}</div>
            <div className="text-gray-400">Total Teams</div>
          </div>
          <div className="bg-gradient-to-r from-green-400/10 to-teal-500/10 p-6 rounded-lg border border-green-400/30">
            <div className="text-3xl font-bold text-green-400">{stats.verifiedTeams || 0}</div>
            <div className="text-gray-400">Verified Teams</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 p-6 rounded-lg border border-yellow-400/30">
            <div className="text-3xl font-bold text-yellow-400">{stats.pendingTeams || 0}</div>
            <div className="text-gray-400">Pending Teams</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400/10 to-pink-500/10 p-6 rounded-lg border border-purple-400/30">
            <div className="text-3xl font-bold text-purple-400">📊</div>
            <div className="text-gray-400">Dashboard</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowUpdateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300"
          >
            📢 Send Tournament Update
          </button>
          <button
            onClick={handleSelectAll}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all duration-300"
          >
            ✅ Select All Teams
          </button>
          <button
            onClick={handleClearSelection}
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-400 transition-all duration-300"
          >
            🗑️ Clear Selection
          </button>
        </div>

        {/* Teams List */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">📋 Registered Teams</h2>

          {teams.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-xl">No teams registered yet</p>
            </div>
          ) : (
            <div className="space-y-4">
         {teams.map((team) => (
    <div
      key={team.id}
      className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-6 rounded-lg border border-gray-600"
    >
      {/* Top Section: Checkbox + Team Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={selectedTeams.includes(team.id)}
            onChange={() => handleTeamSelection(team.id)}
            className="accent-yellow-400 mt-1"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
            <p className="text-gray-400">
              Leader: {team.leaderName} ({team.leaderEmail})
            </p>
            <p className="text-gray-400">Team Size: {team.teamSize} Players</p>
            <p className="text-gray-400">
              Registered: {new Date(team.createdAt).toLocaleDateString()}
            </p>

            {/* Team Members */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-green-400 mb-2">
                Team Members:
              </h4>
              <ul className="space-y-1">
                {team.members && team.members.length > 0 ? (
                  team.members.map((member, idx) => (
                    <li
                      key={idx}
                      className="text-gray-300 text-sm pl-2 border-l-2 border-green-400"
                    >
                      <span className="font-bold text-white">{member.name}</span>{" "}
                      | <span>Email: {member.email}</span> |{" "}
                      <span>Game ID: {member.gameId}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">No members</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Status and Button Section */}
        <div className="flex flex-col sm:items-end gap-3">
          <div
            className={`font-semibold ${getStatusColor(
              team.verificationStatus
            )} text-base sm:text-lg`}
          >
            {getStatusIcon(team.verificationStatus)}{" "}
            {typeof team.verificationStatus === "string" &&
            team.verificationStatus.length > 0
              ? team.verificationStatus.charAt(0).toUpperCase() +
                team.verificationStatus.slice(1)
              : "Unknown"}
          </div>
          {team.verificationStatus !== "verified" && (
            <button
              disabled={verifying}
              onClick={() => handleVerifyTeam(team.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all duration-200 disabled:opacity-50 w-full sm:w-auto"
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>
          )}
        </div>
      </div>
    </div>
  ))}
            </div>
          )}
        </div>

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 max-w-2xl w-full mx-4">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">📢 Send Tournament Update</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    value={updateSubject}
                    onChange={(e) => setUpdateSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors"
                    placeholder="Tournament Update Subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    value={updateMessage}
                    onChange={(e) => setUpdateMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-colors h-32"
                    placeholder="Enter your tournament update message..."
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">
                    Selected Teams: {selectedTeams.length}
                  </span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowUpdateModal(false)}
                      className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendUpdate}
                      disabled={!updateMessage || !updateSubject}
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sendUpdateLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        "Send Update"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
