import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend WebSocket

const LiveMatches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Initial Fetch
        const fetchMatches = async () => {
            const { data } = await axios.get('http://localhost:5000/api/live-matches');
            setMatches(data.data); // Adjust based on your API response structure
        };
        fetchMatches();

        // Listen for real-time WebSocket updates
        socket.on('scoreUpdate', (updatedData) => {
            // Update UI immediately when backend sends new score
            console.log("New Score:", updatedData);
        });

        return () => socket.off('scoreUpdate');
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Live IPL Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-bold">{match.name}</h2>
                        <p className="text-gray-600 mt-2">Status: <span className="text-green-600 font-semibold">{match.status}</span></p>
                        <div className="mt-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                                Create Team / Participate
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveMatches;