<template>
    <div class="input-wrapper" :class="{pointer:readonly == true}" @click="trigger" :style="styles">
        <label>{{label}}：</label>
        <input :type="type" :class="{'input-item':true,pointer:readonly == true}" :style="{width:width}" :readonly="readonly">
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
        }
    },
    data() {
        return {
            sendText:'发送验证码',
            time:60
        }
    },
    methods:{
        trigger() {
            this.$emit('trigger');
        },
        sendCode() {
            if(this.time == 60) {
                const interval = setInterval(() => {
                    if(this.time == 1) {
                        clearInterval(interval);
                        this.time = 60;
                        this.sendText = '发送验证码';
                        return false;
                    }
                    this.time--;
                    this.sendText = `${this.time}s后重发`;
                }, 1000);
            }
        }
    }
}
</script>
<style scoped>
.input-wrapper {
    position: relative;
    color: #000000;
    background: #fff3cf;
    min-width: 10rem;
    height: 2.5rem;
    border-radius: 0.2rem;
    padding: 0 0.5rem;
    display:inline-block;
    vertical-align: top;
    margin: 0.6rem 0.4rem;
    white-space: nowrap;
}
.input-item{
    display: inline-block;
    border: none;
    background: transparent;
    height: 100%;
    outline: 0;
}
.pointer{
    cursor: pointer;            
}
span.send-code {
    color: #884f1e;
    position: absolute;
    right: 0.5rem;
    top: 0.9rem;
    font-size: 0.8rem;
}
</style>
