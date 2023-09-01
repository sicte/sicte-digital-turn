<template>
  <q-btn
    v-bind:key="index"
    v-for="(buttonData, index) in ticketButtons"
    :label="buttonData.label"
    :color="buttonData.color"
    @click="() => createTurn(buttonData.type)"
    class="col-2 col-sm-4 q-pa-xl"
    style="margin: 10px 10px 10px 10px"
    :disable="btnDisabled"
  />
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Exitoso:</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ textDialog.bodyText }}
        <br />
        <b>{{ textDialog.TurnText }}</b>
      </q-card-section>

      <q-card-actions class="row justify-end">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="reloadExcecutable()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import { Bodega } from '../../models/bodega.model';
import { TurnType } from '../../enums/turns.enum';
import * as turnService from '../../services/turn.service';

const $q = useQuasar();
const btnDisabled = ref(false); //Variable to disabled btn type turn
const showDialog = ref(false); //Variable to show Dialog
const textDialog = ref({
  //variable to display text in the dialog
  bodyText: '',
  TurnText: '',
});

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
  btnDisabled.value = true;
  $q.loading.show({
    message: 'Creando turno',
  });
  try {
    const result = await turnService.insertNewTurn({
      bodega: props.bodega,
      type: typeCase,
      userDocument: props.userDocument,
    });
    showDialog.value = true;
    textDialog.value = {
      bodyText:
        'Se ha creado el turno satisfactoriamente para el usuario ' +
        props.bodega.nombres +
        ' en la bodega ' +
        props.bodega.Bodega +
        '.',
      TurnText:
        'Se le ha asigando el turno número ' + result.data.data.insertId + '.',
    };
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};

const reloadExcecutable = () => {
  location.reload();
};
</script>
