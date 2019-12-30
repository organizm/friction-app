<template>
  <div class="main-screen">
    <Header :ports-list="state.portsList" @change="onPortSelected" />
    <Recorder v-if="state.selectedPort" :port="state.selectedPort" />
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import SerialPort from "serialport";
import Header from "./Header";
import Recorder from "./Recorder";

export default {
  components: { Recorder, Header },
  setup() {
    const state = reactive({
      portsList: [],
      selectedPort: ""
    });

    onMounted(async () => {
      state.portsList = await SerialPort.list();
      console.log(state.portsList);
    });

    function onPortSelected(port) {
      state.selectedPort = port;
    }

    return {
      state,
      onPortSelected
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-screen {
  background: #aaaaaa;
  height: 100vh;
}
</style>
