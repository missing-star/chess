<template>
    <div class="chess-tips-panel">
        <div class="chess-dialog-body chess-tips-body" :class="{'hide':!isShow}">
            <div class="tips-title"></div>
            <img src="../assets/images/close-tips.png" class="mail-box-close" @click="closeMyself">
            <article>
                <input type="text" placeholder="创建棋局名称" class="chess-talbe-name">
                <div class="upload-wrapper">
                    <label for="" class="title">上传到：</label>
                    <div class="checkbox-group">
                        <div @click="selectId(0)" class="category-item-wrapper pointer" :class="{active:currentId == 0}">
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
                    <img src="../assets/images/confirm-btn.png" class="confirm-btn pointer">
                </div>
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
            currentId:0
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
        background: url(../assets/images/tips-bg2.png) no-repeat;
        background-size: 100% 90%;
        background-position: bottom;
    }
    div.tips-title{
        background: url(../assets/images/tips-title.png) no-repeat;
        background-size: 100% 100%;
        height: 5rem;
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
        color: #4a2b1b;
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
    .upload-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 2rem;
    }
    label.title {
        color: #4d2e1e;
        font-size: 1.2rem;
    }
    .category-item-wrapper {
        color: #4a2b1b;
        margin-bottom: 1rem;
    }
    span.checkbox {
        width: 1.5rem;
        height: 1.5rem;
        background: url(../assets/images/checkbox-bg.png) no-repeat;
        background-size: 100% 100%;
        display: block;
        margin-right: 0.5rem;
    }
    .category-item-wrapper.active span.checkbox{
        background: url(../assets/images/checked.png) no-repeat,url(../assets/images/checkbox-bg.png) no-repeat;
        background-size:70%, 100% 100%;
        background-position: center;
    }
    .category-item-wrapper {
        color: #4a2b1b;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .confirm-wrapper {
        text-align: center;
    }
    img.confirm-btn {
        width: 30%;
        margin-top: 20%;
    }
</style>
