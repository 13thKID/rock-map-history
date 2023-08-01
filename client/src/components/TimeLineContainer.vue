<template>
  <div class="timeline-container">
    <TimeLine
      :elements="elements"
      @add-above="handleAddAbove"
      @remove-below="handleRemoveBelow"
      @add-below="handleAddBelow"
      @remove-above="handleRemoveAbove"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { type Ref } from 'vue'
import TimeLine from '@/components/TimeLine.vue'
import { type TimelineData } from '@/components/TimeLine.vue'
import timelineData from '@/mocks/timeline.json'
import { MONTH_SIZE } from '@/components/Month.vue'
import { YEAR_SIZE } from '@/components/Year.vue'
import { getRandomInt } from '@/utils/random'

const ySkip = 5
const N = 9
const initYear = 3

const elements = ref<Elem[]>([])
const data = ref(timelineData) as Ref<TimelineData[]>

const range = [
  [initYear, data.value[initYear].months.length - 1],
  [initYear, 0],
]

/** Populate ref:elements with initial data */
let currentTop = 0
while (elements.value.length < N) {
  range[1][0] += 1
  range[1][1] = 0
  elements.value.push({
    id: Math.random(),
    component: 'Year',
    props: {
      top: currentTop,
      year: data.value[range[1][0]].year,
    },
  })
  currentTop += YEAR_SIZE

  for (let month of data.value[range[1][0]].months) {
    if (elements.value.length >= N) {
      break
    }

    elements.value.push({
      id: Math.random(),
      component: 'Month',
      props: {
        top: currentTop,
        month: month.month,
      },
    })
    currentTop += MONTH_SIZE
    range[1][1] += 1
  }
}

console.log(range[0])
console.log(range[1])

function handleAddAbove() {
  console.log('handleAddAbove')
  console.log(range[0])
  if (range[0][1] >= 0) {
    elements.value.unshift({
      id: Math.random(),
      component: 'Month',
      props: {
        top: elements.value[0].props.top - MONTH_SIZE,
        month: data.value[range[0][0]].months[range[0][1]].month,
      },
    })
    currentTop += MONTH_SIZE
    range[0][1] -= 1
  } else {
    elements.value.unshift({
      id: Math.random(),
      component: 'Year',
      props: {
        top: elements.value[0].props.top - YEAR_SIZE,
        year: data.value[range[0][0]].year,
      },
    })

    range[0][0] -= 1
    range[0][1] = data.value[range[0][0]].months.length - 1

    currentTop += YEAR_SIZE
  }
  console.log(range[0])
}

function handleRemoveBelow() {
  console.log('handleRemoveBelow')
  console.log(range[1])
  if (elements.value[elements.value.length - 1].component === 'Month') {
    range[1][1] -= 1
  } else {
    range[1][0] -= 1
    range[1][1] = data.value[range[1][0]].months.length
  }
  elements.value.pop()
  console.log(range[1])
}

function handleAddBelow() {
  console.log('handleAddBelow')
  console.log(range[1])
  const prevEl = elements.value[elements.value.length - 1]
  const skip = prevEl.component === 'Year' ? YEAR_SIZE : MONTH_SIZE
  if (range[1][1] < data.value[range[1][0]].months.length) {
    elements.value.push({
      id: Math.random(),
      component: 'Month',
      props: {
        top: prevEl.props.top + skip,
        month: data.value[range[1][0]].months[range[1][1]].month,
      },
    })
    range[1][1] += 1
  } else {
    range[1][0] += 1
    range[1][1] = 0
    elements.value.push({
      id: Math.random(),
      component: 'Year',
      props: {
        top: prevEl.props.top + skip,
        year: data.value[range[1][0]].year,
      },
    })
  }
  console.log(range[1])
}

function handleRemoveAbove() {
  console.log('handleRemoveAbove')
  console.log(range[0])
  if (elements.value[0].component === 'Month') {
    range[0][1] += 1
  } else {
    range[0][0] += 1
    range[0][1] = -1
  }
  elements.value.shift()
  console.log(range[0])
}

export interface Elem {
  component: 'Month' | 'Year'
  id: number
  props: {
    top: number
    year?: number
    month?: string
  }
}
</script>

<style>
.timeline-container {
  height: 100%;
}
</style>
