import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { Turn } from 'src/models/turn.model';

export const insertNewTurn = async (turn: Turn): Promise<AxiosResponse> => {
  const hostname = window.host.hostname || 'NO_HOSTNAME_FOUND';
  const response = await api.post('/ps/insert_digiturno', {
    hostname: hostname,
    ccTecnico: turn.userDocument,
    tramite: turn.type,
    idBodega: turn.bodega.ID_Bodega,
  });
  return response;
};
