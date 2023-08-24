/* import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.sicte.com/ps/',
  timeout: 10000, // puedes ajustar el tiempo de espera según tus necesidades
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async getBodegaUser(User) {
    console.log(User);
    try {
      const response = await apiClient.get(`select_bodegas_user/${User}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error;
    }
  },
  // Puedes agregar más métodos según los endpoints de tu API
};
 */
