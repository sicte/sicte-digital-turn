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
import { Bodega } from '../models/bodega.model';

import GetBodegasFromUser from '../components/take-turn/GetBodegasFromUser.vue';
import SelectTurn from '../components/take-turn/SelectTurn.vue';
const userDocument = ref<string>('');
const bodegaSelect = ref({
  options: <Bodega[]>[],
  selected: <Bodega | null>null,
});
const step = ref(1);

const onBodegasGetted = (bodegas: Bodega[]) => {
  bodegaSelect.value.options.length = 0;
  bodegaSelect.value.selected = null;
  bodegaSelect.value.options.push(...bodegas);
  step.value++;
};

const moveStepper = (type: 'next' | 'previous') => {
  type === 'next' ? step.value++ : step.value--;
};
</script>