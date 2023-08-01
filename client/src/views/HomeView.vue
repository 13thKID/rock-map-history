<template>
  <div class="p-8 w-full h-full">
    <TimeLineContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimeLineContainer from '@/components/TimeLineContainer.vue'

export default defineComponent({
  components: {
    TimeLineContainer,
  },
  setup() {},
})
</script>
