<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Producto</th>
        <th class="text-left">Cliente</th>
        <th class="text-left">Precio</th>
        <th class="text-left">Cantidad</th>
        <th class="text-left">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sell in sells" :key="sell.id">
        <td>{{ getProductName(sell.product_id) }}</td>
        <td>{{ getClientName(sell.client_id) }}</td>
        <td>{{ sell.cost }}</td>
        <td>{{ sell.amount }}</td>
        <td>{{ sell.cost * sell.amount }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const sells = ref([]);
const clients = ref([]);
const products = ref([]);

axios.get("http://localhost:3001/clients").then(function (response) {
  // handle success
  clients.value = response.data;
});

axios.get("http://localhost:3001/sells").then(function (response) {
  // handle success
  sells.value = response.data;
});

axios.get("http://localhost:3001/products").then(function (response) {
  // handle success
  products.value = response.data;
});

function getProductName(id) {
  const product = products.value.find((product) => product.id === id);
  return product.name;
}

function getClientName(id) {
  const client = clients.value.find((client) => client.id === id);
  return client.name;
}

</script>
