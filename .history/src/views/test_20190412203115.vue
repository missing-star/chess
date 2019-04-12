<template>
    <div>
        <ul>
            <li
                v-for="item in gameList1.list.child"
                :key="item.id"
                class="task-item"
                @click="showSelfStudyStagePanel(gameList2.id,item.id)"
              >{{item.name}}{{item}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            gameList1:{"list":{"name":"初级","child":{"1":{"name":"一步杀","child":{"1":"兵的一步杀","2":"车的一步杀","3":"马的一步杀","4":"炮的一步杀"}}}},"id":"1"},
            gameList2:{},
            gameList3:{}
        }
    },
    methods:{

    },
    mounted() {
        this.$axios({
        method: "post",
        url: `${process.env.VUE_APP_URL}/index.php?r=api-end-game/get-cate`,
        data: this.qs.stringify({})
      })
        .then(res => {
          let ids = [];
          for(let key in res.data.data) {
            ids.push(key);
          }
          this.gameList1.list = res.data.data[ids[0]];
          this.gameList1.id = ids[0];
          this.gameList2.list = res.data.data[ids[1]];
          this.gameList2.id = ids[1];
          this.gameList3.list = res.data.data[ids[2]];
          this.gameList3.id = ids[2];
          console.log(this.gameList1,this.gameList2,this.gameList3);
        })
        .catch(error => {
          console.log(error);
        });
    }
}
</script>