<template>
  <div class="xiangmu">
    <div class="xmlbtop">
      <h3 class="xmlb">项目检查列表</h3>
      <div class="iconjia">
        <i class="el-icon-plus" @click="addxmjc"></i>
      </div>
    </div>
    <div class="xmlbcon">
      <el-table
        :data="totaldata"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :tree-props="{ children: 'checks' }"
      >
        <el-table-column prop="className" label="班级" sortable width="180">
        </el-table-column>
        <el-table-column prop="date" label="检查日期" sortable width="180">
        </el-table-column>
        <el-table-column
          prop="xm.jieduan_name"
          label="阶段"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column prop="xm.xiangmu_name" label="项目"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="iconbs" v-show="scope.row.show">
              <i class="el-icon-edit" @click="changewc(scope.row)"></i>
              <i class="el-icon-delete" @click="changedel(scope.row)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  name: "XiangMu",
  data() {
    return {
      totaldata: [],
      banjiList:null,
    };
  },
  async created() {
    const res = await this.$axios("zhoukao/getxmJiancha");
    // res.data.forEach((val) => {
    //   let arr1 = {
    //     id: val.id,
    //     className: val.className,
    //     children: [],
    //     show: false,
    //   };
    //   val.checks.forEach((v) => {
    //     let arr2 = {
    //       className: val.className,
    //       riqi: v.date,
    //       jieduan: v.xm.jieduan_name,
    //       xiangmu: v.xm.xiangmu_name,
    //       id: v.id,
    //       stu: v.bjs,
    //       show: true,
    //     };
    //     arr1.children.push(arr2);
    //   });
    //   this.tableData.push(arr1);
    // });
    // console.log(this.tableData, "1111111111");
    let result = res.data;
    // console.log(result);
    const classes = [...new Set(result.map((item) => item.className))];
    classes.map((className) => {
      const obj = { className: className, children: [], show: false };
      result.forEach((item) => {
        if (item.className == className) {
          item.checks.forEach((item1) => {
            item1.className = className;
            item1.show = true;
          });
          const newItem = { ...item.checks };
          obj.children.push(newItem);
        }
      });
      return obj;
    });
    this.totaldata = result;
    console.log(this.totaldata, "99999999999");
    const res1 = await this.$axios("xiangmu/getClasses");
    console.log(res1.data.data);
    this.banjiList = res1.data.data;
  },
  methods:{
    changewc(row){
  if (row.bjs.length == 0) {
        let index1 = this.banjiList.findIndex(
          (item) => item.className == row.className
        );
        const promises = this.banjiList[index1].stus.map(async (item) => {
          // console.log(item.stu_name);
          const res = await this.$axios("xiangmu/addStu", {
            stu_name: item.stu_name,
            xm_id: row.id,
          });
          // console.log("res:", res.data);
          row.bjs.push(res.data);
        });
        // console.log(row);
        // 使用 Promise.all() 方法来等待所有的异步操作完成再跳转到 stulist 页面
        Promise.all(promises).then(() => {
          this.$router.push({ name: "xmwc", query: JSON.stringify(row) });
        });
      } else {
        this.$router.push({ name: "xmwc", query: JSON.stringify(row) });
      }

      // this.$router.push({
      //   name:'xmwc',
      //   query:row.id
      // })
      // xmbj(sum){
    //   console.log(sum);
    //   if(this.sum==false){
    //     this.sum=true
    //   }else{
    //     this.sum=false
    //   }
    // }
    },
    addxmjc(){
      this.$router.push({name:'addxm',query:JSON.stringify(this.totaldata)})
    },
     async changedel(a){
      console.log(a);
      const outerIndex = this.totaldata.findIndex(
        (item1) => item1.checks.findIndex((item) => item.id == a.id) != -1
      );
      if (outerIndex != -1) {
        const innerIndex = this.totaldata[outerIndex].checks.findIndex(
          (item) => item.id == a.id
        );
        if (innerIndex != -1) {
          this.totaldata[outerIndex].checks.splice(innerIndex, 1);
        }
      }
      const res=await this.$axios("xiangmu/delJCjilu",a.id);
      console.log(res);
    }
  }
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
.el-icon-edit {
  margin: 0 15px;
}
.el-icon-edit:hover,.el-icon-delete:hover{
  color: rgb(104, 174, 231);
  cursor: pointer;
}
</style>