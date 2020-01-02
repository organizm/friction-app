<template
  ><div class="recorder__wrapper">
    <div class="recorder__body">
      <div class="recorder__header"><h3>Recorder</h3></div>
      <div class="recorder__content">{{ port }}</div>
      <GChart
        type="LineChart"
        :data="chart.chartData"
        :options="chart.chartOptions"
      />
    </div></div
></template>

<script>
import { reactive, onMounted, onUnmounted } from "@vue/composition-api";
import SerialPort from "serialport";
const Readline = require("@serialport/parser-readline");

export default {
  name: "Recorder",
  components: {},
  props: ["port"],
  setup({ port }) {
    let i = 20;
    const chart = reactive({
      chartData: [
        ["Time", "frict"],
        [0, 0],
        [1, 10],
        [2, 23],
        [3, 17]
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    });
    let connection = {};
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    setInterval(() => {
      chart.chartData.push([i, getRandomInt(100)]);
      i++;
      console.log(chart.chartData);
    }, 1000);
    onMounted(async () => {
      connection = new SerialPort(port);
      const parser = connection.pipe(new Readline({ delimiter: "\r\n" }));
      parser.on("data", console.log);
    });
    onUnmounted(() => {
      if (connection.isOpen) {
        connection.close();
      }
    });

    return {
      chart
    };
  }
};
</script>

<style scoped>
.recorder__wrapper {
  padding: 20px;
  width: 100%;
  display: flex;
}
.recorder__body {
  width: 100%;
  background: white;
}
</style>
