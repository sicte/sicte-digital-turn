<template>
  <q-btn
    v-bind:key="index"
    v-for="(buttonData, index) in ticketButtons"
    :label="buttonData.label"
    :color="buttonData.color"
    @click="() => createTurn(buttonData.type)"
    class="col-2 col-sm-4 q-pa-xl"
    style="margin: 10px 10px 10px 10px"
    :disable="CreateTurnBtnDisabled"
  />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import { Bodega } from '../../models/bodega.model';
import { TurnType } from '../../enums/turns.enum';
import * as turnService from '../../services/turn.service';

const $q = useQuasar();
const CreateTurnBtnDisabled = ref(false); //Variable to disabled btn type turn

const props = defineProps<{
  bodega: Bodega;
  userDocument: string;
}>();

const ticketButtons = [
  {
    color: 'primary',
    label: 'Recibir material de Bodega',
    type: TurnType.RMB,
  },
  {
    color: 'primary',
    label: 'Entrega de equipos recogidos',
    type: TurnType.ERD,
  },
  {
    color: 'secondary',
    label: 'Entrega de recogidos y recibir material',
    type: TurnType.RMBERB,
  },
  {
    color: 'secondary',
    label: 'Consultar a bodega',
    type: TurnType.CB,
  },
];

const createTurn = async (typeCase: TurnType) => {
  CreateTurnBtnDisabled.value = true;

  $q.loading.show({
    message: 'Creando turno, por favor espere...',
  });

  try {
    const { bodega: bodegaFromProps } = props;

    const {
      data: { data: insertResponse },
    } = await turnService.insertNewTurn({
      bodega: props.bodega,
      type: typeCase,
      userDocument: props.userDocument,
    });

    const messageDialog = `Se ha creado el turno satisfactoriamente para el usuario
          ${bodegaFromProps.userName} en la bodega ${bodegaFromProps.Bodega}.
          Se le ha asigando el turno número ${insertResponse.insertId}.`;

    $q.dialog({
      title: insertResponse.insertId ? 'Exitoso' : 'Oops!',
      message: insertResponse.insertId
        ? messageDialog
        : 'Ha ocurrido un error al crear el turno, por favor reinicie el ejecutable e intente nuevamente.',
      ok: 'Cerrar',
      persistent: true,
    }).onOk(() => {
      location.reload();
    });
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
