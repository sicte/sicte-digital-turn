import { api } from 'src/boot/axios';
import { Bodega } from 'src/models/bodega.model';

export const getBodegasByUserId = async (userId: number): Promise<Bodega[]> => {
  const response = await api.get<Bodega[]>(`/select_bodegas_user/${userId}`);
  return response.data;
};
