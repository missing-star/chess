<template>
    <div class="chess-tips-panel">
        <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close-tips.png" class="mail-box-close" @click="closeMyself">
            <article>
                <input type="text" placeholder="创建棋局名称" class="chess-talbe-name">
            </article>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-create-tips-panel',
    data() {
        return {

        }
    },
    methods:{
        closeMyself() {
            this.$emit('hide');
        }
    },
    props:['is-show'],
    components:{
        [ChessMask.name]:ChessMask
    }
}
</script>
<style scoped>
    div.chess-tips-body{
        background: url(../assets/images/tips-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    img.mail-box-close{
        width: 4rem;
        right: 3rem;
        top: 6rem;
    }
    input.chess-talbe-name {
        background: #efd8ab;
        box-shadow: 0 1px 1px 0 #ffffff, inset 0 1px 1px 0 #bea16a;
        border: none;
        border-radius: 0.5rem;
        height: 3rem;
        width: 90%;
        outline: 0;
        padding-left: 0.5rem;
        font-size: 1.2rem;
        color:#4a2b1b;
    }
    input.chess-talbe-name::-webkit-input-placeholder{
        columns: #4a2b1b;
    }
    article {
        width: 100%;
        height: 100%;
        padding: 12rem;
        color:#9d5e3c;
    }
    h3.article-title{
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    section.article-content{
        height: 75%;
        overflow-x: hidden;
        overflow-y: scroll;
        line-height: 1.8rem;
        font-size: 1rem;
        letter-spacing: 1px;
        /* firfox非标准属性 */
        scrollbar-width: none;
        /* ie/edge */
        -ms-overflow-style: none;
    }
    section.article-content::-webkit-scrollbar{
        height: 0;
        width: 0;
    }
</style>
