<template>
  <v-card height="500px">
    <v-navigation-drawer
        absolute
        permanent
        left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
            v-for="item in boardColumn"
            :key="item.title"
        >
          <v-list-item-icon @click="showBoards">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="showBoards">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

          <v-btn icon @click="openAddBoardModal">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <!--      보드 이름 불러오기-->
      <v-list dense>
        <v-list-item
            v-for="board in boards"
            :key="board.id"
            v-show="isShowBoards"
            @click="showDetailBoard(board)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ board.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-list-item
            v-for="item in userColumn"
            :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 새 보드 추가용 모달 -->
    <!-- 새 보드 추가용 모달 -->
    <v-dialog v-model="isAddBoardModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          Add New Board
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newBoard.name" label="Name"></v-text-field>

          <!-- 프리셋 컬러 선택 -->
          <v-select
              v-model="newBoard.color"
              :items="colorPresets"
              label="Color"
          ></v-select>

          <v-text-field v-model="newBoard.info" label="Info"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddBoardModal">Cancel</v-btn>
          <v-btn color="primary" @click="addBoard">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from '@/axios/axios-instance';

export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      boardColumn: [
        {title: 'Board', icon: 'mdi-home-city'}
      ],
      userColumn: [
        {title: 'Users', icon: 'mdi-account-group-outline'}
      ],
      isShowBoards: false,
      newBoard: {
        name: '',
        color: '',
        info: ''
      },
      colorPresets: ['Red', 'Blue', 'Green', 'Black', 'Purple'],
      isAddBoardModalOpen: false,
      detailBoard: {}
    }
  },
  methods: {
    async showBoards() {
      this.isShowBoards = !this.isShowBoards;
      console.log(this.isShowBoards)
    },
    async showDetailBoard(board) {
      try {
        await this.$emit('showDetailBoard', board.id); // HomeView에 보드 데이터를 전달합니다.
      } catch (error) {
        console.log(error)
      }
    },
    openAddBoardModal() {
      this.isAddBoardModalOpen = true;
    },
    // 모달 닫기
    closeAddBoardModal() {
      this.isAddBoardModalOpen = false;
    },
    // 보드 추가
    async addBoard() {
      try {
        // 보드 추가 로직
        await axios.post("/boards", this.newBoard)
            .then(response => {
              console.log(response.data)
              window.location.href = '/home'
            })
        // 보드 추가 성공 시 모달 닫기
        this.isAddBoardModalOpen = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>


<style scoped lang="scss">

</style>