<template>
  <div class="informs">
    <div class="top_g">
      <div style="width: 480px;">
        <el-input v-model="searchInput" placeholder="请输入搜索的内容" style="width: 320px;margin-right: 16px;" />
        <el-button type="primary" @click="searchInform">搜索</el-button>
      </div>
      <el-button type="primary" @click="openEditPage({})">添加</el-button>
    </div>
    <el-table v-loading="Data.loading" :data="Data.tableData" :style="{width: '100%',height: '80%','overflow-y': 'auto'}">
      <el-table-column fixed prop="id" label="ID" />
      <el-table-column prop="title" label="通知标题" />
      <el-table-column prop="content" label="通知内容" />
      <el-table-column prop="createtime" label="创建时间" />
      <el-table-column prop="status" label="通知状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" @change="changeSwitch(scope.row)" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="warning" @click="openEditPage(scope.row)">修改</el-button>
          <el-button type="danger" @click="openDelMessage(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination background layout="prev, pager, next" 
      v-model:current-page="Data.currentPage" 
      @current-change="handleCurrentChange"
      v-model:page-size="Data.pageSize" :total="total" />
    </div>
    <DialogCreate v-if="DialogVisible" :dialogTitle="dialogTitle" :dialogData="cdata" :dialogVisible="DialogVisible" @onCreateData="CreateData" @onCancelData="CancelCreate"></DialogCreate>
  </div>
</template>
<script lang="ts" setup>
import { GetNoticeListRequest,ChangeNoticeStatus, delNoticeStatus } from '@/http/api';
import type { NoticeReqArgType,NoticeData } from '@/modules/notice.arg.type';

import { isNull } from '@/modules/type.filter';

import { ElMessage, ElMessageBox, type Action } from 'element-plus';
import { onBeforeMount, reactive, ref } from 'vue';

import DialogCreate from '@/components/informs/dialog_create.vue';


// 页面数据
let Data = reactive({
  tableData:Array<NoticeData>(),
  pageSize:5,
  currentPage:1,
  loading:true
});
// 页面总数
let total = ref<number>(1);
// 传递给子页面的参数
let cdata = ref({
  title:'',
  content:'',
  id:-1,
  createtime:''
})
// 传给子组件的title
let dialogTitle = ref("")
// 弹窗是否显示 默认不显示
let DialogVisible = ref(false);
// 搜索框内容
const searchInput = ref('');

// 获取通知数据
function GetNoticeList(arg?: NoticeReqArgType,like?:string) {
  GetNoticeListRequest(arg,like).then(res => {
    Data.loading = false;
    if (res.data.code == 200) {
      total.value = res.data.data.totalCount;
      const _data = res.data.data.limitData;
      const arr:Array<NoticeData> = [];
      _data.forEach((el: any) => {
        el.status == '0' ? el.status = true : el.status = false;
        el.show == '0' ? el.show = true : el.show = false;
        arr.push(el)
      });
      Data.tableData = arr;
      return;
    } else {
      ElMessage({ type: 'error', message: res.data.msg, duration: 1500 });
    }
  })
}
// 页面挂在前请求数据
onBeforeMount(() => {
  GetNoticeList();
})

//  分页功能
const handleCurrentChange = ()=>{
  Data.loading = true;
  const _page = {
    currentPage:Data.currentPage,
    limit:Data.pageSize
  }
  if(searchInput.value==''){
    GetNoticeList(_page);
  }else{
    GetNoticeList(_page,searchInput.value);
  } 
}
// 查询功能
const searchInform = ()=>{
  Data.loading = true;
  const _page = {
    currentPage:1,
    limit:Data.pageSize
  }
  GetNoticeList(_page,searchInput.value);
}
// 发送请求修改状态
const changeSwitch = (val: NoticeData) => {
  let {id,status} = val;
  if(status == true){
    status = '0';
  }else{
    status = '-1';
  }
  ChangeNoticeStatus(id,status).then(res=>{
    if(res.data.data.status=='ok'){
      ElMessage({type:'success',message:'修改成功'})
    }else{
      ElMessage({type:'error',message:'修改失败'})
    }
  })
}
// 修改通知参数
const openEditPage = (val?:any)=>{
  DialogVisible.value = true;
  if(isNull(val)){
    dialogTitle.value = '添加通知';
  }else{
    dialogTitle.value = '修改通知';
    cdata.value = JSON.parse(JSON.stringify(val));
  }
}
// 点击删除
const openDelMessage = (val:number)=>{
  ElMessageBox.confirm(
    '是否删除该条通知?',
    '提示',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    }
  )
    .then(() => {
      delNoticeStatus(val).then(res=>{
        ElMessage({type:'success',message:res.data.msg,duration:1500});
        handleCurrentChange()
      })
    })
    .catch(() => {
    })
}
// 获取子组件点击保存传递来的值
const CreateData = (e:boolean)=>{
  DialogVisible.value = e;
  Data.loading = true;
  // 用户点击保存之后将当前页面再次刷新一次
  const _page = {
    currentPage:Data.currentPage,
    limit:Data.pageSize
  }
  GetNoticeList(_page);
}
// 获取子组件点击取消传递的值 
const CancelCreate = (e:boolean)=>{
  DialogVisible.value = e;
}
</script>
<style>
.informs {display: flex;flex-direction: column;align-items: center;justify-content: space-between;padding: 25px;width: 90%;height: 90%;background-color: #ffffff;border-radius: 16px;box-shadow: 0 0 25px #e6e6e6;}
.top_g{display: flex;justify-content: space-between;width: 100%;}
</style>