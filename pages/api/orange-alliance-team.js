import axios from 'axios'

const ORANGE_ALLIANCE_API_KEY = "EElBgh3bJ/qwzVORJWPHnj4GzKD0K4B8Q24euT//FEU=";
export default async function handler(req, res) {
  try {
    console.log("Fetching Orange Alliance data...");
    const response = await axios.get('https://theorangealliance.org/api/team', {
      headers: {
        'X-TOA-Key': ORANGE_ALLIANCE_API_KEY,
        'X-Application-Origin': 'your-app-name',
      },
    });
    console.log("Data fetched:", response.data); // Log fetched data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
}