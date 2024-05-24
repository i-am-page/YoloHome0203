<template>
  <div class="data-stream rounded-lg">
    <div v-for="(data, index) in dataStream" :key="index" class="data-item shadow mx-auto p-2">
      <span class="font-semibold text-lg text-center text-white font-mono block">Time: {{ data[0] }}</span>
      <span class="font-semibold text-lg text-center text-white font-mono block">Value: {{ data[1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataStream',
  props: {
    dataStream: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.data-stream {
  max-height: 400px;
  padding: 10px;
}

.data-item {
  display: flex;
  justify-content: space-between;
}
</style>