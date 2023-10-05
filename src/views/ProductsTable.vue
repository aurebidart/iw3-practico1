<template>
  <div class="new-product-button">
    <NewProductButton />
  </div>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Producto</th>
        <th class="text-left">Precio</th>
        <th class="text-center">Detalles</th>
        <th class="text-center">Stock actual</th>
        <th class="text-center">Agregar Stock</th>
        <th class="text-center">Eliminar Producto</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td class="text-left">{{ item.name }}</td>
        <td class="text-left">${{ item.cost }}</td>
        <td class="text-center">
          <v-btn color="primary" @click="openDetailsDialog(item.id)">
            Details
          </v-btn>
        </td>
        <td class="text-center">{{ item.stock }}</td>
        <td class="text-center">
          <v-btn fab small color="green" @click="openAddStockDialog(item.id)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </td>
        <td class="text-center">
          <v-btn icon @click="openDeleteDialog(item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>

    <v-dialog v-model="detailsDialog" width="auto">
      <v-card>
        <v-card-title>{{ product.name }}</v-card-title>
        <v-card-subtitle>
          {{ "$" + product.cost + " / " + product.unit }}
        </v-card-subtitle>
        <v-card-text>{{ product.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="navigateToDetails(product.id)">
            Mas detalles
          </v-btn>
          <v-btn color="primary" @click="detailsDialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que quieres eliminar este producto?
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addStockDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Agregar Stock</v-card-title>
        <v-card-text>
          <v-text-field label="Cantidad" v-model="stockToAdd" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeAddStockDialog">Cancelar</v-btn>
          <v-btn color="green" text @click="confirmAddStock">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-table>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import NewProductButton from './AddProductButton.vue';

const products = ref([]);
const product = ref({});
const productIdToAddStock = ref(null);
const addStockDialog = ref(false);
const stockToAdd = ref('');
const detailsDialog = ref(false);
const deleteDialog = ref(false);
const productIdToDelete = ref(null);

axios.get("http://localhost:3001/products").then(function (response) {
  products.value = response.data;
});

const openDetailsDialog = (id) => {
  detailsDialog.value = true;
  axios.get("http://localhost:3001/products/" + id).then(function (response) {
    product.value = response.data;
  });
};

const openDeleteDialog = (id) => {
  productIdToDelete.value = id;
  deleteDialog.value = true;
};

const openAddStockDialog = (id) => {
  productIdToAddStock.value = id;
  addStockDialog.value = true;
};

const closeAddStockDialog = () => {
  addStockDialog.value = false;
  stockToAdd.value = '';
};

const confirmAddStock = () => {
  if (productIdToAddStock.value && stockToAdd.value) {
    const stockToAddValue = parseInt(stockToAdd.value);
    const productToUpdate = products.value.find(product => product.id === productIdToAddStock.value);

    if (productToUpdate) {
      const updatedStock = parseInt(productToUpdate.stock) + stockToAddValue;
      
      axios.patch(`http://localhost:3001/products/${productIdToAddStock.value}`, { stock: updatedStock })
        .then(() => {
          closeAddStockDialog();
          fetchProducts();
        })
        .catch(error => {
          console.error("Error al agregar stock:", error);
          closeAddStockDialog();
        });
    } else {
      console.error("Producto no encontrado");
      closeAddStockDialog();
    }
  } else {
    closeAddStockDialog();
  }
};


const cancelDelete = () => {
  deleteDialog.value = false;
  productIdToDelete.value = null;
};

const confirmDelete = () => {
  if (productIdToDelete.value) {
    axios.delete(`http://localhost:3001/products/${productIdToDelete.value}`)
      .then(() => {
        fetchProducts();
        deleteDialog.value = false;
        productIdToDelete.value = null;
      })
      .catch(error => {
        console.error("Error al eliminar el producto:", error);
        deleteDialog.value = false;
        productIdToDelete.value = null;
      });
  }
};

const fetchProducts = () => {
  axios.get("http://localhost:3001/products").then(function (response) {
    products.value = response.data;
  });
};

fetchProducts();
</script>

<style scoped>
.new-sell-button {
  float: left;
  margin-top: 40px;
}
</style>
