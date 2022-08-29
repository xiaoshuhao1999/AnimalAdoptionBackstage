<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" width="30%" center :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-form :model="inputValue" ref="ruleFormRef" :rules="rules">
     <el-form-item label="ID" label-width="80px" v-if="dialogTitle=='修改通知'">
        <el-input v-model="inputValue.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="Title" label-width="80px" prop="title">
        <el-input v-model="inputValue.title" />
      </el-form-item>
      <el-form-item label="Content" label-width="80px" prop="content">
        <el-input v-model="inputValue.content" />
      </el-form-item>
      <el-form-item label="Createtime" label-width="80px" v-if="dialogTitle=='修改通知'">
        <el-input v-model="inputValue.createtime" :disabled="true" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelInformData">取消</el-button>
        <el-button type="primary" @click="saveInformData(ruleFormRef)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ChangeNotice, CreateNotice } from '@/http/api';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { reactive, ref, toRefs, watch } from 'vue';
const ruleFormRef = ref<FormInstance>(); // 获取表单实例

interface inputType {
  title:string,
  content:string,
  id:number,
  createtime:string
}

// 定义props数据类型
interface propsType{
  dialogVisible:boolean,
  dialogTitle:string,
  dialogData:inputType
}
const data = defineProps<propsType>();
const {dialogVisible,dialogTitle} = toRefs(data);
// 输入框的值
let inputValue = ref({
  title:'',
  content:'',
  id:-1,
  createtime:''
})

// 定义表单验证规则
const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入通知标题', trigger: 'blur' },
    { min: 2, max: 42, message: 'Length should be 2 to 42', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入通知内容', trigger: 'blur' },
    { min: 2, max: 255, message: '输入内容不符合规则', trigger: 'blur' },
  ],
})
const oldData = JSON.parse(JSON.stringify(data.dialogData));
// 监听传入的数据
watch(()=> data.dialogData,()=>{
  if(dialogTitle.value=='修改通知') {
    inputValue.value = data.dialogData
  }
  
},{deep:true,immediate:true})

// 向父组件发送事件
const emits = defineEmits(["onCreateData","onCancelData"]);

// 点击保存按钮
const saveInformData = async(formEl: FormInstance | undefined)=>{
  // 验证表单规则
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(oldData.content==inputValue.value.content);
      // 表单验证成功 则判断是否有没有做出修改
      if(oldData.content==inputValue.value.content&&oldData.title==inputValue.value.title) {
        ElMessage({type:'warning',message:"未作出修改",duration:1500});
        return emits('onCancelData',false);
      }else{
        // 说明表单做出了修改 然后进行类型判断 分别进行请求的发送
        if(dialogTitle.value=='添加通知'){
          CreateNotice(inputValue.value.title,inputValue.value.content).then(res=>{
            if(res.data.code==200) return ElMessage({type:'success',message:res.data.msg,duration:1500});
          })
        }else{
          ChangeNotice(inputValue.value.id,inputValue.value.title,inputValue.value.content).then(res=>{
            if(res.data.code==200) return ElMessage({type:'success',message:res.data.msg,duration:1500});
          })
        }
        emits('onCreateData',false);
      }
    } else {
      ElMessage({type:'error',message:"格式错误",duration:1500})
    }
  })
}
// 点击取消按钮
const cancelInformData = ()=>{
  emits('onCancelData',false);
}
</script>
<style lang="">
  
</style>