<template>
    <div class="chess-switch" @click="triggerSwtich" :style="switchWidth">
        <div class="chess-switch-wrapper"  :class="{active:!isClose}">
            <p class="active-title" v-if="!isClose">{{activeTitle}}</p>
            <p class="unactive-title" v-if="isClose">{{unActiveTitle}}</p>
            <div class="chess-switch-icon-wrapper" :class="{active:!isClose}">
                <div class="chess-switch-icon-inner-wrapper">
                    <img src="../assets/voice.png" class="chess-switch-icon">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['width','activeTitle','unActiveTitle'],
    name:'chess-switch',
    data() {
        return {
            isClose:true,
            switchWidth:{
                width:this.width+'rem'
            }
        }
    },
    methods:{
        triggerSwtich() {
            this.isClose = !this.isClose;
        }
    }
}
</script>
<style scoped>
.chess-switch {
    background-image: linear-gradient(0deg, #d28a66 0%, #9e6344 100%);
    box-shadow: inset 0 1px 1px 0 #884e31;
    height: 2.2rem;
    padding: 2px;
    border-radius: 2.2rem;
    width: 10rem;
    cursor: pointer;
}
.chess-switch-wrapper {
    height: 100%;
    border-radius: 2.2rem;
    background: #8c5133;
    box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #703b20, inset 0 2px 4px 0 #69371d;
    position: relative;
}
.chess-switch-wrapper.active{
    background-image:linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
    box-shadow:0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619, inset 0 2px 4px 0 #ad4400;
}
.chess-switch-icon-wrapper {
    background-image: linear-gradient(-180deg, #f5eedb 0%, #e2b471 100%);
    box-shadow: 0 2px 4px 0 #744730, inset 0 1px 3px 0 rgba(255,255,255,0.50);
    width: 2.8rem;
    height: 2.8rem;
    position: absolute;
    border-radius: 50%;
    padding: 3px;
    left: calc(100% - 2.8rem);
    top: -0.4rem;
    transition: all .3s ease-in-out;
}
.chess-switch-icon-wrapper.active{
    left: -3px;
}
.chess-switch-icon-inner-wrapper {
    background-image: linear-gradient(-1deg, #f3e6c4 0%, #f1e1bb 15%, #ecc992 85%, #ebc389 100%);
    box-shadow: 0 1px 1px 0 #e1b77a, inset 0 1px 1px 0 #edc488;
    height: 100%;
    border-radius: 50%;
    width: 100%;
}
img.chess-switch-icon {
    width: 44%;
    margin: auto;
    display: block;
    transform: translateY(22%);
}
p.active-title,p.unactive-title{
    margin: 0;
    position: relative;
    left: 3.5rem;
    line-height: 2rem;
    color: #FFFFFF;
}
p.unactive-title{
    color:#eddcb1;
    left: 1rem;
}
</style>
