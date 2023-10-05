<template>
    <div>
      <NavBar class="nav-bar" />
      <div class="report-container">
        <h1 class="title">Reporte de Ventas</h1>
        <div class="report-content">
          <div class="left-content">

            <div class="totals">
              <div class="income">
                <h2 class="subtitle">Ingresos Totales</h2>
                <div class="total green-text">{{ totalIncome }}</div>
              </div>
              <div class="costs">
                <h2 class="subtitle">Costos Totales</h2>
                <div class="total red-text">{{ totalCosts }}</div>
              </div>
            </div>
            <h2 class="subtitle">Ganancias Totales</h2>
            <div class="total-gain" :class="{'green-text': totalGain > 0, 'red-text': totalGain < 0, 'black-text': totalGain === 0}">
              {{ totalGain }}
            </div>
            <h2 class="subtitle">Cantidad de Ventas</h2>
            <div class="total">{{ totalSales }}</div>
            <h2 class="subtitle">Cliente Más Recurrente</h2>
            <div class="total">{{ mostFrequentClientName }}</div>
          </div>
          <div class="right-content">
        <h2 class="subtitle">Productos Vendidos</h2>
        <div class="products-container">
            <div v-for="(product, index) in products" :key="index" class="product-item">
                <div class="product-info">
                    <h3 class="product-title">{{ product.name }}</h3>
                </div>
                <div class="product-quantity">{{ product.quantity }}</div>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import NavBar from "./NavBar.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const totalIncome = ref(0);
const totalGain = ref(0);
const totalCosts = ref(0);
const totalSales = ref(0);
const mostFrequentClientId = ref("");
const mostFrequentClientName = ref("");
const products = ref([]);
const clients = ref([]);
let mostFrequentClient = {}; // Definir fuera de las funciones

onMounted(async () => {
  try {
    // Fetch data
    const [sellsResponse, clientsResponse, productsResponse] = await Promise.all([
      axios.get("http://localhost:3001/sells"),
      axios.get("http://localhost:3001/clients"),
      axios.get("http://localhost:3001/products")
    ]);

    // Process data
    const sells = sellsResponse.data;
    clients.value = clientsResponse.data;
    const productsData = productsResponse.data;

    totalIncome.value = calculateTotalIncome(sells);
    totalCosts.value = calculateTotalCosts(productsData);
    totalGain.value = totalIncome.value - totalCosts.value;
    totalSales.value = sells.length;

    mostFrequentClient = findMostFrequentClient(sells);
    mostFrequentClientId.value = mostFrequentClient.id;
    mostFrequentClientName.value = findClientNameById(mostFrequentClient.id);

    products.value = calculateProductSales(productsData, sells);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

  function calculateTotalIncome(sells) {
    return sells.reduce((total, sell) => total + parseFloat(sell.total), 0);
  }
  
  function calculateTotalCosts(products) {
    return products.reduce((total, product) => total + product.productionCost * product.stock, 0);
  }
  
  function findMostFrequentClient(sells) {
  const clientSalesCounts = {};
  sells.forEach((sell) => {
    const clientId = sell.client_id;
    if (clientSalesCounts[clientId]) {
      clientSalesCounts[clientId].count++;
    } else {
      clientSalesCounts[clientId] = {
        id: clientId,
        count: 1,
        name: findClientNameById(clientId),
      };
    }
  });

  const mostFrequentClient = Object.values(clientSalesCounts).reduce((a, b) =>
    a.count > b.count ? a : b
  );

  return mostFrequentClient;
}
  

function findClientNameById(clientId) {
  const foundClient = mostFrequentClient.id === clientId ? mostFrequentClient : clients.value.find((client) => client.id === clientId);
  return foundClient ? foundClient.name : "Cliente Desconocido";
}

  
  function calculateProductSales(products, sells) {
    return products.map((product) => {
      const productSellCount = sells.reduce((total, sell) => {
        if (sell.product_id === product.id) {
          total += parseInt(sell.quantity);
        }
        return total;
      }, 0);
      return { name: product.name, quantity: productSellCount };
    });
  }
  </script>
  
  <style scoped>
  .report-content {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .left-content{
    flex: 1;
    text-align: center;
    padding: 0 20px;
  }
  .right-content {
    flex: 1;
    text-align: center;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.product-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 200px; /* Ancho de cada producto */
}
.product-info {
    text-align: left;
}
.product-title {
    font-size: 16px;
    margin-bottom: 5px;
}
  
  .product-quantity {
    font-size: 20px;
    margin-top: 5px;
    text-align: center;
  }
  
  .left-content {
    text-align: left;
  }
  
  .right-content {
    text-align: right;
  }
  
  .title {
    font-size: 100px;
    margin-bottom: 20px;
    margin-top: auto;
    text-align: center;
  }
  
  .subtitle {
    font-size: 36px;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .totals {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    text-align: center;
  }
  
  .income,
  .costs {
    margin: 0 20px;
  }
  
  .total,
  .total-gain,
  .best-selling-product {
    font-size: 28px;
    margin-top: 10px;
    text-align: center;
  }
  
  .green-text {
    color: green;
  }
  
  .red-text {
    color: red;
  }
  
  .black-text {
    color: black;
  }
  </style>
  