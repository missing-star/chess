const CreateTipsPanel = ('', {
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
        [ChessMask.name]:ChessMask
    }
});