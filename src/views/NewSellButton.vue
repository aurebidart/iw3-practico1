<template>
  <div class="text-center">
    <v-btn color="primary" class="mt-3" @click="navigateToNewSell()">
      <v-icon>mdi-plus</v-icon>
      <span>Agregar venta</span>
    </v-btn>
  </div>
</template>

<script setup>
import router from "@/router";

function navigateToNewSell() {
  router.push("/new-sell");
}
</script>
