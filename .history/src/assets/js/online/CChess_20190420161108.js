var isOnline = {
	value:false
}
var searchEngine = {
	engine:'aa'
}
var isBackOrGo = false;

var showrecordList = [];
var recordList = [];
var currentIndex = {
    value:-1
}
var interval = '';

var waitTimes = 0;
function LoadGround() { //生成旗子
    var g = "";
    if (map.length != 0) {
        for (var j = 0; j < 10; j++) {
            for (var i = 0; i < 9; i++) {
                g += "<article class='CS' id='CS" + j + "-" + i + "' onclick='onChoseOnline(" + j + "," + i + ",true)'></article>";
            }
        }
    } else {
        for (var j = 0; j < 10; j++) {
            map[j] = [];
            for (var i = 0; i < 9; i++) {
                map[j][i] = 0;
                g += "<article class='CS' id='CS" + j + "-" + i + "' onclick='onChoseOnline(" + j + "," + i + ",true)'></article>";
            }
        }
    }

    $("#space").html(g);
    Log("完成创建场景");
}


//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑

function getCText(j, i) {
    var T = [];
    if (sessionStorage.getItem('isRed') == 'true') {
        switch (map[j][i]) {
            case (0):
                return null;
                break;
            case (1):
                T[0] = "";
                T[1] = "BR";
                break;
            case (2):
                T[0] = "";
                T[1] = "PR";
                break;
            case (3):
                T[0] = "";
                T[1] = "JR";
                break;
            case (4):
                T[0] = "";
                T[1] = "MR";
                break;
            case (5):
                T[0] = "";
                T[1] = "XR";
                break;
            case (6):
                T[0] = "";
                T[1] = "SR";
                break;
            case (7):
                T[0] = "";
                T[1] = "J";
                break;
            case (-1):
                T[0] = "";
                T[1] = "BB";
                break;
            case (-2):
                T[0] = "";
                T[1] = "PB";
                break;
            case (-3):
                T[0] = "";
                T[1] = "JB";
                break;
            case (-4):
                T[0] = "";
                T[1] = "MB";
                break;
            case (-5):
                T[0] = "";
                T[1] = "XB";
                break;
            case (-6):
                T[0] = "";
                T[1] = "SB";
                break;
            case (-7):
                T[0] = "";
                T[1] = "S";
                break;
            default:
                return null;
                break;
        }
    } else {
        switch (map[j][i]) {
            case (0):
                return null;
                break;
            case (-1):
                T[0] = "";
                T[1] = "BR";
                break;
            case (-2):
                T[0] = "";
                T[1] = "PR";
                break;
            case (-3):
                T[0] = "";
                T[1] = "JR";
                break;
            case (-4):
                T[0] = "";
                T[1] = "MR";
                break;
            case (-5):
                T[0] = "";
                T[1] = "XR";
                break;
            case (-6):
                T[0] = "";
                T[1] = "SR";
                break;
            case (-7):
                T[0] = "";
                T[1] = "J";
                break;
            case (1):
                T[0] = "";
                T[1] = "BB";
                break;
            case (2):
                T[0] = "";
                T[1] = "PB";
                break;
            case (3):
                T[0] = "";
                T[1] = "JB";
                break;
            case (4):
                T[0] = "";
                T[1] = "MB";
                break;
            case (5):
                T[0] = "";
                T[1] = "XB";
                break;
            case (6):
                T[0] = "";
                T[1] = "SB";
                break;
            case (7):
                T[0] = "";
                T[1] = "S";
                break;
            default:
                return null;
                break;
        }
    }
    return T;
}

function showC() {
    for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 9; i++) {
            //class类名
            var cla = "";
            //显示的棋子文本
            var tex = "";
            var isNone = false;
            //获得指定位置的棋子
            var T = getCText(j, i);
            if (T == null) {
                //无棋子位置
                isNone = true;
            } else {
                cla = T[1];
                tex = T[0];
            }
            if (isNone) {
                continue;
            }
            $("#CS" + j + "-" + i).html(
                "<section class='C " + cla + "'>" + tex + "</section>"
            )
        }
    }
    Log("完成显示场景");
}

//0清除 1绿色 2黄色 3红色
function showChose(j, i, t) {
    var o = $("#CS" + j + "-" + i);
    if (t == 0) {
		o.removeClass('selected');
        return;
    }
    var c = "";
    switch (t) {
        case 1:
            c = "6bc274";
            break;
        case 2:
            c = "eeb948";
            break;
        case 3:
            c = "c53f46";
            break;
        default:
            break;
    }
    o.addClass('selected');
}

function cleanChose() {
    $(".CS").removeClass('selected');
}

