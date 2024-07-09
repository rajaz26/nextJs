import axios from 'axios';

export default async function handler(req, res) {
  const { serverId } = req.query;
  
  console.log("Handler start"); // Initial log to ensure the handler is reached

  if (req.method === 'GET') {
    const token = req.headers.authorization;

    if (!token) {
      console.log("No authorization token found"); // Log missing token
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    console.log(`Fetching server details for ID: ${serverId} with token: ${token}`); // Log serverId and token

    try {
      const response = await axios.get(`http://104.238.35.17:8090/api/vpnLogs/serverDetails/${serverId}`, {
        headers: { Authorization: token }
      });
      console.log("Data fetched successfully"); 
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error fetching server details:', error.message);
      res.status(error.response ? error.response.status : 500).json({ message: 'Failed to fetch Server Logs', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
