<template>
  <div class="seriesDetailsWrapper" v-if="seriesDetails">
    <h2 class="title">
      <router-link to="/">
        <font-awesome-icon icon="angles-left"></font-awesome-icon>
        <span>Back to list</span>
      </router-link>
      <span>{{seriesDetails.name}}</span>
    </h2>
    <img :src="seriesDetails.image.original"/>

    <div class="description" v-if="seriesDetails.premiered">

      <div v-html="seriesDetails.summary">
      </div>

      <div v-if="seriesDetails.rating.average">
        <strong>Rating: </strong>
        <span>{{seriesDetails.rating.average}}</span>
      </div>

      <div v-if="seriesDetails.type">
        <strong>Type: </strong>
        <span>{{seriesDetails.type}}</span>
      </div>

      <div v-if="seriesDetails.genres.length > 0">
        <strong>Genres: </strong>
        <ul>
          <li v-for="(genre, index) in seriesDetails.genres" :key="index">
            {{genre}}
          </li>
        </ul>
      </div>

      <div v-if="seriesDetails.premiered">
        <strong>Premiered date: </strong>
        <span>{{seriesDetails.premiered}}</span>
      </div>

      <div v-if="seriesDetails.status">
        <strong>Status: </strong>
        <span>{{seriesDetails.status}}</span>
      </div>

      <div v-if="seriesDetails.network.name">
        <strong>Channel: </strong>
        <span>{{seriesDetails.network.name}}</span>
      </div>

      <div v-if="seriesDetails.status === 'Ended' && seriesDetails.ended">
        <strong>Ended date: </strong>
        <span>{{seriesDetails.ended}}</span>
      </div>

      <div v-if="seriesDetails.status !== 'Ended' && seriesDetails.schedule">
        <strong>Genres: </strong>
        <ul>
          <li v-for="(schedule, index) in seriesDetails.schedule.days" :key="index">
            {{schedule}} - {{seriesDetails.schedule.time}}
          </li>
        </ul>
      </div>

      <div v-if="seriesDetails.officialSite">
        <strong>Official site: </strong>
        <a :href="seriesDetails.officialSite">{{seriesDetails.officialSite}}</a>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

import {getSeriesDetails} from '@/api/series';
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {AxiosResponse} from "axios";
import {Series} from "@/interfaces/Series";

export default {
  name: "SeriesDetails",
  components: {},
  setup() {
    const route = useRoute();
    const seriesDetails = ref<AxiosResponse<Series>>();

    onMounted(() => {
      getSeriesDetailsInfo();
    })

    const getSeriesDetailsInfo = () => {
      if(route.params.id) {
        getSeriesDetails(route.params.id.toString()).then(response => {
          console.log('response', response);
          seriesDetails.value = response
        })
      }
    }

    return {seriesDetails}
  }
}
</script>

<style lang="scss" scoped>
  div.seriesDetailsWrapper {
    max-height: 100vh;
    display: grid;
    grid-template-areas: "title title"
                         "image description";
    grid-template-columns: 50% 50%;

    & > h2.title {
      grid-area: title;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      & > a {
        display: flex;
        align-items: center;
        margin: 0 10px;
        text-decoration: none;
        color: $color-black;
        transition: transform 300ms ease-in-out;

        &:hover {
          transform: scale(1.1);
          transition: transform 300ms ease-in-out;
        }

        & > span {
          white-space: nowrap;
        }

        & > svg {
          width: 25px;
          height: 25px;
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

    & > div.description {
      grid-area: description;
      padding: 10px;
      text-align: left;
      display: flex;
      flex-direction: column;

      & > div {
        margin: 5px 0;
        font-size: $font-size-normal;
      }
    }
  }
</style>
