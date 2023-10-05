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
                <v-alert v-if="!hasEnoughStock()" type="error" outlined>
                No hay suficiente stock disponible para realizar esta venta.
                </v-alert>
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

function getTotal() {
  const product = products.value.find(
    (product) => product.name === sell.value.product
  );
  console.log(product);
  return product ? product.cost * sell.value.quantity : 0;
}

function hasEnoughStock() {
  const selectedProduct = products.value.find(
    (product) => product.name === sell.value.product
  );
  // Si el producto no está seleccionado o la cantidad es mayor que el stock disponible, retorna false
  return selectedProduct && sell.value.quantity <= selectedProduct.stock;
}

function makeSell() {
  // Verifica si hay suficiente stock antes de realizar la venta
  if (!hasEnoughStock()) {
    // Muestra un mensaje de error y no realiza la venta
    alert("No hay suficiente stock disponible para realizar esta venta.");
    return;
  }

  // Restar la cantidad vendida del stock del producto en la base de datos
  const selectedProduct = products.value.find(
    (product) => product.name === sell.value.product
  );
  if (selectedProduct) {
    const updatedStock = selectedProduct.stock - sell.value.quantity;

    // Actualiza solo el parámetro 'stock' del producto en la base de datos usando PATCH
    axios.patch(`http://localhost:3001/products/${selectedProduct.id}`, {
      stock: updatedStock,
    });
  }

  // Continuar con el proceso de realizar la venta (tu código existente)
  const date = new Date();
  const client_id = clients.value.find(
    (client) => client.name === sell.value.client
  ).id;
  const product_id = selectedProduct.id; // Usar el ID del producto seleccionado
  axios.post("http://localhost:3001/sells", {
    date,
    client_id,
    product_id,
    quantity: sell.value.quantity,
    total: getTotal(),
  }).then(() => {
    // Después de agregar la venta, cierra el diálogo
    closeDialog();
    window.location.reload();
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
