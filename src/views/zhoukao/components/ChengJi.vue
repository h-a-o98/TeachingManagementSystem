<template>
  <div>
      <el-tabs :value="names[selectIndex.split('-')[2]]" @tab-click="handleClick">
      <el-tab-pane label="周考" name="ChengJiZhouKao"></el-tab-pane>
      <el-tab-pane label="班级成绩查询" name="ChengJiBanJi"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ChengJi",
  data() {
    return {
      names: ["ChengJiZhouKao","ChengJiBanJi"],
    };
  },
  computed: {
    ...mapState("app", ["selectIndex"]),
  },
  methods:{
    handleClick(e){
        // console.log(e);
        this.$router.replace({name:e.name});
    }
  }
};
</script>