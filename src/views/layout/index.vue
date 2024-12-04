<template>
  <div class="layout">
    <div class="navtop" style="height: 64px"></div>
    <div class="jy">
      <div class="nav">
        <div class="nav_left">
          <img
            src="https://saas.lanou3g.com/orjImage/1/orjlogo_1.png?37"
            alt=""
          />
        </div>
        <div class="nav_right">
          <img
            src="https://i.jingyingba.com/photo/portrait/201512/20151220123658_T_121_2512.png"
            alt=""
          />
          <span>xxxx</span>
        </div>
      </div>
      <div class="left-menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#eef3f6"
          text-color="rgb(72,99,130)"
          active-text-color="rgb(72,99,130)"
          @select="selectAction"
        >
          <el-menu-item
            :class="{ select: index1 == selectIndex.split('-')[0] }"
            v-for="(item, index1) in menuItems"
            :key="index1"
            :index="index1"
          >
            <i :class="['iconfont', item.icon]"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-content">
        <router-view />
      </div>
    </div>
    <!-- <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
    <!-- 不需要缓存的视图组件 -->
    <!-- <router-view v-if="!$route.meta.keepAlive"> </router-view> -->
  </div>
</template>
<script>
//导入辅助函数获取selectIndex
import { mapState, mapMutations } from "vuex";
export default {
  name: "LayoutView",
  data() {
    return {
      menuItems: [
        {
          title: "周考管理",
          icon: "icon-shixiang",
          path: { name: "zhoukao" },
        },
        {
          title: "项目管理",
          icon: "icon-xiangmu_xiangmuguanli",
          path: { name: "xiangmu" },
        },
        {
          title: "课后作业",
          icon: "icon-zuoyepigai",
          path: { name: "zuoye" },
        },
      ],
    };
  },
  computed: {
    ...mapState("app", ["selectIndex"]),
  },
  watch: {
    $route: {
      handler(newV) {
        if (newV.meta.selectIndex) {
          this.changeSelect(newV.meta.selectIndex);
        }
      },
      immediate: true,
    },
  },
  methods: {
    selectAction(index) {
      this.$router.replace(this.menuItems[index].path);
    },
    ...mapMutations("app", ["changeSelect"]),
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  .jy {
    display: flex;
    height: 100%;
    .left-menu {
      width: 170px;
      height: calc(100% - 60px);
      .el-menu-vertical-demo {
        height: 100%;
        .el-menu-item {
          font-size: 12px;
        }
        .select {
          background-color: #fff !important;
        }
      }
      i {
        margin-right: 10px;
      }
    }
    .right-content {
      width: calc(100% - 170px);
      height: calc(100% - 60px);
      overflow: scroll;
      padding: 20px;
      box-sizing: border-box;
      text-align: left;
    }
  }
}
.nav {
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: space-between;
  background-color: #5e7997;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  min-width: 1000px;
  .nav_left {
    width: 170px;
    img {
      width: 100%;
    }
  }
  .nav_right {
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: flex-start;
    color: #fff;
    img {
      width: 36px;
      border-radius: 50%;
    }
    span {
      margin-left: 10px;
      padding-right: 15px;
    }
  }
}
</style>