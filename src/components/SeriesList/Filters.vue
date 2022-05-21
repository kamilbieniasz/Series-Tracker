<template>
  <div class="filterWrapper">

    <div>
      <label for="searchTitle">Search by title</label>
      <InputText id="searchTitle" type="search" @input="emitFilters" v-model="filters.title" placeholder="Series title" />
    </div>

    <div>
      <label for="sortBy">Sort by</label>
      <Dropdown id="sortBy" v-model="filters.options" :options="sortingOptions" optionLabel="name" @change="emitFilters"></Dropdown>
    </div>

    <div>
      <label for="sortType">Sort type</label>
      <Dropdown id="sortType" v-model="filters.type" :options="sortingType" optionLabel="name" @change="emitFilters"></Dropdown>
    </div>

  </div>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';

export default {
  name: "FilterComponent",
  components: {
    InputText,
    Dropdown
  },
  setup(props: any, {emit}: any) {

    const filters = ref({
      title: '',
      options: { name: 'Title' },
      type: { name: 'Ascending'}
    });

    const sortingOptions = ref([
      {
        name: 'Title'
      },
      {
        name: 'Rating'
      }
    ]);

    const sortingType = ref([
      {
        name: 'Ascending'
      },
      {
        name: 'Descending'
      }
    ]);

    onMounted(() => {
      emit('filters', filters.value);
    })

    const emitFilters = (title: string) => {
      console.log('title', title, filters.value);

      emit('filters', filters.value);
    }

    return {
      emitFilters,
      sortingOptions,
      sortingType,
      filters,
    };
  }
}
</script>

<style lang="scss" scoped>
  div.filterWrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    @include respond-to(min-width, 1024px) {
      flex-direction: row;
      justify-content: space-evenly;
      margin: 10px 0;
    }

    & > div {
      display: flex;
      align-items: center;
      margin: 10px 0;

      & > label {
        padding: 0 10px;
      }

      ::v-deep .p-dropdown, .p-inputtext {
        min-width: 210px;
      }
    }
  }
</style>
