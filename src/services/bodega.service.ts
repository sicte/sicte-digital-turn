import { api } from 'src/boot/axios';
import { BodegaEntity } from 'src/entities/bodega.entity';
import { Bodega } from 'src/models/bodega.model';

export const getBodegasByUserId = async (userId: number): Promise<Bodega[]> => {
  const { data } = await api.get<BodegaEntity[]>(
    `/select_bodegas_user/${userId}`
  );

  return data.map((bodegaEntity) => ({
    Bodega: bodegaEntity.Bodega,
    ID_Bodega: bodegaEntity.ID_Bodega,
    userName: bodegaEntity.nombres,
  }));
};
