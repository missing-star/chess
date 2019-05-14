<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    created() {
      if (this.testIE()) {
        this.$router.push({
          name: "forbbiden"
        });
      }
    }
  };
</script>
<style>
  * {
    box-sizing: border-box;
    font-family: PingFangSC-Regular !important;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body,
  div#app {
    height: 100%;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  body {
    line-height: 1rem;
    overflow-y: hidden;
    font-size: calc(100vw / 20);
    min-height: 600px;
    overflow: auto;
  }

  @media screen and (min-width:1500px) {
    body {
      min-width: 1500px;
    }
  }

  @media screen and (max-width:1499px) {
    body {
      min-width: 1200px;
    }
  }

  div.chess-dialog-body {
    z-index: 3;
    background-size: 100% 100%;
    width: 50%;
    height: 70%;
    position: absolute;
    left: 25%;
    top: 15%;
    transition: all 0.3s ease-out;
    min-width: 600px;
    min-height: 500px;
    opacity: 1;
  }

  div.chess-dialog-body.hide {
    top: -100%;
    opacity: 0;
  }

  div.chess-dialog-body1 {
    z-index: 3;
    background-size: 100% 100%;
    width: 50%;
    height: 70%;
    position: absolute;
    left: 25%;
    transition: all 0.3s ease-out;
    min-width: 480px;
    opacity: 1;
    top: 2%;
    min-height: 500px;
  }

  div.chess-dialog-body1.hide {
    top: -100%;
    opacity: 0;
  }

  img.mail-box-close {
    position: absolute;
    right: -5%;
    width: 15%;
    top: 6%;
    cursor: pointer;
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
    color: #ffffff;
    font-size: 1.2rem;
  }

  .pointer {
    cursor: pointer;
  }

  .underline {
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

  .next-wrapper.swiper-button-next,
  .pre-wrapper.swiper-button-prev {
    background: none;
    outline: 0;
  }

  .pre-wrapper.swiper-button-prev.swiper-button-disabled,
  .next-wrapper.swiper-button-next.swiper-button-disabled {
    opacity: 1;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .next-page.swiper-button-prev,
  .pre-page.swiper-button-next {
    background: none;
    outline: none;
  }

  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  canvas,
  caption,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  main,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  time,
  tr,
  tt,
  u,
  ul,
  var,
  video,
  input {
    font-size: 1rem;
  }
  .mCustomScrollBox{
    width: 100%;
  }
</style>