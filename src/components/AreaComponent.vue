<template>
  <v-card class="area-card">
    <v-card-title class="area-card-header">
      {{ area.name }} <!-- 이름을 카드 헤더에 표시 -->
    </v-card-title>
    <v-card-text class="area-card-body">
      <!-- Content here -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    area: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>