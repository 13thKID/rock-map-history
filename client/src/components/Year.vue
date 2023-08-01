<template>
  <div
    ref="Rbox"
    class="year flex flex-col space-y-1.5 items-center justify-center"
    :style="{
      top: `${top}px`,
    }"
  >
    <span
      v-for="(width, index) in segments"
      :key="index"
      class="line-segment"
      :style="{
        width: `${width}px`,
      }"
    ></span>
    <p>{{ year }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue'
import { getRandomInt, normalDist } from '@/utils/random'
import { throttle } from 'lodash'

export const YEAR_SIZE = 88

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
    year: {
      type: Number,
      default: 1972,
    },
  },
  setup(props) {
    const Rbox = ref<HTMLDivElement>()
    const segments = ref<number[]>([])

    const { color, top } = toRefs(props)

    onMounted(() => {
      for (let i = 0; i < 8; i++) {
        segments.value.push(getRandomInt(100, 300) * normalDist(2.5 + i * 11, 41, 20))
      }
    })

    const animateSegments = throttle(() => {
      // eslint-disable-next-line no-extra-semi
      // ;[1, 3, 5, 7].forEach((i) => {
      segments.value.forEach((s, i) => {
        segments.value[i] = getRandomInt(100, 300) * normalDist(2.5 + i * 11, 41, 20)
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
.year {
  position: absolute;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    font-size: 28px;
  }
}

.line-segment {
  height: 5px;
  background-color: rgb(0, 194, 104);
  width: 100px;
  border-radius: 3px;
}
</style>
