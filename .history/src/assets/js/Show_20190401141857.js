function LoadGround() { //生成旗子
    console.log(window.$);
    var g = "";
    if (map.length != 0) {
        for (var j = 0; j < 10; j++) {
            for (var i = 0; i < 9; i++) {
                g += "<article class='CS' id='CS" + j + "-" + i + "' onclick='onChose(" + j + "," + i + ",true)'></article>";
            }
        }
    } else {
        for (var j = 0; j < 10; j++) {
            map[j] = [];
            for (var i = 0; i < 9; i++) {
                map[j][i] = 0;
                g += "<article class='CS' id='CS" + j + "-" + i + "' onclick='onChose(" + j + "," + i + ",true)'></article>";
            }
        }
    }

    $("#space").html(g);
    Log("完成创建场景");
}
if (!sessionStorage.getItem('isRed')) {
    sessionStorage.setItem('isRed', true);
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
        o.css({
            "box-shadow": "",
            "border": ""
        });
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
    o.css({
        "box-shadow": "0 0 25pt #" + c,
        "border": ""
    })
}

function cleanChose() {
    $(".CS").css({
        "box-shadow": "",
        "border": ""
    })
}

function move(y, x, j, i, eat, isBack, isSend) {
    if (isBack) {
        //悔棋操作
        if (!preOperation.sourceElem || !preOperation.flag) {
            //第一次移动或者已经点击过悔棋，无法悔棋
            return false;
        } else {
            console.log(JSON.stringify(map));
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
            if (preOperation.targetElem == "") {
                map[j][i] = map[y][x];
                map[y][x] = 0;
            } else {
                map[j][i] = map[y][x];
                map[y][x] = preOperation.targetElem.value;
            }
            sessionStorage.setItem('map', JSON.stringify(map));
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
            vm.counts -= 1;
            sessionStorage.setItem('counts', vm.counts);
        }
    } else {
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
        if (eat == null)
            Log(y + "-" + x + " " + tex + " 移动到" + j + "-" + i);
        else
            Log(y + "-" + x + " " + tex + " 吃" + j + "-" + i + " " + getCText(j, i)[0]);

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
        sessionStorage.setItem('preOperation', JSON.stringify(preOperation));
        vm.counts += 1;
        sessionStorage.setItem('counts', vm.counts);
        /**
         * 通信，同步操作
         */
        // if(!isFreeOper) {
        //     senMessage(y,x,j,i,eat);
        // }
        if (isSend) {
            senMessage(y, x, j, i, eat);
        }
    }

    setTimeout(function () {
        $("#CS" + j + "-" + i + " section").css({
            transform: ""
        })
    }, 10);
    setTimeout(function () {
        trunH();
        onMove = false;
    }, 500);
}

function eat(y, x, j, i) {
    console.log('target='+map[j][i]);
    if (sessionStorage.getItem('isRed') == 'true') {
        if (map[j][i] == 7) {
            //黑棋胜
            alert('你输了');
        }
        if (map[j][i] == -7) {
            //红棋胜
            alert('你赢了');
        }
    } else {
        if (map[j][i] == 7) {
            //黑棋胜
            alert('你输了');
        }
        if (map[j][i] == -7) {
            //红棋胜
            alert('你赢了');
        }
    }
    onMove = true;
    $("#CS" + j + "-" + i + " section").css({
        transform: "scale(0,0)"
    })
    setTimeout(function () {
        move(y, x, j, i, true,false,true);
    }, 500)
}
/**
 * 
 * @param {Number} y 起始位置纵坐标 
 * @param {Number} x 起始位置横坐标 
 * @param {Number} j 目标位置纵坐标 
 * @param {Number} i 目标位置横坐标
 * @param {Boolean} eat 是否吃掉棋子
 */
function senMessage(y, x, j, i, eat) {
    var obj = JSON.stringify({
        y: y,
        x: x,
        j: j,
        i: i,
        eat: eat == undefined ? null : eat,
        role:sessionStorage.getItem('isRed') == 'true' ? 'red' : 'black' 
    });
    socket.send(JSON.stringify({
        content:obj,
        type:'user',
        user_type:sessionStorage.getItem('user_type')
    }));
    //清空计时器
    countTimes('over');
}


export{
    move,
    LoadGround
}