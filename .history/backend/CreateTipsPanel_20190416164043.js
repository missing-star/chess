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
                    <div class="select-group" v-for="(item,key) in categoryList">
                        <label>一级分类</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                    <div class="select-group" v-for="(item,key) in categoryList">
                        <label>二级分类</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                    <div class="select-group" v-for="(item,key) in categoryList">
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