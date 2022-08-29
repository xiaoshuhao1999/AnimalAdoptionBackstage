<template>
  <el-dialog :model-value="dialogVisible" title="修改通知信息" width="30%" center :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-form :model="dialogData">
      <el-form-item label="ID" label-width="80px" >
        <el-input v-model="dialogData.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="Title" label-width="80px">
        <el-input v-model="dialogData.title" />
      </el-form-item>
      <el-form-item label="Content" label-width="80px">
        <el-input v-model="dialogData.content" />
      </el-form-item>
      <el-form-item label="Createtime" label-width="80px">
        <el-input v-model="dialogData.createtime" :disabled="true" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelInformData">取消</el-button>
        <el-button type="primary" @click="saveInformData">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import type { NoticeData } from '@/modules/notice.arg.type';
import { toRefs } from 'vue';
// 定义props数据类型
interface propsType{
  dialogVisible:boolean,
  dialogData:NoticeData,
}


const data = defineProps<propsType>();
const {dialogVisible,dialogData} = toRefs(data);
// 向父组件发送事件
const emits = defineEmits(["onSaveData","onCancelData"]);

// 点击保存按钮
const saveInformData = ()=>{
}
// 点击取消按钮
const cancelInformData = ()=>{
  emits('onCancelData',false);
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
