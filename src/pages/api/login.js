import { BASE_URL } from '@/assets/constants';
import axios from 'axios';


export default async function handler(req, res) {
    try {
      const { email, password } = req.body;
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      console.log("API Executed");
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Login error:', error);
      res.status(error.response ? error.response.status : 500).json({ message: 'Login failed' });
    }
}
