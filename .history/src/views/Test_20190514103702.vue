<template>
    <div class="swiper">

    </div>
</template>
<script>
    import Swiper from "swiper";
    export default {
        created() {
            this.$nextTick(() => {
                const vm = this;
                new Swiper(".swiper-1", {
                    watchSlidesProgress: true,
                    pagination: {
                        el: ".swiper-pagination-1"
                    },
                    navigation: {
                        nextEl: "#next-1",
                        prevEl: "#prev-1"
                    },
                    observer: true,
                    on: {
                        progress: function (progress) {
                            if (this.progress == 0) {
                                //无法点击上一页
                                vm.isFirstPage1 = true;
                                if (vm.computedLength1()) {
                                    vm.isLastPage1 = false;
                                }
                            }
                            if (this.progress == 1) {
                                //无法点击最后一页
                                vm.isLastPage1 = true;
                                vm.isFirstPage1 = false;
                            }
                        }
                    }
                });
            });
        }
    }
</script>