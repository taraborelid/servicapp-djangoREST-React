import axios from 'axios';

export async function fetchVerificationStatus(endpoint, token) {
  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.is_verified || response.data.status === 'true';
  } catch (err) {
    return false;
  }
}
