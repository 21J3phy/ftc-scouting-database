<<<<<<< Updated upstream:pages/all_team.js
'use client'

import { useState, useEffect } from 'react'

export default function AllTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
=======
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API } from "@the-orange-alliance/api";
export default function AllTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ORANGE_ALLIANCE_API_KEY = "EElBgh3bJ/qwzVORJWPHnj4GzKD0K4B8Q24euT//FEU=";
  const toa = new API(ORANGE_ALLIANCE_API_KEY, "FTC_Scouting-Database");
>>>>>>> Stashed changes:pages/allteam.js

  useEffect(() => {
    async function fetchTeams() {
      try {
<<<<<<< Updated upstream:pages/all_team.js
        const response = await fetch('/api/orange-alliance-teams')
        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }
        const data = await response.json()
        setTeams(data)
        setLoading(false)
=======
        const data = await toa.getTeams();
        //const data = await response.json();
        setTeams(data);
        setLoading(false);
>>>>>>> Stashed changes:pages/allteam.js
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
    (<div>
      <h1>All FTC Teams</h1>
<<<<<<< Updated upstream:pages/all_team.js
=======
      <Link href="/">
        Back to Home
      </Link>
>>>>>>> Stashed changes:pages/allteam.js
      <ul>
        {teams.map((team) => (
          <li key={team.teamNumber}>
            <strong>{team.teamNameShort}</strong> (#{team.teamNumber})
            <p>Location: {team.city}, {team.country}</p>
          </li>
        ))}
      </ul>
<<<<<<< Updated upstream:pages/all_team.js
    </div>
  )
=======
    </div>)
  );
>>>>>>> Stashed changes:pages/allteam.js
}

