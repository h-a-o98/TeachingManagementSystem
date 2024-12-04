<template>
  <div>
    <div class="back" @click="back()">
      <i class="el-icon-close"></i>
    </div>
    <div class="jdwcco" >
      <div v-for="(item, index) in jdwc.bjs" :key="index"
      :class="['jdwccon',item.jibie>=60 ? item.jibie>=90 ? 'youxiu' :'zhong' : 'jdwccon']"
      @click="jgongneng(item)">
        <h3>{{ item.stu_name }}</h3>
        <div class="wc1" > 完成度：{{ item.jibie }}%</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "xmWC",
  data() {
    return {
      jdwc: "",
      id:'',
      da:null
    };
  },
  watch: {
    $route: {
      async handler(newV) {
        this.da=JSON.parse(newV.query);
        console.log(this.da,'da');
        // this.id=this.da.id
        // console.log(this.id,'this.id');
        const res = await this.$axios("xiangmu/getxmWanc",this.da.id);
        this.jdwc = res.data;
        console.log(this.jdwc ,'888888888888');
      },
      immediate: true,
    },
  },
  methods: {
    back() {
      this.$router.replace({ name: "xiangmu" });
    },
    jgongneng(a){
// console.log(a,'a');
//  console.log(a.id,'a.id');
      const bjs = this.jdwc.bjs;
      let index1 = bjs.findIndex((item) => item.id == a.id);
      // console.log(index1);
      if (bjs[index1].bjc.length == 0) {
        const promises = this.jdwc.xm.xms.map(async (item) => {
          console.log(item.gongneng_name);
          const res = await this.$axios("xiangmu/addBjc", {
            stu_id: a.id,
            xm_id: String(this.jdwc.id),
            gongneng_name: item.gongneng_name,
            gongneng_id: item.gongneng_id,
          });
          // console.log("res:", res.data);
          this.jdwc.bjs[index1].bjc.push(res.data);
        });
        // console.log(this.jdwc);
        // 使用 Promise.all() 方法来等待所有的异步操作完成再跳转到 checkxm 页面
        Promise.all(promises).then(() => {
          this.$router.push({
            name: "xmgongnen",
            query: {
              id: JSON.stringify(a.id),
              row: JSON.stringify(this.jdwc),
            },
          });
        });
      } else {
        this.$router.push({
          name: "xmgongnen",
          query: { id: JSON.stringify(a.id), row: JSON.stringify(this.jdwc) },
        });
      }

      // this.$router.push({name:"xmgongnen",query:{gnda:JSON.stringify(a),id:this.id}})
    }
  },
};
</script>
<style lang="less" scoped>
.back {
  padding: 10px 20px;
  text-align: right;
  margin-top: 6px;
  cursor: pointer;
  .el-icon-close {
    line-height: 15px;
    font-size: 15px;
    text-align: center;
    color: #555;
    font-weight: 400;
    border: 2px solid #555;
    border-radius: 50%;
    padding: 3px;
  }
  .el-icon-close:hover{
    color:rgb(173, 170, 255);
    border: 2px solid rgb(173, 170, 255);
  }
}
.jdwcco {
  display: flex;
  flex-wrap: wrap;
  
  .jdwccon {
    background-color: #f56c6c;
    color: #fff;
    border: 1px solid #f56c6c;
    width: 100px;
    border-radius: 5px;
    float: left;
    margin: 10px;
    cursor: pointer;
    padding: 5px;
    h3 {
      font-size: 12px;
      font-weight: bold;
    }
  }
   .wc1 {
      font-size: 12px;
      margin-top: 2px;
    }
    .youxiu{
      background-color: #f4f4f4;
      color: #555;
      border: 1px solid #555;
    }
    .zhong{
       background-color: #409eff;
      border: 1px solid #409eff;
    }
}
</style>