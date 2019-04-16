const CreateTipsPanel = ('chess-create-tips-panel', {
    data() {
        return {
            currentId:2,
            chessTableName:''
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
    template:`
    <div class="chess-tips-panel">
        <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
            <div class="tips-title"></div>
            <img src="./images/close-tips.png" class="mail-box-close" @click="closeMyself">
            <article class="conten">
                <input type="text" placeholder="创建棋局名称" v-model="chessTableName" class="chess-talbe-name">
                <div class="upload-wrapper">
                    <label for="" class="title">上传到：</label>
                    <div class="checkbox-group">
                        <div @click="selectId(2)" class="category-item-wrapper pointer" :class="{active:currentId == 2}">
                            <span class="checkbox"></span>
                            作业管理
                        </div>
                        <div @click="selectId(1)" class="category-item-wrapper pointer" :class="{active:currentId == 1}">
                            <span class="checkbox"></span>
                            棋谱管理
                        </div>
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