<template>
  <div id="app">
    <HeaderBlue class="header-all"></HeaderBlue>
<!--    <HeaderLight class="header-all"></HeaderLight>-->
    <div class="el-wrap-con">
      <div class="container">
        <div class="menu">
          <ul class="menu-list">
            <li class="menu-item" v-for="(item, index) in tempLeftMenuArray" :key="index">
              <button class="menu-button"><i class="el-icon-folder menu-icon"></i>{{item.menuName}}<i class="el-icon-arrow-right arrow"></i></button>
              <ul class="menu-sub-list">
                <li class="menu-item">
                  <button class="menu-button" v-for="(ret, rIndex) in item.children" :key="rIndex" @click="goUrl(ret)">
                    <i class="el-icon-tickets"></i>{{ret.menuName}}
                  </button>
                </li>
              </ul>
            </li>
          </ul>
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
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      leftMenu: {},
      toggleSide: true,
      leftMenuArray: [],
      tempLeftMenuArray: [
        {
          menuName: '一级菜单1',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单1', menuUrl: '/registration/register' },
            { menuName: '二级菜单2', menuUrl: '/registration/register' },
            { menuName: '二级菜单3', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单2',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
            { menuName: '二级菜单5', menuUrl: '/registration/register' },
            { menuName: '二级菜单6', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单3',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单4',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单5',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
          ]
        },
        {
          menuName: '一级菜单6',
          menuUrl: '/registration',
          children: [
            { menuName: '二级菜单4', menuUrl: '/registration/register' },
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
    goUrl(ret) {
      this.$router.push(ret.menuUrl);
    },
  },
  mounted: function () {
    this.getMenuList(); // 获取菜单
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
  --color-bg-secondary: #fff;
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
    padding: 8px;
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
    .menu-list {
      margin: 0;
      display: block;
      width: 100%;
      padding: 8px;
      list-style-type: none;
      & + .menu-list {
        border-top: 1px solid #ddd;
      }
    }
    .menu-sub-list {
      display: none;
      padding: 8px;
      background-color: var(--color-bg-secondary);
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(#404040, 0.15);
      position: absolute;
      left: 100%;
      right: 0;
      z-index: 100;
      width: 100%;
      top: 0;
      flex-direction: column;
      list-style-type: none;
      &:hover {
        display: flex;
      }
    }
    .menu-item {
      position: relative;
    }
    .menu-button {
      font: inherit;
      border: 0;
      padding: 8px 8px;
      padding-right: 36px;
      width: 100%;
      border-radius: 8px;
      text-align: left;
      display: flex;
      align-items: center;
      position: relative;
      background-color: var(--color-bg-secondary);
      color: #606266;
      &:hover {
        background-color: var(--color-bg-primary-offset);
        color: #333;
        & + .menu-sub-list {
          display: flex;
        }
        .menu-icon {
          color: var(--color-text-primary);
        }
      }
      .menu-icon {
        color: var(--color-text-primary-offset);
      }
      .arrow {
        position: absolute;
        right: 10px;
      }
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
      padding: 8px;
      overflow: hidden;
      background: #fff;
    }
  }
}
</style>


<style lang="scss">
// 全局样式优化
// 修改表格紧凑度
.el-table .el-table__cell {
  padding: 8px 0;
}
.el-table th.el-table__cell>.cell {
  padding: 0px 8px;
}
.el-button--small {
  padding: 7px 12px;
}
// 弹窗样式
.el-dialog--center {
  .el-dialog__body {
    padding: 15px 25px 10px;
    max-height: calc(90vh - 125px);
    overflow: auto;
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-form-item__error {
      padding-top: 0px;
    }
  }
  .el-dialog__footer {
    .el-button {
      margin: 0 35px;
    }
  }
}
</style>
