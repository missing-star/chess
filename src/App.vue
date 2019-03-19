<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  *{
    box-sizing: border-box;
    font-family: PingFangSC-Regular !important;
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
</style>
