<template>
  <q-page class="q-pa-md fit">
    <div class="q-pa-md">
      <q-stepper v-model="step" ref="stepperTurn" color="primary" animated>
        <q-step
          :name="1"
          title="Validación de usuario"
          icon="settings"
          :done="step > 0"
        >
          <div class="text-h6 text-center">
            Bienvenido al sistema de turno digital
          </div>
          <br />
          <q-label
            >Ingrese la cédula del usuario a validar y luego presione la tecla
            <b>Enter</b> para continuar con su búsqueda...</q-label
          >
          <br />
          <GetBodegasFromUser
            @getted-bodegas="onBodegasGetted"
            @user-document-change="(document: string) => (userDocument = document)"
          ></GetBodegasFromUser>
        </q-step>

        <q-step
          :name="2"
          title="Selección de bodega del usuario"
          icon="create_new_folder"
          :done="step > 1"
        >
          <q-card-section>
            <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
              <div class="text-h6 text-center">
                <q-label
                  >El técnico/Usuario
                  {{ userName }}
                  cuenta con más de una bodega asignada.
                </q-label>
              </div>
              <br />
              <br />
              <q-select
                filled
                v-model="bodegaSelect.selected"
                hide-selected
                use-input
                fill-input
                map-options
                emit-value
                option-label="Bodega"
                input-debounce="0"
                label="Seleccione la bodega del usuario"
                :options="bodegaSelect.options"
                hide-bottom-space
                :rules="[(val) => !!val || 'Bodega es requerida']"
              />
            </div>
          </q-card-section>
        </q-step>

        <q-step :name="3" title="Seleccione el turno a crear" icon="assignment">
          <div class="text-h6 text-center">
            <q-label
              >Se ha seleccionado la bodega
              {{
                bodegaSelect.selected
                  ? bodegaSelect.selected.Bodega
                  : 'BODEGA_WAS_NOW_SELECTED'
              }}.
              <br />
              Por favor, seleccione el tipo de turno que va a crear.
            </q-label>
          </div>
          <q-card-section class="row col-4 col-sm-8 justify-center">
            <SelectTurn
              :user-document="userDocument"
              :bodega="bodegaSelect.selected!"
            ></SelectTurn>
          </q-card-section>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="row justify-end">
            <q-btn
              v-if="step > 1 && step < 3"
              color="primary"
              :label="step === 3 ? 'Finalizar' : 'Siguiente'"
              :disable="bodegaSelect.selected == null"
              @click="() => moveStepper('next')"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              label="Atrás"
              class="q-ml-sm"
              @click="() => moveStepper('previous')"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Bodega } from '../models/bodega.model';

import GetBodegasFromUser from '../components/take-turn/GetBodegasFromUser.vue';
import SelectTurn from '../components/take-turn/SelectTurn.vue';

const userDocument = ref<string>('');
const userName = ref<string>('');
const bodegaSelect = ref({
  options: <Bodega[]>[],
  selected: <Bodega | null>null,
});
const step = ref(1);
const $q = useQuasar();

const onBodegasGetted = (bodegas: Bodega[]) => {
  bodegaSelect.value.options.length = 0;
  bodegaSelect.value.selected = null;
  bodegaSelect.value.options.push(...bodegas);
  userName.value = bodegas[0].nombres;

  if (bodegaSelect.value.options.length == 0) {
    $q.notify({
      message: 'El usuario no cuenta con bodegas asignadas.',
      type: 'negative',
    });
    return;
  }

  // Skip to the turn selection if the user has just one warehouse
  if (bodegaSelect.value.options.length == 1) {
    bodegaSelect.value.selected = bodegas[0];
    step.value = 3;
    return;
  }

  step.value++;
};

const moveStepper = (type: 'next' | 'previous') => {
  if (type === 'next') {
    step.value++;
    return;
  }

  type === 'previous' && bodegaSelect.value.options.length == 1
    ? (step.value = 1)
    : step.value--;
};
</script>
