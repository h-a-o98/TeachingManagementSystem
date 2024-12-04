import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/layout/index.vue";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}

const routes = [
  {
    path: '/',
    name: "Layout",
    component: Layout,
    meta: { check: true },
    redirect: { name: "login" },
    children: [
      {
        path: "/zhoukao",
        name: 'zhoukao',
        component: () => import('../views/zhoukao/index.vue'),
        meta: { selectIndex: "0" ,check: true},
        redirect: { name: "tiku" },
        children: [
          {
            path: 'tiku',
            name: 'tiku',
            component: () => import('../views/zhoukao/components/TiKu.vue'),
            meta: { selectIndex: "0-0",check: true },
          },
          {
            path: 'add-tiku',
            name: 'addTiku',
            component: () => import('../views/zhoukao/components/AddTiKu.vue'),
            meta: { selectIndex: "0-1",check: true },
            redirect: { name: "addTikuAB1" },
            children: [
              {
                path: 'add-tiku-ab1',
                name: 'addTikuAB1',
                component: () => import('../views/zhoukao/components/addTiKu/AB1.vue'),
                meta: { selectIndex: "0-1-0",check: true },
              },
              {
                path: 'add-tiku-ab2',
                name: 'addTikuAB2',
                component: () => import('../views/zhoukao/components/addTiKu/AB2.vue'),
                meta: { selectIndex: "0-1-1",check: true },
              }
            ]
          },
          {
            path: 'chengji',
            name: 'chengji',
            component: () => import('../views/zhoukao/components/ChengJi.vue'),
            meta: { selectIndex: "0-2",check: true },
            redirect: { name: "ChengJiZhouKao" },
            children: [
              {
                path: 'ck-zhoukao-cj',
                name: 'ChengJiZhouKao',
                component: () => import('../views/zhoukao/components/ckChengJi/ZhouKaocj.vue'),
                meta: { selectIndex: "0-2-0" ,check: true}
              },
              {
                path: 'ck-banji-cj',
                name: 'ChengJiBanJi',
                component: () => import('../views/zhoukao/components/ckChengJi/BanJicj.vue'),
                meta: { selectIndex: "0-2-1",check: true }
              },
            ]
          },
          {
            path: 'cj-bk',
            name: 'cjBK',
            component: () => import('../views/zhoukao/components/ckChengJi/BK.vue'),
            meta: { selectIndex: "0-2-2",check: true }
          },

        ]
      },
      {
        path: 'bkXiaZai',
        name: 'bkXiaZai',
        component: () => import('../views/zhoukao/components/ckChengJi/bkXiaZai.vue'),
        meta: { selectIndex: "0",check: true },
      },
      {
        path: '/cx',
        name: 'cx',
        component: () => import('../views/zhoukao/components/caozuo/CX.vue'),
        meta: { selectIndex: "0",check: true },
      },
      {
        path: '/bjcjcx',
        name: 'bjcjcx',
        component: () => import('../views/zhoukao/components/ckChengJi/bjcjCX.vue'),
        meta: { selectIndex: "0",check: true},
      },
      {
        path: '/xm',
        name: 'xiangmu',
        component: () => import('../views/xiangmu/index.vue'),
        meta: { selectIndex: "1", keepAlive: "true",check: true }
      },
      {
        path: '/zuoye',
        name: 'zuoye',
        component: () => import('../views/zuoye/index.vue'),
        meta: { selectIndex: "2",check: true }
      },
      {
        path: '/daochu',
        name: 'daochu',
        component: () => import('../views/zhoukao/components/DaoChu.vue'),
        meta: { selectIndex: "0",check: true },
      },
      {
        path: '/xmwc',
        name: 'xmwc',
        component: () => import('../views/xiangmu/xmWC.vue'),
        meta: { selectIndex: "1", keepAlive: "true" ,check: true},
      },
      {
        path: '/xmgongnen',
        name: 'xmgongnen',
        component: () => import('../views/xiangmu/xmGongNen.vue'),
        meta: { selectIndex: "1", keepAlive: "true",check: true },
      },
      {
        path: '/addxm',
        name: 'addxm',
        component: () => import('../views/xiangmu/AddXm.vue'),
        meta: { selectIndex: "1", keepAlive: "true" ,check: true},
      },
      {
        path: '/addzyjc',
        name: 'addzyjc',
        component: () => import('../views/zuoye/addZyJc.vue'),
        meta: { selectIndex: "2", keepAlive: "true" ,check: true},
      },
      {
        path: '/zuoyexues',
        name: 'zuoyexues',
        component: () => import('../views/zuoye/zuoyeXueS.vue'),
        meta: { selectIndex: "2", keepAlive: "true",check: true },
      },
      {
        path: '/zylist',
        name: 'zylist',
        component: () => import('../views/zuoye/ZyList.vue'),
        meta: { selectIndex: "2", keepAlive: "true",check: true},
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { check: false },
    component: () => import("../views/login/index.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  //to:目标路由对象，from:资源路由对象，next函数用来决定当前路由是否需要进一步匹配
  // console.log(to,from);
  if (to.meta.check) {
    //此时说明当前路由需要进行登录认证
    if (sessionStorage.getItem("login")) {
      //此时说明用户登陆成功
      next();
    } else {
      //此时说明用户未登录成功，此时拦截用户将用户引向登录页面
      router.replace({ name: "login" });
    }
  }
  next();
})

export default router
