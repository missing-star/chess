<template>
  <div class="chess-student-detail-panel">
    <div class="chess-dialog-body chess-student-detail-body" :class="{'hide':!isShow}">
      <p class="show-title">{{subCatTitle}}</p>
      <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
      <div class="content-wrapper-container">
        <div class="category-wrapper scrollbar">
          <div class="category-scroll">
            <div class="category_wrap" v-for="(item,index) in list" :key="index">
              <p @click="switchCase(mainCatId,subCatId,index)" class="title pointer"
                :class="{active:currentIndex == index}">{{item}}</p>
              <p class="split-line"></p>
            </div>
          </div>
        </div>
        <div class="homework-wrapper">
          <ul class="item-list-wrapper">
            <li class="item" v-for="(item,index) in title" :key="index">
              <div class="left-part">
                <p class="item-title">{{item.title}}</p>
                <div class="progressbar-wrapper">
                  <p class="progressbar" :class="{active:item.is_show == 1}"></p>
                  <span class="finish-status">{{item.is_show == 0 ? '0' : '1'}} / 1</span>
                </div>
              </div>
              <div v-if="item.is_show == 0" @click="goPartice(item.id)" class="right-part pointer">
                <img src="../assets/images/arrow-right-task.png" class="arrow-right-icon">
                <p class="go-study">去练习</p>
              </div>
              <div v-else @click="goPartice(item.id)" class="right-part pointer active">
                <p class="go-study active">再练习</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <chess-mask :is-show="isShow"></chess-mask>
  </div>
