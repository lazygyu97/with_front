<template>
  <v-card class="home">
    <v-row>
      <v-col cols="4">
        <SideBarComponent :boards="boards" @showDetailBoard="showBoardDetail" />
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="(area, index) in areas" :key="index">
            <AreaComponent :area="area" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>


import SideBarComponent from "@/components/SideBarComponent.vue";
import AreaComponent from "@/components/AreaComponent.vue";
import axios from '@/axios/axios-instance';


export default {

  name: 'HomeView',
  components: {
    SideBarComponent,
    AreaComponent
  },
  props: {
    showDetailBoard: {}
  },
  data() {
    return {
      boards: [],
      areas: [],
    };
  },
  mounted() {
    this.fetchAreas();
  },
  methods: {
    async fetchAreas() {
      try {
        await axios.get('/boards')
            .then(response => {
              console.log(response.data.boards);
              this.boards = response.data.boards;
            }); // API 요청 예시
      } catch (error) {
        console.error(error);
      }
    },
    async showBoardDetail(boardId) {
      // 보드의 데이터를 detailBoard에 설정합니다.
      try {
        let boardData;
        await axios.get("/boards/" + boardId)
            .then(response => {
              boardData = response.data
            })
        this.areas = boardData.areas;
        console.log(this.areas)
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    },
  },
}
</script>
