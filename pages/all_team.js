'use client'

import { useState, useEffect } from 'react'

export default function AllTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/api/orange-alliance-teams')
        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }
        const data = await response.json()
        setTeams(data)
        setLoading(false)
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

