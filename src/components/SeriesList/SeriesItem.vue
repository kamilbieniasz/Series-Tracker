<template>
  <div class="seriesItem">
    <img :src="seriesItem.image.medium" :alt="seriesItem.name" />
    <div class="shortDescription">
      <h2>
        {{seriesItem.name}}
      </h2>
      <div class="info">
        <div>
          <span>{{seriesItem.rating.average ? seriesItem.rating.average : 'Brak'}}</span>
          <span>Ocena</span>
        </div>
        <div>
          <span>{{seriesItem.type}}</span>
          <span>Rodzaj</span>
        </div>
        <div>
          <span>{{seriesItem.network.name}}</span>
          <span>Kanał</span>
        </div>
        <div>
          <span>{{seriesItem.premiered}}</span>
          <span>Premiera</span>
        </div>
        <div>
          <span>{{seriesItem.status}}</span>
          <span>Status</span>
        </div>
        <div>
          <span><font-awesome-icon icon="ellipsis" /></span>
          <span>Więcej</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Series} from "@/interfaces/Series";
import FontAwesomeIcon from "@/libs/FontAwesomeIcon.vue";

export default {
  name: "SeriesItem",
  components: {FontAwesomeIcon},
  props: {
    seriesItem: Object as () => Series
  },
}
</script>

<style lang="scss" scoped>
  div.seriesItem {
    height: 100%;
    display: flex;
    flex-direction: column;

    & > img {
      width: 100%;
      object-fit: contain;
    }

    & > div.shortDescription {
      width: 100%;
      bottom: 0;
      background-color: $color-white;
      opacity: 0.8;
      display: flex;
      flex-direction: column;

      & > h2 {
        font-size: $font-size-series-title;
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
      }

      & > div.info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 100%;

        & > div {
          width: 100%;
          //height: 100%;
          border: 2px solid $color-black;
          display: flex;
          flex-direction: column;
          justify-content: center;

          & > span {
            margin: 5px 0;

            & svg {
              height: 30px;
            }
          }
        }
      }

    }
  }
</style>
