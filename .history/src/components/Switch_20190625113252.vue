<template>
    <div class="chess-switch" @click="triggerSwtich" :style="styles">
        <div class="chess-switch-wrapper" :class="{active:!isClose}">
            <p class="active-title" v-if="!isClose">{{activeTitle}}</p>
            <p class="unactive-title" v-if="isClose">{{unActiveTitle}}</p>
            <div class="chess-switch-icon-wrapper" :class="{active:!isClose}">
                <div class="chess-switch-icon-inner-wrapper">
                    <img :src="showIcon" class="chess-switch-icon">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['icon','is-close-bg', 'styles', 'activeTitle', 'unActiveTitle', 'timeValue', 'currentTimeValue'],
        name: 'chess-switch',
        data() {
            return {
                isClose: this.isCloseBg == undefined ? true : this.isCloseBg 
            }
        },
        methods: {
            triggerSwtich() {
                this.isClose = !this.isClose;
                if (!this.isClose && this.currentTimeValue != undefined) {
                    this.$emit('trigger', this.timeValue);
                } else if (this.currentTimeValue == undefined) {
                    this.$emit('trigger', this.isClose);
                    localStorage.setItem('isCloseBg', this.isClose);
                }
            }
        },
        computed: {
            showIcon() {
                return require(`../assets/images/${this.icon}`);
            }
        },
        watch: {
            //控制游戏时间
            currentTimeValue() {
                if (this.currentTimeValue != this.timeValue) {
                    this.isClose = true;
                }
            },
            isCloseBg() {
                console.log('change='+this.isCloseBg)
            }
        },
        created() {
            console.log(this.isCloseBg);
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
        display: inline-block;
        margin: 3% 0;
    }

    .chess-switch-wrapper {
        height: 100%;
        border-radius: 2.2rem;
        background: #8c5133;
        box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #703b20, inset 0 2px 4px 0 #69371d;
        position: relative;
    }

    .chess-switch-wrapper.active {
        background-image: linear-gradient(-1deg, #ffa635 0%, #ff772c 100%);
        box-shadow: 0 -1px 1px 0 #894e31, inset 0 -1px 1px 0 #ff9619, inset 0 2px 4px 0 #ad4400;
    }

    .chess-switch-icon-wrapper {
        width: 2.8rem;
        height: 2.8rem;
        position: absolute;
        left: calc(100% - 2.5rem);
        top: -0.4rem;
        transition: all .3s ease-in-out;
    }

    .chess-switch-icon-wrapper.active {
        left: -3px;
    }

    .chess-switch-icon-inner-wrapper {
        height: 100%;
        border-radius: 50%;
        width: 100%;
    }

    img.chess-switch-icon {
        width: 100%;
        margin: auto;
        display: block;
    }

    p.active-title,
    p.unactive-title {
        margin: 0;
        position: relative;
        left: 3rem;
        line-height: 2rem;
        color: #FFFFFF;
        text-align: left;
        font-size: 80%;
    }

    p.unactive-title {
        color: #eddcb1;
        left: 1rem;
    }
</style>