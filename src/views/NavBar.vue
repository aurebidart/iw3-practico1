<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="navigateToProducts()">
          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateToNewSell()">
          <v-list-item-content>
            <v-list-item-title>Nueva venta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateToSellHistory()">
          <v-list-item-content>
            <v-list-item-title>Historial de ventas</v-list-item-title>
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

//Cuando cargue la pagina que se actualice el valor page
router.afterEach((to) => {
  page.value = router.currentRoute.value.meta.title;
});

function navigateToProducts() {
  router.push("/");
}

function navigateToSellHistory() {
  router.push("/sells-history");
}

function navigateToNewSell() {
  router.push("/new-sell");
}

function navigateToAccountancy() {
  router.push("/accountancy");
}

</script>
