if (!sessionStorage.getItem('map')) {
    var map = [];
    sessionStorage.setItem('map', JSON.stringify(map));
}
if (!sessionStorage.getItem('isChanged')) {
    sessionStorage.setItem('isChanged', 'false');
}

//是否为自由操作模式
var isFreeOper = false;
var map = JSON.parse(sessionStorage.getItem('map'));
var runNow = false;
var DeBug = false;

if (!sessionStorage.getItem('preOperation')) {
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
    sessionStorage.setItem('preOperation', JSON.stringify(preOperation));
}
var preOperation = JSON.parse(sessionStorage.getItem('preOperation'));

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


function backOperation() {
    if(!isFreeOper) return;
    //悔棋，回退一步
    move(preOperation.y, preOperation.x, preOperation.j, preOperation.i, preOperation.eat, true);
}
//重新开始
function reStart() {
    if(!isFreeOper) {
        return;
    }
    sessionStorage.clear();
    window.location.reload();
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
var onMove = false;
var OnChoseNow = false;
var nowChoseC = [];
var moveList = [];
var eatList = [];
if (!sessionStorage.getItem('nowWho')) {
    sessionStorage.setItem('nowWho', 0);
}
//点击棋子
function onChose(j, i,isSend,program) {
    if (!isFreeOper && sessionStorage.getItem('nowWho') == 1 && !program) {
        return;
    }
    if (!runNow) return;
    if (onMove) return;
    //alert(j+""+i);
    var CC = WhatSpace(j, i);
    if (CC == 0) {
        //选择了无棋子的位置
        onChoseS(j, i);
    } else {
        //选中棋子
        Log("选择了" + j + "-" + i + "  " + CC);
        onChoseC(j, i, CC,program);
    }
    isSend = (CC <= 0 && sessionStorage.getItem('nowWho') == 1) ? false : true;
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
            showChose(tmap[q][0], tmap[q][1], tmap[q][2] + 2);
        }
    nowChoseC[0] = j;
    nowChoseC[1] = i;
    nowChoseC[2] = t;
    OnChoseNow = true;
}

function initDoing() {

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
    socket.send(JSON.stringify({
        content:obj,
        type:'user',
        user_type:sessionStorage.getItem('user_type')
    }));
}