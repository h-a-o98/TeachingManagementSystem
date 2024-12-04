<template>
  <div class="togn">
    <div class="back" @click="back()">
      <i class="el-icon-close"></i>
    </div>
    <div class="nofin">
      <h3>未完成的功能</h3>
      <div class="gn">
        <div class="gnen" v-for="(item, index) in gndata.bjc" :key="index">
          <el-checkbox v-show="!item.state" v-model="item.state">{{
            item.gongneng_name
          }}</el-checkbox>
        </div>
      </div>
    </div>
    <div class="nofin">
      <h3>已完成的功能</h3>
      <div class="gn">
        <div class="gnen" v-for="(item, index) in gndata.bjc" :key="index">
          <el-checkbox v-show="item.state" v-model="item.state">{{
            item.gongneng_name
          }}</el-checkbox>
        </div>
      </div>
    </div>
    <div class="gnbc">
      <el-button type="primary" @click="xiugai">保存修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gndata: null,
      gnda:null,
      id:'',
      row:null
    };
  },
  methods: {
    back() {
      this.$router.replace({ name: "xmwc",query:JSON.stringify(this.row) });
    },
    async xiugai(){
        this.$message('数据已更新');
        console.log(this.gndata.jibie,this.gndata.id);
        let num=0;
        this.gndata.bjc.forEach((item)=>{
            if(item.state==true){
                num+=1
            }
        });
        const jibie1=((num/this.gndata.bjc.length)*100).toFixed(2);
        const res2=await this.$axios('xiangmu/putjibie',{
            id:this.gndata.id,
            jibie:jibie1,
        });
        console.log(res2,'级别更新');
        const shou=this.gndata.bjc.filter((item)=>
        item.gongneng_name="首页"
        )
        const res3=await this.$axios("xiangmu/putshouye",{
            gongneng_id: shou[0].gongneng_id,
            gongneng_name:shou[0].gongneng_name,
            id:shou[0].id,
            state:shou[0].state
        });
        console.log(res3,'首页数据上传');

        const xq=this.gndata.bjc.filter((item)=>
        item.gongneng_name="详情"
        )
        const res4=await this.$axios("xiangmu/putxiangqing",{
            id:xq[0].id,
                state:xq[0].state,
                gongneng_id:xq[0].gongneng_id,
                gongneng_name:xq[0].gongneng_name
        });
        console.log(res4,'详情数据上传');

        const lx=this.gndata.bjc.filter((item)=>
        item.gongneng_name="详情"
        )
        const res5=await this.$axios("xiangmu/putlianxiwm",{
            id:lx[0].id,
                state:lx[0].state,
                gongneng_id:lx[0].gongneng_id,
                gongneng_name:lx[0].gongneng_name
        });
        console.log(res5,'联系我们上传');
    }
  },
  async created() {
    this.row=JSON.parse(this.$route.query.row);
    this.id=this.$route.query.id;
    const res1=await this.$axios("xiangmu/getbjStudent",this.id)
    this.gndata=res1.data;
    console.log(this.gndata);
  },
};
</script>
<style lang="less" scoped>
.togn {
  h3 {
    font-size: 14px;
    color: #555;
    font-weight: 400;
  }
  .gn {
    display: flex;
    margin: 10px 0;
  }
  .gnen {
    width: 100px;
    margin: 5px;
    overflow: hidden;

    font-size: 10px;
    .el-checkbox__label {
      display: inline-block;
      padding-left: 10px;
      line-height: 19px;
      font-size: 10px;
    }
  }
  .nofin {
    padding: 5px 0;
  }
}
.back {
  padding: 5px 15px;
  text-align: right;

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
  .el-icon-close:hover {
    color: rgb(173, 170, 255);
    border: 2px solid rgb(173, 170, 255);
  }
}
</style>