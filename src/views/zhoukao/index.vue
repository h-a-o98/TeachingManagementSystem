<template>
  <div class="zhoukao">
    <el-tabs :value="names[selectIndex.split('-')[1]]" @tab-click="handleClick">
      <el-tab-pane label="题库" name="tiku"></el-tab-pane>
      <el-tab-pane label="题库录入" name="addTiku"></el-tab-pane>
      <el-tab-pane label="成绩" name="chengji"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
  name: "ZhouKao",
  data(){
    return {
      names:["tiku", "addTiku", "chengji"]
    }
  },
  computed:{
    ...mapState("app", ['selectIndex'])
  },
  methods:{
    handleClick(e){
        console.log(e);
        this.$router.replace({name:e.name});
    }
  }
};
</script>