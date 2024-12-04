<template>
  <div class="xiangmu">
    <div class="xmlbtop">
      <h3 class="xmlb">课程作业检查列表</h3>
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
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="className" label="班级" sortable width="180">
        </el-table-column>
        <el-table-column prop="date" label="检查日期" sortable width="180">
        </el-table-column>
        <el-table-column
          prop="jieduan_name"
          label="阶段"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column prop="kecheng_name" label="项目"> </el-table-column>
        <el-table-column prop="zuoye_name" label="作业名称"> </el-table-column>
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
  name: "ZuoYe",
  data() {
    return {
      totaldata: [],
      to: null,
    };
  },
  async created() {
    const res = await this.$axios("zuoye/getzycM");
    let result = res.data;
    // let data = this.$setData(res.data, "bj.className","className");
    // this.totaldata=data
    // console.log(this.totaldata);
    let classes = [...new Set(res.data.map((item) => item.bj.className))];
    classes.map((className) => {
      let arr1 = {
        className: className,
        children: [],
        show: false,
        id:'',
        banjiList:''
      };
      result.map((item) => {
        if (item.bj.className == className) {
          let arr2 = {
            className: item.bj.className,
            date: item.date,
            id: item.id,
            jieduan_id: item.jieduan_id,
            jieduan_name: item.jieduan_name,
            kecheng_name: item.kecheng_name,
            kecheng_id: item.kecheng_id,
            xueke: item.xueke,
            zuoye_name: item.zuoye_name,
            bj: item.bj,
            zyj: item.zyj,
            show: true,
          };
          let arrid=item.bj.id*10
          arr1.children.push(arr2);
          arr1.id=arrid;
        }
      });
    this.totaldata.push(arr1);
    });
    console.log(this.totaldata,'处理好的数据');
    const res1 = await this.$axios("zuoye/getClasses");
    console.log(res1.data.data);
    this.banjiList = res1.data.data;
  },
  methods: {
    changewc(row) {
      console.log(row);
 if (row.zyj.length == 0) {
        let index1 = this.banjiList.findIndex(
          (item) => item.className == row.className
        );
        const promises = this.banjiList[index1].stus.map(async (item) => {
          console.log(item.stu_name);
          const res = await this.$axios("zuoye/postZyj", {
            stu_name: item.stu_name,
            check_id: row.id,
            jibie:0
          });
          console.log("res:", res.data);
          row.zyj.push(res.data);
        });
        console.log(row);
        // 使用 Promise.all() 方法来等待所有的异步操作完成再跳转到 zuoyelist 页面
        Promise.all(promises).then(() => {
           this.$router.push({ name: "zuoyexues", query: JSON.stringify({className:row.className,jieduan_name:row.jieduan_name,row:row}) });
        });
      } else {
         this.$router.push({ name: "zuoyexues", query: JSON.stringify({className:row.className,jieduan_name:row.jieduan_name,row:row}) });
      }
      // this.$router.push({
      //   name:'zuoyexues',
      //   query:JSON.stringify(row)
      // })
    },
    addxmjc() {
      this.$router.push({name:'addzyjc',query:JSON.stringify(this.totaldata)})
    },
    async changedel(a) {
      const outerIndex = this.totaldata.findIndex(
        (item1) => item1.children.findIndex((item) => item.id == a.id) != -1
      );
      if (outerIndex != -1) {
        const innerIndex = this.totaldata[outerIndex].children.findIndex(
          (item) => item.id == a.id
        );
        if (innerIndex != -1) {
          this.totaldata[outerIndex].children.splice(innerIndex, 1);
        }
      }
      // console.log(outerIndex);
      const res=await this.$axios("zuoye/delKhzuoye",a.id);
      console.log(res,'删除作业');
    },
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
.el-icon-edit {
  margin: 0 15px;
}
.el-icon-edit:hover,
.el-icon-delete:hover {
  color: rgb(104, 174, 231);
  cursor: pointer;
}
</style>