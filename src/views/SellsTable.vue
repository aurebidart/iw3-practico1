<template>
  <div class="sells-table">
    <div class="date-filter">
      <label>Filtrar por fecha:</label>
      <div class="date-input-container">
        <input type="date" v-model="selectedDate" @input="filterSells" class="date-input" />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="text-left" style="width: 10%;">Fecha</th>
            <th class="text-left" style="width: 20%;">Producto</th>
            <th class="text-left" style="width: 20%;">Cliente</th>
            <th class="text-left" style="width: 10%;">Cantidad</th>
            <th class="text-left" style="width: 10%;">Total venta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sell in filteredSells" :key="sell.id">
            <td>{{ formatDate(sell.date) }}</td>
            <td>{{ getProductInfo(sell.product_id).name }}</td>
            <td>{{ getClientName(sell.client_id) }}</td>
            <td>{{ sell.quantity }}</td>
            <td><span>$</span>{{ sell.total }}</td> <!-- Agregamos el signo "$" -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const sells = ref([]);
const clients = ref([]);
const products = ref([]);
const selectedDate = ref(null);

async function fetchData() {
  try {
    const [clientsResponse, sellsResponse, productsResponse] = await Promise.all([
      axios.get("http://localhost:3001/clients"),
      axios.get("http://localhost:3001/sells"),
      axios.get("http://localhost:3001/products"),
    ]);

    clients.value = clientsResponse.data;
    sells.value = sellsResponse.data;
    products.value = productsResponse.data;

    // Inicialmente, muestra todas las ventas
    filteredSells.value = sells.value;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

onMounted(() => {
  fetchData();
});

function getProductInfo(id) {
  return products.value.find((product) => product.id === id);
}

function getClientName(id) {
  const client = clients.value.find((client) => client.id === id);
  return client ? client.name : "Cliente desconocido";
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const filteredSells = ref([]);

function filterSells() {
  if (!selectedDate.value) {
    // Mostrar todas las ventas
    filteredSells.value = sells.value;
  } else {
    const formattedDate = new Date(selectedDate.value).toISOString().split("T")[0];
    filteredSells.value = sells.value.filter((sell) => {
      const sellDate = new Date(sell.date).toISOString().split("T")[0];
      return sellDate === formattedDate;
    });
  }
}

// Filtrar inicialmente al cargar la página
filterSells();
</script>

<style scoped>
.sells-table {
  max-width: 100%;
  padding: 20px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}

.date-filter {
  float: left;
  margin-right: 20px;
  margin-bottom: 10px;
}

.date-input-container {
  min-width: 100px; /* Ancho mínimo ajustado según tus necesidades */
}

.date-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f7f7f7;
}

/* Estilo alternado para filas de la tabla */
tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>