function move(y, x, j, i, eat, isBack, isSend) {
    if (isBack) {
        //悔棋操作
        if (!preOperation.sourceElem || !preOperation.flag) {
            //第一次移动或者已经点击过悔棋，无法悔棋
            return false;
        } else {
            onMove = true;
            var cla = "";
            var tex = "";
            var T = getCText(y, x);
            if (T == null) {
                LogError("丢失棋子信息");
                return;
            } else {
                cla = T[1];
                tex = T[0];
            }
            if (eat == null)
                Log(y + "-" + x + " " + tex + " 移动到" + j + "-" + i);
            else
				Log(y + "-" + x + " " + tex + " 吃" + j + "-" + i + " " + getCText(j, i)[0]);
			if (recordList[currentIndex.value].targetElem == "" || isNext) {
				map[j][i] = map[y][x];
				map[y][x] = 0;
			} else {
				map[j][i] = map[y][x];
				map[y][x] = recordList[currentIndex.value].targetElem.value;
			}
            if (preOperation.targetElem == "") {
                map[j][i] = map[y][x];
                map[y][x] = 0;
            } else {
                map[j][i] = map[y][x];
                map[y][x] = preOperation.targetElem.value;
            }
            // sessionStorage.setItem('map', JSON.stringify(map));
            $("#CS" + j + "-" + i).html(
                "<section class='C " + preOperation.sourceElem + "' style='transform:translate(" + (x - i) * 45 + "px," + (y - j) * 45 + "px);'>" + tex + "</section>"
            )
            //是否吃掉棋子
            if (preOperation.targetElem.value == 0) {
                $("#CS" + y + "-" + x).html(
                    ""
                )
            } else {
                $("#CS" + y + "-" + x).html(
                    "<section class='C " + preOperation.targetElem.cla + "'>" + tex + "</section>"
                )
            }
            preOperation.flag = false;
            sessionStorage.setItem('preOperation', JSON.stringify(preOperation));
        }
    } else {
		var end = false;
        if (isBackOrGo || (currentIndex.value != -1 && currentIndex.value != recordList.length - 1)) {
            //操作了前进/后退，手动移动棋子，删除当前记录后的操作记录
            recordList.splice(currentIndex.value + 1);
            end = currentIndex.value + 1;
        }
        //下棋操作
        onMove = true;
        if (eat == null)
            if (map[j][i] != 0) {
                LogError("错误的位置");
                return;
            }
        var cla = "";
        var tex = "";
        var T = getCText(y, x);
        var T2 = getCText(j, i);
        if (T == null) {
            LogError("丢失棋子信息");
            return;
        } else {
            cla = T[1];
            tex = T[0];
        }
        if (eat == null){
            Log(y + "-" + x + " " + tex + " 移动到" + j + "-" + i);
        }
        else {
            Log(y + "-" + x + " " + tex + " 吃" + j + "-" + i + " " + getCText(j, i)[0]);
            if(!isOnline.value) {
                //机器吃子
                if(map[j][i] == 7) {
                    setTimeout(function () {
                        alert('你输了');
                        gameOver();
                    }, 600);
                }
            }
        }

        var targetValue = map[j][i];
        map[j][i] = map[y][x];
        map[y][x] = 0;
        sessionStorage.setItem('map', JSON.stringify(map));
        $("#CS" + j + "-" + i).html(
            "<section class='C " + cla + "' style='transform:translate(" + (x - i) * 45 + "px," + (y - j) * 45 + "px);'>" + tex + "</section>"
        )
        $("#CS" + y + "-" + x).html(
            ""
        )
        //保存当前的下棋步骤
        preOperation.y = j;
        preOperation.x = i;
        preOperation.j = y;
        preOperation.i = x;
        preOperation.sourceElem = cla;
        preOperation.targetElem.cla = T2 == null ? "" : T2[1];
        preOperation.targetElem.value = T2 == null ? 0 : targetValue;
		preOperation.flag = true;
		recordList.push(preOperation);
        currentIndex.value = recordList.length - 1;
        sessionStorage.setItem('preOperation', JSON.stringify(preOperation));
        /**
         * 通信，同步操作
         */
        if (isOnline.value) {
            if (isSend) {
                sendMessage(y, x, j, i, eat);
            }
        } else {
			console.log('人机进行操作',map);
			sessionStorage.getItem('nowWho');
            trunH();
            onMove = false;
            if (sessionStorage.getItem('nowWho') == 1) {
                getEngineeMove(map);
            }
        }
    }

    setTimeout(function () {
        $("#CS" + j + "-" + i + " section").css({
            transform: ""
        })
    }, 10);
    if (isOnline.value) {
        setTimeout(function () {
            trunH();
            onMove = false;
        }, 500);
    }
}
function gameOver() {
    map = [];
    if (isOnline.value) {
        gameSocket.close();
    }
	countTimes('over');
	
}
//计时一分钟
function countTimes(flag) {
		if (flag == 'over') {
			clearInterval(interval);
			return;
		}
		if (interval != '') {
			clearInterval(interval);
		}
		waitTimes = 0;
		interval = setInterval(function () {
			console.log(time)
			if (waitTimes == 60) {
				gameSocket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
					'type': 'user',
					'content': 'out',
					'user_type': sessionStorage.getItem('user_type')
				})}`);
				alert('由于您长时间未操作，对局已结束');
				gameOver();
			}
			waitTimes += 1;
		}, 1000);
}
function getEngineeMove(map) {
	const bestMove = searchEngine.engine.getGoodMove(transformMap(map)).bestMove;
	const eat = map[bestMove.to.y][bestMove.to.x] == 0 ? null : true;
	console.log('bestMove='+bestMove)
	setTimeout(function () {
		move(bestMove.from.y, bestMove.from.x, bestMove.to.y, bestMove.to.x, eat, false, false);
	}, getRandomTime());
}
/**
 * 随机生成4-8内的整数
 */
function getRandomTime() {
    return Math.round(Math.random() * 4 + 4) * 1000;
}
function eat(y, x, j, i) {
    if (sessionStorage.getItem('isRed') == 'true') {
        if (map[j][i] == 7) {
            //黑棋胜
            setTimeout(function () {
                alert('你输了');
                gameOver();
            }, 600);
        }
        if (map[j][i] == -7) {
            //红棋胜
            setTimeout(function () {
                alert('你赢了');
                saveGameResult(sessionStorage.getItem('user_type'), sessionStorage.getItem('uuid'));
                gameOver();
            }, 600);
        }
    } else {
        if (map[j][i] == 7) {
            //黑棋胜
            setTimeout(function () {
                alert('你输了');
                gameOver();
            }, 600);
        }
        if (map[j][i] == -7) {
            //红棋胜
            setTimeout(function () {
                alert('你赢了');
                saveGameResult(sessionStorage.getItem('user_type'), sessionStorage.getItem('uuid'));
                gameOver();
            }, 600);
        }
    }
    $("#CS" + j + "-" + i + " section").css({
        transform: "scale(0,0)"
    })
    setTimeout(function () {
        move(y, x, j, i, true, false, true);
    }, 500);
}
/**
 * 
 * @param {Number} y 起始位置纵坐标 
 * @param {Number} x 起始位置横坐标 
 * @param {Number} j 目标位置纵坐标 
 * @param {Number} i 目标位置横坐标
 * @param {Boolean} eat 是否吃掉棋子
 */
function sendMessage(y, x, j, i, eat) {
    var obj = JSON.stringify({
        y: y,
        x: x,
        j: j,
        i: i,
        eat: eat == undefined ? null : eat,
        role: sessionStorage.getItem('isRed') == 'true' ? 'red' : 'black'
    });
    gameSocket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
        content: obj,
        type: 'user',
        user_type: sessionStorage.getItem('user_type')
    })}`);
    //清空计时器
    countTimes('over');
}
var onMove = false;
var OnChoseNow = false;
var nowChoseC = [];
var moveList = [];
var eatList = [];
//点击棋子
function onChose(j, i,isSend,program) {
    if (!isFreeOper && sessionStorage.getItem('nowWho') == 1 && !program) {
        return;
    }
    if (!runNow) return;
    if (onMove) return;
    var CC = WhatSpace(j, i);
    if (CC == 0) {
        //选择了无棋子的位置
        onChoseS(j, i);
    } else {
        //选中棋子
        Log("选择了" + j + "-" + i + "  " + CC);
        onChoseC(j, i, CC,program);
    }
    if(!isOnline.value) {
        return;
    }
    isSend = ((CC <= 0 && sessionStorage.getItem('nowWho') == 1) || program) ? false : true;
    senMessageChose(j, i,isSend);

}

function cleanSt() {
    nowChoseC = [];
    cleanChose();
    moveList = [];
    eatList = [];
    OnChoseNow = false;
}

function trunH() {
	console.log('trunH',sessionStorage.getItem('nowWho') == '0');
    if (sessionStorage.getItem('nowWho') == 0) {
        sessionStorage.setItem('nowWho', 1);
    } else {
        sessionStorage.setItem('nowWho', 0);
    }
    cleanSt();
}

function showSt(j, i, t) {
    nowChoseC = [];
    //清除所有棋子样式
    cleanChose();
    //设置当前棋子样式
    showChose(j, i, 1);
    var tmap = WhereCan(j, i, t);
    if (tmap != null && tmap.length > 0)
        for (var q = 0; q < tmap.length; q++) {
            if (map[tmap[q][0]][tmap[q][1]] == 0) {
                moveList.push(tmap[q]);
            } else {
                eatList.push(tmap[q]);
            }
            // showChose(tmap[q][0], tmap[q][1], tmap[q][2] + 2);
        }
    nowChoseC[0] = j;
    nowChoseC[1] = i;
    nowChoseC[2] = t;
    OnChoseNow = true;
}
/**
 * 悔棋
 */
function backOperation() {
    if(!preOperation.flag || sessionStorage.getItem('nowWho') == 0) {
        alert('当前无法悔棋!');
        return;
    }
    if (!isOnline.value) {
        setTimeout(function () {
            alert('对方拒绝您悔棋!');
            return;
        }, 1000);
    } else {
        //发送悔棋请求对方确认
        gameSocket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
            'type': 'user',
            'content': 'back',
            'user_type': sessionStorage.getItem('user_type')
        })}`);
    }
}

/**
 * 认输
 */

function quitGame() {
    if (confirm('您确定放弃本局比赛吗？')) {
        if (isOnline.value) {
            gameSocket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
                'type': 'user',
                'content': 'quit',
                'user_type': sessionStorage.getItem('user_type')
            })}`);
        }
        gameOver();
    }
}
//选中棋子
function onChoseC(j, i, t,program) {

    if (sessionStorage.getItem('nowWho') == 1 && !program) {
        if (t < 0) return;
    }
    if (!OnChoseNow) {
        //限制红黑不可点击对方棋子
        if (sessionStorage.getItem('nowWho') == 0) {
            if (t < 0) {
                return
            };
        }
        if (sessionStorage.getItem('nowWho') == 1) {
            if (t > 0) return;
        }
    }
    if (nowChoseC[0] == j && nowChoseC[1] == i) {
        cleanSt();
        return;
    }
    if (OnChoseNow == true) {
        for (var q = 0; q < eatList.length; q++) {
            if (eatList[q][0] == j && eatList[q][1] == i) {
                //eat && move
                eat(nowChoseC[0], nowChoseC[1], j, i);
                break;
            }
        }
        cleanSt();
    }
    if (sessionStorage.getItem('nowWho') == 0) {
        if (t < 0) {
            //重置数据
            cleanSt();
            return;
        }
    }
    if (sessionStorage.getItem('nowWho') == 1) {
        if (t > 0) {
            cleanSt();
            return;
        }
    }
    showSt(j, i, t);
}

function onChoseS(j, i) {
    if (OnChoseNow) {
        for (var q = 0; q < moveList.length; q++) {
            if (moveList[q][0] == j && moveList[q][1] == i) {
                move(nowChoseC[0], nowChoseC[1], j, i, null, false, true);
                break;
            }
        }
    }
    cleanSt();
}

