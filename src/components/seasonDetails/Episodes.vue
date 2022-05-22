<template>
  <div class="episodesWrapper">
    <Accordion>
      <AccordionTab v-for="(episode, index) in episodesList" :key="episode.id" :header="'Episode ' + (index + 1)">
        <img v-if="episode?.image?.medium" :src="episode.image.medium" :alt="episode.id + ' ' + episode.name" />
        <div class="description">

          <div v-if="episode?.summary" v-html="episode.summary"></div>

          <div v-if="episode?.rating?.average">
            <strong>Rating: </strong>
            <span>{{episode.rating.average}} / 10</span>
          </div>

          <div v-if="episode.runtime">
            <strong>Time: </strong>
            <span>{{episode.runtime}} min</span>
          </div>

          <div v-if="episode?.airdate && episode?.airtime">
            <strong>Premiered date: </strong>
            <span>{{episode.airdate}} {{episode.airtime}}</span>
          </div>

          <div v-if="episode?.url">
            <a class="p-button" :href="episode.url">See more</a>
          </div>

        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {Episode} from "@/interfaces/Episode";
import {getEpisodesList} from "@/api/series";
import {useRoute} from "vue-router";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default {
  name: "EpisodesComponent",
  components: {
    Accordion,
    AccordionTab
  },
  setup() {
    const route = useRoute();
    const episodesList = ref<Episode[]>();

    onMounted(() => {
      getEpisodes();
    });

    const getEpisodes = () => {
      getEpisodesList(route.params.seasonId.toString()).then(res => {
        episodesList.value = res;
        console.log('res', res)
      }).catch(error => {
        console.log('error: ', error);
      })
    }
    return {
      episodesList
    }
  }
}
</script>

<style lang="scss" scoped>
div.episodesWrapper {
  padding: 15px;
  width: 100%;
  justify-self: center;

  @include respond-to(min-width, 768px) {
    width: 90%;
    padding: 0;
    margin: 15px 0;
  }

  & ::v-deep div.p-accordion-content {
    display: flex;
    flex-direction: column;

    @include respond-to(min-width, 768px) {
      flex-direction: row;
    }

    & img {
      object-fit: contain;
    }

    & div.description {
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      & > div {
        text-align: left;
        margin: 3px 0;

        & > p {
          text-align: center;

          @include respond-to(min-width, 768px) {
            text-align: left;
          }
        }
      }

      & a {
        text-decoration: none;
        margin: 10px 0;
        text-align: left;
        align-self: flex-start;
      }
    }
  }
}
</style>
