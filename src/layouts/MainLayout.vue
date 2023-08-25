<template>
  <q-layout view="lHh Lpr lFf" class="self-center">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> DigiTurno - {{ productName }}</q-toolbar-title>
        <!-- Puedes añadir otros elementos aquí, como q-btn, si lo deseas -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="flex justify-center grow">
      <q-toolbar>
        <div class="self-center text-center">
          Desarrollado con 💖 por SICTE - Tecnología
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
const productName = process.env.PRODUCT_NAME;
</script>
