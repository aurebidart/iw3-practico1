<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <v-icon left>mdi-plus</v-icon>
          New Sell
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Nueva venta</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="getProductsNames()"
                  label="Producto"
                  v-model="sell.product"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Cantidad"
                  v-model="sell.quantity"
                  :suffix="getProductUnit()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="getClientsNames()"
                  label="Cliente"
                  v-model="sell.client"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <span class="text-h6">Total: $ {{ getTotal() }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="makeSell()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const dialog = ref(false);
const products = ref([]);
const productsNames = ref([]);
const clients = ref([]);
const clientsNames = ref([]);
const sell = ref({
  product: "",
  quantity: "",
  client: "",
});

function getProductsNames() {
  return productsNames.value;
}

function getClientsNames() {
  return clientsNames.value;
}

function getProductUnit() {
  const product = products.value.find(
    (product) => product.name === sell.value.product
  );
  return product ? product.unit : "";
}

function getTotal() {
  const product = products.value.find(
    (product) => product.name === sell.value.product
  );
  console.log(product);
  return product ? product.cost * sell.value.quantity : 0;
}

function makeSell() {
  const date = new Date();
  const client_id = clients.value.find(
    (client) => client.name === sell.value.client
  ).id;
  const product_id = products.value.find(
    (product) => product.name === sell.value.product
  ).id;

  axios.post("http://localhost:3001/sells", {
    date,
    client_id,
    product_id,
    quantity: sell.value.quantity,
    total: getTotal(),
  });
  
}

axios.get("http://localhost:3001/products").then(function (response) {
  // handle success
  products.value = response.data;
  productsNames.value = response.data.map((product) => product.name);
  console.log(productsNames.value);
});

axios.get("http://localhost:3001/clients").then(function (response) {
  // handle success
  clients.value = response.data;
  clientsNames.value = response.data.map((client) => client.name);
});

function closeDialog() {
  sell.value = {
    product: "",
    quantity: "",
    client: "",
  };
  dialog.value = false;
}
</script>
