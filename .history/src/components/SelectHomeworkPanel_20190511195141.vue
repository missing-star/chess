<template>
    <div class="chess-check-homework-panel">
        <div class="chess-dialog-body chess-check-homework-body" :class="{'hide':!isShow}">
            <img src="../assets/images/close.png" class="mail-box-close" @click="closeMyself">
            <div class="content-wrapper-container">
                <input type="text" placeholder="搜索" class="search-input">
                <ul class="apprentice-wrapper">
                    <li :class="{active:selectedId == homework.id}" v-for="homework in homeworkList" :key="homework.id" class="apprentice-item">
                        <p @click="toggleHomework(homework.id,homework.title,homework.desc,$event)" class="homework-name pointer">{{homework.title}}</p>
                        <img @click="editHomework(homework.id)" src="../assets/images/edit-homework.png" class="check-icon edit pointer">
                        <img src="../assets/images/checked-homework.png" class="check-icon checked">
                    </li>
                </ul>
            </div>
            <div class="bottom-wrapper">
                <div class="left-part">
                    <img src="../assets/images/personal-info-logo-wrapper.png" class="logo-wrapper">
                    <div class="grade-info-wrapper">
                        <p class="grade-title">{{className}}</p>
                    </div>
                </div>
                <span class="top-tips">选中</span>
                <div class="middle-part">
                    <input placeholder="请输入作业名称" v-model="homeworkName" type="text" class="select-homework-name">
                </div>
                <div class="right-part">
                    <img src="../assets/images/submit-btn.png" @click="assignHomework" class="submit-btn pointer">
                </div>
            </div>
        </div>
        <chess-mask :is-show="isShow"></chess-mask>
        <button class="test" @click="editHomework(2)">测试</button>
    </div>
