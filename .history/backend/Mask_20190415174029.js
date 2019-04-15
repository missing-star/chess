export default {
    name:'chess-mask',
    props:['isShow'],
    data() {
        return {

        }
    }
}



const Mask = ('',{
    template:`
        <div v-if="isShow" class="chess-mask">
                
        </div>
    `
})