<template>
  <v-card class="overflow-hidden" v-show="board.name">
    <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
    >
      {{ board.name }}

      <v-spacer></v-spacer>

      <v-btn
          v-show="isValidUser"
          elevation="2"
          @click="openEditModal"
      </v-btn>
      <v-btn
          v-show="isValidUser"
          elevation="2"
          @click="openShareModal"
      >share
      </v-btn>
    </v-app-bar>
    <!-- Edit Modal -->
    <v-dialog v-model="isEditModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          Edit Board
        </v-card-title>
        <v-text-field v-model="newBoard.name" label="Name"></v-text-field>

        <!-- 프리셋 컬러 선택 -->
        <v-select
            v-model="newBoard.color"
            :items="colorPresets"
            label="Color"
        ></v-select>

        <v-text-field v-model="newBoard.info" label="Info"></v-text-field>
        <v-card-actions>
          <v-btn @click="isEditModalOpen = false">Cancel</v-btn>
          <v-btn color="primary" @click="updateBoard">Update</v-btn>
          <v-btn color="error" @click="deleteBoard">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Share Modal -->
    <v-dialog v-model="isShareModalOpen" max-width="500px">
      <v-card>
        <v-card-title>
          Share with User
        </v-card-title>
        <v-card-text>
          <v-autocomplete
              v-model="selectedUser"
              :items="users"
              label="Search for a user"
              item-text="nickname"
              :item-value="item => item"
              clearable
          >
            <template v-slot:item="{ item }">
              <div class="user-item">
                <v-avatar class="user-avatar">
                  <img :src="item.image" alt="user image">
                </v-avatar>
                {{ item.nickname }}
              </div>
            </template>
          </v-autocomplete>
          <!-- Already shared users list -->
          <div v-if="sharedUsers.length">
            <h4>Already shared with:</h4>
            <ul>
              <li v-for="user in sharedUsers" :key="user.id">
                <v-avatar class="user-avatar">
                  <img :src="user.image" alt="user image">
                </v-avatar>
                {{ user.nickname }}
                <v-btn small color="error" @click="removeCollaborator(user)">Remove</v-btn>
              </li>
            </ul>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isShareModalOpen = false">Cancel</v-btn>
          <v-btn color="primary" @click="shareBoard">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "@/axios/axios-instance";

export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isValidUser: false,
      isEditModalOpen: false,  // to control the modal
      isShareModalOpen: false, // to control the share modal
      colorPresets: ['Red', 'Blue', 'Green', 'Black', 'Purple'],
      newBoard: {
        name: '',
        color: '',
        info: ''
      },
      users: [],
      sharedUsers:[],
      selectedUser: null,
    }
  },
  mounted() {
    this.checkValidUser();
    this.fetchUsers();
  },
  watch: {
    board: {
      handler(newValue) {
        this.sharedUsers = newValue.collaborators || [];
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    openEditModal() {
      this.isEditModalOpen = true;
      this.newBoard = {...this.board}
    },
    async updateBoard() {
      // Logic for updating the board
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
      // After updating, you can close the modal:
      this.isEditModalOpen = false;
    },
    async deleteBoard() {
      try {
        // 보드 삭제
        await axios.delete("/boards/" + this.board.id)
            .then(response => {
              console.log(response.data)
              window.location.href = '/home'
            })
      } catch (error) {
        console.error(error);
      }
      this.isEditModalOpen = false;
    },
    async checkValidUser() {
      try {
        await axios.get("users")
            .then(response => {
              console.log(response.data.username)
              this.isValidUser = true;
            })
      } catch (error) {
        await this.$router.push('/');
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/users/all');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    openShareModal() {
      this.isShareModalOpen = true;
    },
    async shareBoard() {
      console.log(this.selectedUser)
      try{
        const response = await axios.post('/boards/' + this.board.id + '/collaborators' ,
            {username : this.selectedUser.username}
        );
        this.sharedUsers.push(this.selectedUser);
        this.selectedUser = null;
        this.isShareModalOpen = false;
        console.log(this.sharedUsers)
      }catch (error) {
        alert(error)
      }
      console.log(this.board.id);
      console.log(this.selectedUser);
      this.isShareModalOpen = false;
    },
    async removeCollaborator(user) {
      try {
        await axios.delete(`/boards/collaborators/${this.board.id}/${user.id}`);
        // 삭제 후 현재 목록에서 사용자를 제거합니다.
        this.sharedUsers = this.sharedUsers.filter(u => u.id !== user.id);
      } catch (error) {
        console.error('Error removing collaborator:', error);
        alert('Failed to remove collaborator. Please try again.');
      }
    },
  },
}
</script>

<style scoped lang="scss">
.overflow-hidden {
  width: 100%;
  height: 64px;
}

.user-item {
  display: flex;
  align-items: center; // 이미지와 텍스트를 수직으로 중앙 정렬합니다.
}

.user-avatar {
  margin-right: 10px; // 이미지와 username 사이에 10px 공간을 줍니다.
}
</style>