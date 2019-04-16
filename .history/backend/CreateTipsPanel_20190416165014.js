const CreateTipsPanel = ('chess-create-tips-panel', {
    data() {
        return {
            currentId:2,
            chessTableName:'',
            level_one:[],
            level_two:[],
            level_three:[]
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
                    for(let key in data.data) {
                        this.level_one.push({
                            id:key,
                            title:data.data[key].name
                        });
                        for(let key_two in data.data[key].child) {
                            this.level_two.push({
                                id:key_two,
                                title:data.data[key].child[key_two].name
                            });
                            for(let key_three in data.data[key].child[key_two].child) {
                                this.level_three.push({
                                    id:key_three,
                                    title:data.data[key].child[key_two].child[key_three].name
                                })
                            }
                        }
                    }
                },
                error:function() {
                    alert('服务器异常');
                }
            });
        }
    },
    mounted() {
        this.getCategoryList();
    },
    props:['is-show','category-list'],
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
                        <select>
                            <option></option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>二级分类</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>三级分类</label>
                        <select>
                            <option></option>
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