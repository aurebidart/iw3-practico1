<template>
    <div>
      <NavBar />
      <div class="accountancy">
        <h1 class="title">Ganancias Totales</h1>
        <div :class="['total-gain', { 'green-text': totalGain > 0, 'red-text': totalGain < 0, 'black-text': totalGain === 0 }]">
          {{ totalGain }}
        </div>
        <div class="totals">
          <div class="income">
            <h2 class="subtitle">Ingresos Totales</h2>
            <div class="total-income green-text">{{ totalIncome }}</div>
          </div>
          <div class="costs">
            <h2 class="subtitle">Costos Totales</h2>
            <div class="total-costs red-text">{{ totalCosts }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .accountancy {
    text-align: center;
    margin-top: 50px;
  }
  
  .title {
    font-size: 50px;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 40px;
    margin-bottom: 10px;
  }
  
  .total-gain {
    font-size: 50px;
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
  
  .totals {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .income,
  .costs {
    margin: 0 20px;
  }
  
  .total-income,
  .total-costs {
    font-size: 40px;
    margin-top: 10px;
  }
  </style>
  
  <script setup>
  import NavBar from "./NavBar.vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const totalIncome = ref(0);
  const totalGain = ref(0);
  const totalCosts = ref(0);
  
  onMounted(() => {
    axios.get("http://localhost:3001/sells").then((response) => {
      const sells = response.data;
      axios.get("http://localhost:3001/products").then((response) => {
        const products = response.data;
        totalIncome.value = calculateTotalIncome(sells);
        totalCosts.value = calculateTotalCosts(products);
        totalGain.value = totalIncome.value - totalCosts.value; // Calculating gains
      });
    });
  });
  
  function calculateTotalIncome(sells) {
    let totalIncome = 0;
  
    sells.forEach((sell) => {
      totalIncome += parseFloat(sell.total);
    });
  
    return totalIncome;
  }
  
  function calculateTotalCosts(products) {
    let totalCosts = 0;
  
    products.forEach((product) => {
      totalCosts += product.productionCost * product.stock;
    });
  
    return totalCosts;
  }
  </script>
  