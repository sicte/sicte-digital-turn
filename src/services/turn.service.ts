import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { Turn } from 'src/models/turn.model';
import { BaseResponse, InsertResponse } from 'src/interfaces/api/api.interface';

interface InsertNewTurnResponse extends BaseResponse {
  data: InsertResponse;
}

export const insertNewTurn = async (
  turn: Turn
): Promise<AxiosResponse<InsertNewTurnResponse>> => {
  const hostname = process.env.COMPUTER_NAME || 'NO_COMPUTER_NAME_FOUND';
  const response = await api.post('/insert_digiturno', {
    hostname: hostname,
    ccTecnico: turn.userDocument,
    tramite: turn.type,
    idBodega: turn.bodega.ID_Bodega,
  });
  return response;
};
