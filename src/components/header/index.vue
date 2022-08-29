<script lang="ts" setup>
import router from '@/router';
import { computed, ref } from 'vue';

enum typeOptions {
  logout = 'logout'
}

const searchInput = ref('');
const circleUrl = ref("https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4");

const checkTypeOptions = (type: typeOptions) => {
  if (type == typeOptions.logout) {
    localStorage.clear();
    router.push('/login');
  }
}
// 获取当前日期
let getDate = computed(()=>{
  var myDate = new Date();
  return `${myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1}/${myDate.getDate()}/${myDate.getFullYear()}`;
})

</script>

<template>
  <div class="header_bar">
    <div>
      <b>{{getDate}}</b>
    </div>
    <div class="header_info">
      <el-input v-model="searchInput" placeholder="Please input" />
      <div class="block">
        <el-avatar :size="50" :src="circleUrl" />
      </div>
      <el-dropdown @command="checkTypeOptions">
        <div class="logout">
          <span class="iconfont icon-seetings setting_ico"></span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.header_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  width: 100%;
  height: 96px;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e4e4;
}

.header_info {
  display: flex;
  width: 24%;
  align-items: center;
}

.header_info .block {
  margin: 0 16px;
}

.header_info .setting_ico {
  font-size: 24px;
  cursor: pointer;
}
</style>