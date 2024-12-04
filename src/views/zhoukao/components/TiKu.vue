<template>
  <div class="tiku">
    <el-tabs v-model="name" type="card">
      <el-tab-pane label="HTML5" name="html"></el-tab-pane>
      <el-tab-pane label="JAVA" name="java"></el-tab-pane>
    </el-tabs>
    <div class="show-score">
      <span>已选分数:{{ totleScore }}</span>
      <el-button
        type="primary"
        plain
        :disabled="totleScore != 100"
        size="mini"
        @click="daochu(questions)"
        >导出</el-button
      >
    </div>
    <div class="trees">
      <el-tree
        :data="questions"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.children" class="label">{{ node.label }}</span>
          <span v-else class="content1">
            <el-checkbox v-model="data.check" @change="changeAction(data)">
              <div class="title1">{{ data.title }}</div>
            </el-checkbox>
            <span class="score1">分值:{{ data.score }}</span>
            <el-button type="text" size="mini" @click="chakan(data)">
              查看详情
            </el-button>
            <el-dialog
              :title="data.c_name"
              :visible.sync="centerDialogVisible"
              width="60%"
              left
            >
              <span class="tit"
                >题目：{{ data1.title }}
                <span
                  >（总分<span>{{ data1.score }}</span
                  >）</span
                >
              </span>
              <span v-html="neirong" class="neirong"></span>
              <span class="pingfen">评分标准：{{ data1.biaozhun }}</span>
            </el-dialog>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
            <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible2"
              width="60%"
              center
            >
              <span>题目已删除</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="shanchuqued">确 定</el-button>
              </span>
            </el-dialog>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: "TiKu",
  data() {
    return {
      datas: [],
      centerDialogVisible: false,
      centerDialogVisible2: false,
      name: "html",
      defaultProps: {
        children: "children",
        label: "label",
      },
      totleScore: 0,
      data1: 0,
      neirong: 0,
      tiku: [],
    };
  },
  
  methods: {
    handleNodeClick(node) {
      console.log(node);
    },
    changeAction(data) {
      this.totleScore = data.check
        ? this.totleScore + data.score
        : this.totleScore - data.score;
      if (data.check) {
        // 选中时添加到数组中
        this.tiku.push(data);
      } else {
        // 取消选中时从数组中删除
        this.tiku = this.tiku.filter((item) => item != data);
      }
    },
    chakan(data) {
      this.centerDialogVisible = true;
      this.data1 = data;
      this.neirong = data.answer;
    },
    async remove(node, data) {
      console.log(node);
      await this.$axios("zhoukao/delTiKu", data.id);
      this.centerDialogVisible2 = true;
    },
    shanchuqued() {
      this.centerDialogVisible2 = false;
      //页面自动刷新
      window.location.reload();
    },
    daochu(data) {
      // console.log(data, "999999");
      this.$router.push({
        name: "daochu",
        query: { data: JSON.stringify(data), tiku: JSON.stringify(this.tiku) },
      },()=>{});
    },
  },
  computed: {
    questions() {
      //获取所有的阶段名称
      const jieduans = [...new Set(this.datas.map((item) => item.c_phase))];
      // console.log(jieduans);
      //获取所有的课程名称
      const kechengs = [...new Set(this.datas.map((item) => item.c_name))];
      // console.log(kechengs);
      //将所有的题目按照课程进行归类处理
      const datas = kechengs.map((item) => {
        const obj = { label: item, children: null };
        obj.children = this.datas.filter((item1) => item1.c_name == item);
        if (!obj.id) {
          // obj.children[0].bianhao?obj.id = Number(obj.children[0].bianhao.split("-")[1]):'';
        }
        return obj;
      });
      // console.log(datas);
      //将所有按照课程归类后的数据按照阶段进一步归类
      let ques = jieduans.map((item) => {
        const obj = { label: item, children: null };
        obj.children = datas.filter(
          (item1) => item1.children[0].c_phase == item
        );
        if (!obj.id) {
          // obj.children[0].children[0].bianhao?obj.id = Number(obj.children[0].children[0].bianhao.split("-")[0]):'';
        }
        return obj;
      });
      // console.log(ques);
      //将数据源按照阶段排序
      ques.sort((item1, item2) => item1.id - item2.id);
      ques = ques.map((item) => {
        item.children.sort((item1, item2) => item1.id - item2.id);
        return item;
      });
      return ques;
    },
  },
  watch: {
    name: {
      async handler(newV) {
        const res = await this.$axios("zhoukao/getTiKu", { xk: newV });
        // console.log(res.data);
        this.datas = res.data.data.map((item) => ({ ...item, check: false }));
        // console.log(this.datas);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.tiku {
  .show-score {
    font-size: 12px;
    text-align: right;
    span {
      margin-right: 5px;
    }
  }
  .content1 {
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1100px;

  }
  .score1 {
    font-size: 12px;
  }
  .label {
    font-size: 14px;
    color: #555;
    display: inline-block;
    padding: 10px 0;
  }
  .el-tree-node__content {
    height: auto !important;
    display: block;
  }
  .el-checkbox {
    display: flex;
    align-items: center;
  }
  .title1 {
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.tit {
  color: #555;
  font-size: 13px;
  white-space: wrap;
}
.neirong {
  margin-top: 10px;
  font-weight: bold;
  font-size: 13px !important;
  display: block;
  color: #aaf;
  margin-bottom: 10px;
  white-space: wrap;
}
.pingfen {
  color: #ff4500;
  font-size: 12px;
  margin-left: 6px;
}
</style>