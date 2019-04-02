<template>
    <div class="input-wrapper" :class="{pointer:readonly == true}" @click="trigger" :style="styles">
        <label>{{label}}：</label>
        <input :type="type" :class="{'input-item':true,pointer:readonly == true}" :style="{width:width}" :readonly="readonly">
        <span class="send-code">发送验证码</span>
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
        }
    },
    data() {
        return {

        }
    },
    methods:{
        trigger() {
            this.$emit('trigger');
        }
    }
}
</script>
<style scoped>
.input-wrapper {
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
</style>
