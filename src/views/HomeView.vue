<template>

  <v-app>
    <v-navigation-drawer style="overflow: hidden !important;" app>
      <SideBarComponent :boards="boards" @showDetailBoard="showBoardDetail" />
    </v-navigation-drawer>
    <v-content style="margin: 0;padding: 0;">
      <BoardView
          style="padding: 0px"
          ref="board"
          :board="board"
          :style="{ backgroundColor: lightBackgroundColor }"

      />
    </v-content>
  </v-app>
</template>

<script>


import SideBarComponent from "@/components/SideBarComponent.vue";
// import AreaComponent from "@/components/AreaComponent.vue";
import axios from '@/axios/axios-instance';
import BoardView from "@/views/BoardView.vue";

export default {

  name: 'HomeView',
  components: {
    BoardView,
    SideBarComponent,
    // AreaComponent
  },
  props: {
    showDetailBoard: {}
  },
  data() {
    return {
      boards: [],
      areas: [],
      board: [],
      backgroundColor: 'white',  // 초기값을 white로 설정
      detailBoard:[],
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
          color = 'rgba(85,85,250,0.5)';
          break;
        case 'Green':
          color = 'rgba(0, 255, 0, 0.5)';
          break;
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
        await axios.get("/boards/" + boardId)
        .then(response => {
          this.board = response.data
        })

        this.backgroundColor = this.board.color;  // boardData.color 값을 backgroundColor에 설정
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    },

  },
}
</script>