function senMessageChose(j, i,isSend) {
    if(!isSend) return;
    var obj = JSON.stringify({
        j: j,
        i: i,
        chose:true
    });
    gameSocket.send(`${sessionStorage.getItem('uuid')}-${sessionStorage.getItem('user_type')}-${JSON.stringify({
        content:obj,
        type:'user',
        user_type:sessionStorage.getItem('user_type')
    })}`);
}
function binMove(tmap,c,y,x){//0红 1黑
    var w;
    var h=0;
    if(c==0){
        w=y<5;
        h=-1;
    }else{
        w=y>4;
        h=1;
    }
    if(w){
        if(y+h>=0&&y+h<map.length){
            var t1=[];
            t1[0]=y+h;
            t1[1]=x;
            tmap.push(t1);
        }
        var t2=[];var t3=[];
        t2[0]=y;t3[0]=y;
        t2[1]=x-1;t3[1]=x+1;
        tmap.push(t2);tmap.push(t3);
    }else{
        var t=[];
        t[0]=y+h;
        t[1]=x;
        tmap.push(t);
    }
}
function paoMove(tmap,c,y,x){
    paoMove_(tmap,0,c,y,x);
    paoMove_(tmap,1,c,y,x);
    paoMove_(tmap,2,c,y,x);
    paoMove_(tmap,3,c,y,x);
}
function paoMove_(tmap,d,c,y,x){//0上1左2下3右
    var q= y,w= x,qi= 0,wi= 0,ci=0;//ci:0红 1黑
    if(c==0){
        ci=1;
    }else{
        ci=-1;
    }
    var cc;
    switch (d){
        case 0:
            cc=function(q){return q>=0;}
            qi=-1;
            break;
        case 1:
            cc=function(q,w){return w>=0;}
            wi=-1;
            break;
        case 2:
            cc=function(q){return q<map.length;}
            qi=1;
            break;
        case 3:
            cc=function(q,w){return w<map.length;}
            wi=1;
            break;
    }
    var ce=false;
    while(true){
        if(!cc(q,w))break;
        if(q==y&&w==x){
            q+=qi;w+=wi;
            continue;
        }
        if(map[q][w]==0){
            if(!ce){
                var t=[];
                t[0]=q;
                t[1]=w;
                tmap.push(t);
            }
        }else{
            if(ce){
                if(map[q][w]*ci<0){
                    var t=[];
                    t[0]=q;
                    t[1]=w;
                    tmap.push(t);
                    ce=false;
                    break;
                }
            }
            ce=true;
        }
        q+=qi;w+=wi;
    }
}
function juMove(tmap,c,y,x){
    for(var q=y;q>=0;q--){
        if(q==y)continue;
        if(!fastMove(tmap,c,q,x))break;
    }
    for(var q=x;q>=0;q--){
        if(q==x)continue;
        if(!fastMove(tmap,c,y,q))break;
    }
    for(var q=y;q<map.length;q++){
        if(q==y)continue;
        if(!fastMove(tmap,c,q,x))break;
    }
    for(var q=x;q<map.length;q++){
        if(q==x)continue;
        if(!fastMove(tmap,c,y,q))break;
    }
}
function fastMove(tmap,c,y,x){//c:0红 1黑
    var ci=0;
    if(c==0){
        ci=1;
    }else{
        ci=-1;
    }
    if(map[y][x]==0){
        var t=[];
        t[0]=y;
        t[1]=x;
        tmap.push(t);
        return true;
    }else{
        if(map[y][x]*ci<0){
            var t=[];
            t[0]=y;
            t[1]=x;
            tmap.push(t);
        }
        return false;
    }
}
function maMove(tmap,c,y,x){
    function fastMa(tmap,y,x,ys,xs,c){
        if(y+ys<map.length&&y+ys>=0&&x+xs<map.length&&x+xs>=0)
        if(map[y+ys][x+xs]==0){
            var yz= 0,xz=0;
            if(ys==0){
                yz=-1;
            }else{
                xz=-1;
            }
            if(y+ys+ys-yz<map.length&&y+ys+ys-yz>=0&&x+xs+xs-xz<map.length&&x+xs+xs-xz>=0)
            if(map[y+ys+ys-yz][x+xs+xs-xz]*c<=0){
                var t=[];
                t[0]=y+ys+ys-yz;
                t[1]=x+xs+xs-xz;
                tmap.push(t);
            }
            if(y+ys+ys+yz<map.length&&y+ys+ys+yz>=0&&x+xs+xs+xz<map.length&&x+xs+xs+xz>=0)
            if(map[y+ys+ys+yz][x+xs+xs+xz]*c<=0){
                var t1=[];
                t1[0]=y+ys+ys+yz;
                t1[1]=x+xs+xs+xz;
                tmap.push(t1);
            }
        }
    }
    var cc=0;
    if(c==0){
        cc=1;
    }else{
        cc=-1;
    }
    fastMa(tmap,y,x,-1,0,cc);
    fastMa(tmap,y,x,1,0,cc);
    fastMa(tmap,y,x,0,-1,cc);
    fastMa(tmap,y,x,0,1,cc);
}
function xiangMove(tmap,c,y,x){//c:0红 1黑
    function fastXiang(tmap,y,x,yy,xx,c,cy){
        if(y+yy*2<map.length&&y+yy*2>=0&&x+xx*2<map.length&&x+xx*2>=0){
            if(cy(y+yy*2))
            if(map[y+yy][x+xx]==0){
                if(map[y+yy*2][x+xx*2]*c<=0){
                    var t=[];
                    t[0]=y+yy*2;
                    t[1]=x+xx*2;
                    tmap.push(t);
                }
            }
        }
    }
    var cc=0;
    if(c==0){
        cc=1;
    }else{
        cc=-1;
    }
    var ch;
    if(c==0){
        ch=function(y){return y>4};
    }else{
        ch=function(y){return y<5};
    }
    fastXiang(tmap,y,x,1,1,cc,ch);
    fastXiang(tmap,y,x,1,-1,cc,ch);
    fastXiang(tmap,y,x,-1,1,cc,ch);
    fastXiang(tmap,y,x,-1,-1,cc,ch);
}
function shiMove(tmap,c,y,x){//c:0红 1黑
    function fastShi(tmap,y,x,yy,xx,c,cc){
        if(cc(y+yy)){
            if(x+xx>=3&&x+xx<=5){
                if(map[y+yy][x+xx]*c<=0){
                    var t=[];
                    t[0]=y+yy;
                    t[1]=x+xx;
                    tmap.push(t);
                }
            }
        }
    }
    var cf;
    var cc=0;
    if(c==0){
        cc=1;
        cf=function(y){return y>=7&&y<=9}
    }else{
        cf=function(y){return y>=0&&y<=2}
        cc=-1;
    }
    fastShi(tmap,y,x,1,1,cc,cf);
    fastShi(tmap,y,x,-1,1,cc,cf);
    fastShi(tmap,y,x,1,-1,cc,cf);
    fastShi(tmap,y,x,-1,-1,cc,cf);
}
function JSMove(tmap,c,y,x){
    function fastJS(tmap,y,x,yy,xx,c,cc){
        if(cc(y+yy)){
            if(x+xx>=3&&x+xx<=5){
                if(map[y+yy][x+xx]*c<=0){
                    var t=[];
                    t[0]=y+yy;
                    t[1]=x+xx;
                    tmap.push(t);
                }
            }
        }
    }
    var cf;
    var cc=0;
    if(c==0){
        cc=1;
        cf=function(y){return y>=7&&y<=9}
    }else{
        cf=function(y){return y>=0&&y<=2}
        cc=-1;
    }
    fastJS(tmap,y,x,1,0,cc,cf);
    fastJS(tmap,y,x,-1,0,cc,cf);
    fastJS(tmap,y,x,0,-1,cc,cf);
    fastJS(tmap,y,x,0,1,cc,cf);
    if(c==0){
        for(var q=y-1;q<map.length&&q>=0;q--){
            if(map[q][x]==0){
                continue;
            }
            if(map[q][x]==-7){
                var t=[];
                t[0]=q;
                t[1]=x;
                tmap.push(t);
            }else break;
        }
    }else{
        for(var q=y+1;q<map.length&&q>=0;q++){
            if(map[q][x]==0){
                continue;
            }
            if(map[q][x]==7){
                var t=[];
                t[0]=q;
                t[1]=x;
                tmap.push(t);
            }else break;
        }
    }
}


