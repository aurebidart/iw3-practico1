<template>
  <div class="text-center">
    <v-btn color="primary" class="mt-3" @click="navigateToAddProduct()">
      <v-icon>mdi-plus</v-icon>
      <span>Agregar producto</span>
    </v-btn>
  </div>
</template>

<script setup>
import router from "@/router";
function navigateToAddProduct() {
    router.push("/add-product");
}
</script>
