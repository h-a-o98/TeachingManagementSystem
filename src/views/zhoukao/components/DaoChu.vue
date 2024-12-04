<template>
  <div>
    <el-tabs v-model="name" type="card">
      <el-tab-pane label="带答案" name="daan"></el-tab-pane>
      <el-tab-pane label="不带答案" name="wudaan"></el-tab-pane>
    </el-tabs>
    <div class="kuang">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-select @change="changeXK" v-model="formInline.xk" placeholder="学科">
          <el-option label="HTML5" value="HTML5"></el-option>
          <el-option label="JAVA" value="JAVA"></el-option>         
        </el-select>
        <div class="bj">
          <el-select v-model="formInline.bj" placeholder="班级">
            <el-option
              v-for="(item, index) in bj"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="jd">
          <el-select v-model="formInline.jd" placeholder="阶段名称">
             <el-option
              v-for="(item, index) in jieduans"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <el-input
          v-model="formInline.yue"
          placeholder="月数"
          class="input"
        ></el-input>
        <el-input
          v-model="formInline.zhou"
          placeholder="周数"
          class="input"
        ></el-input>
        <div class="js">
          <el-select v-model="formInline.js" placeholder="教室">
            <el-option
              v-for="(item, index) in js"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </el-form>
    </div>
    <div class="content" ref="exportPDF">
      <h2>
        {{ formInline.xk }}学科{{ formInline.bj }}班级{{
          formInline.jd
        }}阶段月第周周考考题-研发
      </h2>
      <div class="question" v-for="(item,index) in ques" :key="index">
        <div class="tit">
          {{ index+1 }}.题目:{{ item.title }} （总分 {{ item.score }}）
        </div>
        <div class="nr" v-show="name == 'daan'">
          <div class="answe" v-html="item.answer"></div>
        </div>
      </div>
    </div>
      <div class="daoru">
        <el-button type="primary" plain @click="toPdf">导出</el-button>
      </div>
  </div>
</template>
<script>
import Vue from "vue";
import vueToPdf from "vue-to-pdf";
Vue.use(vueToPdf);
export default {
  name: "DaoChu",
  data() {
    return {
      name: "daan",
      formInline: {
        xk: "",
        bj: "",
        jd: "",
        js: "",
        yue:"",
        zhou:""
      },
      bj: [
        "ZZJ220804",
        "ZZH220706",
        "ZZH220605",
        "ZZJ220603",
        "ZZH220303",
        "ZZJ220302",
        "ZZH220404",
      ],
      js: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      ques: [],
      answer: 0,
      jieduans:[],
    };
  },
  methods: {
    toPdf() {
      this.$PDFSave(this.$refs["exportPDF"], "周考题");
    },
   async changeXK(newV){
      // console.log(newV);
      const res = await this.$axios("zhoukao/getTiKu", { xk: newV });
      //获取所有的阶段名称
      this.jieduans = [...new Set(res.data.data.map((item) => item.c_phase
))];
    }
  },
  watch: {
    $route: {
      handler(newV) {
        // console.log(newV,"$router");
        this.ques = JSON.parse(newV.query.tiku);
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.el-form,
.demo-form-inline,
.el-form--inline {
  display: flex;
  justify-content: space-around;
}
.input {
  width: 16%;
  margin-left: 5px;
}
.xj,
.bj,
.jd,
.js {
  margin-left: 10px;
}
.content {
  padding: 80px;
  padding-top: 10px;
  h2 {
    text-align: center;
    padding: 15px 0;
  }
  .question {
    margin: 15px 0;

    .tit {
      color: #555;
      font-size: 12px;
      font-weight: bold;
    }
    .nr {
      margin: 10px 0;
    }
    .answe {
      font-size: 14px !important;
      color: #aaf;
    }
  }
}
.daoru {
  margin-left: 80%;
}
</style>