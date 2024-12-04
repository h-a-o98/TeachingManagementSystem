<template>
  <div>
    <div class="back" >
      <i class="el-icon-close" @click="back()"></i>
    </div>
    <div class="jdwcco">
     <div
           v-for="(item, index) in datas.zyj" :key="index"
            :class="[
              'con',
              item.jibie > 60
                ? item.jibie > 90
                  ? 'youxiu'
                  : 'zhongdeng'
                : 'con',
            ]"
          >
            <div class="name" @click="xuesxx(item)">{{ item.stu_name }}</div>
            <div class="cjdaoru">
              <el-input
                @blur="changejin(item.id,item.jibie,item.stu_name,item.zyc)"
                v-model="item.jibie"
                placeholder="进度"
              ></el-input>
            </div>
          </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'zuoyeXueS',
    data() {
        return {
          total:'',
            datas:''
        }
    },
    created() {
      console.log(JSON.parse(this.$route.query,'this.$route.query'));
      this.total=JSON.parse(this.$route.query);
      console.log(this.total,'99999999');
    this.datas=this.total.row;
    console.log(this.datas,'this.datas');
    },
    methods: {
         back() {
      this.$router.replace({ name: "zuoye" });
    },
    async changejin(a,f,c,d) {
    //   console.log(a,f,c,d);
      const res1=await this.$axios("zuoye/putzyjlO",
    {id:a,jibie:f,stu_name:c,zyc:d });
    console.log(res1);
    },
    xuesxx(b){
        // console.log(b,this.datas.jieduan_name);
          this.$router.push({name:"zylist",
          query:{

            name:JSON.stringify(b),
          jieduan:JSON.stringify(this.datas.jieduan_name),
          data:JSON.stringify(this.total),
          className:JSON.stringify(this.datas.className)}})
    }
}
}
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

.jdwcco  {
      display: flex;
      flex-wrap: wrap;
      .con {
        width: 100px;
        position: relative;
        background-color: #f56c6c;
        padding: 5px 10px;
        margin: 15px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;

        .kao {
          font-size: 12px;
        }
        .name {
          font-size: 14px;
          margin-bottom: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .youxiu {
        background-color: #f4f4f4;
        color: #555 !important;
        border: 1px solid #555;
      }
      .zhongdeng {
        background-color: #409eff;
      }

      .cjdaoru {
        font-size: 12px;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        .el-input {
          font-size: 10px;
          border-radius: 5px;
          border: 0;
          box-shadow: none;
          outline: none;
        }
        .el-input:focus {
          border: 0;
          outline: none;
          border-color: #fff;
          box-shadow: none;
        }
      }
    }
</style>