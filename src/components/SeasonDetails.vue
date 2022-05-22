<template>
  <div class="seasonDetails" v-if="selectedSeason">
    <h2 class="title">
      <router-link class="p-button" :to="'/details/' + seriesId">
        <font-awesome-icon icon="angles-left"></font-awesome-icon>
        <span>Back to series</span>
      </router-link>
      <span v-if="selectedSeason?.name">{{selectedSeason.name}}</span>
    </h2>

    <img :src="selectedSeason.image.original" :alt="selectedSeason.id + '_' +selectedSeason.name"/>

    <div class="description">

      <div v-html="selectedSeason?.summary"></div>

      <div v-if="selectedSeason?.network?.name">
        <strong>Channel: </strong>
        <span>{{selectedSeason.network.name}}</span>
      </div>

      <div v-if="selectedSeason?.premiereDate">
        <strong>Premiered date: </strong>
        <span>{{selectedSeason.premiereDate}}</span>
      </div>

      <div v-if="selectedSeason?.premiereDate">
        <strong>Premiered date: </strong>
        <span>{{selectedSeason.premiereDate}}</span>
      </div>

      <div v-if="selectedSeason?.url">
        <a class="p-button" :href="selectedSeason.url">See more</a>
      </div>

    </div>

    <episodes-component class="episodes"></episodes-component>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {getSeasonList} from '@/api/series';
import {useRoute} from "vue-router";
import {Season} from "@/interfaces/Season";
import EpisodesComponent from "@/components/seasonDetails/Episodes.vue";

export default {
  name: "SeasonDetails",
  components: {EpisodesComponent},
  setup() {
    const route = useRoute();
    const selectedSeason = ref<Season>();
    const seriesId = ref('');

    onMounted(() => {
      getSeason();
      seriesId.value = route.params.id.toString()
      console.log('router', route);
    })

    const getSeason = () => {
      getSeasonList(route.params.id.toString()).then(res => {
        res.map(season => {
          if(season.id.toString() === route.params.seasonId) {

            selectedSeason.value = season;

            console.log('selectedSeason', selectedSeason.value);
          }
        })
      }).catch(error => {
        console.log('error', error);
      })
    }

    return {
      selectedSeason,
      seriesId
    }
  }
}
</script>

<style lang="scss" scoped>
.seasonDetails {
  max-height: 100vh;
  display: grid;
  grid-template-areas: "title"
                       "image"
                       "description"
                       "episodes";
  grid-template-columns: 100%;
  padding: 5px;

  @include respond-to(min-width, 768px) {
    grid-template-areas: "title title"
                           "image description"
                           "episodes episodes";
    grid-template-columns: 50% 50%;
  }

  & > h2.title {
    grid-area: title;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    @include respond-to(min-width, 768px) {
      flex-direction: row;
      align-items: center;
    }

    & > a {
      display: flex;
      align-items: center;
      margin: 10px;
      text-decoration: none;
      color: $color-white;
      transition: transform 300ms ease-in-out;
      align-self: flex-start;

      @include respond-to(min-width, 768px) {
        margin: 0 10px;
      }

      &:hover {
        transform: scale(1.1);
        transition: transform 300ms ease-in-out;
      }

      & > span {
        white-space: nowrap;
      }

      & > svg {
        width: 15px;
        height: 15px;
      }
    }

    & > span {
      flex-grow: 1;
      text-align: center;
    }
  }

  & > img {
    width: 100%;
    max-height: 800px;
    grid-area: image;
    justify-self: center;
    object-fit: contain;
  }

  & > .description {
    grid-area: description;
    padding: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;

    & > div {
      margin: 5px 0;
      font-size: $font-size-normal;

      ::v-deep p {
        text-align: justify;

        @include respond-to(min-width, 768px) {
          text-align: left;
        }
      }

      & > a {
        overflow-wrap: break-word;
        text-decoration: none;
      }
    }
  }

  & > .episodes {
    grid-area: episodes;
  }
}
</style>
