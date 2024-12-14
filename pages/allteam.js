'use client'
import { useState, useEffect } from 'react';
//import Link from 'next/link';
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
        var temp = await toa.getEventTeams("2425-VA-HAQ3");
       // temp = temp.filter( (event) => event.eventKey.includes("2425-VA"));
        console.log("teams",temp)
        //var data = await toa.getTeams();
        //console.log(data)
        //data = data.filter( (team) => team.lastActive.includes("2425"))
        //console.log(data)
        setTeams(temp);
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
        {teams.map((EventParticipant) => (
          <li key={EventParticipant.team.teamNumber}>
                        <strong>{EventParticipant.team.teamNameLong} ({EventParticipant.team.teamNameShort})</strong> (#{EventParticipant.team.teamNumber})
                        <p>Location: {EventParticipant.team.city}, {EventParticipant.team.country}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}