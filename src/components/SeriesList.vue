<template>
  <div id="seriesListWrapper" v-if="series">
    <FilterComponent @filters="onFiltersChange"></FilterComponent>

    <div class="seriesListGrid">
      <div v-for="seriesItem in paginatedSeries" :key="seriesItem.id">
        <SeriesItem :seriesItem="seriesItem"></SeriesItem>
      </div>
    </div>

    <Paginator :rows="itemsPerPage" :totalRecords="paginationSize" @page="pagination($event)"></Paginator>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';

import {getSeriesWithPagination} from '@/api/series';
import SeriesItem from "@/components/SeriesList/SeriesItem.vue";
import {Series} from "@/interfaces/Series";
import Paginator from 'primevue/paginator';
import {Pagination} from "@/interfaces/Pagination";
import FilterComponent from "@/components/SeriesList/Filters.vue";
import {Filters} from "@/interfaces/Filters";
import {nextTick} from "vue";

export default {
  name: "series-list",
  components: {
    FilterComponent,
    SeriesItem,
    Paginator
  },
  setup() {
    const filters = ref();
    const paginationSize = ref<number | undefined>(0);
    const currentPage = ref(0);
    const itemsPerPage = ref(40);
    const paginatedSeries = ref<Series[] | []>();
    const series = ref<Series[] | []>();

    onMounted(() => {
      getSeries();
    });

    const getSeries = () => {
      getSeriesWithPagination().then(async response => {
        series.value = response;
        paginatedSeries.value = response;
        paginationSize.value = series.value?.length;

        //wait for child components
        await nextTick();

        pagination();
      });
    }

    const pagination = (event: Pagination | null = null) => {
      if(event) {
        currentPage.value = event.page;
      }

      paginatedSeries.value = series.value;

      applyFilters();

      const from = itemsPerPage.value * currentPage.value;
      const to = (1 + currentPage.value) * itemsPerPage.value;

      console.log('from - to', from, to);

      paginatedSeries.value = paginatedSeries.value?.slice(from, to)
    }

    const onFiltersChange = (event: Filters) => {

      filters.value = event;
      applyFilters();
    }

    const applyFilters = (event: Filters = filters.value) => {

      console.log('event', event);
      console.log('filters', filters.value);

      if(event.title) {
        paginatedSeries.value = series.value?.filter(series => series.name.toLowerCase().includes(event.title.toLowerCase()));
        paginationSize.value = paginatedSeries.value?.length;
      } else {
        paginationSize.value = series.value?.length;
      }

      paginatedSeries.value?.sort((a, b): any => {
        switch(event.options.name) {
          case 'Title':
            return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;

          case 'Rating':
            return a.rating.average === b.rating.average ? 0 : a.rating.average < b.rating.average ? -1 : 1;
        }
      });

      if(event.type.name === 'Descending') {
        paginatedSeries.value?.reverse();
      }

      console.log('paginatedSeries', paginationSize);

    }

    return {
      series,
      itemsPerPage,
      paginatedSeries,
      pagination,
      onFiltersChange,
      paginationSize
    }
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
