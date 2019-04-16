const CreateTipsPanel = ('chess-create-tips-panel', {
    data() {
        return {
            currentId:2,
            chessTableName:'',
            level_one:[],
            level_two:[],
            level_three:[],
            level_one_id:'',
            level_two_id:'',
            level_three_id:'',
            categoryList:{}
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        },
        selectId(id) {
            if(this.currentId != id) {
                this.currentId = id;
            }
        },
        saveChessTable() {
            this.$emit('save-chess-table',this.currentId,this.chessTableName);
        },
        getCategoryList() {
            $.ajax({
                url:`${url}/index.php?r=api-end-game/get-cate`,
                type:'post',
                dataType:'json',
                success:(data) => {
                    this.categoryList = data.data;
                    for(let key in data.data) {
                        this.level_one.push({
                            id:key,
                            title:data.data[key].name
                        });
                    }
                },
                error:function() {
                    alert('服务器异常');
                }
            });
        },
        getLevelTwoList(level_one_id) {
            this.level_two = [];
            this.level_three = [];
            //获得二级分类
            for(key in this.categoryList) {
                if(key == level_one_id) {
                    for(let two_key in this.categoryList[key].child) {
                        this.level_two.push({
                            id:two_key,
                            title:this.categoryList[key].child[two_key].name
                        })
                    }
                }
            }
        },
        getLevelThreeList(level_one_id,level_two_id) {
            //获得三级分类
            this.level_three = [];
            for(key in this.categoryList) {
                if(key == level_one_id) {
                    console.log('一级进入');
                    for(let two_key in this.categoryList[key].child) {
                        if(two_key == level_two_id) {
                            console.log('二级进入'+JSON.stringify(this.categoryList[key].child[two_key].child));
                            for(let three_key in this.categoryList[key].child[two_key].child) {
                                this.level_three.push({
                                    id:three_key,
                                    title:this.categoryList[key].child[two_key].child[three_key]
                                });
                            }
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.getCategoryList();
    },
    watch:{
        level_one_id() {
            //一级联动
            this.getLevelTwoList(this.level_one_id);
        },
        level_two_id() {
            //二级联动
            this.getLevelThreeList(this.level_one_id,this.level_two_id);
        }
    },
    props:['is-show'],
    components:{
        'chess-mask':ChessMask
    },
    template:`
    <div class="chess-tips-panel">
        <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
            <div class="tips-title"></div>
            <img src="./images/close-tips.png" class="mail-box-close" @click="closeMyself">
            <article class="content">
                <input type="text" placeholder="创建棋局名称" v-model="chessTableName" class="chess-talbe-name">
                <div class="upload-wrapper">
                    <div class="select-group">
                        <label>一级分类</label>
                        <select v-model="level_one_id">
                            <option v-for="item in level_one" :key="item.id" :value="item.id">{{item.title}}</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>二级分类</label>
                        <select v-model="level_two_id">
                            <option v-for="item in level_two" :key="item.id"  :value="item.id">{{item.title}}</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>三级分类</label>
                        <select v-model="level_three_id">
                            <option v-for="item in level_three" :key="item.id"  :value="item.id">{{item.title}}</option>
                        </select>
                    </div>
                </div>
                <div class="confirm-wrapper">
                    <img src="./images/confirm-btn.png" class="confirm-btn pointer" @click="saveChessTable">
                </div>
            </article>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
    `
});