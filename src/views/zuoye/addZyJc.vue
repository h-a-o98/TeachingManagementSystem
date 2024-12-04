<template>
  <div class="xiangmu">
    <div class="xmlbtop">
      <h3 class="xmlb">课程作业检查列表</h3>
      <div class="iconjia">
        <i class="el-icon-close" @click="backxm"></i>
      </div>
    </div>
    <div class="xmlbcon2">
      <el-form label-width="80px">
        <el-form-item label="班级">
          <el-select v-model="bjmc" placeholder="请选择班级名称">
            <el-option
              v-for="(item, index) in xmbjdata"
              :key="index"
              :label="item.className"
              :value="item.className"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="xueke" size="small">
          <el-option
            v-for="(item, index) in datas"
            :key="index"
            :label="item.bianhao == 12 ? 'HTML5' : 'Java'"
            :value="item.bianhao"
            :change="getData1()"
          ></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="课程阶段">
          <el-select v-model="jieduan" size="small" placeholder="请选择对应学科">
          <div v-for="(item, index) in jdData" :key="index">
            <el-option
              :label="item.jieduanming"
              :value="item.jieduanming"
              :change="getData2()"
            ></el-option>
          </div>
        </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
           <el-select v-model="kecheng" size="small" placeholder="请选择对应课程">
          <div v-for="(item, index) in xuekeData" :key="index">
            <el-option
              :label="item.kechengming"
              :value="item.kechengming"
            ></el-option>
          </div>
        </el-select>
        </el-form-item>
        <el-form-item label="作业名称">
           <el-input v-model="zuoye" placeholder="请输入今晚作业"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="tikucj"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddXm",
  data() {
    return {
       form: {},
      banjiData: [],
      jieduan: "",
      banji: [],
      xueke: "",
      kecheng: "",
      datas: [],
      xuekeData: [],
      zuoye: "",
      res: [],
      res1: [],
      xmbjdata: "",
      res2:[],
      jdData:[],
      xmdata: "",
    };
  },
  methods: {
     async tikucj() {
        this.$message("数据已更新");
      let id1 = "";
      let id2 = "";
      this.datas.map((v) => {
        v.bianhao == this.xueke &&
          v.children.map((Vv) => {
            Vv.jieduanming == this.jieduan &&
              Vv.children.map((Vvv) => {
                id1 = Vvv.jdbianhao;
                id2 = Vvv.kcbianhao;
              });
          });
      });
      this.$axios("zuoye/postzycM", {
        className: this.bjmc,
        jieduan_id: id1,
        jieduan_name: this.jieduan,
        kecheng_id: id2,
        kecheng_name: this.kecheng,
        xueke: this.xueke == 12 ? "HTML5大前端就业班V12" : "Java分布式开发V11",
        zuoye_name: this.zuoye,
      });
      
    },
    
    backxm() {
      this.$router.push({ name: "zuoye" });
    },
      // 第二个选择框的数据
    getData1() {
      let index = this.datas.findIndex((val) => val.bianhao == this.xueke);
      if (index !== -1) {
        this.jdData = this.datas[index].children;
      }
    },
    // 第三个选择框的数据
    getData2() {
      let index = this.jdData.findIndex(
        (val) => val.jieduanming == this.jieduan
      );
      if (index !== -1) {
        this.xuekeData = this.jdData[index].children;
      }
    },
  },
    async created() {
        // 获取添加课程作业的班级名称请求
    const res1 = await this.$axios("zuoye/getclasses");
    this.xmbjdata=res1.data.data;
     this.res2 = await this.$axios("zuoye/getcourseM");
    // console.log(this.res2.data);
    let kinds=[];
    this.res2.data.map((v)=>{
        kinds.findIndex((val)=>
        val.bianhao==v.bianhao)==-1 && kinds.push({ bianhao: v.bianhao, children: [] });
        // console.log(kinds,'kinds');
           //  第二层数据遍历(阶段)
      kinds.map((vv) => {
        if (v.bianhao == vv.bianhao) {
          vv.children.findIndex((vj) => vj.jieduanming == v.jieduanming) ==
            -1 &&
            vv.children.push({ jieduanming: v.jieduanming, children: [] });
          // 第三层数据遍历(课程);
          vv.children.map((vk) => {
            if (vk.jieduanming == v.jieduanming) {
              vk.children.push({ ...v, pass: true });
            }
          });
        }
      });
    })
    this.datas=kinds;
    console.log(this.datas,'总数据');
    },
};
</script>
<style lang="less" scoped>
.xmlbtop {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .xmlb {
    font-size: 18px;
    color: #555;
  }
}
.el-icon-close {
  margin: 0 15px;
}
</style>