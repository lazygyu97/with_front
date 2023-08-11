<template>
  <v-app>
    <v-app-bar app style="margin-top: 64px">
      <BoardHeaderComponent :board="board"/>
    </v-app-bar>

    <v-main >
      <add-area-component></add-area-component>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import AreaComponent from "@/components/AreaComponent.vue";
import AddAreaComponent from "@/components/AddAreaComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BoardHeaderComponent from "@/components/BoardHeaderComponent.vue";

export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  name: "BoardView",
  components: {AddAreaComponent, AreaComponent, HeaderComponent,BoardHeaderComponent}
}
</script>

<style scoped>

</style>