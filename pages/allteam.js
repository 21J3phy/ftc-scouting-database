
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API } from "@the-orange-alliance/api";


export default function AllTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ORANGE_ALLIANCE_API_KEY = "EElBgh3bJ/qwzVORJWPHnj4GzKD0K4B8Q24euT//FEU=";
  const toa = new API(ORANGE_ALLIANCE_API_KEY, "ftc-scouting-database");

  useEffect(() => {
    async function fetchTeams() {
      try {
        const data = await toa.getTeams();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) {
    return <p>Loading teams...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1>All FTC Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.teamNumber}>
            <strong>{team.teamNameShort}</strong> (#{team.teamNumber})
            <p>Location: {team.city}, {team.country}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

