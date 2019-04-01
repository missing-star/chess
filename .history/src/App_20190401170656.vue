<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    if(this.testIE()) {
      this.$router.push({name:'forbbiden'});
    }
  }
}
</script>
<style>
  *{
    box-sizing: border-box;
    font-family: PingFangSC-Regular !important;
    -webkit-font-smoothing: antialiased; 
  }
  html,body,div#app{
    height: 100%;
  }
  body{
    line-height: 1rem;
    overflow-y: hidden;
    font-size: calc(100vw / 20);
    min-width: 1500px;
  }
  div.chess-dialog-body{
    z-index: 2;
    background-size: 100% 100%;
    width: 50%;
    height: 70%;
    min-width: 850px;
    position: absolute;
    left: 25%;
    top: 15%;
    transition: all 0.3s ease-out;
    min-width: 960px;
    min-height: 680px;
    opacity: 1;
  }
  div.chess-dialog-body.hide{
    top: -100%;
    opacity: 0;
  }
  img.mail-box-close {
    position: absolute;
    right: -4.5rem;
    width: 10rem;
    top: 4rem;
    cursor: pointer;
  }
  img.mail-box-close{
      top: 0;
  }
  p.unread-number {
      position: absolute;
      width: 3rem;
      height: 1.8rem;
      right: -0.2rem;
      top: -0.2rem;
      background: url(./assets/images/unread.png) no-repeat;
      background-size: 100% 100%;
      line-height: 1.8rem;
      text-align: center;
      color: #FFFFFF;
      font-size: 1.2rem;
  }
  .pointer{
    cursor: pointer;
  }
  .underline{
    text-decoration: underline;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  span.swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: url(./assets/images/dot-select.png) no-repeat;
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
  }
  span.swiper-pagination-bullet {
    background: url(./assets/images/dot-unselect.png) no-repeat;
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
}
.next-wrapper.swiper-button-next{
  background:none;
}
.pre-wrapper.swiper-button-prev{
  background: none;
}
</style>
