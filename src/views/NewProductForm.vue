<template>
    <v-sheet>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="name"
                            label="Nombre"
                            data-cy="product-name"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="cost"
                            label="Precio"
                            type="number"
                            data-cy="product-price"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="stock"
                            label="Stock"
                            type="number"
                            data-cy="product-stock"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="description"
                            label="Descripción"
                            data-cy="product-description"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="productCost"
                            label="Costo de produccion"
                            type="number"
                            data-cy="product-cost"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn color="primary" @click="saveProduct()">Guardar</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script setup>

import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const name = ref("");
const cost = ref("");
const productCost = ref("");
const stock = ref("");
const description = ref("");

function saveProduct() {
    axios
        .post("http://localhost:3001/products", {
            name: name.value,
            cost: cost.value,
            productCost: productCost.value,
            stock: stock.value,
            description: description.value,
        })
        .then(function (response) {
            // handle success
            router.push("/");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}



</script>