const vm = new Vue({
    el:'#app',
    data() {
        return {
            showRecordList: showrecordList,
            recordList: recordList,
            currentIndex: currentIndex,
            map: map,
            list: map,
            showCreateTipsPanel: false,
            comments: '',
            selectedQi: selectedQi,
            numberList: numberList,
            isPutOver: isPutOver,
            saveMap: []
        }
    },
    methods: {
        //选择棋子
        chooseQi(type, key, event) {
            if (type == 'black') {
                $('.red-chess-wrapper span').removeClass('active');
            } else {
                $('.black-chess-wrapper span').removeClass('active');
            }
            if (this.numberList[type][key].counts > 0) {
                this.selectedQi.type = type;
                this.selectedQi.key = key;
                $(event.target).parent().addClass('active');
                $(event.target).parent().siblings().removeClass('active');
                this.selectedQi.value = this.numberList[type][key].value;
            }
        },
        addActive(target) {
            target.classList.add('active');
        },
        // 摆满
        fillUp: initAll,
        // 前进
        forward(e) {
            nextRecord();
        },
        //后退
        backOff(e) {
            backRecord();
        },
        //翻转
        flip(e) {
            this.addActive(e.target.parentNode);
        },
        // 重置
        reset: resetPanel,
        // 保存提示框
        save(e) {
            this.openCreateTipsPanel();
        },
        openCreateTipsPanel() {
            this.showCreateTipsPanel = true;
        },
        hideCreateTipsPanel() {
            this.showCreateTipsPanel = false;
        },
        calculateMap() {
            return this.map.every((array) => {
                return array.every((item) => {
                    return item == 0;
                });
            })
        },
        saveChessMap() {
            if (this.calculateMap()) {
                alert('请先进行棋面操作!');
                return false;
            }
            //保存棋面
            this.saveMap = map;
            this.isPutOver.value = true;
            alert('保存成功');
        },
        saveChessTable(title,level_one_id,level_two_id,level_three_id) {
            //保存棋谱（走法，步骤）
            $.ajax({
                url:`${url}/index.php?r=question/add-game-end`,
                type:'post',
                dataType:'json',
                data:{
                    title: title,
                    data_code: JSON.stringify(this.map),
                    data_text: JSON.stringify(this.recordList),
                    play_log: JSON.stringify(this.showRecordList),
                    level_1:level_one_id,
                    level_2:level_two_id,
                    level_3:level_three_id
                },
                success:(res) => {
                    alert(res.data.msg);
                    if (res.data.status == 1) {
                        this.hideCreateTipsPanel();
                    }
                },
                error:(err) => {
                    alert('服务器异常')
                }
            });
        }
    },
    components: {
        // [BackButton.name]: BackButton,
        ['chess-create-tips-panel']: CreateTipsPanel,
    },
    watch: {
        showRecordList: function () {
            this.$nextTick(() => {
                this.$refs.recordWrapper.scrollTop = this.$refs.recordWrapper.scrollHeight;
            });
        },
        list: function () {
            console.log(this.list);
        }
    },
    mounted() {
        window.onChose = onChose;
        initChess('default');
    }
});

/**
 * 获得分类
 */
function getCategory() {
    $.ajax({
        url:`${url}/index.php?r=api-end-game/get-cate`,
        type:'post',
        dataType:'json',
        success:function(data) {
            
        },
        error:function() {
            alert('服务器异常');
        }
    });
}