<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Producto</th>
        <th class="text-left">Precio</th>
        <th class="text-left">Detalles</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.name }}</td>
        <td>${{ item.cost }}</td>
        <td>
          <v-btn color="primary" @click="openDialog(item.id)">
            Details

            <v-dialog v-model="dialog" width="auto">
              <v-card>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{
                  "$" + product.cost + " / " + product.unit
                }}</v-card-subtitle>
                <v-card-text>{{ product.description }}</v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="navigateToDetails(item.id)">
                    Mas detalles
                  </v-btn>
                  <v-btn color="primary" @click="dialog = false"> Close </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const productName = ref(" ");
const products = ref([]);
const product = ref({});
const dialog = ref(false);

axios.get("http://localhost:3001/products").then(function (response) {
  // handle success
  products.value = response.data;
  console.log(products.value);
});

const openDialog = (id) => {
  dialog.value = true;
  axios.get("http://localhost:3001/products/" + id).then(function (response) {
    // handle success
    product.value = response.data;
    console.log(productName.value);
  });
};
</script>