//是否为自由操作模式
var isFreeOper = false;
var map = [];
var runNow = false;
var DeBug = false;
var preOperation = {
    y: null,
    x: null,
    j: null,
    i: null,
    sourceElem: {},
    targetElem: {
        cla: '',
        value: ''
    },
    flag: false,
    eat: null
};
function initChess() {

    //生成10*9个元素
    LoadGround();
    //设置默认棋子位置
    putDef();
    //填充HTML元素，显示棋子
    showC();
    runNow = true;
    //0空
    //兵1 炮2 车3 马4 相5 士6 将7 红
    //卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑

}

function Log(info) {
    if (DeBug) {
        console.log("DEBUG:" + info);
    }
}

function LogError(info) {
    if (DeBug) {
        console.log("ERROR:" + info);
    }
}


function putDef() {
    //黑(负) 红（正）            
    map[0][0] = -3;
    map[9][0] = 3;
    map[0][1] = -4;
    map[9][1] = 4;
    map[0][2] = -5;
    map[9][2] = 5;
    map[0][3] = -6;
    map[9][3] = 6;
    map[0][4] = -7;
    map[9][4] = 7;
    map[0][5] = -6;
    map[9][5] = 6;
    map[0][6] = -5;
    map[9][6] = 5;
    map[0][7] = -4;
    map[9][7] = 4;
    map[0][8] = -3;
    map[9][8] = 3;

    map[2][1] = -2;
    map[7][1] = 2;
    map[2][7] = -2;
    map[7][7] = 2;
    map[3][0] = -1;
    map[6][0] = 1;
    map[3][2] = -1;
    map[6][2] = 1;
    map[3][4] = -1;
    map[6][4] = 1;
    map[3][6] = -1;
    map[6][6] = 1;
    map[3][8] = -1;
    map[6][8] = 1;
    sessionStorage.setItem('isChanged', 'true');
    sessionStorage.setItem('map', JSON.stringify(map));
    Log("完成放置默认棋子");
}
//获得指定位置的棋子
function WhatSpace(y, x) {
    return map[y][x];
}

function CanEat(y, x, c) {
    var cc = 0;
    if (c == 0) {
        cc = 1;
    } else {
        cc = -1;
    }

    return map[y][x] * cc < 0;
}

//0空
//兵1 炮2 车3 马4 相5 士6 将7 红
//卒-1 炮-2 车-3 马-4 象-5 士-6 帅-7 黑
function WhereCan(y, x, t) { //0可以走 1可以吃
    var c = 0;
    if (t <= 0) {
        c = 1;
        t *= -1;
    }
    var tmap = [];
    switch (t) {
        case 1:
            binMove(tmap, c, y, x);
            break;
        case 2:
            paoMove(tmap, c, y, x);
            break;
        case 3:
            juMove(tmap, c, y, x);
            break;
        case 4:
            maMove(tmap, c, y, x);
            break;
        case 5:
            xiangMove(tmap, c, y, x);
            break;
        case 6:
            shiMove(tmap, c, y, x);
            break;
        case 7:
            JSMove(tmap, c, y, x);
            break;
        default:
            break;
    }
    for (var l = 0; l < tmap.length; l++) {
        if (CanEat(tmap[l][0], tmap[l][1], c)) {
            tmap[l][2] = 1;
        } else {
            tmap[l][2] = 0;
        }
    }
    return tmap;
}

//重新开始
function reStart() {
    if(!isFreeOper) {
        return;
    }
    sessionStorage.clear();
    window.location.reload();
}
/*//
title:中国象棋基础函数与常量
author:aspwebchh
date:2013/2/12
//*/

var BOARD = [
	[ 2, 3, 6, 5, 1, 5, 6, 3, 2],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 4, 0, 0, 0, 0, 0, 4, 0],
	[ 7, 0, 7, 0, 7, 0, 7, 0, 7],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[14, 0,14, 0,14, 0,14, 0,14],
	[ 0,11, 0, 0, 0, 0, 0,11, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 9,10,13,12, 8,12,13,10, 9]
]

var PERSON = 1;
var MACHINE = 0;


//没有棋子
var NOCHESS = 0;
//黑帅
var B_KING = 1; 
//黑车
var B_CAR = 2; 
//黑马
var B_HORSE = 3;
//黑炮
var B_CANON = 4;
//黑士
var B_BISHOP = 5;
//黑象
var B_ELEPHANT = 6;
//黑兵
var B_PAWN = 7;
var B_BIGIN = B_KING;
var B_END = B_PAWN;

//红将
var R_KING = 8; 
//红车
var R_CAR = 9; 
//红马
var R_HORSE = 10; 
//红炮
var R_CANON = 11;
//红士
var R_BISHOP = 12;
//红相
var R_ELEPHANT = 13;
//红兵
var R_PAWN = 14;
var R_BIGIN = R_KING;
var R_END = R_PAWN;

function isBlack( b ) {
	return b >= B_BIGIN && b <= B_END; 
}

function isRed( r ) {
	return r >= R_BIGIN && r <= R_END;
}

function isSameSide( x, y ) {
	return isBlack( x ) && isBlack( y ) || isRed( x ) && isRed( y );
}

function ChessPoint( x, y ) {
	this.x = x;
	this.y = y;
}

function ChessMove(  chess, from, to, score ) {
	this.chess = chess;
	this.from = from;
	this.to = to;
	this.score = score;
}

/*//
title:中国象棋走法产生类
author:aspwebchh
date:2013/2/12
//*/


function isValidMove( board, from, to ) {
	var chess;
	var target;

	//原地走棋
	if( from.x == to.x && from.y == to.y ) {
		return false;
	}	

	chess = board[ from.y ][ from.x ];
	target = board[ to.y ][ to.x ];

	//自己吃自已
	if( isSameSide( chess, target ) ) {
		return false;
	}

	switch( chess ) {
		//黑将
		case B_KING:
			if( target == R_KING ) {
				if( from.x != to.x ) {
					return false;
				}

				for (var i = from.y + 1; i < to.y; i++) {
					if( board[ i ][ from.x ] != NOCHESS ) {
						return false;
					} 
				};
			} else {
				if( to.y > 2 || to.x > 5 || to.x < 3 )	{
					return false;
				}

				if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
					return false;
				}
			}
			break;

		//红将
		case R_KING:
			if( target == B_KING ) {
				if( from.x != to.x ) {
					return false;
				}

				for (var i = from.y - 1; i > to.y; i--) {
					if( board[ i ][ from.x ]  != NOCHESS ) {
						return false;
					}
				};
			} else {
				if( to.y < 7 || to.x > 5 || to.x < 3 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
					return false;
				}
			}
			break;


		//红士
		case R_BISHOP: 
      //console.log( to )
			if( to.y < 7 || to.x < 3 || to.x > 5 ) {
        //console.log( 'p' )
				return false;
			}

			if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
				return false;
			}
			break;
		
		//黑士
		case B_BISHOP:
			if( to.y > 2 || to.x < 3 || to.x > 5 ) {
				return false;
			}

			if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
				return false;
			}
			break;

		//红相
		case R_ELEPHANT:
			if( to.y < 5 ) {
				return false;
			}

			if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
				return false;
			}

			if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
				return false;
			}
			break;

		//黑相
		case B_ELEPHANT:
			if( to.y > 4 ) {
				return false;
			}

			if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
				return false;
			}

			if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
				return false;
			}
			break;

		//黑兵	
		case B_PAWN:
			if( to.y < from.y ) {
				return false;
			}

			if( from.y < 5 && from.y == to.y ) {
				return false;
			}

			if( to.y - from.y + Math.abs( to.x - from.x ) > 1 ) {
				return false;
			}
			break;

		//红兵	
		case R_PAWN:
			if( to.y > from.y ) {
				return false;
			}

			if( from.y > 4 && from.y == to.y ) {
				return false;
			}

			if( from.y - to.y + Math.abs( from.x - to.x ) > 1 ) {
				return false;
			}
			break;

		//车
		case B_CAR:
		case R_CAR:
			if( from.y != to.y && from.x != to.x ) {
				return false;
			}

			if( from.y == to.y ) {
				if( from.x < to.x ) {
					for( var i = from.x + 1; i < to.x; i++ ) {
						if( board[ from.y ][ i ] != NOCHESS ) {
							return false;
						}
					}
				} else {
					for( var i = to.x + 1; i < from.x; i++ ) {
						if( board[ from.y ][ i ] != NOCHESS ) {
							return false;
						}
					}
				}
			} else {
				if( from.y < to.y ) {
					for( var i = from.y + 1; i < to.y; i++ ) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						}
					}
				} else {
					for( var i = to.y + 1; i < from.y; i++ ) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						}
					}
				}
			}
			break;

		//马
		case B_HORSE:
		case R_HORSE:
			var i;
			var j;
			if( !( Math.abs( from.x - to.x ) == 1 && Math.abs( from.y - to.y ) == 2 || 
				Math.abs( from.x - to.x ) == 2 && Math.abs( from.y - to.y ) == 1 ) ) {
				return false;
			}

			if( to.x - from.x == 2 ) {
				i = from.x + 1;
				j = from.y;
			} else if( from.x - to.x == 2 ) {
				i = from.x - 1;
				j = from.y;
			} else if( to.y - from.y == 2 ) {
				i = from.x;
				j = from.y + 1;
			} else if( from.y - to.y == 2 ) {
				i = from.x;
				j = from.y - 1;
			}

			if( board[ j ][ i ] != NOCHESS ) {
				return false;
			}
			break;

		//炮
		case B_CANON:
		case R_CANON:
			if( from.y != to.y && from.x != to.x ) {
				return false;
			}

			if( target == NOCHESS ) {
				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						} 
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					}
				}
			} else {
				var count = 0;

				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								count++; 
							}
						}
						if( count != 1 ) {
							return false;
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								count++;
							}
						}
						if( count != 1 ) {
							return false;
						}
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								count++;
							}
						}  
						if( count != 1 ) {
							return false;
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								count++;
							}
						}
						if( count != 1 ) {
							return false;
						}
					}
				}
			}
 	}
  return true;
}

