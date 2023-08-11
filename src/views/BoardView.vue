<template>
  <v-app>
    <v-app-bar app style="margin-top: 64px">
      <BoardHeaderComponent :board="board"/>
    </v-app-bar>

    <v-main style="padding: 0px">
      <v-row style="margin-left: 20px">
        <v-card
            style="margin-top: 30px;margin-left: 10px;margin-right: 5px"
            width="256px"
            tile
            v-for="area in this.board.areas"
            :key="area"
        >
          <v-navigation-drawer permanent>
            <v-system-bar></v-system-bar>
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
              <v-list-item-group
                  v-model="selectedItem"
                  color="primary">
                <v-list-item
                    v-for="card in area.cards"
                    :key="card"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="card.title"></v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
              </v-list-item-group>
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
    <v-dialog v-model="isCardModalOpen" max-width="600px">
      <v-card>
        <v-card-title>
          Card Detail
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
  data() {
    return {
      areaId: 0,
      area_size: 0,
      isAddAreaModalOpen: false,
      isAddCardModalOpen: false,
      selectedItem: '',
      newArea: {
        boardId: this.board.id,
        name: '',
        position: 0
      },
      newCard: {
        areaId: 0,
        name: '',
        title: ''
      },

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
    },
    openAddCardModal(id) {
      alert(id)
      this.newCard.areaId = id;
      this.isAddCardModalOpen = true;
    },
    closeAddCardModal() {
      this.isAddCardModalOpen = false;
    },
    async addArea() {

      const data = {
        boardId: this.board.id,
        name: this.newArea.name,
        position: 0
      }

      try {
        data.position = this.area_size;
        this.isAddAreaModalOpen = false;
        await axios.post("/columns", data);
        alert("Area 추가 성공");
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
    }

  }

}

</script>

<style scoped>

</style>