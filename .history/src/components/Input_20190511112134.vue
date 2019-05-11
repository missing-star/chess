<template>
  <div class="input-wrapper" :class="{pointer:readonly == true}" @click="trigger" :style="styles">
    <label>{{label}}：</label>
    <input
      :value="value"
      @input="changeValue($event)"
      :type="type"
      :class="{'input-item':true,pointer:readonly == true}"
      :style="{width:width}"
      :readonly="readonly"
    >
    <img v-if="select" src="../assets/images/selct-drop-icon.png" class="select-icon">
    <span v-if="send" class="send-code pointer" @click="sendCode">{{sendText}}</span>
  </div>
</template>
<script>
export default {
    name:'chess-input',
    props:{
        label:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        width:{
            type:String,
            required:true
        },
        styles:{
            type:String,
            required:false
        },
        readonly:{
            type:Boolean,
            required:false
        },
        send:{
            type:Boolean,
            required:false
        },
        value:{
            type:String,
            required:true
        },
        select:{
          type:Boolean
        }
    },
  data() {
    return {
      sendText: "发送验证码",
      time: 60,
      msg: ""
    };
  },
  computed:{
    value() {
      return this.value.toString();
    }
  },
  methods: {
    trigger() {
      this.$emit("trigger");
    },
    sendCode() {
      if (this.time == 60) {
        this.sendText = `${this.time}s后重发`;
        const interval = setInterval(() => {
          if (this.time == 1) {
            clearInterval(interval);
            this.time = 60;
            this.sendText = "发送验证码";
            return false;
          }
          this.time--;
          this.sendText = `${this.time}s后重发`;
        }, 1000);
      }
    },
    changeValue(e) {
        this.$emit('input',e.target.value);
    }
  }
};
</script>
<style scoped>
.input-wrapper {
  position: relative;
  color:#ffe6a5;
  background:#BF886A;
  box-shadow:0 1px 1px 0 #f3c9b3, inset 0 1px 3px 0 #5b311b;
  width: 70%;
  height: 7%;
  border-radius: 0.2rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  vertical-align: top;
  margin: 2% 0;
  white-space: nowrap;
  font-size: 0.8rem;
}
.input-item {
  display: inline-block;
  border: none;
  background: transparent;
  height: 100%;
  width: 50%;
  outline: 0;
  flex:1;
  color: #ffe6a5;
  font-size: 0.6rem;
}
.pointer {
  cursor: pointer;
}
span.send-code {
  color: #884f1e;
  position: absolute;
  right: 0.5rem;
  top: 25%;
  font-size: 0.8rem;
}
img.select-icon {
    width: 0.6rem;
}
</style>
