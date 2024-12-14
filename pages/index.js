import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Track if user is logged in (null initially)
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // To track errors in API calls
  const router = useRouter();

  useEffect(() => {
    // Ensure the code only runs after the component mounts
    if (typeof window !== 'undefined') {
      const userLoggedIn = localStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        setIsLoggedIn(true);
        fetchTeams();  // Fetch teams if logged in
      } else {
        setIsLoggedIn(false);
        router.push('/login'); // Redirect to login page if not logged in
      }
    }
  }, [router]);

  // Fetch teams from the API
  async function fetchTeams() {
    try {
      const res = await fetch('/api/teams');
      if (!res.ok) throw new Error('Failed to fetch teams');
      const data = await res.json();
      setTeams(data);
      setLoading(false); // Stop loading once teams are fetched
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  // Handle the form submission to add a team
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !details) {
      setError("Please provide both team name and details");
      return;
    }
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, details }),
      });
      if (!res.ok) throw new Error('Failed to add team');
      const newTeam = await res.json();
      setTeams([...teams, newTeam]);
      setName('');
      setDetails('');
    } catch (err) {
      setError(err.message);
    }
  }

  // Handle deleting a team
  async function handleDelete(id) {
    try {
      const res = await fetch('/api/teams', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete team');
      setTeams(teams.filter((team) => team._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // If loading, show a spinner or loading message
  if (loading) {
    return <div>Loading...</div>; // You can use a spinner or a more styled component
  }

  // If the user is not logged in, do not render the page content
  if (isLoggedIn === false) {
    return <div>Redirecting to login...</div>;  // or a message
  }

  return (
    <div>
      <h1>FTC Scouting Database</h1>
      
      {/* Link to the All Teams page */}
      <Link href="/allteam">View All Teams</Link>
      
      {/* Link to the Live Scoring page */}
      console.log('RealTimeScoring page is loaded!');
      <Link href="/RealTimeScoring">Go to Live Scoring</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display any error messages */}

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