var MoveGenerator = function() {
	var moveList;
	var moveCount;

    this.getMoveList = function() {
      return moveList;
    }

    this.getMoveList = function( depth, count ) {
      var tmp = [];
      for( var i = 0; i < count; i++ ) {
        tmp[ i ] = moveList[ depth ][ i ];
      }
      return tmp;
    }
 
    this.createPossibleMove = function( board, ply, side ) {
    	moveCount = 0;
    	for( var i = 0; i < 10; i++ ) {
    		for( var j = 0; j < 9; j++ ) {
    			if( board[ i ][ j ] != NOCHESS ) {
    				var chess = board[ i ][ j ];

    				if( side == 0 && isRed( chess ) ) {
    					continue;
    				}

    				if( side == 1 && isBlack( chess ) ) {
    					continue;
    				}

    				switch( chess ) {
    					case R_KING:
    					case B_KING:
    						GenKingMove( board, i, j, ply );
    						break;
    					case R_BISHOP:
    						GenRBishopMove( board, i, j, ply );
    						break;
    					case B_BISHOP:
    						GenBBishopMove( board, i, j, ply );
    						break;
    					case R_ELEPHANT:
    					case B_ELEPHANT:
    						GenElephantMove( board, i, j, ply );
    						break;
    					case R_HORSE:
    					case B_HORSE:
    						GenHorseMove( board, i, j, ply );
    						break;
    					case B_CAR:
    					case R_CAR:
    						GenCarMove( board, i, j, ply );
    						break;
    					case R_PAWN:
    						GenRPawnMove( board, i, j, ply );
    						break;
    					case B_PAWN:
    						GenBPawnMove( board, i, j, ply );
    						break;
    					case B_CANON:
    					case R_CANON:
    						GenCanonMove( board, i, j, ply );
    						break;
    					default:
    						alert( '无此棋子' ) ;
    				}
    			}
    		}
    	}
    	return moveCount;
    }

    var GenKingMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );

    	for( var x = 0 ; x < 3; x++ ) {
    		for( var y = 3; y < 6; y++ ) {
    			var to = new ChessPoint( y, x );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}

    	for( var x = 7; x < 10; x++ ) {
    		for( var y = 3; y < 6; y ++ ) {
    			var  to = new ChessPoint( y, x );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenRBishopMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 7; y < 10; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenBBishopMove = function( board, i, j, ply ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 0; y < 3; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( isValidMove( board, from, to ) ) {
    				addMove( from, to, ply );
    			}
    		}
    	}
    }

    var GenElephantMove = function( board, i, j, ply ) {
    	var x;
    	var y;
    	var from;
    	var to;

    	from = new ChessPoint( j, i );

    	x = j + 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j + 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y >=0 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j - 2;
    	y = i + 2;
      to = new ChessPoint( x, y );
    	if( x >= 0 && y < 10 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}

    	x = j - 2;
    	y = i - 2;
      to = new ChessPoint( x, y );
    	if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
    		addMove( from, to, ply );
    	}
    }

   var GenHorseMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var from;
   		var to;
   		from = new ChessPoint( j, i );

   		x = j + 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j + 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}


   		x = j + 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j + 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}

   		x = j - 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && isValidMove( board, from, to ) ) {
   			addMove( from, to, ply );
   		}   		
   }

   var GenBPawnMove = function( board, i, j, ply ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];
       var from = new ChessPoint( j, i );

   	   x = j;
   	   y = i + 1;

   	   if( y < 10 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   		addMove( from, new ChessPoint( x, y ), ply );
   	   }	

   	   if( i > 4 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}
    	 }
   }

   var GenRPawnMove = function( board, i, j, ply ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];
       var from = new ChessPoint( j, i );

   	   x = j;
   	   y = i - 1;

   	   if( y >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   		addMove( from, new ChessPoint( x, y ), ply );
   	   }	

   	   if( i < 5 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 && !isSameSide( chess, board[ y ][ x ] ) ) {
   	   			addMove( from, new ChessPoint( x, y ), ply );
   	   		}
    	 }   		
   }

   var GenCarMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var chess = board[ i ][ j ];
      var from = new ChessPoint( j, i );

   		y = i;
   		x = j + 1;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			x++;
   		}

     	y = i;
   		x = j - 1;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			x--;
   		} 	

      	y = i + 1;
   		x = j;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			y++;
   		} 	

      	y = i - 1;
   		x = j;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addMove( from, new ChessPoint( x, y ), ply );
   			} else {
   				if( !isSameSide( chess, board[ y ][ x ] ) ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   				break;
   			}
   			y--;
   		} 	   	
   }

   var GenCanonMove = function( board, i, j, ply ) {
   		var x;
   		var y;
   		var flag;
   		var chess = board[ i ][ j ];
      var from = new ChessPoint( j, i );

   		x = j + 1;
   		y = i;
   		flag = false;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			x++;
   		}

   		x = j - 1;
   		y = i;
   		flag = false;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			x--;
   		}

   		x = j;
   		y = i + 1;
   		flag = false;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			y++;
   		}   		

   		x = j;
   		y = i - 1;
   		flag = false;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addMove( from, new ChessPoint( x, y ), ply );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					if( !isSameSide( chess, board[ y ][ x ] ) ) {
   						addMove( from, new ChessPoint( x, y ), ply );
   					}
   					break;
   				}
   			}
   			y--;
   		}    		   		
   }

    var addMove = function( from, to, ply ) {
    	var move = moveList[ ply ][ moveCount ];
      move.from = from;
    	move.to = to;
    	return ++moveCount;
    }

	var initialize = function() {
		moveList = [];
		moveCount = 0;

		for( var i = 0; i < 8; i++ ) {
			moveList.push( [] );
			for( var j = 0; j < 80; j++ ) {
				moveList[ i ][ j ] = new ChessMove();
			}
		}
	}

	initialize();
} 
/*//
title:中国象棋棋局评估类
author:aspwebchh
date:2013/2/12
//*/

