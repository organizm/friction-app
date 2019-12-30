<template>
  <div class="hello">
    <h1>{{ msgText }}</h1>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import SerialPort from "serialport";

export default {
  props: ["msg"],
  setup({ msg }) {
    const msgText = ref(msg);

    onMounted(async () => {
      const list = await SerialPort.list();
      console.log(list);
    });
    return {
      msgText
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
</style>
