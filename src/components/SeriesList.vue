<template>
  <div id="seriesListWrapper" v-if="series">
    <div class="seriesListGrid">
      <div v-for="seriesItem in paginatedSeries" :key="seriesItem.id">
        <SeriesItem :seriesItem="seriesItem"></SeriesItem>
      </div>
    </div>

    <Paginator :rows="itemsPerPage" :totalRecords="series.length" @page="pagination($event)"></Paginator>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';

import {getSeriesWithPagination} from '@/api/series';
import SeriesItem from "@/components/SeriesList/SeriesItem.vue";
import {Series} from "@/interfaces/Series";
import Paginator from 'primevue/paginator';
import {Pagination} from "@/interfaces/Pagination";

export default {
  name: "series-list",
  components: {
    SeriesItem,
    Paginator
  },
  setup() {
    const currentPage = ref(0);
    const itemsPerPage = ref(60);
    const paginatedSeries = ref<Series[] | []>();
    const series = ref<Series[] | []>();

    onMounted(() => {
      getSeries();
    });

    const getSeries = () => {
      getSeriesWithPagination().then(response => {
        series.value = response;
        paginatedSeries.value = response;

        pagination()
      });
    }

    const pagination = (event: Pagination | null = null) => {
      if(event) {
        currentPage.value = event.page;
      }
      paginatedSeries.value = series.value;

      const from =  itemsPerPage.value * currentPage.value;
      const to =  (1 + currentPage.value) * itemsPerPage.value;

      paginatedSeries.value = paginatedSeries.value?.slice(from, to)
    }

    return {series, itemsPerPage, paginatedSeries, pagination}
  }
}
</script>

<style lang="scss" scoped>
div#seriesListWrapper {

  div.seriesListGrid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    padding: 20px;

    @include respond-to(min-width, 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(min-width, 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-to(min-width, 1366px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

</style>
