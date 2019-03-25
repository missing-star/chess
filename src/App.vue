<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
    background-size: 100% 100% !important;
    width: 50%;
    height: 70%;
    min-width: 850px;
    position: absolute;
    left: 25%;
    top: 15%;
    transition: all 0.3s ease-out;
    min-width: 960px;
    min-height: 680px;
  }
  div.chess-dialog-body.hide{
    top: -100%;
  }
  img.mail-box-close {
    position: absolute;
    right: -4.5rem;
    width: 10rem;
    top: 4rem;
    cursor: pointer;
  }
  .tabbar-wrapper {
        position: absolute;
        top: 5.8rem;
        left: 38%;
        z-index: 2;
        transition: all 0.3s ease-out;
    }
    .tabbar-wrapper.hide{
        top: -100%;
    }
    div.tabbar-item{
        background: url(./assets/images/tab-icon.png) no-repeat;
        background-size: 100% 100%;
        width: 14rem;
        height: 5rem;
        display: inline-block;
        cursor: pointer;
        color: #753f22;
        text-align: center;
        line-height: 4rem;
        font-size: 1.8rem;
        font-weight: bold;
        position: relative;
    }
    div.tabbar-item.active{
        color: #ac5e35;
        background-image: url(./assets/images/tab-icon-active.png);
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
</style>
