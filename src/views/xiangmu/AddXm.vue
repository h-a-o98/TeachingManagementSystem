<template>
  <div class="xiangmu">
    <div class="xmlbtop">
      <h3 class="xmlb">项目检查列表</h3>
      <div class="iconjia">
        <i class="el-icon-close" @click="backxm"></i>
      </div>
    </div>
    <div class="xmlbcon2">
      <el-form ref="form" label-width="80px">
        <el-form-item label="班级名称">
          <el-select v-model="bjmc" placeholder="请选择班级">
            <el-option
              v-for="(item, index) in xmbjdata"
              :key="index"
              :label="item.className"
              :value="item.className"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="block">
          <span class="demonstration">项目信息</span>
          <el-cascader
            v-model="xmdata"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </div>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="tikucj()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddXm",
  data() {
    return {
      bjmc: "",
      xmxx: "",
      xmbjdata: "",
      xmdata: "",
      options: [],
    };
  },
  methods: {
    backxm() {
      this.$router.push({ name: "xiangmu" });
    },
    async tikucj() {
      this.$message('数据已更新');
      const res = await this.$axios("xiangmu/postbjxiangmuM", {
        className: this.bjmc,
      });
      console.log(res,'班级名');
      // console.log(this.xmdata);
      this.options.forEach((item) => {
        item.children.forEach(async (item1) => {
          if (
            item1.jieduan_name == this.xmdata[0] &&
            item1.label == this.xmdata[1]
          ) {
            const res1 = await this.$axios("xiangmu/postxmCheckM", {
              className: this.bjmc,
              jieduan_id: item1.jieduan_id,
              xiangmu_id: item1.xiangmu_id,
            });
            console.log(res1, "post项目检查名");
            item1.xms.forEach(async (item2) => {
              console.log(item2);
              const res2 = await this.$axios("xiangmu/postbjCheckM", {
                gongneng_id: item2.gongneng_id,
                gongneng_name: item2.gongneng_name,
              });
              console.log(res2,"post班级项目检查名");
            });
          }
        });
      });
    },
  },
  async created() {
    this.xmbjdata =JSON.parse(this.$route.query);
    const res = await this.$axios("xiangmu/getxmjd");
    let result = res.data;
    // console.log(result,'获取数据');
    const jieduans = [...new Set(result.map((item) => item.jieduan_name))];
    // console.log(jieduans,'66666');
    const options = jieduans.map((item) => {
      const obj = { value: item, label: item, children: [] };
      result.forEach((item1) => {
        if (item1.jieduan_name == item) {
          obj.children.push({
            value: item1.xiangmu_name,
            label: item1.xiangmu_name,
            jieduan_id: item1.jieduan_id,
            xiangmu_id: item1.xiangmu_id,
            xms: item1.xms,
            jieduan_name: item1.jieduan_name,
          });
        }
      });
      return obj;
    });
    this.options = options;
    // console.log(options, "处理后数据");
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
.el-icon-close {
  margin: 0 15px;
}
.block {
  padding-bottom: 15px;
  .demonstration {
    width: 80px;
    padding: 8px;
  }
}
</style>