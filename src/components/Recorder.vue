<template>
  <div class="recorder__wrapper">
    <div class="recorder__body">
      <div class="recorder__header row">
        <div class="col-1">Recorder</div>
        <div class="col-2">
          Pulse: <b>{{ pulse.vol }} V</b>
        </div>
        <div class="col-2">
          <button @click="btnStart" class="btn btn-success">
            {{ write ? "Stop" : "Start" }}
          </button>
        </div>
        <div class="col-2">
          <button @click="btnSave" class="btn btn-info">
            Save
          </button>
        </div>
      </div>
      <line-chart :chart-data="chart.chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script>
const { dialog } = require("electron").remote;
import fs from "fs";
import { ref, reactive, onMounted, onUnmounted } from "@vue/composition-api";
import SerialPort from "serialport";
const Readline = require("@serialport/parser-readline");
import dayjs from "dayjs";
import LineChart from "./LineChart";

export default {
  name: "Recorder",
  components: { LineChart },
  props: ["port"],
  setup({ port }) {
    const chartOptions = {
      title: "Company Performance"
    };
    let write = ref(false);
    const pulse = reactive({
      vol: 0
    });
    const chart = reactive({
      chartData: [
        ["Time", "friction"],
        [0, 0]
      ]
    });
    let connection = {};

    function btnStart() {
      write.value = !write.value;
    }
    async function btnSave() {
      // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
      console.log("Hello");
      const { canceled, filePath } = await dialog.showSaveDialog(null);
      if (filePath === undefined && canceled) {
        console.log("You didn't save the file");
        return;
      }
      const content = JSON.stringify({
        chartData: chart.chartData,
        date: dayjs().format("YYYY-MM-DD HH:mm:ss")
      });
      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(`${filePath}.json`, content, err => {
        if (err) {
          alert("An error ocurred creating the file " + err.message);
        }

        alert("The file has been succesfully saved");
      });
    }
    onMounted(async () => {
      connection = new SerialPort(port);
      const parser = connection.pipe(new Readline({ delimiter: "\r\n" }));
      parser.on("data", data => {
        const point = processData(data, chart.chartData);
        pulse.vol = point[1];
        if (write.value) {
          chart.chartData.push(point);
        }
      });
    });
    onUnmounted(() => {
      if (connection.isOpen) {
        connection.close();
      }
    });

    return {
      chart,
      chartOptions,
      pulse,
      write,
      btnStart,
      btnSave
    };
  }
};
function processData(data, chartData) {
  const point = data.split("/").map(parseFloat);
  const prev = chartData[chartData.length - 1];
  return [prev[0] + point[1], point[0]];
}
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