</template>
<script>
import ChessMask from './Mask'
export default {
    name:'chess-select-homework-panel',
    props:['is-show','class-id','class-name'],
    data() {
        return {
            selectedId:'',
            homeworkList:[],
            homeworkName:'',
            desc:''
        }
    },
    components:{
        [ChessMask.name]:ChessMask
    },
    methods: {
        closeMyself() {
            this.$emit('hide');
        },
        toggleHomework(id,title,desc,e) {
            if(this.selectedId == id) {
                this.selectedId = '';
                this.homeworkName = '';
                this.desc = '';
            }
            else {
                this.selectedId = id;
                this.homeworkName = title;
                this.desc = desc;
            }
        },
        editHomework() {
            this.$router.push({path:'/create-chess-table',query:{id:id}});
        },
        assignHomework() {
            if(this.selectedId == '') {
                alert('请选择作业!');
                return;
            }
            else if(this.homeworkName.trim() == '') {
                alert('请输入作业名称!');
                return;
            }
            this.$axios({
                method:'post',
                url:`${process.env.VUE_APP_URL}index.php?r=api-task/command-task`,
                data:this.qs.stringify({
                    question_ids:this.selectedId,
                    class_id:this.classId,
                    title:this.homeworkName,
                    end_time:new Date().getTime(),
                    desc:this.desc
                })
            }).then((res) => {
                alert(res.data.msg);
                if(res.data.status == 1) {
                    this.closeMyself();
                }
            }).catch((err) => {

            });
        }
    },
    mounted() {
        console.log(this.className);
        this.$axios({
            url:`${process.env.VUE_APP_URL}/index.php?r=api-teach-chess-manual/get-chess-manual-lists`,
            method:'post',
            data:this.qs.stringify({
                type:2
            })
        }).then((res) => {
            this.homeworkList = res.data.data;
        }).catch((err) => {
            alert('服务器异常');
        });
    }
}
</script>
<style scoped>
    div.chess-check-homework-body{
        background: url(../assets/images/select-homework-bg.png) no-repeat,url(../assets/images/apprentice-color-bg.png) no-repeat; 
        background-size: 100% 100%,101% 93%;
        background-position: center,center 121%;
    }
    div.content-wrapper-container{       
        width: 84%;
        height: 80%;
        margin-top: 10%;
        margin-left: 6%;
        display: flex;
        align-items: center;
        position: relative;
        flex-direction: column;
        padding-top: 2rem;
    }
    img.mail-box-close{
        top: 0.2rem;
        right: -4rem;
    }
    ul.apprentice-wrapper {
        height: 85%;
        width: 100%;
        overflow: scroll;
        overflow-x: hidden;
        padding: 0 3rem;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        -ms-overflow-style: none;
        scrollbar-width:none;
        padding-bottom: 7rem;
        margin-top: 0.5rem;
    }
    ul.apprentice-wrapper::-webkit-scrollbar{
        width: 0;
    }
    li.apprentice-item {
        width: 48%;
        background: url(../assets/images/homework-list-bg.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.5rem 0;
        border-radius: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
    }
    img.detail-icon {
        width: 3.5rem;
    }
    div.bottom-wrapper{
        background: url(../assets/images/bottom-bg.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: 96%;
        height: 12rem;
        bottom: 3%;
        left: 2%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input.search-input{
        border: none;
        background: #955c3e;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        border: none;
        border-radius: 1rem;
        height: 2rem;
        width: 15rem;
        background-image: url(../assets/images/search-icon.png);
        background-repeat: no-repeat;
        background-position: 2%;
        background-size: 1.2rem;
        padding-left: 2rem;
        font-size: 1.1rem;
        color: #764328;
        outline: 0;
    }
    input.search-input::-webkit-input-placeholder{
        color: #764328;
    }
    p.homework-name {
        color: #bc8567;
        font-size: 1.1rem;
    }
    img.check-icon {
        width: 1.5rem;
    }
    span.score {
        background: #f1e4c1;
        width: 3rem;
        height: 2rem;
        color: #ef7722;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
    }
    span.tips-times {
        border-left: 1px solid #f3d997;
        padding-left: 0.5rem;
        color: #bc8567;
    }
    .left-part {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 33%;
    }
    p.grade-title {
        color: #f0e5c4;
        text-shadow: 0 1px 1px #68371e;
        font-size: 1.5rem;
    }
    p.total-homework {
        background: #955c3e;
        box-shadow: 0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        margin-top: 0.5rem;
        color: #f0e5c4;
        text-shadow: 0 1px 1px #68371e;
    }
    div.middle-part{
        position: relative;
        background-size: 100% 100%;
        width: 30%;
        height: 50%;
        margin-top: 2rem;
        background:#955c3e;
        box-shadow:0 1px 1px 0 #d9ab93, inset 0 1px 1px 0 #552e19;
        border-radius: 0.5rem;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width:none;
        -ms-overflow-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.middle-part::-webkit-scrollbar{
        width: 0;
    }
    img.logo-wrapper{
        width: 30%;
    }
    p.uncheck-total{
        background: url(../assets/images/btn-bg.png) no-repeat;
        background-size: 100% 100%;
        padding: 0.5rem;
        color: #fff;
        font-size: 0.8rem;
    }
    p.checked-total{
        color: #e4baa3;
        font-size: 0.8rem;
    }
    .right-part {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img.submit-btn {
        width: 45%;
    }
    span.top-tips {
        position: absolute;
        top: 2.8rem;
        background: #ff9733;
        padding: 0.2rem 0.5rem;
        color: #fff;
        font-size: 0.4rem;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        z-index: 1111;
        left: 49%;
    }
    p.select-homework-item {
        color: #ffddaa;
        position: relative;
        width: 100%;
        text-align: center;
        height: 30%;
        display:inline-flex;
        align-items:center;
        justify-content: center;
    }
    p.select-homework-item:not(:last-child)::after{
        content: '';
        position:absolute;
        width: 80%;
        height: 2px;
        background:#a76d4e;
        box-shadow:0 1px 1px 0 #4c2512;
        bottom: -0.1rem;
        left: 10%;
    }
    .apprentice-item img.check-icon.edit{
        display: block;
    }
    .apprentice-item.active img.check-icon.edit{
        display: none;
    }
    .apprentice-item.active img.check-icon.checked{
        display: block;
    }
    .apprentice-item img.check-icon.checked{
        display: none;
    }
    input.select-homework-name {
        background: transparent;
        border: none;
        color: #fff;
        outline: 0;
    }
    input.select-homework-name::-webkit-input-placeholder{
        color: #bc8567;
    }
</style>
