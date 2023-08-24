<template>
  <q-input
    v-model="userDocument"
    label="Cédula a validar para turno"
    type="text"
    class="q-my-md"
    @keypress.enter.prevent="searchUser"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { Bodega } from '../../models/bodega.model';
import * as bodegaService from '../../services/bodega.service';

const emit = defineEmits<{
  (e: 'gettedBodegas', bodegas: Bodega[]): void;
  (e: 'userDocumentChange', userDocument: string): void;
}>();
const $q = useQuasar();
const userDocument = ref<string>('');

watch(userDocument, () => {
  emit('userDocumentChange', userDocument.value);
});

const searchUser = async () => {
  $q.loading.show({
    message: 'Buscando usuario',
  });
  try {
    const bodegasByUser = await bodegaService.getBodegasByUserId(
      +userDocument.value
    );
    if (bodegasByUser.length === 0) {
      $q.notify({
        message: 'Usuario no encontrado',
        type: 'warning',
      });
      return;
    }
    emit('gettedBodegas', bodegasByUser);
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
};
</script>
