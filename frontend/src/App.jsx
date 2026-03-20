import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Backend server se connect karein
const socket = io('http://localhost:5000');

function App() {
    const [matchData, setMatchData] = useState(null);

    useEffect(() => {
        // Backend se aane wale 'live-match-update' event ko listen karein
        socket.on('live-match-update', (data) => {
            setMatchData(data);
        });

        // Cleanup function
        return () => {
            socket.off('live-match-update');
        };
    }, []);

    if (!matchData) {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white text-2xl font-bold">Loading Live Arena...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                <h1 className="text-3xl font-extrabold text-blue-500 tracking-wider">CricPulse <span className="text-sm font-normal text-gray-400">Pro</span></h1>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Live</span>
                </div>
            </header>

            {/* Main Dashboard */}
            <main className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
                    <div className="text-center mb-6">
                        <p className="text-gray-400 text-sm font-semibold uppercase">{matchData.status}</p>
                    </div>

                    {/* Teams & Scores */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-center w-1/3">
                            <h2 className="text-2xl font-bold text-blue-400">{matchData.teamA}</h2>
                            <p className="text-4xl font-black mt-2">{matchData.scoreA}</p>
                        </div>
                        <div className="w-1/3 text-center">
                            <div className="inline-block bg-gray-700 px-4 py-2 rounded-lg text-xl font-bold text-yellow-400">
                                VS
                            </div>
                            <p className="mt-4 text-sm text-gray-400">Last Ball: <span className="font-bold text-white bg-gray-600 px-2 py-1 rounded">{matchData.lastBall}</span></p>
                        </div>
                        <div className="text-center w-1/3">
                            <h2 className="text-2xl font-bold text-yellow-500">{matchData.teamB}</h2>
                            <p className="text-4xl font-black mt-2">{matchData.scoreB}</p>
                        </div>
                    </div>

                    {/* Prediction / Odds Section */}
                    <div className="bg-gray-900 rounded-xl p-4 mt-8">
                        <h3 className="text-center text-gray-400 mb-4 text-sm font-bold uppercase">Live Win Probability / Odds</h3>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-500 transition-all py-3 rounded-lg font-bold flex justify-between px-6 shadow-lg">
                                <span>{matchData.teamA}</span>
                                <span>{matchData.oddsA}</span>
                            </button>
                            <button className="flex-1 bg-yellow-600 hover:bg-yellow-500 transition-all py-3 rounded-lg font-bold flex justify-between px-6 shadow-lg">
                                <span>{matchData.teamB}</span>
                                <span>{matchData.oddsB}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;