<template>
  <v-app>
    <v-app-bar app style="margin-top: 64px">
      <BoardHeaderComponent :board="board" :isAuthor="isAuthor" @boardChanged="handleBoardChange"/>
    </v-app-bar>

    <div v-if="this.board==''" style="width: 100%;height: 100%">
      <div style="width: 100%;height: 100%;background-color: #2d3237">
        <div style="color: #d7d4d4">
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <h1 style="font-size: 45px">안녕하세요, 칸반보드 서비스 "With" 입니다.</h1>
          <br>
          <h3>사이드바의 MyBoard 의 "+" 버튼을 클릭해 작업관리를 시작해보세요</h3>
          <h3>각 보드에는 협업자들을 추가해 협업 작업 관리 또한 가능합니다.</h3>
          <br>
          <h3>사이드바의 WithBoard 에서는 여러분이 협업자로 포함되어있는 보드를 확인 할 수 있습니다.</h3>

        </div>

      </div>

    </div>

    <div v-else>

      <v-main style="padding: 0px">
        <v-row style="margin-left: 20px">


          <v-card
              style="border-radius:10px; margin-top: 30px;margin-left: 10px;margin-right: 5px"
              width="256px"
              tile
              v-for="(area, index) in this.board.areas"
              :key="area.id"
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

                    <v-list-item style="background-color: #ffffff"
                                 @click="openUpdateAreaModal(area, index)">
                      <v-list-item-title>Update</v-list-item-title>
                    </v-list-item>
                    <v-list-item style="background-color: #ffffff" @click="deleteArea(area, index)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-menu>
                </v-flex>
              </v-system-bar>
              <v-list>
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{ area.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item
                    v-for="card in area.cards"
                    :key="card.id"
                >
                  <v-list-item-content
                      @click="openDetailCardModal(area.name,card.title,card.content,card.cardUsers,card.comments,card.checkLists,card.username,card.image,card.id)">
                    <v-list-item-title v-text="card.title"></v-list-item-title>
                    <v-divider></v-divider>

                  </v-list-item-content>

                </v-list-item>
              </v-list>
              <v-btn elevation="0"
                     style="margin-bottom:10px;border: none;background-color: transparent"
                     @click="openAddCardModal(area.id)">+ Add Cards
              </v-btn>
            </v-navigation-drawer>
          </v-card>


          <v-btn style="margin-left: 75px;margin-top: 100px" @click="openAddAreaModal()">
            + Add Area
          </v-btn>
          <v-btn @click="check"></v-btn>
        </v-row>
      </v-main>
    </div>
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

    <!-- Card 추가 모달-->
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
    <!-- Card 추가 모달-->

    <!-- Card 추가 모달-->
<!--    <v-dialog v-model="isUpdateCardModalOpen" max-width="600px">-->
<!--      <v-card>-->
<!--        <v-card-title>-->
<!--          {{ newArea.id ? 'Update Area' : 'Add New Card' }}-->
<!--        </v-card-title>-->
<!--        <v-card-text>-->
<!--          <v-text-field v-model="newCard.title" label="Title"></v-text-field>-->
<!--          <v-text-field v-model="newCard.content" label="Content"></v-text-field>-->
<!--        </v-card-text>-->
<!--        <v-card-actions>-->
<!--          <v-btn @click="closeAddCardModal">Cancel</v-btn>-->
<!--          <v-btn color="primary" @click="addCard">-->
<!--            {{ newArea.id ? 'Update' : 'Add' }}-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
    <!-- Card 추가 모달-->

    <!-- Card 디테일 모달-->
    <v-dialog @click:outside="closeDialog()" v-model="isDetailCardModalOpen" max-width="600px">
      <v-card
          class="mx-auto"
          max-width="600px"
      >
        <v-system-bar>
          <v-spacer/>
          <v-flex shrink>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list-item style="background-color: #ffffff" @click="openUpdateCardModal()">
                <v-list-item-title>Update</v-list-item-title>
              </v-list-item>
              <v-list-item style="background-color: #ffffff" @click="deleteCard()">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
              <v-list-item style="background-color: #ffffff" @click="addImage()">
                <v-list-item-title>Add Image</v-list-item-title>
              </v-list-item>
            </v-menu>
          </v-flex>
        </v-system-bar>

        <div v-if="modalCard.image==null">
        </div>
        <div v-else>
          <v-img
              :src=this.modalCard.image
              max-width="600"
              max-height="200"
              object-fit: scale-down
          ></v-img>
        </div>

        <v-card-title style="font-size:30px;margin-bottom: 20px">
          <v-spacer/>

            {{ modalCard.title }}&nbsp;<span style="font-size: 20px"> in {{ modalCard.area }}</span>

          <v-spacer/>

        </v-card-title>

        <v-card-subtitle>
          {{ modalCard.content }}
        </v-card-subtitle>

        <v-divider/>

        <v-card-actions>
          <v-btn
              color="black"
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
                :key="cardUsers.id"
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
              color="black"
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
                    <div v-if="this.modalCard.comments.length===0">
                      No comments
                    </div>
                    <div v-else>
                      <v-list-item
                          v-for="(comments,i) in this.modalCard.comments"
                          :key="comments.id">
                        <v-list-item-avatar>
                          <v-img max-height="40" max-width="40" :src="comments.image"/>
                        </v-list-item-avatar>
                        <v-list-item-title v-text="comments.content"></v-list-item-title>
                        <v-spacer/>
                        <v-flex shrink>
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-horizontal</v-icon>
                              </v-btn>
                            </template>

                            <v-list-item style="background-color: #ffffff"
                                         @click="openUpdateAreaModal(board)">
                              <v-list-item-title>Update</v-list-item-title>
                            </v-list-item>
                            <v-list-item style="background-color: #ffffff"
                                         @click="deleteComment(comments.id,i)">
                              <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                          </v-menu>
                        </v-flex>
                      </v-list-item>
                      <v-divider></v-divider>
                    </div>

                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-divider></v-divider>

          </div>
        </v-expand-transition>

        <v-divider/>

        <v-card-actions>
          <v-btn
              color="black"
              text
          >
            CheckList
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="show3 = !show3"
          >
            <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show3" style="display: flex; justify-content: center; align-items: center;">
            <v-col cols="8">
              <v-text-field
                  v-model="checkForm"
                  filled
                  clear-icon="mdi-close-circle"
                  append-outer-icon="mdi-send"
                  @click:append-outer="sendCheckList"
                  clearable
                  label="checklist"/>
              <div v-if="this.modalCard.checkLists.length===0">
                No checkLists
              </div>
              <div v-else>
                <v-list-item
                    v-for="(checklists,i) in this.modalCard.checkLists"
                    :key="checklists.id"

                >
                  <v-checkbox
                      @click="isChecked(checklists.id)"
                      :label=checklists.contents
                      v-model="checklists._checked"
                  ></v-checkbox>
                  <v-spacer/>
                  <v-btn @click="deleteChecklist(checklists.id,i)" elevation="0"
                         style="border: none;background-color: transparent">X
                  </v-btn>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-col>
          </div>
        </v-expand-transition>
      </v-card>
    </v-dialog>
    <!-- Card 디테일 모달-->

    <!-- Card 이미지 수정/추가 모달-->
    <v-dialog v-model="isCardImageModalOpen" max-width="600px">
      <v-card>
        <v-card-title>Update Card Image</v-card-title>
        <v-card-text>
          <!-- 현재 이미지 표시 -->
          <div v-if="this.modalCard.image || this.modalCard.previewImage">
            <img :src="this.modalCard.previewImage || this.modalCard.image "
                 alt="Profile Image Preview" style="max-width: 100%; margin-bottom: 20px;">
          </div>
          <input type="file" @change="onFileChange"> <!-- 이미지 파일 선택을 위한 input -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeCardImageModal">Cancel</v-btn>
          <v-btn color="primary" @click="updateCardImage">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Card 이미지 수정/추가 모달-->

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
    type:Array,
    board: {
      type: Object,
      required: true
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
      show3: false,
      message: '',
      checkForm: '',
      isAddAreaModalOpen: false,
      isAddCardModalOpen: false,
      isDetailCardModalOpen: false,
      isCardImageModalOpen: false,
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
        id: 0,
        area: '',
        title: '',
        content: '',
        username: '',
        image: null,
        changeImage: null,
        previewImage: null,
        comments: [],
        checkLists: [],
        cardUsers: []
      }

    };
  },
  methods: {
    openDetailCardModal(area,title, content, cardUsers, comments, checkLists, username, image, id) {
      this.modalCard.area = area;
      this.modalCard.id = id;
      this.modalCard.title = title;
      this.modalCard.content = content;
      this.modalCard.username = username;
      this.modalCard.image = image;
      if (comments.length != 0) {
        for (var i in comments) {
          this.modalCard.comments.push(comments[i]);
        }
      }
      if (cardUsers.length != 0) {
        this.modalCard.cardUsers.push(cardUsers);
      }
      if (checkLists.length != 0) {
        for (var i in checkLists) {
          this.modalCard.checkLists.push(checkLists[i]);
        }
      }
      this.isDetailCardModalOpen = true;
    },

    check() {
      console.log(this.board)
    },
    onFileChange(event) {
      this.modalCard.changeImage = event.target.files[0];
      if (this.modalCard.changeImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.modalCard.previewImage = e.target.result; // Data URL을 previewImage에 저장
        }
        reader.readAsDataURL(this.modalCard.changeImage);
      }
    },
    async updateCardImage() {
      if (this.modalCard.changeImage) {
        let formData = new FormData();
        formData.append('image', this.modalCard.changeImage);
        try {
          // Content-Type: multipart/form-data 헤더와 함께 이미지 데이터 전송
          await axios.put("/cards/" + this.modalCard.id + "/imageUpload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.modalCard.image = this.modalCard.previewImage;
          this.isCardImageModalOpen = false;
          this.modalCard.previewImage = null;
          this.modalCard.changeImage = null;
          await this.reload();

        } catch (error) {
          console.log(error);
        }
      }
    },
    closeCardImageModal() {
      this.isCardImageModalOpen = false;
      this.modalCard.previewImage = null;
      this.modalCard.changeImage = null;
    },
    addImage() {
      this.isCardImageModalOpen = true;
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
        if (this.newArea.id) {
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
    async deleteCard() {
      await axios.delete("/cards/" + this.modalCard.id)
      .then(response => {
        console.log(response);
        alert('카드 삭제 성공')
        this.closeDialog()
        this.reload();
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })
    },

    async sendMessage() {

      const data = {
        cardId: this.modalCard.id,
        content: this.message
      };

      await axios.post("/comments", data)
      .then(response => {
        console.log(response);

        alert('댓글 달기 성공')
        this.modalCard.comments.push(response.data);
        this.reload();

      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })

    },
    async deleteComment(id, index) {
      await axios.delete("/comments/" + id)
      .then(response => {
        console.log(response);
        alert('댓글 삭제 성공')
        this.modalCard.comments.splice(index, 1)
        this.reload();
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })
    },

    async sendCheckList() {
      const data = {
        cardId: this.modalCard.id,
        content: this.checkForm
      };

      await axios.post("/checklists", data)
      .then(response => {
        console.log(response);
        alert('체크리스트 추가 성공')
        this.modalCard.checkLists.push(response.data);
        this.reload();

      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })
    },
    async isChecked(id) {
      await axios.put("/checklists/" + id)
      .then(response => {
        alert('체크 성공')
        this.reload();
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })
    },
    async deleteChecklist(id, index) {
      await axios.delete("/checklists/" + id)
      .then(response => {
        console.log(response);
        alert('체크리스트 삭제 성공')
        this.modalCard.checkLists.splice(index, 1)
        this.reload();
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data)
      })
    },
    async closeDialog() {
      this.modalCard.area = '';
      this.modalCard.title = '';
      this.modalCard.content = '';
      this.modalCard.username = '';
      this.modalCard.id = '';
      this.modalCard.image = null;
      this.modalCard.previewImage = null;
      this.modalCard.changeImage = null;
      this.modalCard.comments.length = 0;
      this.modalCard.cardUsers.length = 0;
      this.modalCard.checkLists.length = 0;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.message = '';
      this.checkForm = '';
      this.isDetailCardModalOpen = false;
      await this.reload();
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