<template>
  <v-card :style="{ backgroundColor: lightBackgroundColor }" class="home">
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
      backgroundColor: 'white',  // 초기값을 white로 설정
    };
  },
  mounted() {
    this.fetchAreas();
  },
  computed: {
    lightBackgroundColor() {
      let color;
      switch (this.backgroundColor) {
        case 'Red':
          color = 'rgba(255, 0, 0, 0.5)';
          break;
        case 'Blue':
          color = 'rgba(0, 0, 255, 0.5)';
          break;
        case 'Green':
          color = 'rgba(0, 255, 0, 0.5)';
          break;
          // ... 기타 색상들 ...
        default:
          color = 'rgba(255, 255, 255, 0.5)';  // default는 연한 흰색
      }
      return color;
    }
  }
  ,
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
        this.backgroundColor = boardData.color;  // boardData.color 값을 backgroundColor에 설정
        console.log(this.areas)
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    },
  },
}
</script>
