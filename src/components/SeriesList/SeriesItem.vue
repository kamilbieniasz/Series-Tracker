<template>
  <div>

  </div>
</template>

<script lang="ts">
import {onMounted} from "vue";
import {Series} from "@/interfaces/Series";

export default {
  name: "SeriesItem",
  components: {},
  props: {
    seriesItem: Object as () => Series
  },
  setup(props: any) {

    onMounted(() => {
      console.log('test', props);
    })
  }
}
</script>

<style scoped>

</style>
