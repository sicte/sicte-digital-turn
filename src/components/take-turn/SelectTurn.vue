<template>
  <q-btn
    v-bind:key="index"
    v-for="(buttonData, index) in ticketButtons"
    :label="buttonData.label"
    :color="buttonData.color"
    @click="() => createTurn(buttonData.type)"
    class="col-2 col-sm-4 q-pa-xl"
    style="margin: 10px 10px 10px 10px"
  />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import { Bodega } from '../../models/bodega.model';
import { TurnType } from '../../enums/turns.enum';
import * as turnService from '../../services/turn.service';

const $q = useQuasar();

const props = defineProps<{
  bodega: Bodega;
  userDocument: string;
}>();

const ticketButtons = [
  {
    color: 'primary',
    label: 'Recibir material de Bodega',
    type: TurnType.EMB,
  },
  {
    color: 'primary',
    label: 'Entrega de equipos recogidos',
    type: TurnType.EMBMR,
  },
  {
    color: 'secondary',
    label: 'Entrega de recogidos y recibir material',
    type: TurnType.EMR,
  },
  {
    color: 'secondary',
    label: 'Consultoría de material',
    type: TurnType.IB,
  },
];

const createTurn = async (typeCase: TurnType) => {
  $q.loading.show({
    message: 'Creando turno',
  });
  try {
    const result = await turnService.insertNewTurn({
      bodega: props.bodega,
      type: typeCase,
      userDocument: props.userDocument,
    });

    $q.notify({
      message: 'El turno ha sido creado.',
      type: 'positive',
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    location.reload();
    $q.loading.hide();
  }
};
</script>
