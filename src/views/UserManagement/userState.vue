<template>
  <div class="user_m">
    <div class="top_g">
      <div style="width: 480px;">
        <el-input v-model="searchInput" placeholder="请输入搜索的内容" style="width: 320px;margin-right: 16px;" />
        <el-button type="primary" @click="searchUsers">搜索</el-button>
      </div>
      <el-button type="primary" @click="openEditPage({})">添加</el-button>
    </div>
    <el-table v-loading="Data.loading" :data="Data.tableData" header-cell-class-name="header-cell" cell-class-name="header-cell" :style="{width: '100%',height: '80%','overflow-y': 'auto'}">
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
      <el-table-column prop="status" label="是否正常" width="80px">
        <template #default="scope">
          <el-switch v-model="scope.row.status"  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" @change="changeSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="180px" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="warning" @click="openEditPage(scope.row)">修改信息</el-button>
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
import { delUserStatus, GetUserListRequest } from '@/http/api';
import type { UserData, UserReqArgType } from '@/modules/user.arg.type';
import { ElMessage } from 'element-plus';
import { onBeforeMount, reactive, ref } from 'vue';
import DialogCreate from '@/components/user/dialog_create.vue';
import { isNull } from '@/modules/type.filter';



const searchInput = ref('');
// 传给子组件的title
let dialogTitle = ref("")
// 弹窗是否显示 默认不显示
let DialogVisible = ref(false);
const Data =  reactive({
  tableData:Array<UserData>(),
  loading:false,
  currentPage:1,
  pageSize:5
})
// 页面总数
let total = ref<number>(1);
// 传递给子页面的参数
let cdata = ref({
  username:'',
  nickname:'',
  password:'',
  tel:'',
  id:'',
  createtime:''
})
// 获取通知数据
function GetUserList(arg?: UserReqArgType,like?:string) {
  GetUserListRequest(arg,like).then(res => {
    Data.loading = false;
    if (res.data.code == 200) {
      total.value = res.data.data.totalCount;
      const _data = res.data.data.limitData;
      const arr:Array<UserData> = [];
      _data.forEach((el: any) => {
        el.status == '0' ? el.status = true : el.status = false;
        arr.push(el)
      });
      Data.tableData = arr;
      return;
    } else {
      ElMessage({ type: 'error', message: res.data.msg, duration: 1500 });
    }
  })
}
// 发送请求修改状态
const changeSwitch = (val: any) => {
  let {id,status} = val;
  if(status == true){
    status = '0';
  }else{
    status = '-1';
  }
  delUserStatus(id,status).then(res=>{
    console.log(res.data);
    
    if(res.data.data.status=='ok'){
      ElMessage({type:'success',message:'修改成功'})
    }else{
      ElMessage({type:'error',message:'修改失败'})
    }
  })
}
// 页面挂在前请求数据
onBeforeMount(() => {
  GetUserList();
})
// 点击修改按钮
const openEditPage = (val?:any)=>{
  DialogVisible.value = true;
  if(isNull(val)){
    dialogTitle.value = '添加用户';
  }else{
    dialogTitle.value = '修改用户';
    cdata.value = JSON.parse(JSON.stringify(val));
  }
}
//  分页功能
const handleCurrentChange = ()=>{
  Data.loading = true;
  const _page = {
    currentPage:Data.currentPage,
    limit:Data.pageSize
  }
  if(searchInput.value==''){
    GetUserList(_page);
  }else{
    GetUserList(_page,searchInput.value);
  } 
}
// 查询功能
const searchUsers = ()=>{
  Data.loading = true;
  const _page = {
    currentPage:1,
    limit:Data.pageSize
  }
  GetUserList(_page,searchInput.value);
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
  GetUserList(_page);
}
// 获取子组件点击取消传递的值 
const CancelCreate = (e:boolean)=>{
  DialogVisible.value = e;
}
</script>
<style>
  .user_m{display: flex;flex-direction: column;align-items: center;align-self: center;justify-content: space-between;padding: 25px;width: 90%;height: 90%;background-color: #ffffff;border-radius: 16px;box-shadow: 0 0 25px #e6e6e6;}
  .top_g{display: flex;justify-content: space-between;width: 100%;}
  .header-cell{text-align: center !important;}
</style>