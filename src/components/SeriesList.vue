<template>
  <div class="seriesListWrapper">
    <div v-for="seriesItem in series" :key="seriesItem.id">
      <SeriesItem :seriesItem="seriesItem"></SeriesItem>
    </div>

  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';

import {getSeriesWithPagination} from '@/api/series';
import SeriesItem from "@/components/SeriesList/SeriesItem.vue";
import {Series} from "@/interfaces/Series";
import {AxiosResponse} from "axios";

export default {
  name: "series-list",
  components: {
    SeriesItem
  },
  setup() {
    const currentPage = ref(1);
    const series = ref<AxiosResponse<Series[] | []>>();

    onMounted(() => {
      getSeries();
    });

    const getSeries = () => {
      getSeriesWithPagination(currentPage.value).then(response => {
        series.value = response;
      });
    }

    return {series}
  }
}
</script>

<style scoped>

</style>
