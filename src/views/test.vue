<template>
  <div class="test-container">
    <chess-homework-panel :is-show="true" :workList1="workList1" :workList2="workList2"></chess-homework-panel>
  </div>
</template>
<script>
  import HomeworkPanel from "../components/HomeworkPanel";
  export default {
    data() {
      return {
        workList1: [{
          "id": "1",
          "task_id": "1",
          "is_read": "1",
          "create_at": "2019-03-19 16:42:07",
          "status": "1",
          "score": "90",
          "title": "周末作业"
        }, {
          "id": "2",
          "task_id": "14",
          "is_read": "1",
          "create_at": "2019-03-19 16:42:07",
          "status": "1",
          "score": null,
          "title": "周末作业"
        }, {
          "id": "5",
          "task_id": "15",
          "is_read": "1",
          "create_at": "2019-04-17 17:52:34",
          "status": "1",
          "score": null,
          "title": "测试班作业"
        }, {
          "id": "6",
          "task_id": "16",
          "is_read": "1",
          "create_at": "2019-04-17 19:07:40",
          "status": "1",
          "score": null,
          "title": "固定标题"
        }, {
          "id": "7",
          "task_id": "17",
          "is_read": "1",
          "create_at": "2019-04-17 19:10:18",
          "status": "1",
          "score": null,
          "title": "固定标题"
        }, {
          "id": "8",
          "task_id": "18",
          "is_read": "1",
          "create_at": "2019-04-17 19:37:49",
          "status": "1",
          "score": null,
          "title": "小试身手"
        }, {
          "id": "13",
          "task_id": "23",
          "is_read": "1",
          "create_at": "2019-04-20 19:21:15",
          "status": "1",
          "score": null,
          "title": "小作业"
        }, {
          "id": "17",
          "task_id": "27",
          "is_read": "1",
          "create_at": "2019-05-11 17:43:28",
          "status": "1",
          "score": null,
          "title": "作业1"
        }, {
          "id": "19",
          "task_id": "29",
          "is_read": "1",
          "create_at": "2019-05-11 22:47:22",
          "status": "1",
          "score": null,
          "title": "小小练习"
        }],
        workList2: [{
          "id": "1",
          "task_id": "1",
          "is_read": "1",
          "create_at": "2019-03-19 16:42:07",
          "status": "1",
          "score": "90",
          "title": "周末作业"
        }, {
          "id": "2",
          "task_id": "14",
          "is_read": "1",
          "create_at": "2019-03-19 16:42:07",
          "status": "1",
          "score": null,
          "title": "周末作业"
        }, {
          "id": "5",
          "task_id": "15",
          "is_read": "1",
          "create_at": "2019-04-17 17:52:34",
          "status": "1",
          "score": null,
          "title": "测试班作业"
        }, {
          "id": "6",
          "task_id": "16",
          "is_read": "1",
          "create_at": "2019-04-17 19:07:40",
          "status": "1",
          "score": null,
          "title": "固定标题"
        }, {
          "id": "7",
          "task_id": "17",
          "is_read": "1",
          "create_at": "2019-04-17 19:10:18",
          "status": "1",
          "score": null,
          "title": "固定标题"
        }, {
          "id": "8",
          "task_id": "18",
          "is_read": "1",
          "create_at": "2019-04-17 19:37:49",
          "status": "1",
          "score": null,
          "title": "小试身手"
        }, {
          "id": "13",
          "task_id": "23",
          "is_read": "1",
          "create_at": "2019-04-20 19:21:15",
          "status": "1",
          "score": null,
          "title": "小作业"
        }, {
          "id": "17",
          "task_id": "27",
          "is_read": "1",
          "create_at": "2019-05-11 17:43:28",
          "status": "1",
          "score": null,
          "title": "作业1"
        }, {
          "id": "19",
          "task_id": "29",
          "is_read": "1",
          "create_at": "2019-05-11 22:47:22",
          "status": "1",
          "score": null,
          "title": "小小练习"
        }]
      }
    },
    components: {
      [HomeworkPanel.name]: HomeworkPanel
    }
  }
</script>