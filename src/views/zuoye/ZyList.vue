<template>
  <div>
    <div class="back" @click="back()">
      <i class="el-icon-close"></i>
    </div>
    <div class="jdwcco">
      <div
      v-for="item in shuju"
      :key="item.id"
        :class="[
          'con',
          item.jibie > 60
            ? item.jibie > 90
              ? 'youxiu'
              : 'zhongdeng'
            : 'con',
        ]"
      >
        <div class="name">{{ datas.stu_name }}</div>
        <div class="jieduan">{{ jieduan }}</div>
        <div class="cjdaoru">
          <el-input
            clear
            @blur="changejin(datas.id, datas.jibie, datas.stu_name, datas.zyc)"
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
  name: "zuoyeXueS",
  data() {
    return {
      datas: [],
      jieduan: "",
      datas3:'',
      className:'',
      shuju:'',
      total:''
    };
  },
  async created() {
    this.datas = JSON.parse(this.$route.query.name);
    this.jieduan = JSON.parse(this.$route.query.jieduan);
    this.className = JSON.parse(this.$route.query.className);
    this.datas2= JSON.parse(this.$route.query.data);
    console.log(this.datas2,'6666666');
     const res = await this.$axios("zuoye/getJDScore", {
      className: this.className,
      jieduan_name: this.jieduan,
    });

  const bb = [];
    res.data.forEach((item) => {
      item.zyj.filter((item1) => {
        if (item1.stu_name == this.datas.stu_name) {
          bb.push(item1);
        }
      });
    });
    this.shuju = bb;
    console.log(this.shuju,'gaibianshuju');

  },
  methods: {
    back() {
      this.$router.replace({ name: "zuoyexues",query:JSON.stringify(this.datas2) });
    },
    async changejin(a, f, c, d) {
       await this.$axios("zuoye/putzyjlO", {
        id: a,
        jibie: f,
        stu_name: c,
        zyc: d,
      });
    },
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
  .el-icon-close:hover {
    color: rgb(173, 170, 255);
    border: 2px solid rgb(173, 170, 255);
  }
}

.jdwcco {
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
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .jieduan {
      padding: 0 0 5px;
      font-size: 12px;
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