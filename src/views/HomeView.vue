<template>

  <v-app>
    <v-navigation-drawer style="overflow: hidden !important;" app>
      <SideBarComponent :boards="boards" :withBoards="withBoards" @showDetailBoard="showBoardDetail"
                        @boardChanged="handleBoardChange"/>
    </v-navigation-drawer>
    <v-content style="margin: 0;padding: 0;">
      <BoardView
          style="padding: 0px"
          ref="board"
          :board="board"
          :style="{ backgroundColor: lightBackgroundColor }"
          @boardChanged="handleBoardChange"
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
      withBoards: [],
      areas: [],
      board: [],
      backgroundColor: 'white',  // 초기값을 white로 설정
      detailBoard: [],
    };
  },
  mounted() {
    this.fetchBoards();
    this.fetchWithBoards();
  },
  computed: {
    lightBackgroundColor() {
      let color;
      switch (this.backgroundColor) {
        case 'Red':
          color = 'rgb(251,120,120)';
          break;
        case 'Blue':
          color = 'rgb(63,100,244)';
          break;
        case 'Green':
          color = 'rgba(146,243,146,0.5)';
          break;
        case 'Purple':
          color = 'rgba(207,146,243,0.5)';
          break;
          case 'Black':
          color = 'rgba(14,14,14,0.47)';
          break;
        default:
          color = 'rgba(255, 255, 255, 0.5)';  // default는 연한 흰색
      }
      return color;
    }
  }
  ,
  methods: {
    async fetchBoards() {
      try {
        await axios.get('/boards')
        .then(response => {
          this.boards = response.data.boards;
          console.log(this.boards)
        }); // API 요청 예시
      } catch (error) {
        console.error(error);
      }
    },
    async fetchWithBoards() {
      try {
        await axios.get('/boards/collaborators')
        .then(response => {
          this.withBoards = response.data.boards;
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
    handleBoardChange(board) {
      // 여기서 boardId를 사용할 수 있습니다.
      console.log(board);
      this.fetchBoards();
      this.board = board;
      this.backgroundColor = this.board.color;
    }
  },
}
</script>
