<template>
  <v-app >
    <v-app-bar app style="margin-top: 64px">
      <BoardHeaderComponent :board="board" :isAuthor="isAuthor" @boardChanged="handleBoardChange"/>
    </v-app-bar>

    <v-main style="padding: 0px">
      <v-row style="margin-left: 20px">
        <v-card
            style="margin-top: 30px;margin-left: 10px;margin-right: 5px"
            width="256px"
            tile
            v-for="(area, index) in this.board.areas"
            :key="area"
        >
          <v-navigation-drawer permanent>
            <v-system-bar>
              <v-flex shrink>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <v-list-item @click="openUpdateAreaModal(area, index)">
                    <v-list-item-title>Update</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteArea(area, index)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-menu>
              </v-flex></v-system-bar>
            <v-list>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ area.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>설명</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list
                nav
                dense>
              <v-list-item
                  v-for="card in area.cards"
                  :key="card"
              >
                <v-list-item-content
                    @click="openDetailCardModal(card.title,card.content,card.cardUsers,card.comments,card.username,card.image)">
                  <v-list-item-title v-text="card.title"></v-list-item-title>
                </v-list-item-content>

              </v-list-item>
            </v-list>
            <v-btn @click="openAddCardModal(area.id)">+Add Cards</v-btn>
          </v-navigation-drawer>
        </v-card>


        <v-btn style="margin-left: 75px;margin-top: 100px" @click="openAddAreaModal()">
          + Add Area
        </v-btn>
        <v-btn @click="check"></v-btn>
      </v-row>
    </v-main>

    <!-- Area 수정, 추가 모달-->
    <v-dialog v-model="isAddAreaModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          {{ newArea.id ? 'Update Area' : 'Add New Area' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newArea.name" label="Name"></v-text-field>

          <!--          &lt;!&ndash; 프리셋 컬러 선택 &ndash;&gt;-->
          <!--          <v-select-->
          <!--              v-model="newBoard.color"-->
          <!--              :items="colorPresets"-->
          <!--              label="Color"-->
          <!--          ></v-select>-->

          <!--          <v-text-field v-model="newBoard.info" label="Info"></v-text-field>-->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddAreaModal">Cancel</v-btn>
          <v-btn color="primary" @click="addArea">
            {{ newArea.id ? 'Update' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Area 수정, 추가 모달-->

    <!-- Card 수정, 추가 모달-->
    <v-dialog v-model="isAddCardModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          {{ newArea.id ? 'Update Area' : 'Add New Card' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newCard.title" label="Title"></v-text-field>
          <v-text-field v-model="newCard.content" label="Content"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddCardModal">Cancel</v-btn>
          <v-btn color="primary" @click="addCard">
            {{ newArea.id ? 'Update' : 'Add' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Card 수정, 추가 모달-->

    <!-- Card 디테일 모달-->
    <v-dialog v-model="isDetailCardModalOpen" max-width="600px">
      <v-card
          class="mx-auto"
          max-width="600px"
      >
        <v-system-bar>
          <v-flex shrink>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list-item @click="openUpdateAreaModal(board)">
                <v-list-item-title>Update</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteArea(board.id)">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-menu>
          </v-flex></v-system-bar>

        <div v-if="modalCard.image==''">
        </div>
        <div v-else>
          <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              max-width="400px"
              height="200px"
          ></v-img>
        </div>

        <v-card-title>
          {{ modalCard.title }}
          <v-spacer></v-spacer>

          <v-btn @click="closeDetailCardModal">x</v-btn>
        </v-card-title>

        <v-card-subtitle>
          {{ modalCard.content }}
        </v-card-subtitle>

        <v-divider/>

        <v-card-actions>
          <v-btn
              color="orange lighten-2"
              text
          >
            collaborators
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="show1 = !show1"
          >
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show1">
            <v-btn>+share</v-btn>
            <v-list-item
                v-for="cardUsers in modalCard.cardUsers"
                :key="cardUsers"
            >
              <v-list-item-content>
                <v-list-item-title v-text="cardUsers.title"></v-list-item-title>
              </v-list-item-content>
              <v-divider></v-divider>
            </v-list-item>
          </div>
        </v-expand-transition>

        <v-divider/>

        <v-card-actions>
          <v-btn
              color="orange lighten-2"
              text
          >
            comments
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="show2 = !show2"
          >
            <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show2">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                        v-model="message"
                        filled
                        clear-icon="mdi-close-circle"
                        append-outer-icon="mdi-send"
                        @click:append-outer="sendMessage"
                        clearable
                        label="Message"/>

                    <v-list-item
                        v-for="comments in modalCard.comments"
                        :key="comments"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="comments"></v-list-item-title>
                        <v-divider></v-divider>
                      </v-list-item-content>

                    </v-list-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-divider></v-divider>

          </div>
        </v-expand-transition>
      </v-card>
    </v-dialog>
    <!-- Card 디테일 모달-->

  </v-app>
</template>

<script>
// https://v2.vuetifyjs.com/en/components/lists/#rounded

import AreaComponent from "@/components/AreaComponent.vue";
import AddAreaComponent from "@/components/AddAreaComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BoardHeaderComponent from "@/components/BoardHeaderComponent.vue";
import axios from "@/axios/axios-instance";

export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  name: "BoardView",
  components: {AddAreaComponent, AreaComponent, HeaderComponent, BoardHeaderComponent},
  computed: {
    isAuthor() {
      return window.localStorage.getItem("username") === this.board.author;
    }
  },
  data() {
    return {
      areaId: 0,
      area_size: 0,
      show1: false,
      show2: false,
      message:'',
      isAddAreaModalOpen: false,
      isAddCardModalOpen: false,
      isDetailCardModalOpen: false,
      selectedItem: '',
      newArea: {
        boardId: '',
        name: '',
        position: 0
      },
      newCard: {
        areaId: 0,
        name: '',
        title: ''
      },
      modalCard: {
        title: '',
        content: '',
        username: '',
        image:'',
        comments: [],
        cardUsers: []
      }

    };
  },
  methods: {
    check() {
      alert("asdf");
      alert(this.board.id);
      console.log(this.board)
    },

    openAddAreaModal() {
      this.isAddAreaModalOpen = true;
    },
    closeAddAreaModal() {
      this.isAddAreaModalOpen = false;
      this.newArea = {
        boardId: '',
        name: '',
        position: 0
      }
    },
    openUpdateAreaModal(area) {
      this.isAddAreaModalOpen = true;
      this.newArea = {...area};  // assuming newBoard is an object
    },
    async deleteArea(area, index) {
      try {
        await axios.delete("/areas/" + area.id);
        this.board.areas.splice(index, 1)
      } catch (error) {
        alert(error)
      }
    },
    openAddCardModal(id) {
      alert(id)
      this.newCard.areaId = id;
      this.isAddCardModalOpen = true;
    },
    closeAddCardModal() {
      this.isAddCardModalOpen = false;
    },
    openDetailCardModal(title, content, cardUsers, comments, username, image) {

      this.modalCard.title = '';
      this.modalCard.content = '';
      this.modalCard.username = '';
      this.modalCard.image = '';
      this.modalCard.comments=[];
      this.modalCard.cardUsers=[];
      this.show1=false;
      this.show2=false;
      this.message='';

      this.modalCard.title = title;
      this.modalCard.content = content;
      this.modalCard.username = username;
      this.modalCard.image = image;
      this.modalCard.comments.push(comments);
      this.modalCard.cardUsers.push(cardUsers);

      this.isDetailCardModalOpen = true;
    },
    closeDetailCardModal() {
      this.modalCard.title = '';
      this.modalCard.content = '';
      this.modalCard.username = '';
      this.modalCard.comments=[];
      this.modalCard.cardUsers=[];
      this.show1=false;
      this.show2=false;
      this.message='';

      this.isDetailCardModalOpen = false;
    },
    sendMessage(){
      alert(this.message)
      this.modalCard.comments.push(this.message);
    },

    async addArea() {
      const data = {
        boardId: this.board.id,
        name: this.newArea.name,
        position: 0
      }
      try {
        if (this.newArea.id){
          await axios.put("/areas/names/" + this.newArea.id, data);
          alert("Area 변경 성공");
        } else {
          data.position = this.area_size;
          await axios.post("/areas", data);
          alert("Area 추가 성공");
        }
        this.isAddAreaModalOpen = false;
        await this.reload();
      } catch (error) {
        console.error(error);
        await this.reload();
      }
    },
    async addCard() {
      this.isAddCardModalOpen = false;
      try {
        await axios.post("/cards", this.newCard);
        alert("Card 추가 성공");
        this.newCard.areaId = 0
        this.newCard.title = ''
        this.newCard.content = ''
        await this.reload();
      } catch (error) {
        alert("Card 추가 실패");

        this.newCard.areaId = 0
        this.newCard.title = ''
        this.newCard.content = ''
        await this.reload();
      }
    },
    async reload() {
      try {
        await axios.get("/boards/" + this.board.id)
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
      this.$emit('boardChanged', board);
    }
  }

}

</script>

<style scoped>

</style>