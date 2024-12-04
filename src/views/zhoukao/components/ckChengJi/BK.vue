<template>
  <div>
    <div class="top">
      <h3>补考名单列表</h3>
      <el-button type="success" plain @click="daochuMd">导出补考名单</el-button>
    </div>
    <div ref="bukaomd">
    <div class="bkcon" v-for="(item, index) in bukaoxx" :key="index">
      <div class="bjxx">
        <h3>{{ item.className }}</h3>
        <el-button type="primary" plain
        @click='bkXiazai(item.zhoukaoName,item.timu)'>补考题下载</el-button>
      </div>
      <div class="bottom">
      <div
        class="bkname"
        v-for="(item1, index1) in item.t_scores"
        :key="index1"
      >
        <div class="bkname1" v-show="item1.kaoshi <= 60">
          {{ item1.stu.stu_name }}
        </div>
      </div></div>
    </div></div>
  </div>
</template>
<script>
import Vue from "vue";
import vueToPdf from 'vue-to-pdf';
Vue.use(vueToPdf);
export default {
  name: "BK",
  data() {
    return {
      bukaoxx: "",
      bukaotm:"",
      bukaomd:'',
      include:''
    };
  },
  watch: {
    $route: {
      handler(newV) {
        this.bukaoxx = newV.query.bukaomd;
      },
      immediate: true,
    },
  },
  methods: {
    bkXiazai(a,b){
        this.$router.push({
            name:'bkXiaZai',
            query:{
              
                bkzkname:JSON.stringify(a),
                bktimu:b,
                bukaoxx:JSON.stringify(this.bukaoxx)
            }
        })
    },
    daochuMd(){  
        console.log('555555555555'); 
      this.$PDFSave(this.$refs["bukaomd"], "补考名单");
    }
  },
};
</script>
<style lang="less" scoped>
.el-button {
  padding: 10px;
  font-size: 12px;
}
.top {
  width: 98%;
  display: flex;
  padding: 0 10px 10px 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  h3 {
    font-size: 12px;
  }
}
.bkcon {
  width: 98%;
  padding: 10px 10px 10px 15px;
  border-bottom: 1px solid #ccc;
    font-size: 12px;

  .bjxx {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      color: #555;
      padding: 15px 0;
      font-size: 12px;
    }
  }
  .bottom{
    display: flex;
     justify-content: flex-start;
     flex-wrap: wrap;
    .bkname1{
      padding: 8px 18px;
    border-radius: 5px;
    border: 1px solid #555;
    margin: 10px;
  }
  }
  
}
</style>