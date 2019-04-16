const CreateTipsPanel = ('chess-create-tips-panel', {
    data() {
        return {
            currentId:2,
            chessTableName:'',
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
        }
    },
    props:['is-show'],
    components:{
        'chess-mask':ChessMask
    },
    updated() {
        $.ajax({
            url:`${url}/index.php?r=api-end-game/get-cate`,
            type:'post',
            dataType:'json',
            success:(data) => {
                this.categoryList = data.data;
                console.log(this);
            },
            error:function() {
                alert('服务器异常');
            }
        });
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
                        <label>一级分类：</label>
                        <select>
                            <option>aa</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>二级分类：</label>
                        <select>
                            <option>bb</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label>三级分类：</label>
                        <select>
                            <option>cc</option>
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