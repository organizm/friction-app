<template>
  <ul class="nav">
    <li class="nav-item">
      <label for="ports">Ports</label>
    </li>
    <li class="nav-item select-wrapper">
      <select name="ports" id="ports" @change="onChange">
        <option value="">Select port</option>
        <option v-for="(port, key) in portsList" :key="key" :value="port.path"
          >{{ port.path }} {{ key }}</option
        >
      </select>
    </li>
    <li class="nav-item" v-if="!!state.arduino && !!state.arduino.manufacturer">
      {{ state.arduino.manufacturer }}
    </li>
  </ul>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "Header",
  props: ["portsList"],
  setup({ portsList }, context) {
    const state = reactive({ arduino: {} });
    function onChange({ target }) {
      context.emit("change", target.value);
      state.arduino = portsList.find(({ path }) => path === target.value);
    }

    return {
      state,
      onChange
    };
  }
};
</script>

<style scoped>
.nav {
  background: white;
}
.nav-item {
  padding: 0.5rem 0.25rem;
}
.nav-item label {
  font-weight: bold;
  margin: 0;
}
</style>
