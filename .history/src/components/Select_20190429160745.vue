<template>
  <ul class="chess-select-wrapper" :style="styles" v-show="isShow">
    <li
      :key="item.id"
      v-for="item in optionList"
      :class="{'select-item-wrapper':true,'active':currentId == item.id}"
      @click="selectOption(item.id)"
    >
      <label class="option-title" v-cloak>{{item.text}}</label>
      <img src="../assets/images/not-select.png" class="select-icon not-active">
      <img src="../assets/images/selected.png" class="select-icon active">
    </li>
  </ul>
</template>
<script>
export default {
  props: ["styles", "is-show", "option-list"],
  name: "chess-select",
  data() {
    return {
      currentId: ""
    };
  },
  methods: {
    selectOption(value) {
      this.currentId = value;
      this.$emit("select", value);
    }
  }
};
</script>
<style scoped>
ul.chess-select-wrapper {
  background: url(../assets/images/option-bg.png) no-repeat;
  background-size: 100% 100%;
  min-width: 8rem;
  padding: 1rem 0.4rem;
}
ul.chess-select-wrapper::-webkit-scrollbar{
  width: 0;
}
li.select-item-wrapper {
  height: 1.8rem;
  padding: 0 0.5rem;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
}
li.select-item-wrapper::after {
  content: "";
  position: absolute;
  background: #f4dbb3;
  width: 90%;
  height: 1px;
  left: 5%;
  bottom: -0.5rem;
}
label.option-title {
  float: left;
  line-height: 1.8rem;
  font-size: 1.2rem;
  color: #512e08;
  font-weight: 600;
}
img.select-icon {
  width: 1.8rem;
  float: right;
}
li.select-item-wrapper.active img.select-icon.active,
li.select-item-wrapper img.select-icon.not-active {
  display: block;
}
li.select-item-wrapper.active img.select-icon.not-active,
li.select-item-wrapper img.select-icon.active {
  display: none;
}
</style>
