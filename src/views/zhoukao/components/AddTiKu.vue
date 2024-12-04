<template>
  <div>
    <el-tabs :value="names[selectIndex.split('-')[2]]" @tab-click="handleClick">
      <el-tab-pane label="单题导入" name="addTikuAB1"></el-tab-pane>
      <el-tab-pane label="批量导入" name="addTikuAB2"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AddTiKu",
  data() {
    return {
      names: ["addTikuAB1", "addTikuAB2"],
    };
  },
  computed: {
    ...mapState("app", ["selectIndex"]),
  },
  methods:{
    handleClick(e){
        console.log(e);
        this.$router.replace({name:e.name});
    }
  }
};
</script>
