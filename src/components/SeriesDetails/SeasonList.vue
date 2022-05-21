<template>
  <div class="seasonsWrapper">
    <h2>Seasons:</h2>
    <div>
      <button @click="sliderMove('left')">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </button>

      <div class="seasonsItems">
        <div class="seasonsItem" v-for="season in seasons" :key="season.id" @mouseover="activeDescription($event)" @mouseleave="dissactiveDescription($event)">
          <div class="description" v-html="season.summary"></div>
          <img :src="season.image.medium" :alt="season.id + season.name"/>
        </div>
      </div>

      <button @click="sliderMove('right')">
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {getSeasonList} from "@/api/series";
import {Season} from "@/interfaces/Season";

export default {
  name: "AlteranteList",
  components: {},
  props: {
    seriesId: Number
  },
  setup(props: any) {

    const seasons = ref<Season[]>();
    const seasonsItems = ref();

    onMounted(() => {
      seasonsItems.value = document.querySelector('.seasonsItems');

      console.log('seasonsItems', seasonsItems.value.scrollLeft);

      getSeasons();
    });

    const getSeasons = () => {
      if(props.seriesId){
        getSeasonList(props.seriesId).then(response => {
          seasons.value = response;
          console.log('response', response);

          seasons.value?.map(season => {
            if(season.summary.split('</p>').length > 1) {
              season.summary = season.summary.split('</p>')[0] + '</p>';
            }
          })


        }).catch(error => {
          console.log('error: ', error);
        });
      }
    }

    const sliderMove = (side: string) => {
      let scrollPos = seasonsItems.value.scrollLeft;

      if(side === 'left') {
        scrollPos -= 500;

      } else {
        scrollPos += 500;
      }

      seasonsItems.value.scrollTo({
        behavior: 'smooth',
        left: scrollPos
      });
    }

    const activeDescription = (event: any) => {
      console.log('event', event);

      event.target.children[0].classList.add('active');

      setTimeout(() => {
        event.target.children[0].classList.add('show');
      }, 20);

      console.log(event.target.children[0].getBoundingClientRect().left + event.target.children[0].offsetWidth)

      if(event.target.children[0].getBoundingClientRect().left + event.target.children[0].offsetWidth > seasonsItems.value.clientWidth) {
        event.target.children[0].classList.add('alignRight');
      }

    }

    const dissactiveDescription = (event: any) => {
      event.target.children[0].classList.remove('show');

      setTimeout(() => {
        event.target.children[0].classList.remove('active');
        event.target.children[0].classList.remove('alignRight');
      }, 500);
    }

    return {
      seasons,
      sliderMove,
      activeDescription,
      dissactiveDescription
    }
  }
}
</script>

<style lang="scss" scoped>
  div.seasonsWrapper {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
      align-self: flex-start;
      margin: 10px;
    }

    & > div {
      display: flex;
      align-items: center;
      width: 100%;

      & > button {
        background-color: transparent;
        border: none;
        width: fit-content;
        height: fit-content;
        padding: 10px;
        cursor: pointer;
        display: none;

        @include respond-to(min-width, 768px) {
          display: block;
        }

        & > svg {
          width: 55px;
          height: 55px;
        }
      }

      & > div.seasonsItems {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;

        @include respond-to(min-width, 768px) {
          flex-direction: row;
        }

        & > div.seasonsItem {
          padding: 5px;
          position: relative;
          display: flex;
          flex-direction: column-reverse;

          @include respond-to(min-width, 768px) {
            border-bottom: 2px solid rgba($color-black, 0.8);

            &:last-child {
              border-bottom: none;
            }
          }

          & > img {
            pointer-events: none;
            max-height: 400px;
            object-fit: contain;

            @include respond-to(min-width, 768px) {
              max-height: none;
            }
          }

          & > div.description {
            background-color: $color-white;
            top:0;
            left: 215px;
            z-index: 2;
            height: 100%;
            pointer-events: none;
            transition: 300ms ease-in-out;
            text-align: left;
            padding: 10px;

            @include respond-to(min-width, 768px) {
              display: none;
              position: absolute;
              opacity: 0;
            }

            ::v-deep p {
              margin: 0;
              height: 100%;

              @include respond-to(min-width, 768px) {
                min-width: 350px;
                max-width: 600px;
              }
            }

            &.alignRight {
              left: auto;
              right: 215px;
            }
            &.active {
              display: block;
            }
            &.show {
              opacity: 1;
              transition: 300ms ease-in-out;
            }
          }
        }
      }
    }
  }
</style>
