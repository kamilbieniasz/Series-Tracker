<template>
  <div class="seriesItem" v-if="seriesItem.name">
    <img :src="seriesItem.image.medium" :alt="seriesItem.name" />
    <h2 class="title">
      {{seriesItem.name}}
    </h2>
    <div class="shortDescription">
      <div class="title">
        <strong>Title: </strong>
        <span>{{seriesItem.name}}</span>
      </div>

      <div class="rating" v-if="seriesItem.rating.average">
        <strong>Rating: </strong>
        <span>{{seriesItem.rating.average}}</span>
      </div>

      <div class="rating" v-if="seriesItem.type">
        <strong>Type: </strong>
        <span>{{seriesItem.type}}</span>
      </div>

      <Button class="moreInfoBtn p-button" @click="gotoSeriesDetails(seriesItem.id)">More</Button>

      <button class="favoriteBtn" @click="addToFavorite">
        <font-awesome-icon icon="star" type="far" class="starRegular" v-if="!favoriteStatus"></font-awesome-icon>
        <font-awesome-icon icon="star" type="fas" class="starSolid" v-if="favoriteStatus"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Series} from "@/interfaces/Series";
import FontAwesomeIcon from "@/libs/FontAwesomeIcon.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import Button from "primevue/button";

export default {
  name: "SeriesItem",
  components: {
    FontAwesomeIcon,
    Button
  },
  props: {
    seriesItem: Object as () => Series
  },
  setup() {
    const favoriteStatus = ref(false);

    const router = useRouter()

    const addToFavorite = () => {
      favoriteStatus.value = !favoriteStatus.value
    }

    const gotoSeriesDetails = (id: number) => {
      router.push({
        path: `/details/${id}`
      })
    }

    return {
      favoriteStatus,
      addToFavorite,
      gotoSeriesDetails
    }
  }
}
</script>

<style lang="scss" scoped>
  div.seriesItem {
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    transition: 300ms ease-in-out;
    position: relative;
    z-index: 50;

    &:hover {
      -webkit-box-shadow: 0 0 24px 0 rgba(66, 68, 90, 1);
      -moz-box-shadow: 0 0 24px 0 rgba(66, 68, 90, 1);
      box-shadow: 0 0 24px 0 rgba(66, 68, 90, 1);

      transform: scale(1.1);
      transition: 300ms ease-in-out;

      & > h2.title {
        transform: translateY(100%);
        transition: transform 300ms ease-in-out;
      }

      & > div.shortDescription {
        width: 100%;
        transition: 300ms ease-in-out;

        & > div.title {
          display: block;
        }

        & > button.moreInfoBtn {
          opacity: 1;
          transition: opacity 200ms 200ms ease-in-out;
        }
      }
    }

    & > img {
      width: 40%;
      object-fit: contain;
    }

    & > h2.title {
      width: 100%;
      min-height: 30%;
      bottom: 0;
      position: absolute;
      background-color: $color-white;
      opacity: 0.8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: $font-size-series-title;
      font-weight: bold;
      text-align: center;
      margin: 0;
      transition: transform 300ms ease-in-out;
    }

    & > div.shortDescription {
      width: 60%;
      background-color: $color-smoke;
      padding: 15px 35px 15px 15px;
      text-align: left;
      display: flex;
      flex-direction: column;

      & > div {
        margin: 5px 0;
      }

      & > div.title{
        display: none;
      }

      & > button.moreInfoBtn {
        position: absolute;
        bottom: 5px;
        right: 5px;
        opacity: 0;
      }

      & > button.favoriteBtn {
        top: 5px;
        right: 5px;
        position: absolute;
        background-color: transparent;
        border:none;
        cursor: pointer;

        & svg {
          width: 25px;
          height: 25px;
          color: $color-gold;
          -webkit-filter: drop-shadow( 0px 0px 2px rgba(0, 0, 0, .7));
          filter: drop-shadow( 0px 0px 2px rgba(0, 0, 0, .7));
        }
      }
    }
  }
</style>
