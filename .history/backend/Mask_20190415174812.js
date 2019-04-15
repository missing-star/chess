const ChessMask = ('chess-mask',{
    props:['isShow'],
    data() {
        return {

        }
    },
    template:`
        <div v-if="isShow" class="chess-mask">
                
        </div>
    `
});