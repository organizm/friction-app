import { ref } from "@vue/composition-api";

export function usePortsList() {
  const portsList = ref(["111", "222"]);
  function pushList(value) {
    portsList.value.push(value);
    console.log("portsList.value", portsList.value);
  }
  return { portsList, pushList };
}
