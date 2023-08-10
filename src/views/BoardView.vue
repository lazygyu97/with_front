<template>
  <v-app>
    <v-row>
      <v-col cols="4" v-for="(area, index) in areas" :key="index">
        <AreaComponent :area="area"/>
      </v-col>
      <AddAreaComponent/>
    </v-row>

  </v-app>
</template>

<script>
import AreaComponent from "@/components/AreaComponent.vue";
import AddAreaComponent from "@/components/AddAreaComponent.vue";

export default {
  name: "BoardView",
  components: {AddAreaComponent, AreaComponent}
}
</script>

<style scoped>

</style>