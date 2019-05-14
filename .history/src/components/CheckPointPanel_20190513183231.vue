<template>
    <div class="chess-check-point-panel">
        <div class="chess-dialog-body chess-check-point-panel-body" :class="{'hide':!isShow}">
            <p class="show-title">{{showTitle}}</p>
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="pre-wrapper swiper-button-prev">
                <img v-if="isFirstPage" src="../assets/images/arrow-left-disabled.png" class="page-icon">
                <img v-else src="../assets/images/arrow-left-big.png" class="page-icon">
            </div>
            <div class="next-wrapper swiper-button-next">
                <img v-if="isLastPage" src="../assets/images/arrow-right-disabled.png" class="page-icon">
                <img v-else src="../assets/images/arrow-right-big.png" class="page-icon">
            </div>
            <div class="swiper-container swiper-no-swiping">
                <div class="content-wrapper-container swiper-wrapper">
                    <div class="swiper-slide" :class="{end:checkPointList.slice((n-1)*8,8*n).length > 4}"
                        v-for="n in Math.ceil(checkPointList.length / 8)" :key="n">
                        <div @click="goCheckPoint(item.id,n,index)" :class="{six:index == 5}"
                            class="teacher-item pointer" v-for="(item,index) in checkPointList.slice(8*(n-1),8*(n-1)+8)"
                            :key="item.id">
                            <img v-if="n==currentPage&&index==currentIndex" src="../assets/images/zhan.png"
                                class="teacher-logo">
                            <img v-else src="../assets/images/guan.png" class="teacher-logo">
                            <p v-if="currentPage!=n || index!=currentIndex" class="show-guan-title">
                                第{{item.sort}}关</p>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
    </div>
</template>
<script>
    import ChessMask from './Mask'
    import Swiper from 'swiper'
    export default {
        name: 'chess-check-point-panel',
        data() {
            return {
                checkPointList: [],
                isFirstPage: true,
                isLastPage: false,
                currentIndex: 0,
                currentPage: 1
            }
        },
        methods: {
            closeMyself() {
                this.$emit('hide');
            },
            computedLength() {
                return Math.ceil(this.checkPointList.length / 8) > 1;
            },
            getCheckPointList() {
                this.$axios({
                    url: `${process.env.VUE_APP_URL}index.php?r=api-pass/get-pass`,
                    data: this.qs.stringify({
                        level: this.level,
                        begin: this.begin,
                        end: this.end
                    }),
                    method: 'post'
                }).then((res) => {
                    if (res.data.status == 1) {
                        // if(res.data.data.length > 4) {
                        //     res.data.data.forEach((element,index) => {
                        //         if(index % 4 == 0 && index != 0) {
                        //             let temp = res.data.data.slice(index,index+4).reverse();
                        //             //反转 (6n,6n+5)部分数据
                        //             res.data.data.splice(index,4,...temp);
                        //         }
                        //     });
                        // }
                        this.checkPointList = res.data.data;
                        this.initSwiper();
                    }
                }).catch((err) => {

                });
            },
            goCheckPoint(id, page, index) {
                if (this.currentPage != page || this.currentIndex != index) {
                    this.currentPage = page;
                    this.currentIndex = index;
                    return;
                }
                this.$router.push({
                    name: 'endgame-challenge',
                    query: {
                        id: id
                    }
                })
            },
            initSwiper() {
                //初始化swiper插件
                this.$nextTick(() => {
                    const vm = this;
                    new Swiper('.swiper-container', {
                        watchSlidesProgress: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        on: {
                            progress: function (progress) {
                                console.log(progress);
                                if (this.progress == 0) {
                                    //无法点击上一页
                                    vm.isFirstPage = true;
                                    if (vm.computedLength()) {
                                        vm.isLastPage = false;
                                    }
                                }
                                if (this.progress == 1) {
                                    //无法点击最后一页
                                    vm.isLastPage = true;
                                    vm.isFirstPage = false;
                                }
                            }
                        }
                    });
                });
            }
        },
        props: ['is-show', 'level', 'show-title','begin','end'],
        components: {
            [ChessMask.name]: ChessMask
        },
        watch: {
            level: function () {
                if (this.level != '') {
                    this.getCheckPointList();
                }
            },
            begin: function () {
                if (this.begin != '') {
                    this.getCheckPointList();
                }
            }
        },
        mounted() {
            this.isLastPage = Math.ceil(this.checkPointList.length / 8) > 1 ? false : true;
        }
    }
</script>
<style scoped>
    div.chess-check-point-panel-body {
        background: url(../assets/images/end-game-bg.png) no-repeat;
        background-size: 100% 100%;
    }

    div.swiper-container {
        width: 82%;
        height: 70%;
        margin-top: 15%;
        margin-left: 7%;
        background-size: 100% 100%;
        border-radius: 1rem;
    }

    div.swiper-slide {
        display: flex;
        flex-wrap: wrap;
        padding: 2vw;
        background: transparent;
        align-items: flex-start;
        justify-content: flex-start;

    }

    img.mail-box-close {
        top: 2rem;
        right: -4.2rem;
    }

    .pre-wrapper,
    .next-wrapper {
        position: absolute;
        width: 5rem;
        top: 50%;
        cursor: pointer;
    }

    .pre-wrapper {
        left: -2rem;
    }

    .next-wrapper {
        right: -1.5rem;
    }

    img.page-icon {
        width: 100%;
    }

    .teacher-item {
        background: transparent;
        border-radius: 0.6rem;
        width: 20%;
        text-align: center;
        margin: 0 2.5%;
        display: inline-flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 40%;
        position: relative;
        color: #803017;
    }

    p.show-guan-title {
        position: absolute;
        font-size: 0.6vw;
        width: 100%;
        text-align: center;
        bottom: 0.8vw;
    }

    img.teacher-logo {
        width: 100%;
    }

    img.arrow-guan {
        width: 2.5rem;
        margin-top: 23%;
    }

    img.arrow-guan.left {
        transform: rotate(180deg);
    }

    img.arrow-guan.down {
        transform: rotate(90deg);
    }

    p.show-title {
        text-align: center;
        height: 18%;
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.2rem;
    }
</style>