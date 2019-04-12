<template>
    <div class="chess-arena-wrapper">
        <h2>竞技场</h2>
        <div class="category-wrapper">
            <div class="category-item">
                <button class="start-game pointer" @click="openOnlineRacePanel">在线对战</button>
            </div>
            <div class="category-item">
                <button class="start-game pointer" @click="openCheckPointPanel">象棋闯关</button>
            </div>
        </div>
        <chess-online-race-panel :wait-time="waitTime" @start-game="goGame" @hide="hideOnlineRacePanel" :is-show="showOnlineRacePanel"></chess-online-race-panel>
        <chess-check-point-panel @hide="hideCheckPointPanel" :is-show="showCheckPointPanel"></chess-check-point-panel>
        <chess-back-button></chess-back-button>
    </div>
</template>
<script>
import BackButton from '../components/BackButton'
import OnlineRacePanel from '../components/OnlineRacePanel'
import CheckPointPanel from '../components/CheckPointPanel'
import CheckPointPanelVue from '../components/CheckPointPanel'
import {SearchEngine} from '../assets/js/online/CChess'
export default {
    data() {
        return {
            showOnlineRacePanel:false,
            showCheckPointPanel:false,
            waitTime:0,
            interval:'',
            intervalWait:'',
            //在线对战或人机
            isOnline:true,
            socket:null,
            SearchEngine:SearchEngine,
            searchEngine:''
        }
    },
    methods:{
        openOnlineRacePanel() {
            this.showOnlineRacePanel = true;
        },
        hideOnlineRacePanel() {
            this.showOnlineRacePanel = false;
        },
        openCheckPointPanel() {
            this.showCheckPointPanel = true;
        },
        hideCheckPointPanel() {
            this.showCheckPointPanel = false;
        },
        goOnlineRace() {
            console.log('计时')
            this.interval = setInterval(() => {
                if (this.waitTime >= 15) {
                    // 重新匹配进入人机
                    clearInterval(this.interval);
                    this.waitTime = 0;
                    this.isOnline = false;
                    this.goGame();
                }
                else {
                    this.waitTime += 1;
                }
            }, 1000);
        },
        goGame() {
            if (this.isOnline) {
                //在线对战
                if (this.waitTime != 0) {
                    return;
                }
                const uuid = `user${this.getUuuid(8, 16)}`;
                sessionStorage.setItem('uuid', uuid);
                this.goOnlineRace();
                this.socket = new Websocket('ws://47.99.241.87:1234');
                // this.socket = new WebSocket('ws://127.0.0.1:8001');
                this.socket.onopen = ()=> {
                    //状态为1证明握手成功
                    if (this.socket.readyState == 1) {
                        //发送uuid
                        this.socket.send(uuid);
                    }
                };
                //握手失败或者其他原因连接this.socket失败，则清除so对象并做相应提示操作
                this.socket.onclose = () => {
                    this.socket = null;
                }
                this.socket.onmessage = (msg) => {
                    if (msg.data.indexOf('login success') != -1) {
                        //自己登录成功
                        sessionStorage.setItem('code', msg.data.substring(msg.data.indexOf('user')));
                    } else if (msg.data.indexOf('user') == 0) {
                        //b方登录
                        /**
                         * 其他用户登录成功
                         * 判断是否已经匹配了用户，
                         * 未匹配则匹配用户开始对战 
                         * */
                        if (!sessionStorage.getItem('user_type2')) {
                            sessionStorage.setItem('user_type2', msg.data);
                            //我匹配对方，我是红方
                            sessionStorage.setItem('nowWho', 0);
                            sessionStorage.setItem('isRed', true);
                            sessionStorage.setItem('user_type', 'a');
                            sessionStorage.setItem('user_type2', 'b');
                            //发送匹配请求
                            this.socket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
                                'type': 'user',
                                'content': 'yes',
                                'user_type': sessionStorage.getItem('user_type')
                            })}`);
                            //开始游戏
                            this.startGame();
                            this.waitTime = 0;
                            clearInterval(this.interval);
                            //我方先手，开始计时
                            this.countTimes();
                        }
                    } else if (msg.data == 'offline') {
                        //对方刷新或关闭浏览器
                        alert('对方已离线，你赢了');
                        saveGameResult(sessionStorage.getItem('user_type'), uuid);
                        this.gameOver();
                    } else {
                        //用户之间发送消息
                        var data = JSON.parse(msg.data);
                        switch (data.type) {
                            case 'user':
                                //用户发送消息给我
                                if (data.content === 'yes' && !sessionStorage.getItem('user_type2')) {
                                    //对方匹配我，我是黑方
                                    sessionStorage.setItem('isRed', false);
                                    sessionStorage.setItem('user_type', 'b');
                                    sessionStorage.setItem('nowWho', 1);
                                    sessionStorage.setItem('user_type2', data.user_type);
                                    //开始游戏
                                    startGame();
                                } else if (data.content == 'out') {
                                    //对方1分钟未操作
                                    alert('由于对方长时间未操作，您赢得了本局比赛');
                                    isTimeUp = true;
                                    saveGameResult(sessionStorage.getItem('user_type'), uuid);
                                    this.gameOver();
                                } else if (data.content == 'back') {
                                    var result = '';
                                    //对方要求悔棋
                                    if (confirm('您同意对方悔棋吗')) {
                                        result = 'agree';
                                        move(preOperation.y, preOperation.x, preOperation.j, preOperation.i, preOperation.eat, true,true);
                                    } else {
                                        result = 'refuse';
                                    }
                                    this.socket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
                                        'type': 'user',
                                        'content': result,
                                        'user_type': sessionStorage.getItem('user_type')
                                    })}`);
                                } else if (data.content == 'agree') {
                                    //同意悔棋
                                    move(preOperation.y, preOperation.x, preOperation.j, preOperation.i, preOperation.eat, true,true);
                                } else if (data.content == 'refuse') {
                                    //拒绝悔棋
                                    alert('对方拒绝您悔棋!');
                                } else if (data.content == 'quit') {
                                    //对方认输
                                    alert('对方已认输，您赢得了本局比赛');
                                    saveGameResult(sessionStorage.getItem('user_type'), uuid);
                                    this.gameOver();
                                } else if (data.user_type == sessionStorage.getItem('user_type2')) {
                                    /**
                                     * 对方走棋或者点击棋子
                                     */
                                    var content = JSON.parse(data.content);
                                    if (content.chose) {
                                        //选中棋子
                                        onChose(9 - content.j, 8 - content.i, false, true);
                                    } else {
                                        //对方走棋,同步棋子位置
                                        move(9 - content.y, 8 - content.x, 9 - content.j, 8 - content.i, content.eat, false, false);
                                        //对方走棋，我方重新计时
                                        this.countTimes();
                                    }
                                }
                                break;
                            case 'logout':
                                if (isTimeUp || isFailed) {
                                    //对方未操作结束比赛或者自己输掉比赛
                                    return;
                                }
                                alert('对方已离线，你赢了');
                                saveGameResult(sessionStorage.getItem('user_type'), uuid);
                                this.gameOver();
                        }
                    }
                }
            } else {
                //人机
                this.isOnline = false;
                sessionStorage.setItem('isRed', true);
                sessionStorage.setItem('nowWho', 0);
                this.searchEngine = new this.SearchEngine(1);
                this.startGame();
            }
        },
        startGame() {
            console.log('startGame');
            //开始游戏，进入对战界面
            this.$router.push({name:'online-race',params:{socket:this.socket,searchEngine:this.searchEngine,isOnline:this.isOnline}});
        },
        //计时一分钟
        countTimes(flag) {
            if (flag == 'over') {
                clearInterval(this.intervalWait);
                return;
            }
            if (this.intervalWait) {
                clearInterval(this.intervalWait);
            }
            let time = 0;
            this.intervalWait = setInterval(function () {
                if (time == 60) {
                    this.socket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
                        'type': 'user',
                        'content': 'out',
                        'user_type': sessionStorage.getItem('user_type')
                    })}`);
                    alert('由于您长时间未操作，对局已结束');
                    this.gameOver();
                }
                time += 1;
            }, 1000);
        },
        gameOver() {
            map = [];
            counts = 0;
            if (isOnline) {
                this.socket.close();
            }
            countTimes('over');
        },
        getUuuid(len, radix) {
            var time = new Date().getTime();
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [],
                i;
            radix = radix || chars.length;

            if (len) {
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                var r;

                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('') + time;
        },
        goEndGame() {
            this.$router.push({path:'/endgame-challenge'});
        }
    },
    components:{
        [BackButton.name]:BackButton,
        [OnlineRacePanel.name]:OnlineRacePanel,
        [CheckPointPanel.name]:CheckPointPanel
    }
}
</script>
<style scoped>
.chess-arena-wrapper {
    width: 100%;
    height: 100%;
    background: url(../assets/images/home-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 10%;
}
h2 {
    text-align: center;
    font-size: 2rem;
}
.category-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
}
.category-item {
    width: 20rem;
    height: 25rem;
    background: #f6f6f6;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: 1rem;
}
button.start-game {
    border: none;
    width: 55%;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #fff;
    margin-bottom: 3rem;
    outline: 0;
}
</style>