var Evaluation = function() {
	//棋子的基本价值
	var BASEVALUE_PAWN = 100;
	var BASEVALUE_BISHOP = 250;
	var BASEVALUE_ELEPHANT = 250;
	var BASEVALUE_CAR = 500;
	var BASEVALUE_HORSE = 350;
	var BASEVALUE_CANON = 350;
	var BASEVALUE_KING = 10000;

	//棋子的灵活度
	var FLEXIBILITY_PAWN = 15; 
	var FLEXIBILITY_BISHOP = 1;
	var FLEXIBILITY_ELEPHANT = 1;
	var FLEXIBILITY_CAR = 6;
	var FLEXIBILITY_HORSE = 12; 
	var FLEXIBILITY_CANON = 6;
	var FLEXIBILITY_KING = 0;

	//基本价值分
	var baseValue;
	//灵活度分
	var flexValue;

	//被威胁信息
	var attackPos;
	//受保护信息
	var guardPos;
	//灵活性
	var flexibilityPos;
	//总价值
	var chessValue;

	//相关位置个数
	var posCount;
	//相关位置
	var relatePos;

	//红兵附加值
	var R_PAWN_VALUE = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 70, 90,110,110,110,110,110, 90, 70],
		[ 70, 70, 70, 70, 70, 70, 70, 70, 70],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0]
	]

	//黑兵附加值
	var B_PAWN_VALUE = [
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 90, 90,110,120,120,120,110, 90, 90],
		[ 70, 90,110,110,110,110,110, 90, 70],
		[ 70, 70, 70, 70, 70, 70, 70, 70, 70],
		[  0,  0,  0,  0,  0,  0,  0,  0,  0]
	]

	var getPawnValue = function( x, y, board ) {
		if( board[ y ][ x ] == R_PAWN ) {
			return R_PAWN_VALUE[ y ][ x ];
		}

		if( board[ y ][ x ] == B_PAWN ) {
			return B_PAWN_VALUE[ y ][ x ];
		}

		return 0;
	}

	var resetData = function() {
		attackPos = [];
		guardPos = [];
		flexibilityPos = [];
		chessValue = [];

		for( var i = 0; i < 10; i++ ) {
			attackPos.push( [] );
			guardPos.push( [] );
			flexibilityPos.push( [] );
			chessValue.push( [] );

			for( var j = 0; j < 9; j++ ) {
				attackPos[ i ][ j ] = 0;
				guardPos[ i ][ j ] = 0;
				flexibilityPos[ i ][ j ] = 0;
				chessValue[ i ][ j ] = 0;
			}  
		}
	}

	var initialize = function() {
		//初始化存放信息的变量
		baseValue =[];
		flexValue = [];
		//resetData();
		relatePos = [];

		//初始化基本值数组
		baseValue[ B_KING ] = BASEVALUE_KING;
		baseValue[ B_CAR ] = BASEVALUE_CAR;
		baseValue[ B_HORSE ] = BASEVALUE_HORSE;
		baseValue[ B_BISHOP ] = BASEVALUE_BISHOP;
		baseValue[ B_ELEPHANT ] = BASEVALUE_ELEPHANT;
		baseValue[ B_CANON ] = BASEVALUE_CANON;
		baseValue[ B_PAWN ] = BASEVALUE_PAWN;

		baseValue[ R_KING ] = BASEVALUE_KING;
		baseValue[ R_CAR ] = BASEVALUE_CAR;
		baseValue[ R_HORSE ] = BASEVALUE_HORSE;
		baseValue[ R_BISHOP ] = BASEVALUE_BISHOP;
		baseValue[ R_ELEPHANT ] = BASEVALUE_ELEPHANT;
		baseValue[ R_CANON ] = BASEVALUE_CANON;
		baseValue[ R_PAWN ] = BASEVALUE_PAWN;

		flexValue[ B_KING ] = FLEXIBILITY_KING;
		flexValue[ B_CAR ] = FLEXIBILITY_CAR;
		flexValue[ B_HORSE ] = FLEXIBILITY_HORSE;
		flexValue[ B_BISHOP ] = FLEXIBILITY_BISHOP;
		flexValue[ B_ELEPHANT ] = FLEXIBILITY_ELEPHANT;
		flexValue[ B_CANON ] = FLEXIBILITY_CANON;
		flexValue[ B_PAWN ] = FLEXIBILITY_PAWN;

		flexValue[ R_KING ] = FLEXIBILITY_KING;
		flexValue[ R_CAR ] = FLEXIBILITY_CAR;
		flexValue[ R_HORSE ] = FLEXIBILITY_HORSE;
		flexValue[ R_BISHOP ] = FLEXIBILITY_BISHOP;
		flexValue[ R_ELEPHANT ] = FLEXIBILITY_ELEPHANT;
		flexValue[ R_CANON ] = FLEXIBILITY_CANON;
		flexValue[ R_PAWN ] = FLEXIBILITY_PAWN;
	}


	var addPoint = function( point ) {
		relatePos[ posCount ] = point;
		posCount++;	
	}


	var canTouch = function( board, from, to ) {
		var chess;
		var target;

		//原地走棋
		if( from.x == to.x && from.y == to.y ) {
			return false;
		}	
//alert(to.y)
		chess = board[ from.y ][ from.x ];
		target = board[ to.y ][ to.x ];

	/*//
		//自己吃自已
		if( isSameSide( chess, target ) ) {
			return false;
		}
	//*/

		switch( chess ) {
			//黑将
			case B_KING:
				if( target == R_KING ) {
					if( from.x != to.x ) {
						return false;
					}

					for (var i = from.y + 1; i < to.y; i++) {
						if( board[ i ][ from.x ] != NOCHESS ) {
							return false;
						} 
					};
				} else {
					if( to.y > 2 || to.x > 5 || to.x < 3 )	{
						return false;
					}

					if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
						return false;
					}
				}
				break;

			//红将
			case R_KING:
				if( target == B_KING ) {
					if( from.x != to.x ) {
						return false;
					}

					for (var i = from.y - 1; i > to.y; i--) {
						if( board[ i ][ from.x ]  != NOCHESS ) {
							return false;
						}
					};
				} else {
					if( to.y < 7 || to.x > 5 || to.x < 3 ) {
						return false;
					}

					if( Math.abs( from.x - to.x ) + Math.abs( from.y - to.y ) > 1 ) {
						return false;
					}
				}
				break;


			//红士
			case R_BISHOP: 
				if( to.y < 7 || to.x < 3 || to.x > 5 ) {
					return false;
				}

				if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
					return false;
				}
				break;
			
			//黑士
			case B_BISHOP:
				if( to.y > 2 || to.x < 3 || to.x > 5 ) {
					return false;
				}

				if( Math.abs( from.y - to.y ) != 1 || Math.abs( from.x - to.x ) != 1 ) {
					return false;
				}
				break;

			//红相
			case R_ELEPHANT:
				if( to.y < 5 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
					return false;
				}

				if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
					return false;
				}
				break;

			//黑相
			case B_ELEPHANT:
				if( to.y > 4 ) {
					return false;
				}

				if( Math.abs( from.x - to.x ) != 2 || Math.abs( from.y - to.y ) != 2 ) {
					return false;
				}

				if( board[ ( from.y + to.y ) / 2 ][ ( from.x + to.x ) / 2 ] != NOCHESS ) {
					return false;
				}
				break;

			//黑兵	
			case B_PAWN:
				if( to.y < from.y ) {
					return false;
				}

				if( from.y < 5 && from.y == to.y ) {
					return false;
				}

				if( to.y - from.y + Math.abs( to.x - from.x ) > 1 ) {
					return false;
				}
				break;

			//红兵	
			case R_PAWN:
				if( to.y > from.y ) {
					return false;
				}

				if( from.y > 4 && from.y == to.y ) {
					return false;
				}

				if( from.y - to.y + Math.abs( from.x - to.x ) > 1 ) {
					return false;
				}
				break;

			//车
			case B_CAR:
			case R_CAR:
				if( from.y != to.y && from.x != to.x ) {
					return false;
				}

				if( from.y == to.y ) {
					if( from.x < to.x ) {
						for( var i = from.x + 1; i < to.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.x + 1; i < from.x; i++ ) {
							if( board[ from.y ][ i ] != NOCHESS ) {
								return false;
							}
						}
					}
				} else {
					if( from.y < to.y ) {
						for( var i = from.y + 1; i < to.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					} else {
						for( var i = to.y + 1; i < from.y; i++ ) {
							if( board[ i ][ from.x ] != NOCHESS ) {
								return false;
							}
						}
					}
				}
				break;

			//马
			case B_HORSE:
			case R_HORSE:
				var j;
				var i;
				if( !( Math.abs( from.x - to.x ) == 1 && Math.abs( from.y - to.y ) == 2 || 
					Math.abs( from.x - to.x ) == 2 && Math.abs( from.y - to.y ) == 1 ) ) {
					return false;
				}

				if( to.x - from.x == 2 ) {
					i = from.x + 1;
					j = from.y;
				} else if( from.x - to.x == 2 ) {
					i = from.x - 1;
					j = from.y;
				} else if( to.y - from.y == 2 ) {
					i = from.x;
					j = from.y + 1;
				} else if( from.y - to.y == 2 ) {
					i = from.x;
					j = from.y - 1;
				}

				if( board[ j ][ i ] != NOCHESS ) {
					return false;
				}
				break;

			//炮
			case B_CANON:
			case R_CANON:
				if( from.y != to.y && from.x != to.x ) {
					return false;
				}

				if( target == NOCHESS ) {
					if( from.y == to.y ) {
						if( from.x < to.x ) {
							for( var i = from.x + 1; i < to.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									return false;
								}
							}
						} else {
							for( var i = to.x + 1; i < from.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									return false;
								}
							} 
						}
					} else {
						if( from.y < to.y ) {
							for( var i = from.y + 1; i < to.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									return false;
								}
							}
						} else {
							for( var i = to.y + 1; i < from.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									return false;
								}
							}
						}
					}
				} else {
					var count = 0;

					if( from.y == to.y ) {
						if( from.x < to.x ) {
							for( var i = from.x + 1; i < to.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									count++; 
								}
							}
							if( count != 1 ) {
								return false;
							}
						} else {
							for( var i = to.x + 1; i < from.x; i++ ) {
								if( board[ from.y ][ i ] != NOCHESS ) {
									count++;
								}
							}
							if( count != 1 ) {
								return false;
							}
						}
					} else {
						if( from.y < to.y ) {
							for( var i = from.y + 1; i < to.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									count++;
								}
							}  
							if( count != 1 ) {
								return false;
							}
						} else {
							for( var i = to.y + 1; i < from.y; i++ ) {
								if( board[ i ][ from.x ] != NOCHESS ) {
									count++;
								}
							}
							if( count != 1 ) {
								return false;
							}
						}
					}
				}
	 	}
	 	return true;
	}

    var GenKingMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );

    	for( var x = 0 ; x < 3; x++ ) {
    		for( var y = 3; y < 6; y++ ) {
    			var to = new ChessPoint( y, x );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}

    	for( var x = 7; x < 10; x++ ) {
    		for( var y = 3; y < 6; y ++ ) {
    			var  to = new ChessPoint( y, x );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenRBishopMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 7; y < 10; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenBBishopMove = function( board, i, j ) {
    	var from = new ChessPoint( j, i );
    	for( var y = 0; y < 3; y++ ) {
    		for( var x = 3; x < 6; x++ ) {
    			var to = new ChessPoint( x, y );
    			if( canTouch( board, from, to ) ) {
    				addPoint( to );
    			}
    		}
    	}
    }

    var GenElephantMove = function( board, i, j ) {
    	var x;
    	var y;
    	var from;
    	var to;

    	from = new ChessPoint( j, i );

    	x = j + 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}

    	x = j + 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x < 9 && y >=0 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}

    	x = j - 2;
    	y = i + 2;
    	to = new ChessPoint( x, y );
    	if( x >= 0 && y < 10 && canTouch( board, from, to ) ) {
    		//alert(x+":"+y)
    		addPoint( to );
    	}

    	x = j - 2;
    	y = i - 2;
    	to = new ChessPoint( x, y );
    	if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
    		addPoint( to );
    	}
    }

   var GenHorseMove = function( board, i, j ) {
   		var x;
   		var y;
   		var from;
   		var to;
   		from = new ChessPoint( j, i );

   		x = j + 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j + 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 2;
   		y = i + 1;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 2;
   		y = i - 1;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}


   		x = j + 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j + 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x < 9 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 1;
   		y = i + 2;
   		to = new ChessPoint( x, y );

   		if( x >=0 && y < 10 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}

   		x = j - 1;
   		y = i - 2;
   		to = new ChessPoint( x, y );
   		if( x >= 0 && y >= 0 && canTouch( board, from, to ) ) {
   			addPoint( to );
   		}   		
   }

   var GenBPawnMove = function( board, i, j ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];

   	   x = j;
   	   y = i + 1;

   	   if( y < 10 ) {
   	   		addPoint( new ChessPoint( x, y ) );
   	   }	

   	   if( i > 4 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}
    	 }
   }

   var GenRPawnMove = function( board, i, j ) {
   	   var x;
   	   var y;
   	   var chess = board[ i ][ j ];

   	   x = j;
   	   y = i - 1;

   	   if( y >= 0 ) {
   	   		addPoint( new ChessPoint( x, y ) );
   	   }	

   	   if( i < 5 ) {
   	   		y = i;
   	   		x = j + 1;
   	   		if( x < 9 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}

   	   		x = j - 1;
   	   		if( x >= 0 ) {
   	   			addPoint( new ChessPoint( x, y ) );
   	   		}
    	 }   		
   }

   var GenCarMove = function( board, i, j ) {
   		var x;
   		var y;
   		var chess = board[ i ][ j ];

   		y = i;
   		x = j + 1;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			x++;
   		}

     	y = i;
   		x = j - 1;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			x--;
   		} 	

      	y = i + 1;
   		x = j;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			y++;
   		} 	

      	y = i - 1;
   		x = j;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				addPoint( new ChessPoint( x, y ) );
   			} else {
   				addPoint( new ChessPoint( x, y ) );
   				break;
   			}
   			y--;
   		} 	   	
   }

   var GenCanonMove = function( board, i, j ) {
   		var x;
   		var y;
   		var flag;
   		var chess = board[ i ][ j ];

   		x = j + 1;
   		y = i;
   		flag = false;
   		while( x < 9 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			x++;
   		}

   		x = j - 1;
   		y = i;
   		flag = false;
   		while( x >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			x--;
   		}

   		x = j;
   		y = i + 1;
   		flag = false;
   		while( y < 10 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			y++;
   		}   		

   		x = j;
   		y = i - 1;
   		flag = false;
   		while( y >= 0 ) {
   			if( board[ y ][ x ] == NOCHESS ) {
   				if( !flag ) {
   					addPoint( new ChessPoint( x, y ) );
   				}
   			} else {
   				if( !flag ) {
   					flag = true;
   				} else {
   					addPoint( new ChessPoint( x, y ) );
   					break;
   				}
   			}
   			y--;
   		}    		   		
   }

	var getRelateChess = function( board, i, j ) {
		posCount = 0;
		var chess;
		var x;
		var y;
		
		chess = board[ i ][ j ];

		switch( chess ) {
			case R_KING:
			case B_KING:
			//alert(1)
				GenKingMove( board, i, j );
				break;
			case B_BISHOP:
			//alert(2)
				GenBBishopMove( board, i, j );
				break;
			case R_BISHOP:
			//alert(3)
				GenRBishopMove( board, i, j );
				break;
			case B_BISHOP:
			//alert(4)
				GenBBishopMove( board, i, j );
				break;
			case B_ELEPHANT:
			case R_ELEPHANT:
			//alert(5)
				GenElephantMove( board, i, j );
				break;
			case B_HORSE:
			case R_HORSE:
			//alert(6)
				GenHorseMove( board, i, j );
				break;
			case R_CAR:	
			case B_CAR:
			//alert(7)
				GenCarMove( board, i, j );
				break;
			case B_PAWN:
			//alert(8)
				GenBPawnMove( board, i, j );
				break;
			case R_PAWN:
			//alert(9)
				GenRPawnMove( board, i, j );
				break;
			case B_CANON:
		    case R_CANON:
		   // alert(10)
		    	GenCanonMove( board, i, j );
		    	break;
		    default:
		    	alert( '不存在的棋子' );
		}
	}

	this.eval = function( board, side ) {
		test ++;
				
		var chess;
		var target;

		resetData();

		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					getRelateChess( board, i, j );

					for( var k = 0; k < posCount; k++ ) {
						target = board[ relatePos[ k ].y ][ relatePos[ k ].x ];
						if( target == NOCHESS ) {
							flexibilityPos[ i ][ j ]++;
						} else {
							if( isSameSide( chess, target ) ) {
								guardPos[ relatePos[ k ].y ][ relatePos[ k ].x ]++;
							} else {
								attackPos[ relatePos[ k ].y ][ relatePos[ k ].x ]++;
								flexibilityPos[ i ][ j ]++; 

								switch( target ) {
									case R_KING:
										if( side == 0 ) {	
											return 18888;
										}
										break;
									case B_KING:
										if( side == 1 ) {
											return -18888;
										}
										break;
									default:
										attackPos[ relatePos[ k ].y ][ relatePos[ k ].x ] += 
											( 30 + ( baseValue[ target ] - baseValue[ chess ] ) / 10 ) / 10;
								}
							}
						}
					}
				}
			}
		}


		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					chessValue[ i ][ j ]++;
					chessValue[ i ][ j ] += flexValue[ chess ] * flexibilityPos[ i ][ j ];
					chessValue[ i ][ j ] += getPawnValue( j, i, board );
				}
			}
		}

		var halfValue;

		for( var i = 0; i < 10; i++ ) {
			for( var j = 0; j < 9; j++ ) {
				if( board[ i ][ j ] != NOCHESS ) {
					chess = board[ i ][ j ];
					halfValue = baseValue[ chess ] / 16;
					chessValue[ i ][ j ] += baseValue[ chess ];

					if( isRed( chess ) ) {
						if( attackPos[ i ][ j ] ) {
							if( side == 1 ) {
								if( chess == R_KING ) {
									chessValue[ i ][ j ] -= 20;
								} else {
									chessValue[ i ][ j ] -= halfValue * 2;

									if( guardPos[ i ][ j ] ) {
										chessValue[ i ][ j ] += halfValue;
									}
								}
							} else {
								if( chess == R_KING ) {
									return 18888;
								}

								chessValue[ i ][ j ] -= halfValue * 10;

								if( guardPos[ i ][ j ] ) {
									chessValue[ i ][ j ] += halfValue * 9;
								}
							}
							chessValue[ i ][ j ] -= attackPos[ i ][ j ];  
						} else {
							if( guardPos[ i ][ j ] ) {
								chessValue[ i ][ j ] += 5;
							}
						}
					} else {
						if( attackPos[ i ][ j ] ) {
							if( side == 0 ) {
								if( chess == B_KING ) {
									chessValue[ i ][ j ] -= 20;
								} else {
									chessValue[ i ][ j ] -= halfValue * 2;

									if( guardPos[ i ][ j ] ) {
										chessValue[ i ][ j ] += halfValue;
									}									
								}
							} else {
								if( chess == B_KING ) {
									return -18888;
								}

								chessValue[ i ][ j ] -= halfValue * 10;

								if( guardPos[ i ][ j ] ) {
									chessValue[ i ][ j ] += halfValue * 9;
								}								
							}
							chessValue[ i ][ j ] -= attackPos[ i ][ j ];  
						} else {
							if( guardPos[ i ][ j ] ) {
								chessValue[ i ][ j ] += 5;
							}							
						}		
					}
				}
			}
		}

