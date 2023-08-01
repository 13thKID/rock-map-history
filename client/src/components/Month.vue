<template>
  <div
    ref="Rbox"
    class="month flex flex-col space-y-1.5 items-center justify-center"
    :style="{
      top: `${top}px`,
    }"
  >
    <div>
      <hr />
      <span></span><span></span>
      <p>{{ month }}</p>
    </div>
    <span
      v-for="(width, index) in segments"
      :key="index"
      class="line-segment"
      :style="{
        width: `${width}px`,
      }"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { getRandomInt, normalDist } from '@/utils/random'
import { throttle } from 'lodash'

export const MONTH_SIZE = 132

export default defineComponent({
  props: {
    color: {
      type: String,
      default: '#b44f4c',
    },
    top: {
      type: Number,
      default: 0,
    },
    month: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const Rbox = ref<HTMLDivElement>()
    const segments = ref<number[]>([])

    const { color, top } = toRefs(props)

    onMounted(() => {
      for (let i = 0; i < 7; i++) {
        segments.value.push(getRandomInt(10, 60))
      }
    })

    const animateSegments = throttle(() => {
      // eslint-disable-next-line no-extra-semi
      ;[1, 3, 5].forEach((i) => {
        segments.value[i] = getRandomInt(10, 60)
      })
    }, 500)

    watch(
      () => top.value,
      (nVal) => {
        if (Math.floor(nVal) % 2 == 0) {
          animateSegments()
        }
      },
    )

    return {
      segments,
    }
  },
})
</script>

<style lang="scss">
.month {
  position: absolute;

  > div {
    height: 50px;
    position: relative;

    p {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgb(22, 22, 22);
      padding: 0 20px;
      text-transform: uppercase;
      font-size: 14px;
      color: white;
    }

    hr {
      position: absolute;
      width: 80vw;
      height: 1px;
      background-color: rgb(172, 172, 172);
      border: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }

    span {
      position: absolute;
      width: 12px;
      height: 8px;
      border-radius: 50%;
      // border: 1px solid white;
      background-color: rgb(0, 194, 104);
      transform: translate(-50%, -50%);

      &:nth-of-type(1) {
        top: 6px;
      }
      &:nth-of-type(2) {
        bottom: 0px;
      }
    }
  }
}

.line-segment {
  height: 5px;
  background-color: rgb(0, 170, 90);
  width: 100px;
  border-radius: 3px;
  transition: all 0.5s;
}
</style>
