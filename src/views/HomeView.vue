<script setup lang="ts">
import { GetMenuListRequest } from '@/http/api';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';

import HeaderComponent from '@/components/header/index.vue'
import AnMenu from '@/components/menu/index.vue'

const homeData = reactive({
  homeMenuList: [] as any,
})
const menuList = localStorage.getItem('menu_list');
// 判断本地是否存在menulist
if (menuList == null) {
  // 不存在则获取数据链接
  GetMenuListRequest().then(res => {
    if (res.data.code == 200) {
      localStorage.setItem('menu_list', JSON.stringify(res.data.data));
      const _menuList = JSON.parse(localStorage.getItem('menu_list')!);
      homeData.homeMenuList = _menuList
      return;
    }else{
      ElMessage({ type: 'error', message: "菜单列表获取失败", duration: 1500 });
    }
  })
} else {
  // 存在则直接获取
  homeData.homeMenuList = JSON.parse(menuList);
}

</script>

<template>
  <div class="container">
    <div class="side_menu">
      <h2>BACKSTAGE</h2>
      <AnMenu :homeMenuList="homeData.homeMenuList"></AnMenu>
    </div>
    <div class="c_content">
      <HeaderComponent></HeaderComponent>
      <div class="dash_con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style>
.el-menu-item.is-active{color: var(--color--menu);}
.menu_ico{font-size: 24px;margin-right: 12px;}
.container {background-color: var(--dash-c-b);height: 100vh;display: flex;}
.side_menu {display: flex;flex-direction: column;align-items: center;height: 100%;width: 248px;background-color: #ffffff;}
.side_menu h2 {font-size: 27px;color: var(--login-title-t);font-family: 'DB';margin: 24px 0;}
.c_content {flex: 1;height: 100%;display: flex;flex-direction: column;}
.c_content .dash_con {flex: 1;display: flex;align-items: center;justify-content: center;}
.el-menu-vertical-stage{width: 100%;width: 100%;border-right: 0;}
</style>
