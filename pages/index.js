import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      const res = await fetch('/api/teams');
      const data = await res.json();
      setTeams(data);
    }
    fetchTeams();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, details }),
    });
    if (res.ok) {
      const newTeam = await res.json();
      setTeams([...teams, newTeam]);
      setName('');
      setDetails('');
    }
  }

  async function handleDelete(id) {
    const res = await fetch('/api/teams', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTeams(teams.filter((team) => team._id !== id));
    } else {
      console.log('Failed to delete team');
    }
  }

  return (
    <div>
      <h1>FTC Scouting Database</h1>
      {/* Correct Link Implementation */}
      <Link href="/allteam">View All Teams</Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Scouting Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit">Add Team</button>
      </form>

      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>: {team.details}
            <button onClick={() => handleDelete(team._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