</template>
<script>
  import ChessMask from "./Mask";
  import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
  import '../assets/js/jquery.min';
  import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';
  export default {
    name: "chess-self-study-stage-panel",
    props: ["is-show", "main-cat-id", "sub-cat-id", "sub-cat-title"],
    data() {
      return {
        categoryList: [{
            id: 0,
            icon: require("../assets/images/成长日志.png")
          },
          {
            id: 1,
            icon: require("../assets/images/我的成就.png")
          },
          {
            id: 2,
            icon: require("../assets/images/我的作业.png")
          },
          {
            id: 3,
            icon: require("../assets/images/自习室.png")
          }
        ],
        currentIndex: 0,
        list: [],
        title: ""
      };
    },
    components: {
      [ChessMask.name]: ChessMask
    },
    methods: {
      switchIndex(index) {
        if (this.currentIndex != index) {
          this.currentIndex = index;
        }
      },
      getCategory() {
        this.$axios({
            url: `${
          process.env.VUE_APP_URL
        }index.php?r=api-end-game/get-three-cate`,
            method: "post",
            data: this.qs.stringify({
              level_1: this.mainCatId,
              level_2: this.subCatId
            })
          })
          .then(res => {
            if (res.data.status == 1) {
              this.list = res.data.data;
              this.currentIndex = Object.keys(res.data.data)[0];
              this.getList(this.mainCatId, this.subCatId, this.currentIndex);
            }
          })
          .catch(err => {
            alert("服务器异常");
          });
      },
      getList(level_1, level_2, level_3) {
        this.$axios({
            method: "post",
            url: `${process.env.VUE_APP_URL}/index.php?r=api-end-game/get-end-game`,
            data: this.qs.stringify({
              level_1: level_1,
              level_2: level_2,
              level_3: level_3
            })
          })
          .then(res => {
            console.log(res.data.data.title);
            this.title = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      closeMyself() {
        this.$emit("hide");
      },
      //去练习
      goPartice(id) {
        this.$router.push({
          path: `/self-study-room/${id}`
        });
      },
      switchCase(level_1, level_2, level_3) {
        this.currentIndex = level_3;
        this.getList(level_1, level_2, level_3);
      }
    },
    created() {},
    watch: {
      mainCatId() {
        if (this.mainCatId != "") {
          console.log(this.mainCatId);
          this.getCategory(this.mainCatId, this.subCatId);
        }
      }
    }
  };
</script>
<style scoped>
  div.chess-student-detail-body {
    background: url(../assets/images/self-study-stage-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  div.content-wrapper-container {
    width: 84%;
    height: 80%;
    margin-top: 10%;
    margin-left: 6%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .category-wrapper {
    width: 45%;
    height: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
  }

  .category-wrapper::-webkit-scrollbar {
    width: 0;
  }

  .student-info-wrapper,
  .homework-condition-wrapper {
    background: #a46849;
    box-shadow: 0 1px 1px 0 #daa990, inset 0 1px 1px 0 #7e4a30;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    text-align: center;
  }

  .homework-condition-wrapper {
    margin-top: 1.5rem;
  }

  p.title {
    background: url(../assets/images/not-active-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 80%;
    height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #efd9ad;
    font-size: 1rem;
    text-shadow: 0 2px 2px #552a12;
  }

  p.title.active {
    background: url(../assets/images/active-bg.png) no-repeat;
    background-size: 100% 100%;
    width: 80%;
    height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #703e23;
    text-shadow: 0 1px 1px #ffffff;
  }

  p.split-line {
    background: url(../assets/images/split-line.png) no-repeat;
    background-size: 100% 100%;
    height: 4px;
    width: 80%;
    margin: 1.3rem auto;
  }

  .homework-wrapper {
    width: 45%;
    margin-left: 8%;
    height: 85%;
  }

  li.item {
    background-image: linear-gradient(-180deg,
        #fae7b4 0%,
        #fcefcb 65%,
        #fbeecc 100%);
    box-shadow: 0 2px 4px 0 #a49466;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5rem;
    margin-bottom: 0.8rem;
  }

  .left-part {
    border: 1px dashed #e9ce84;
    height: 85%;
    width: 70%;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    padding: 0.5rem;
  }

  p.item-title {
    color: #753f22;
    font-size: 1rem;
  }

  .progressbar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

  p.progressbar {
    width: 80%;
    height: 0.8rem;
    background: url(../assets/images/not-finish-pro.png) no-repeat;
    background-size: 100% 100%;
  }

  p.progressbar.active {
    width: 80%;
    height: 0.8rem;
    background: url(../assets/images/finish-pro.png) no-repeat;
    background-size: 100% 100%;
  }

  span.finish-status {
    color: #ff6f00;
    font-size: 0.6rem;
  }

  .right-part {
    background-image: linear-gradient(-180deg,
        #309be6 0%,
        #66b5ed 65%,
        #5daee7 100%);
    height: 100%;
    width: 20%;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .right-part.active {
    background-image: linear-gradient(-180deg,
        #ff6d20 0%,
        #ff955d 65%,
        #ff8240 100%);
    height: 100%;
    width: 20%;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  img.arrow-right-icon {
    width: 40%;
  }

  p.go-study {
    background: #2672a8;
    box-shadow: 0 1px 1px 0 #b5dffd, inset 0 1px 1px 0 #0c466f;
    border-radius: 1rem;
    padding: 0.2rem;
    font-size: 0.6rem;
    color: #fff;
  }

  p.go-study.active {
    background: #ff9d69;
    box-shadow: 0 1px 1px 0 #fddcc2, inset 0 1px 1px 0 #aa5d20;
    border-radius: 1rem;
    padding: 0.4rem;
    font-size: 0.8rem;
    color: #fff;
  }

  .category_wrap {
    width: 100%;
    /* height: 100%; */
    text-align: center;
  }

  ul.item-list-wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  ul.item-list-wrapper::-webkit-scrollbar {
    width: 0;
  }

  p.show-title {
    text-align: center;
    height: 18%;
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
  }

  .category-scroll {
    width: 100%;
  }

  .scrollbar::-webkit-scrollbar {
    width: 0.5rem;
    height: 0;
  }

  .scrollbar::-webkit-scrollbar-track {
    background: #f5e4b2;
    width: 100%;
    border-radius: 1rem;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background: #b88061;
    border-radius: 0.5rem;
  }
</style>