import { useState } from 'react';
import Link from 'next/link';

export default function RealTimeScoring() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Penalties, setTeam1Penalties] = useState(0);
  const [team2Penalties, setTeam2Penalties] = useState(0);

  // Function to update score for a specific team
  const updateScore = (team, points) => {
    if (team === 1) {
      setTeam1Score((prevScore) => prevScore + points);
    } else if (team === 2) {
      setTeam2Score((prevScore) => prevScore + points);
    }
  };

  // Function to update penalties for a specific team
  const updatePenalties = (team, penaltyPoints) => {
    if (team === 1) {
      setTeam1Penalties((prevPenalties) => prevPenalties + penaltyPoints);
    } else if (team === 2) {
      setTeam2Penalties((prevPenalties) => prevPenalties + penaltyPoints);
    }
  };

  // Calculate total scores for each team (score - penalties)
  const team1TotalScore = team1Score - team1Penalties;
  const team2TotalScore = team2Score - team2Penalties;

  return (
    (<div>
      <h1>Real-Time Scoring for FTC 2025: Into the Deep</h1>
      {/* Team 1 Score and Penalties */}
      <div>
        <h2>Team 1 Score: {team1TotalScore}</h2>
        <h3>Team 1 Penalties: {team1Penalties}</h3>
      </div>
      {/* Team 2 Score and Penalties */}
      <div>
        <h2>Team 2 Score: {team2TotalScore}</h2>
        <h3>Team 2 Penalties: {team2Penalties}</h3>
      </div>
      {/* Autonomous Period Scoring Buttons */}
      <h3>Autonomous Period</h3>
      <button onClick={() => updateScore(1, 2)}>Team 1 - Net Zone Sample (2)</button>
      <button onClick={() => updateScore(2, 2)}>Team 2 - Net Zone Sample (2)</button>
      <button onClick={() => updateScore(1, 2)}>Team 1 - Low Basket Sample (2)</button>
      <button onClick={() => updateScore(2, 2)}>Team 2 - Low Basket Sample (2)</button>
      <button onClick={() => updateScore(1, 8)}>Team 1 - High Basket Sample (8)</button>
      <button onClick={() => updateScore(2, 8)}>Team 2 - High Basket Sample (8)</button>
      <button onClick={() => updateScore(1, 6)}>Team 1 - Lower Chamber Specimen (6)</button>
      <button onClick={() => updateScore(2, 6)}>Team 2 - Lower Chamber Specimen (6)</button>
      <button onClick={() => updateScore(1, 10)}>Team 1 - High Chamber Specimen (10)</button>
      <button onClick={() => updateScore(2, 10)}>Team 2 - High Chamber Specimen (10)</button>
      <button onClick={() => updateScore(1, 3)}>Team 1 - Observation Zone (3)</button>
      <button onClick={() => updateScore(2, 3)}>Team 2 - Observation Zone (3)</button>
      <button onClick={() => updateScore(1, 3)}>Team 1 - Level 1 Ascent (3)</button>
      <button onClick={() => updateScore(2, 3)}>Team 2 - Level 1 Ascent (3)</button>
      {/* Teleoperated Period Scoring Buttons */}
      <h3>Teleoperated Period</h3>
      <button onClick={() => updateScore(1, 3)}>Team 1 - Net Zone Sample (3)</button>
      <button onClick={() => updateScore(2, 3)}>Team 2 - Net Zone Sample (3)</button>
      <button onClick={() => updateScore(1, 4)}>Team 1 - Low Basket Sample (4)</button>
      <button onClick={() => updateScore(2, 4)}>Team 2 - Low Basket Sample (4)</button>
      <button onClick={() => updateScore(1, 8)}>Team 1 - High Basket Sample (8)</button>
      <button onClick={() => updateScore(2, 8)}>Team 2 - High Basket Sample (8)</button>
      <button onClick={() => updateScore(1, 6)}>Team 1 - Lower Chamber Specimen (6)</button>
      <button onClick={() => updateScore(2, 6)}>Team 2 - Lower Chamber Specimen (6)</button>
      <button onClick={() => updateScore(1, 25)}>Team 1 - High Chamber Specimen (25)</button>
      <button onClick={() => updateScore(2, 25)}>Team 2 - High Chamber Specimen (25)</button>
      <button onClick={() => updateScore(1, 3)}>Team 1 - Observation Zone (3)</button>
      <button onClick={() => updateScore(2, 3)}>Team 2 - Observation Zone (3)</button>
      <button onClick={() => updateScore(1, 3)}>Team 1 - Level 1 Ascent (3)</button>
      <button onClick={() => updateScore(2, 3)}>Team 2 - Level 1 Ascent (3)</button>
      <button onClick={() => updateScore(1, 15)}>Team 1 - Level 2 Ascent (15)</button>
      <button onClick={() => updateScore(2, 15)}>Team 2 - Level 2 Ascent (15)</button>
      <button onClick={() => updateScore(1, 30)}>Team 1 - Level 3 Ascent (30)</button>
      <button onClick={() => updateScore(2, 30)}>Team 2 - Level 3 Ascent (30)</button>
      {/* Penalty Buttons */}
      <h3>Penalties</h3>
      <button onClick={() => updatePenalties(1, 5)}>Team 1 - Minor Foul (-5)</button>
      <button onClick={() => updatePenalties(2, 5)}>Team 2 - Minor Foul (-5)</button>
      <button onClick={() => updatePenalties(1, 15)}>Team 1 - Major Foul (-15)</button>
      <button onClick={() => updatePenalties(2, 15)}>Team 2 - Major Foul (-15)</button>
      {/* Link back to the Home page */}
      <Link href="/">
        Back to Home
      </Link>
    </div>)
  );
}

