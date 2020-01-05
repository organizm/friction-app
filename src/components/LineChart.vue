<template>
  <GChart
    style="height: 600px"
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
export default {
  name: "LineChart",
  props: ["chartData", "chartOptions"]
};
</script>

<style scoped></style>
