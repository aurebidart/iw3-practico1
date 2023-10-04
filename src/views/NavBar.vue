<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="navigateToProducts()">
            <v-list-item-title>Productos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateToSellHistory()">
          <v-list-item-content>
            <v-list-item-title>Ventas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateToAccountancy()">
          <v-list-item-content>
            <v-list-item-title>Contaduría</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script setup>
import router from "@/router";
import { ref } from "vue";


const drawer = ref(false);

function navigateToProducts() {
  router.push("/");
}

function navigateToSellHistory() {
  router.push("/sells-history");
}

function navigateToAccountancy() {
  router.push("/accountancy");
}

</script>
