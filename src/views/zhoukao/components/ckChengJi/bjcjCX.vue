<template>
  <div>
    <div class="zhe">
      <div class="cj">
        <div class="back1">
          <div class="back" @click="back()">
            <span>×</span>
          </div>
        </div>
        <div class="bcon" v-for="(item, index) in namecj" :key="index">
          <h3 class="h3">{{ item.name }}</h3>
          <div class="bjvcon1" v-for="(item2, index2) in item.children" :key="index2">
              <div class="bjvcon">
                <h3>{{ item2.riqi }}</h3>
                <div class="bjvcj">
                  <div 
                  :class="[
                    'bjcj',
                    item2.kaoshi > 60
                        ? item2.kaoshi > 90
                          ? 'youxiu'
                          : 'bjcj'
                        : 'bjbkcj',
                  ]">成绩：{{ item2.kaoshi }}</div>
                  <div :class="[
                    'bjcj',
                    item2.bukao > 60
                        ? item2.bukao > 90
                          ? 'youxiu'
                          : 'bjcj'
                        : 'bjbkcj',
                  ]">补考：{{ item2.bukao }}</div>
                </div>
              </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "bjcjCX",
  data() {
    return {
      cjda: "",
      namecj: "",
    };
  },
  methods: {
    back() {
      this.$router.replace({ name: "ChengJiBanJi" });
    },
  },
  watch: {
    $route: {
      handler(newV) {
        this.cjda = newV.query;
        console.log(this.cjda);
        const result = this.cjda.reduce((acc, item) => {
          const arr = item.t_scores.map((stu) => ({
            stu_name: stu.stu_name,
            kaoshi: stu.kaoshi,
            bukao: stu.bukao,
            riqi:
              stu.zhoukao.split("-")[1] +
              "月" +
              (Math.floor(stu.zhoukao.split("-")[1] / 7) + 1) +
              "周",
          }));
          return [...acc, ...arr];
        }, []);
        console.log(result);
        const bjcj = [...new Set(result.map((item) => item.stu_name))];
        console.log(bjcj);
        const datas = bjcj.map((item) => {
          const obj = { name: item, children: null };
          obj.children = result.filter((item1) => item1.stu_name == item);
          return obj;
        });
        console.log(datas);
        this.namecj = datas;

      },
      immediate: true,
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
.zhe {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 100%;
  top: 0px;
  z-index: 200;
  left: 0;
  .cj {
    width: 85%;
    background-color: white;
    position: absolute;
    top: 20px;
    left: 80px;
    height: 94%;
    overflow: scroll;
    .back1 {
      height: 35px;
    }
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
    .bcon {
      display: flex;
      margin-top: 10px;
      padding: 0px 10px;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid rgb(204, 204, 204);
      .h3 {
        font-size: 14px;
        color: rgb(85, 85, 85);
        width: 20px;
      }
      .bjvcon1 {
        display: flex;
        .bjvcon {
          width: 150px;
          border: 1px solid rgb(204, 204, 204);
          border-radius: 5px;
          margin: 0px 10px 10px;
          h3 {
            font-size: 13px;
            color: rgb(85, 85, 85);
            text-align: center;
            padding: 5px;
            border-bottom: 1px solid rgb(204, 204, 204);
          }
          .bjvcj {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 8px;
            color: rgb(255, 255, 255);
            padding: 5px 10px;
            .bjcj {
              width: 40px;
              padding: 2px 5px;
              border-radius: 3px;
              background-color: rgb(64, 158, 255);
            }
            .bjbkcj {
              width: 40px;
              padding: 2px 5px;
              border-radius: 3px;
              background-color: rgb(245, 108, 108);
            }
            .youxiu {
  background-color: #f4f4f4;
  color: #555;
  border: 1px solid #555;

}
          }
        }
      }
    }
  }
}
</style>