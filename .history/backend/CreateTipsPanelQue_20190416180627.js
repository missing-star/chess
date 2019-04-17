const CreateTipsPanel = ('chess-create-tips-panel', {
    data() {
        return {
            currentId:2,
            chessTableName:'',
            levelList:[
                {
                    id:1,
                    title:'初级'
                },
                {
                    id:2,
                    title:'中级'
                },
                {
                    id:3,
                    title:'高级'
                }
            ]
        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        },
        saveChessTable() {
            this.$emit('save-chess-table',this.chessTableName,this.level_one_id,this.level_two_id,this.level_three_id);
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
                        <label>等级</label>
                        <select v-model="level_one_id">
                            <option v-for="item in level_one" :key="item.id" :value="item.id">{{item.title}}</option>
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