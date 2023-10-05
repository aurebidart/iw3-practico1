<template>
    <div class="text-center">
      <v-btn color="primary" class="mt-3" @click="navigateToGenerateReport()">
        <span>Generar Reporte</span>
      </v-btn>
    </div>
  </template>
  
  <script setup>
  import router from "@/router";
  function navigateToGenerateReport() {
      router.push("/report");
  }
  </script>
  <style scoped>
  
  div {
    margin-bottom: 15px;
  }
  
  </style>
  