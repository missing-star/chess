<template>
    <div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {

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