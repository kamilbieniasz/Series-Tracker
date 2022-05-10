<template>
  <div class="seriesListWrapper">

  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';

import {getSeriesWithPagination} from '@/api/series';

export default {
  name: "series-list",
  components: {},
  setup() {
    const currentPage = ref(1);


    onMounted(() => {
      getSeries();
    });

    const getSeries = () => {
      getSeriesWithPagination(currentPage.value).then(response => {
        console.log('response', response);
      });
    }
  }
}
</script>

<style scoped>

</style>
