import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import nestedRouter from "./modules/nested";

// 不需要判断权限的路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "仪表盘", icon: "dashboard", affix: true }
      }
    ]
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/list",
    alwaysShow: true, // will always show the root menu
    name: "Article",
    meta: {
      title: "文章",
      icon: "edit"
      // roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/article/list"),
        name: "List",
        meta: {
          title: "所有文章"
        }
      },
      {
        path: "add",
        component: () => import("@/views/article/add"),
        name: "ArticleAdd",
        meta: {
          title: "写文章"
        }
      },
      {
        path: "category",
        component: () => import("@/views/category/"),
        name: "Category",
        meta: {
          title: "分类目录"
        }
      },
      {
        path: "tag",
        component: () => import("@/views/tag"),
        name: "Tag",
        meta: {
          title: "标签"
        }
      },
      {
        path: "update/:id",
        component: () => import("@/views/article/update"),
        name: "ArticleUpdate",
        meta: {
          title: "修改文章"
        },
        hidden: true
      }
    ]
  },
  {
    path: "/sheets",
    component: Layout,
    redirect: "/sheets/list",
    alwaysShow: true, // will always show the root menu
    name: "Sheets",
    meta: {
      title: "页面",
      icon: "el-icon-s-management"
      // roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/sheet/list"),
        name: "SheetList",
        meta: {
          title: "所有页面"
        }
      },
      {
        path: "add",
        component: () => import("@/views/sheet/add"),
        name: "SheetAdd",
        meta: {
          title: "添加页面"
        }
      },
      {
        path: "links",
        component: () => import("@/views/links"),
        name: "Links",
        meta: {
          title: "友链"
        }
      }
    ]
  },
  {
    path: "/comments",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/comment"),
        name: "CommentList",
        meta: { title: "评论", icon: "el-icon-s-comment" }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/profile",
    alwaysShow: true, // will always show the root menu
    name: "User",
    meta: {
      title: "用户",
      icon: "el-icon-user"
      // roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "profile",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: {
          title: "个人资料",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/options",
    alwaysShow: true, // will always show the root menu
    name: "System",
    meta: {
      title: "系统",
      icon: "el-icon-setting"
      // roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "options",
        component: () => import("@/views/system/options"),
        name: "Options",
        meta: {
          title: "博客设置"
        }
      },
      {
        path: "tools",
        component: () => import("@/views/article/list"),
        name: "Tools",
        meta: {
          title: "小工具"
        }
      },
      {
        path: "about",
        component: () => import("@/views/article/list"),
        name: "About",
        meta: {
          title: "关于"
        }
      }
    ]
  },
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "图标库", icon: "icon", noCache: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * 需要判断权限的路由
 */
export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
      title: "Permission",
      icon: "lock",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "PagePermission",
        meta: {
          title: "Page Permission",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "DirectivePermission",
        meta: {
          title: "Directive Permission"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "Role Permission",
          roles: ["admin"]
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  nestedRouter,

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true }
      }
    ]
  },

  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/error-log/index"),
        name: "ErrorLog",
        meta: { title: "Error Log", icon: "bug" }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
