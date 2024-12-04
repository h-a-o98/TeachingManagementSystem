<template>
  <div>
    <div class="zhoukaoti" v-if="caozuo == '周考考题'">
      <div class="back" @click="back()">
        <span>×</span>
      </div>
      <div class="content">
        <h2>
          {{ ti.zhoukaoName }}
        </h2>
        <div class="question" v-for="(item, index) in timu" :key="index">
          <div class="tit">
            {{ index + 1 }}.题目：{{ item.title }} (总分{{ item.score }})
          </div>
          <div class="nr">
            <div class="answe" v-html="item.answer"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="zhe" v-else>
      <div class="cj">
        <div class="back" @click="back()">
          <span>×</span>
        </div>
        <div class="tou">
          <ul>
            <li>
              <p>总次数：</p>
              <p>{{ total }}</p>
            </li>
            <li>
              <p>优秀次数：</p>
              <p>{{ youxiu.length }}</p>
            </li>
            <li>
              <p>优秀率：</p>
              <p>{{ youxiulv }}%</p>
            </li>
            <li>
              <p>及格次数：</p>
              <span>{{ jige.length }}</span>
            </li>
            <li>
              <p>及格率：</p>
              <p>{{ jigelv }}%</p>
            </li>
            <li>
              <p>不及格次数：</p>
              <span>{{ bujigecs }}</span>
            </li>
            <li>
              <p>不及格率：</p>
              <p>{{ bujigelv }}%</p>
            </li>
          </ul>
          <hr />
        </div>

        <div class="cont" v-if="caozuo == '补考成绩导入'">
          <div
            v-for="(item1, index1) in bukaocj"
            :key="index1"
            :class="[
              'con',
              item1.bukao > 60
                ? item1.bukao > 90
                  ? 'youxiu'
                  : 'zhongdeng'
                : 'con',
            ]"
          >
            <div class="name">{{ item1.stu.stu_name }}</div>
            <div class="cjdaoru">
              <el-input
                @blur="bjcjDr(item1.bukao, item1.id)"
                v-model="item1.bukao"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>

        <div class="cont" v-else>
          <div
            v-for="(item, index) in cj"
            :key="index"
            :class="[
              'con',
              item.kaoshi > 60
                ? item.kaoshi > 90
                  ? 'youxiu'
                  : 'zhongdeng'
                : 'con',
            ]"
          >
            <div class="name">{{ item.stu.stu_name }}</div>
            <div v-if="caozuo == '成绩查询'">
              <div class="kao">周考：{{ item.kaoshi }}</div>
              <div class="kao">补考：{{ item.bukao }}</div>
            </div>
            <div class="cjdaoru" v-else-if="caozuo == '成绩导入'">
              <el-input
                class="input"
                @blur="cjDr(item.kaoshi, item.id)"
                v-model="item.kaoshi"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CX",
  data() {
    return {
      cj: "",
      total: "",
      youxiu: null,
      youxiulv: "",
      jige: "",
      jigelv: "",
      bujigecs: "",
      bujigelv: "",
      caozuo: "",
      ti: "",
      timu: "",
      bukaocj: "",
    };
  },
  methods: {
    back() {
      this.$router.replace({ name: "ChengJiZhouKao" });
    },
    async cjDr(a, b) {
      console.log(a, b);
      const res = await this.$axios("zhoukao/postChengji", {
        kaoshi: a,
        t_id: b,
      });
      console.log(res);
    },
    async bjcjDr(c, d) {
      console.log(c, d);
      const res = await this.$axios("zhoukao/postbkChengji", {
        bukao: c,
        t_id: d,
      });
      console.log(res);
    },
  },
  watch: {
    $route: {
      handler(newV) {
        this.ti = newV.query.cj;
        this.timu = JSON.parse(this.ti.timu);
        this.cj = newV.query.cj.t_scores;
        // console.log(this.cj, "cj");
        this.bukaocj = this.cj.filter((item) => item.kaoshi <= 60);
        this.total = this.cj.length;
        this.youxiu = newV.query.cj.t_scores;
        this.youxiu = this.cj.filter((item) => item.kaoshi >= 90);
        this.youxiulv = (this.youxiu.length / this.total) * 100;
        this.jige = this.cj.filter((item) => item.kaoshi >= 60);
        this.jigelv = (this.jige.length / this.total) * 100;
        this.bujigecs = this.total - this.jige.length;
        this.bujigelv = 100 - this.jigelv;
        this.caozuo = newV.query.caozuo;
      },
      immediate: true,
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.zhoukaoti {
  width: 100%;
  background: #fff;
  .back {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    margin-top: 6px;
    float: right;
    cursor: pointer;
    overflow: hidden;
    background-color: #409eff;
    & > span {
      color: white;
      line-height: 40px;
      width: 20px;
      height: 20px;
      font-size: 25px;
      border-radius: 50%;
    }
  }
  .content {
    padding: 60px;
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
}
.zhe {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 100%;
  top: 0px;
  z-index: 200;
  left: 0;
  .cj {
    width: 90%;
    background-color: white;
    position: absolute;
    top: 20px;
    left: 80px;
    height: 94%;
    .back {
      width: 30px;
      height: 30px;
      border: 1px solid black;
      text-align: center;
      border-radius: 50%;
      margin-top: 6px;
      float: right;
      cursor: pointer;
      & > span {
        line-height: 30px;
        font-size: 30px;
      }
      &:hover {
        color: blue;
        border: 1px solid blue;
      }
    }
    .tou {
      margin-top: 40px;
      & > ul {
        display: flex;
        list-style: none;
        justify-content: space-between;
        width: 98%;
        margin: 0 auto;
        margin-bottom: 10px;
        & li {
          width: 20%;
          padding-left: 10px;
        }
        & > li:nth-of-type(1) {
          border-right: 1px solid blue;
          border-left: 1px solid blue;
        }
        & > li:nth-of-type(2) {
          border-right: 1px solid blue;
        }
        & > li:nth-of-type(4) {
          border-right: 1px solid green;
          border-left: 1px solid green;
        }
        & > li:nth-of-type(6) {
          border-right: 1px solid orange;
          border-left: 1px solid orange;
        }
      }
    }
    .cont {
      display: flex;
      flex-wrap: wrap;
      .con {
        width: 80px;
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
  }
}
</style>