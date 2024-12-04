<template>
  <div class="bancheng">
    <div class="tree">
      <el-tree
        :data="banji"
        :props="defaultProps"
        accordion
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="data.children" class="banlabel">{{ node.label }}</span>
          <span v-else class="bancontent">
            <div class="tititle">{{ data.label }}</div>
            <i class="el-icon-view" @click="cjCx(data)"></i>
          </span> </span
      ></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: "BanJicj",
  data() {
    return {
      banji: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    $route: {
      async handler() {
        const res = await this.$axios("zhoukao/getBanJicj");
        // console.log(res.data.data, "res.data.data");
        let banji = [
          ...new Set(
            res.data.data.map((item) => {
              return {
                label: item.className,
                children: item.tms.map((item1) => {
                  return {
                    label: item1.jieduan,
                    stu: {
                      t_scores: item1.t_scores.map((score) => ({
                        ...score.stu,
                        zhoukao: item1.zhoukao,
                        bukao: score.bukao,
                        kaoshi: score.kaoshi,
                      })),
                    },
                  };
                }),
              };
            })
          ),
        ];
        // console.log(banji);
        //根据阶段名再分类
        banji = banji.map((item) => {
          let children = item.children.reduce((acc, curr) => {
            let exist = acc.find((c) => c.label === curr.label);
            if (exist) {
              // 阶段名已经存在
              exist.stu.push(curr.stu);
            } else {
              // 阶段名不存在
              acc.push({
                label: curr.label,
                stu: [curr.stu],
              });
            }
            return acc;
          }, []);
          return {
            label: item.label,
            children: children,
          };
        });

        this.banji = banji;
        console.log(this.banji, "6254");
      },
      immediate: true,
    },
  },
  methods: {
    cjCx(data) {
      this.$router.push({
        name: "bjcjcx",
        query:data.stu
      });
    },
  },
};
</script>
<style lang="less" scoped>
.bancheng {
  .tree {
    .custom-tree-node {
      .bancontent {
        width: 1100px;
        display: flex;
        justify-content: space-between;
        .el-icon-view {
          color: skyblue;
        }
        .el-icon-view:hover {
          color: red;
        }
      }
    }
  }
}
</style>