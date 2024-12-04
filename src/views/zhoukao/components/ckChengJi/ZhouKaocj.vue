<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <div class="tiaojian">
        <span>筛选条件</span>
        <div class="banji">
          <el-select v-model="bj1" placeholder="班级">
            <el-option
              v-for="(item, index) in bj"
              :key="index"
              :label="item.className"
              :value="item.className"
            ></el-option>
          </el-select>
        </div>
        <div class="banji">
          <el-col :span="20">
            <el-date-picker
              type="month"
              @change="changeTime"
              placeholder="选择月份"
              v-model="date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </div>
        <el-form-item>
          <el-button type="primary" plain 
          :disabled="bj1 =='' || date1=='' || zhou==''"
           round @click="buKao"
            >补考名单</el-button
          >
        </el-form-item>
      </div>
      <div class="zhoushu" v-show="bj1 !='' && date1!=''">
      <span>周数：</span>
      <el-radio-group v-model="zhou" >
    <el-radio :label="1">第一周</el-radio>
    <el-radio :label="2">第二周</el-radio>
    <el-radio :label="3">第三周</el-radio>
    <el-radio :label="4">第四周</el-radio>
    <el-radio :label="5">第五周</el-radio>
  </el-radio-group></div>
    </el-form>
    <el-table :data="tableData" border style="width: 100%,font-size:10px">
      <el-table-column prop="className" label="班级" width="180">
      </el-table-column>
      <el-table-column prop="zhoukaoName" label="周考名" width="180">
      </el-table-column>
      <el-table-column prop="zkxiangqing" label="周考详情"> </el-table-column>
      <el-table-column prop="riqi" label="周考时间"> </el-table-column>
      <el-table-column label="状态操作">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              常用操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="scope.row">成绩查询</el-dropdown-item>
              <el-dropdown-item :command="scope.row">成绩导入</el-dropdown-item>
              <el-dropdown-item :command="scope.row"
                >补考成绩导入</el-dropdown-item
              >
              <el-dropdown-item :command="scope.row">周考考题</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "ZhouKaocj",
  data() {
    return {
      p(m) {
        return m < 9 ? "0" + m : m;
      },
      date1: "",
      tableData: [],
      selectData: [],
      monthData: [],
      bj1: "",
      bj: "",
      ban: "",
      month: "",
       zhou:"",
       weekData:''
    };
  },

  methods: {
    buKao() {
      // console.log(this.tableData);
      this.$router.push({
        name:"cjBK",
        query:{
          bukaomd:this.tableData
        }
      })
    },
    handleCommand(command, a) {
      // console.log(command, a.$slots.default[0].text, "99999999");
      this.$router.push({
        name: "cx",
        query: { cj: command,caozuo:a.$slots.default[0].text},
      });
    },
    changeTime(a) {
      var s = new Date(a);
      const startDate = s.getFullYear() + "-" + this.p(s.getMonth() + 1);
      console.log(startDate);
    },
  },
  watch: {
    $route: {
      async handler() {
        //获取分类数据
        const res = await this.$axios("zhoukao/getChengJi");
        // console.log(res.data.data,"66666666666666");
        this.bj = res.data.data;
        // console.log(res.data.data);
        const result = res.data.data.reduce((acc, item) => {
          // console.log(item,"7");
          const arr = item.tms.map((stu) => ({
            className: item.className,
            id: item.id,
            ...stu,
            zhoukao:stu.zhoukao,
            zkxiangqing:
              stu.zhoukao.split("-")[1] +
              "月第" +
              stu.zhoukao.split("-")[2] +
              "周",
          }));
          return [...acc, ...arr];
        }, []);
        this.tableData = result;
        this.selectData = result;
        // console.log(result,"result");
      },
      immediate: true,
    },
    bj1: {
      handler(newV) {
        this.tableData = this.selectData.filter(
          (item) => item.className == newV
        );
        //  console.log(this.tableData,"tableData");
        this.monthData = this.selectData.filter(
          (item) => item.className == newV
        );
        //  console.log(this.monthData,"9999999999");
      },
      immediate: true,
    },
    date1: {
      handler(newV) {
        var s = new Date(newV);
        const startDate = s.getFullYear() + "-" + this.p(s.getMonth() + 1);
        this.tableData = this.monthData.filter(
          (item) =>
            item.zkxiangqing.split("月")[0] == Number(startDate.split("-")[1])
        );
        this.weekData=this.tableData
        //  console.log(this.tableData,"最后tableData");
      },
      immediate: true,
    },
    zhou:{
      handler(newV){
        const w=newV;
        this.tableData = this.weekData.filter(
          (item) =>
            item.zhoukao.split("-")[2] == w
        );
        //  console.log(this.tableData,"最后tableData");
      }
    }
  },
};
</script>
<style lang="less" scoped>
.tiaojian {
  display: flex;
  span {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
    margin-right: 20px;
  }
  .banji {
    margin-right: 20px;
  }
}
.el-form--inline .el-form-item {
  margin-right: 10px;
}
.el-dropdown-link {
  height: 2000px;
  overflow: visible;
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.zhoushu{
  margin-bottom: 10px;
  span{
        font-size: 14px;
    color: #555;
  }
}
</style>