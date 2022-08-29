<template>
  <div class="user_m">
    <div class="top_g">
      <div style="width: 480px;">
        <el-input v-model="searchInput" placeholder="请输入搜索的内容" style="width: 320px;margin-right: 16px;" />
        <el-button type="primary" >搜索</el-button>
      </div>
      <el-button type="primary" >添加</el-button>
    </div>
    <el-table v-loading="Data.loading" :data="tableData" header-cell-class-name="header-cell" cell-class-name="header-cell" style="width: 100%;height: 80%;overflow-y: auto;">
      <el-table-column fixed prop="id" label="ID" width="120px" />
      <el-table-column prop="username" label="用户名" width="160px" />
      <el-table-column prop="nickname" label="昵称" width="160px" />
      <el-table-column prop="avatar" label="头像" width="80px">
        <template #default="scope">
          <el-avatar shape="square" :size="48" fit="fill" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="tel" label="手机号" width="140px" />
      <el-table-column prop="address" label="地址"  />
      <el-table-column prop="status" label="是否冻结" width="80px">
        <template #default="scope">
          <el-switch v-model="scope.row.status"  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="180px" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="warning" >修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination background layout="prev, pager, next" 
      v-model:current-page="Data.currentPage"
      v-model:page-size="Data.pageSize" :total="total" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';


const searchInput = ref('');
const total = ref(20);
const Data =  reactive({
  loading:false,
  currentPage:1,
  pageSize:2
})
const tableData = [
  {
    id:'x1A516',
    createtime: '2016-05-03 20:08:52',
    username: 'Tom001',
    tel:'15797748987',
    avatar:'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4',
    nickname: 'Tom001',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style>
  .user_m{display: flex;flex-direction: column;align-items: center;align-self: center;justify-content: space-between;padding: 25px;width: 90%;height: 90%;background-color: #ffffff;border-radius: 16px;box-shadow: 0 0 25px #e6e6e6;}
  .top_g{display: flex;justify-content: space-between;width: 100%;}
  .header-cell{text-align: center !important;}
</style>