//console.log( flexibilityPos )
//console.log( attackPos )
//console.log( guardPos )
//console.log( chessValue )		

		var redValue = 0;
		var blackValue = 0;

		for( var i = 0; i < 10; i++  ) {
			for( var j = 0; j < 9; j++ ) {
				chess = board[ i ][ j ];
				if( chess != NOCHESS ) {
					if( isRed( chess ) ) {
						redValue += chessValue[ i ][ j ];
						//alert(1)
					} else {
						blackValue += chessValue[ i ][ j ];
						//alert(2)
					}
				}
			}
		}

		//console.log( redValue );
		//console.log( blackValue );
		//console.log( chessValue )
		return blackValue - redValue;
	}

	//初始化
	initialize();
}

var test = 0;

/*//
title:中国象棋搜索引擎类
author:aspwebchh
date:2013/2/12
//*/

var SearchEngine = function( depth ) {
	var moveCreator = new MoveGenerator();
	var evaluation = new Evaluation();
	var maxDepth = depth;
	var bestMove;
	var curBoard;
	var historyTable = new HistoryTable();
	var self = this;

	var makeMove = function( move ) {
		var target;
	    target = curBoard[ move.to.y ][ move.to.x ];
		curBoard[ move.to.y ][ move.to.x ] = curBoard[ move.from.y ][ move.from.x ];
		curBoard[ move.from.y ][ move.from.x ] = NOCHESS;
		return target;
	}
	
	var unMakeMove = function( move, chess ) {
		curBoard[ move.from.y ][ move.from.x ] = curBoard[ move.to.y ][ move.to.x ];
		curBoard[ move.to.y ][ move.to.x ] = chess;
	}
	
	
	this.getGoodMove = function( board ) {
		test = 0;

	    curBoard = board;
	    //var value = maxMin( maxDepth );
		var value = alphaBeta( -20000, 20000, maxDepth );		
		makeMove( bestMove );

		return {
			board: curBoard,
			bestMove: bestMove
		};
	}

	this.isGameOver = function( board ) {
		var redLive = false;
		var blackLive = false;

		for( var i = 7; i < 10; i++ ) {
			for( var j = 3; j < 6; j++ ) {
				if( board[ i ][ j ] == B_KING ) {
					blackLive = true;
				}

				if( board[ i ][ j ] == R_KING ) {
					redLive = true;
				}
			}
		}

		for( var i = 0; i < 3; i++ ) {
			for( var j = 3; j < 6; j++ ) {
				if( board[ i ][ j ] == B_KING ) {
					blackLive = true;
				}

				if( board[ i ][ j ] == R_KING ) {
					redLive = true;
				}				
			}
		}

		if( !redLive ) {
			return 19999;
		}

		if( !blackLive ) {
			return -19999;
		}

		return 0;
	}

	var maxMin = function( depth ) {
		var limit = self.isGameOver( curBoard );
		if( limit ) {
			return limit;
		}

		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, ( maxDepth ) % 2 );
			return value;
		}

		var moveCount = moveCreator.createPossibleMove( curBoard, depth, ( maxDepth - depth ) % 2 );
		var moveList = moveCreator.getMoveList();
		if( ( maxDepth - depth ) % 2 == 0 ) {
			var current =  -99999;
			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ depth ][ i ] );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ depth ][ i ], chess );
			    if( score > current ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ depth ][ i ];
					}
				}						
			}
			return current;
		} else { 
			var current =  99999;
			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ depth ][ i ] );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ depth ][ i ], chess );

			    if( score < current ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ depth ][ i ];
					}
				}						
			}
			return current;			
		}
	}

	var alphaBeta = function( alphi, beta, depth ) {
		var limit = self.isGameOver( curBoard );
		if( limit ) {
			return limit;
		}

		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, maxDepth % 2 );
			return value;
		}

		var bestMoveFlag = -1;

		var moveCount = moveCreator.createPossibleMove( curBoard, depth, ( maxDepth - depth ) % 2 );
		var moveList = moveCreator.getMoveList( depth, moveCount );

		for( var i = 0; i < moveCount; i++ ) {
			moveList[ i ].score = historyTable.getHistoryScore( moveList[ i ] );
		}
		
		if( ( maxDepth - depth ) % 2 == 1 ) {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )

			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ i ] );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ], chess );

				if( score < beta ) {
					beta = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return alphi;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return beta;
		} else {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )

			for( var i = 0; i < moveCount; i++ ) {
				var chess = makeMove( moveList[ i ] );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ], chess );
				if( score > alphi ) {
					alphi = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return beta;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return alphi;			
		}
	}
}

