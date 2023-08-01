<template>
  <div ref="Rtimeline" id="timeline" class="relative">
    <div ref="Raxis" id="axis" class="flex flex-col items-center relative" style="top: 0">
      <component
        v-for="(box, index) in elements"
        :key="box.id"
        :is="box.component"
        v-bind="box.props"
        >{{ index }}</component
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRefs } from 'vue'
import { type PropType } from 'vue'
import Month, { MONTH_SIZE } from '@/components/Month.vue'
import Year from '@/components/Year.vue'
import { getRandomInt } from '@/utils/random'
import { throttle } from 'lodash'
import { type Elem } from '@/components/TimeLineContainer.vue'

export default defineComponent({
  props: {
    elements: {
      type: Object as PropType<Elem[]>,
      required: true,
    },
  },
  emits: ['addAbove', 'addBelow', 'removeAbove', 'removeBelow'],
  components: {
    Month,
    Year,
  },
  setup(props, { emit }) {
    const ySkip = 5

    const Rtimeline = ref<HTMLDivElement>()
    const Raxis = ref<HTMLDivElement>()

    const { elements } = toRefs(props)

    const onWheel = throttle(function (e: WheelEvent) {
      if (e.deltaY > 0) {
        // scrolling up
        if (elements.value[0].props.top > ySkip) {
          emit('addAbove')
        }
        if (elements.value[elements.value.length - 1].props.top > 1080) {
          emit('removeBelow')
        }
      } else {
        // scrolling down
        if (elements.value[0].props.top < -150) {
          emit('removeAbove')
        }
        if (elements.value[elements.value.length - 1].props.top < 900) {
          emit('addBelow')
        }
      }
    }, 100)

    onMounted(() => {
      if (Rtimeline.value && Raxis.value) {
        Rtimeline.value?.addEventListener('wheel', (e: WheelEvent) => {
          elements.value.forEach((el) => {
            el.props.top += e.deltaY / 20
          })

          onWheel(e)
        })
      }
    })

    return {
      Rtimeline,
      Raxis,
    }
  },
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

function drawComponent() {
  const r = Math.random()
  const is = r > 0.9 ? 'Year' : 'Month'

  const elem: Elem = {
    component: is,
    id: Math.random(),
    props: {
      top: 0,
    },
  }

  if (is === 'Year') {
    elem.props.year = getRandomInt(1950, 1996)
  }

  return elem
}

export interface TimelineData {
  year: number
  months: Array<{
    month: string
    bands: []
    events: []
    albums: []
  }>
}
</script>

<style lang="scss">
#timeline {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
