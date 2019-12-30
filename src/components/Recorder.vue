<template
  ><div class="recorder__wrapper">
    <div class="recorder__body">
      <div class="recorder__header"><h3>Recorder</h3></div>
      <div class="recorder__content">{{ port }}</div>
    </div>
  </div></template
>

<script>
import { onMounted } from "@vue/composition-api";
import SerialPort from "serialport";
export default {
  name: "Recorder",
  props: ["port"],
  setup({ port }) {
    onMounted(async () => {
      console.log(port);
      const connection = new SerialPort(port);
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