//历史记录
var HistoryTable = function () {

	var historyTable;

	var initialize = function() {
		//初始化历史记录表
		historyTable = [];
		for (var i = 0; i < 90; i++) {
			historyTable.push( [] );
			for (var j = 0; j < 90; j++) {
				historyTable[ i ][ j ] = 0;
			};
		}
	}

	this.enterHistoryTable = function( move, depth ) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		historyTable[ from ][ to ] += 2 << depth;		
	}

	this.getHistoryScore = function( move ) {
		var from = move.from.y * 9 + move.from.x;
		var to = move.to.y * 9 + move.to.x;
		return historyTable[ from ][ to ];
	}

	initialize();	
}
/**
 * 转换棋盘布局的排列数组
 */

function transformMap(map) {
    var returnMap = [];
    map.forEach(function (value, index) {
        var temp = [];
        value.forEach(function (item, i) {
            switch (item) {
                case 0:
                    temp.push(item);
                    break;
                case -1:
                    temp.push(7);
                    break;
                case -2:
                    temp.push(4);
                    break;
                case -3:
                    temp.push(2);
                    break;
                case -4:
                    temp.push(3);
                    break;
                case -5:
                    temp.push(6);
                    break;
                case -6:
                    temp.push(5);
                    break;
                case -7:
                    temp.push(1);
                    break;
                case 1:
                    temp.push(14);
                    break;
                case 2:
                    temp.push(11);
                    break;
                case 3:
                    temp.push(9);
                    break;
                case 4:
                    temp.push(10);
                    break;
                case 5:
                    temp.push(13);
                    break;
                case 6:
                    temp.push(12);
                    break;
                case 7:
                    temp.push(8);
                    break;
            }
        });
        returnMap.push(temp);
    });
    return returnMap;
}
export {
    initChess,
    onChose,
	SearchEngine,
	isOnline,
	searchEngine,
	backOperation,
	quitGame,
	countTimes,
	move
}