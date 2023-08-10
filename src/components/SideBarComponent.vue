<template>
  <v-app >
    <v-navigation-drawer
        absolute
        permanent
        left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="userImage" alt="profile">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{username}}</v-list-item-title>
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
            <v-layout row align-center>
              <v-flex xs6 class="text-center">
                <v-list-item-title>
                  {{ board.name }}
                </v-list-item-title>
              </v-flex>

              <v-spacer></v-spacer>

              <v-flex shrink>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list-item @click="openUpdateModal(board)">
                    <v-list-item-title>Update</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteBoard(board.id)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 새 보드 추가용 모달 -->
    <!-- 새 보드 추가용 모달 -->
    <v-dialog v-model="isAddBoardModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          {{ newBoard.id ? 'Update Board' : 'Add New Board' }}
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
          <v-btn color="primary" @click="addBoard">
            {{ newBoard.id ? 'Update' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>

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
      userImage: '',
      username: '',
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
  mounted() {
    this.userImage = localStorage.getItem('userImage') || '';  // If there's no value, default to empty string
    this.username = localStorage.getItem('username')
  }
  ,
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
        let boardData = {
          name: this.newBoard.name,
          color: this.newBoard.color,
          info: this.newBoard.info
        };
        if (this.newBoard.id) {
          await axios.put("/boards/" + this.newBoard.id + "/names", boardData);
          await axios.put("/boards/" + this.newBoard.id + "/colors", boardData);
          await axios.put("/boards/" + this.newBoard.id + "/infos", boardData);
        } else {
          await axios.post("/boards", this.newBoard);
        }
        window.location.href = '/home';
        this.isAddBoardModalOpen = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBoard(boardId) {
      // Logic to delete the board with given id
      try {
        // 보드 삭제
        await axios.delete("/boards/" + boardId)
            .then(response => {
              console.log(response.data)
              window.location.href = '/home'
            })
      } catch (error) {
        console.error(error);
      }
    },
    openUpdateModal(board) {
      this.isAddBoardModalOpen = true;
      this.newBoard = {...board};  // assuming newBoard is an object
    },
  }
}
</script>


<style scoped lang="scss">
.v-menu__content {
  z-index: 100; // You can adjust this value as per your needs
}
.v-navigation-drawer {
  overflow-y: hidden !important;
}
</style>