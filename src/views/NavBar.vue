<template>
    <div>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title :page="page">{{page}}</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <v-list-item @click="navigateToProducts()">
                    <list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </list-item-icon>
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
    import { ref } from 'vue'


    const page = ref("Productos")

    const drawer = ref(false)

    function navigateToProducts() {
        page.value = "Productos"
        drawer.value = false
    }

</script>