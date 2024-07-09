import { BASE_URL } from '@/assets/constants';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    
    const token = req.headers.authorization;

    try {
      const response = await axios.get(`${BASE_URL}/api/ServersDetails`, {
        headers: { Authorization: token }
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error fetching server details:', error);
      res.status(error.response ? error.response.status : 500).json({ message: 'Failed to fetch Server Details' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
