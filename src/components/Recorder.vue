<template
  ><div class="recorder__wrapper">
    <div class="recorder__body">
      <div class="recorder__header"><h3>Recorder</h3></div>
      <div class="recorder__content">{{ port }}</div>
    </div>
  </div></template
>

<script>
import { onMounted, onUnmounted } from "@vue/composition-api";
import SerialPort from "serialport";
const Readline = require("@serialport/parser-readline");

export default {
  name: "Recorder",
  props: ["port"],
  setup({ port }) {
    let connection = {};
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
  }
};
</script>

<style scoped>
.recorder__wrapper {
  padding: 20px;
  position: absolute;
  width: 100%;
  top: 43px;
  bottom: 0;
  left: 0;
  display: flex;
}
.recorder__body {
  width: 100%;
  background: white;
}
</style>
