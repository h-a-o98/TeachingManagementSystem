<template>
  <div>
    <div class="back" @click="back()">
      <span>×</span>
    </div>
    <div class="content" ref="zhoukaoti">
      <h2>
        {{ zktimu }}
      </h2>
      <div class="tit" v-for="(item, index) in timu" :key="index">
        {{ index + 1 }}.题目：{{ item.title }} (总分{{ item.score }})
      </div>
      
    </div><div class="daochu">
        <el-button type="primary" plain @click="exportPDF">导出</el-button>
      </div>
  </div>
</template>
<script>
import Vue from "vue";
import vueToPdf from "vue-to-pdf";
Vue.use(vueToPdf);

export default {
  name: "bkXiaZai",
  data() {
    return {
      zktimu: "",
      timu: "",
      zhoukaoti: "",
      bukaoxx:''
    };
  },
  watch: {
    $route: {
      handler(newV) {
        this.zktimu = newV.query.bkzkname;
        this.timu = JSON.parse(newV.query.bktimu);
        this.bukaoxx=JSON.parse(newV.query.bukaoxx);
        console.log(this.bukaoxx);
      },
      immediate: true,
    },
  },
  methods: {
    
    back() {
      this.$router.replace({ name: "cjBK",query:{bukaomd:this.bukaoxx}});
    },
    exportPDF() {
      this.$PDFSave(this.$refs["zhoukaoti"], "周考题");
    },
  },
};
</script>
<style lang="less" scoped>
.back {
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
  margin-top: 6px;
  float: right;
  cursor: pointer;
  overflow: hidden;
  background-color: #409eff;
  & > span {
    color: white;
    line-height: 40px;
    width: 20px;
    height: 20px;
    font-size: 25px;
    border-radius: 50%;
  }
}
.content {
  padding: 60px;
  padding-top: 10px;
  margin-bottom: 20px;
  h2 {
    text-align: center;
    padding: 15px 0;
  }
  .tit {
    color: #555;
    margin: 15px 0;
    font-weight: bold;
    font-weight: 200;
    font-size: 14px;
  }
}
.daochu {
  display: flex;
  padding: 15px;
  justify-content: flex-end;
}
</style>