<template>
    <div class="chess-check-homework-panel">
        <div class="chess-dialog-body chess-check-homework-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <input type="text" placeholder="搜索" class="search-input">
                <ul class="apprentice-wrapper">
                    <li v-for="n in 20" :key="n" class="apprentice-item">
                        <p class="homework-name">作业名称</p>
                        <span class="tips-times">提示5次</span>
                        <img src="../assets/images/check-icon.png" class="check-icon">
                    </li>
                </ul>
            </div>
            <div class="bottom-wrapper">
                
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-check-homework-panel',
    props:['is-show'],
    data() {
        return {
            
        }
    },
    components:{
        [ChessMask.name]:ChessMask
    },
    methods: {
        closeMyself() {
            this.$emit('hide');
        },
        openPanel(target) {
            switch (target) {
                case 0:
                    this.closeMyself();
                    this.$emit('open-log');
                    break;
                case 1:
                    this.closeMyself();
                    this.$emit('open-ach');
                    break;
                break;
                case 2:
                    this.closeMyself();
                    this.$emit('open-homework');
                    break;
                break;
                case 3:
                    
                    break;
            }
        }
    }
}
</script>
<style scoped>
    div.chess-check-homework-body{
        background: url(../assets/images/check-homework-border-bg.png) no-repeat,url(../assets/images/apprentice-color-bg.png) no-repeat; 
        background-size: 100% 100%,101% 93%;
        background-position: center,center 121%;
    }
    div.content-wrapper-container{       
        width: 84%;
        height: 80%;
        margin-top: 10%;
        margin-left: 6%;
        display: flex;
        align-items: center;
        position: relative;
        flex-direction: column;
        padding-top: 2rem;
    }
    img.mail-box-close{
        top: 0.2rem;
        right: -4rem;
    }
    ul.apprentice-wrapper {
        height: 85%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        padding: 0 3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        -ms-overflow-style: none;
        scrollbar-width:none;
        padding-bottom: 7rem;
        margin-top: 0.5rem;
    }
    ul.apprentice-wrapper::-webkit-scrollbar{
        width: 0;
    }
    li.apprentice-item {
        width: 48%;
        background: url(../assets/images/homework-list-bg.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.5rem 0;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
    }
    img.detail-icon {
        width: 3.5rem;
    }
    div.bottom-wrapper{
        background: url(../assets/images/bottom-bg.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: 96%;
        height: 12rem;
        bottom: 3%;
        left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input.search-input{
        border: none;
        background: #955c3e;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        border: none;
        border-radius: 1rem;
        height: 2rem;
        width: 15rem;
        background-image: url(../assets/images/search-icon.png);
        background-repeat: no-repeat;
        background-position: 2%;
        background-size: 1.2rem;
        padding-left: 2rem;
        font-size: 1.1rem;
        color: #764328;
        outline: 0;
    }
    input.search-input::-webkit-input-placeholder{
        color: #764328;
    }
</style>
