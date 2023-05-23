<template>
  <div id="app">
    <Header class="header-all"></Header>
    <div class="el-wrap-con">
      <div class="container">
        <div class="menu">
          <a-menu
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              style="width: 231px;border-radius: 4px;"
              mode="inline"
              @click="handleClick"
          >
            <a-sub-menu v-for="(item, index) in tempLeftMenuArray" :key="item.menuUrl">
              <template #title>{{ item.menuName }}</template>
              <a-menu-item v-for="(ret, rIndex) in item.children" :key="ret.menuUrl">{{ ret.menuName }}</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
      <div class="wrap-con">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{routeName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '/src/service/interface.js';
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      leftMenu: {},
      toggleSide: true,
      leftMenuArray: [],
      tempLeftMenuArray: [
        {
          menuName: '强企先锋',
          menuUrl: '/pioneer',
          children: [
            { menuName: '学而时习', menuUrl: '/pioneer/study' },
            { menuName: '红色堡垒', menuUrl: '/pioneer/study1' },
            { menuName: '红色堡垒', menuUrl: '/pioneer/study2' },
          ]
        },
        {
          menuName: '强企先锋',
          menuUrl: '/pioneer2',
          children: [
            { menuName: '学而时习', menuUrl: '/pioneer/study3' },
            { menuName: '红色堡垒', menuUrl: '/pioneer/study4' },
            { menuName: '红色堡垒', menuUrl: '/pioneer/study5' },
          ]
        },
      ]
    };
  },
  computed: {
    routeName: function () {
      if (this.$route.query.breadParams) {
        return this.$route.query.breadParams;
      } else {
        return this.$route.name;
      }
    },
  },
  methods: {
    handleClick({ item, key, keyPath }) {
      console.log('ret'+item);
      console.log('ret'+key);
      console.log('ret'+keyPath);
      this.$router.push(key);
    },
    getMenuList() {
      this.leftMenuArray = this.tempLeftMenuArray; // 临时目录
      // this.Api.queryMenu().then(resp => {
      //   if (resp.length) {
      //     let leftMenu = [];
      //     resp.forEach((item) => {
      //       leftMenu.push(item);
      //     });
      //     this.leftMenuArray = leftMenu;
      //   }
      // });
    },
  },
  mounted () {
    this.getMenuList(); // 获取菜单
    getUserInfo().then((resp) => {
      localStorage.setItem('zjUser', JSON.stringify(resp));
    });
  },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --color-bg-primary: #d0d6df;
  --color-bg-primary-offset: #f1f3f7;
  --color-bg-secondary: #0978be;
  --color-text-primary: #3a3c42;
  --color-text-primary-offset: #898c94;
  --color-orange: #dc9960;
  --color-green: #1eb8b1;
  --color-purple: #657cc4;
  --color-black: var(--color-text-primary);
  --color-red: #d92027;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Nunito Sans', BlinkMacSystemFont, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', sans-serif;
  background: #f8fafb;
  min-width: 1200px;
}
a {
  color: inherit;
  background-color: transparent;
  text-decoration: none;
}
#app {
  width: 100%;
  height: 100%;
  .header-all {
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 8px rgba(#404040, 0.15);
  }
  .el-wrap-con {
    padding: 8px 4px 8px 2px;
    display: flex;
  }
  .container {
    flex-shrink: 0;
    width: 230px;
    height: calc(100vh - 86px);
    margin-right: 8px;
  }
  .menu {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-secondary);
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(#404040, 0.15);
    height: 100%;
    font-size: 14px;
    i {
      margin-right: 8px;
    }
    .menu-item {
      position: relative;
    }
  }
  .wrap-con {
    position: relative;
    width: 100%;
    transition: all 0.3s;
    .el-breadcrumb {
      background: #fff;
      padding: 8px;
      line-height: 24px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      transition: all 0.3s;
      border-radius: 4px;
      .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        font-weight: 500;
      }
      .el-breadcrumb__separator {
        font-weight: 500;
      }
    }
    .el-scrollbar {
      height: calc(100vh - 134px);
      margin-top: 8px;
      box-shadow: 0 10px 20px rgba(#404040, 0.15);
      border-radius: 4px;
      padding: 18px 20px 8px;
      overflow: hidden;
      background: #fff;
    }
  }
}
</style>
<style>
.ant-menu-root.ant-menu-inline {
  background-color: #0978be !important;
  color: #fff !important;
}
.ant-menu-root.ant-menu-inline :hover{
  color: rgba(255,145,1,0.9) !important;
}
.ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
  background-color: #fff !important;
}
.ant-menu-submenu-selected {
  color: #fff !important;
  /*font-weight: 500 !important;*/
}
.ant-menu-title-content {
  color: #fff !important;
}
.ant-menu-sub.ant-menu-inline > .ant-menu-item {
  background-color: #0978be !important;
}
.ant-menu-item.ant-menu-item-only-child {
  margin: 0 !important;
  border-bottom: 0.5px solid rgba(0,0,0,0.2) !important;
}
.ant-menu-inline .ant-menu-item::after {
  border-right: 3px solid #ff9101 !important;
}
</style>
