<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" width="30%" center :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-form :model="inputValue" ref="ruleFormRef" :rules="rules">
      <el-form-item label="ID" label-width="120px" v-if="dialogTitle=='修改用户'">
        <el-input v-model="inputValue.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="Username" label-width="120px" prop="username">
        <el-input v-model="inputValue.username" :disabled="dialogTitle=='修改用户'?true:false" />
      </el-form-item>
      <el-form-item label="Nickname" label-width="120px" prop="nickname" v-if="dialogTitle=='修改用户'">
        <el-input v-model="inputValue.nickname" />
      </el-form-item>
      <el-form-item label="Password" label-width="120px" prop="password" v-if="dialogTitle!=='修改用户'">
        <el-input v-model="inputValue.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="Tel" label-width="120px" prop="tel" v-if="dialogTitle!=='修改用户'">
        <el-input v-model="inputValue.tel" />
      </el-form-item>
      <el-form-item label="Createtime" label-width="120px" v-if="dialogTitle=='修改用户'">
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
import { UpdateUser, CreateUser } from '@/http/api';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { reactive, ref, toRefs, watch } from 'vue';
const ruleFormRef = ref<FormInstance>(); // 获取表单实例

interface inputType {
  username:string,
  nickname:string,
  password:string,
  tel:string,
  id:string,
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
  nickname:'',
  username:'',
  password:'',
  tel:'',
  id:'',
  createtime:''
})
// 验证用户昵称
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('输入内容不能为空'));
  }
  const reg =  /^[0-9a-zA-Z]{6,18}/;
  if (!reg.test(value)) {
    return callback(new Error('输入内容不符合规则'));
  }
  callback();
}
// 验证用户昵称
const validateNickname = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('输入内容不能为空'));
  }
  const reg =  /^[0-9a-zA-Z\u4E00-\u9FA5\_]{4,24}/;
  if (!reg.test(value)) {
    return callback(new Error('输入内容不符合规则'));
  }
  callback();
}
// 验证手机号
const validateTel = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('输入内容不能为空'));
  }
  const reg =  /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
  if (!reg.test(value)) {
    return callback(new Error('输入内容不符合规则'));
  }
  callback();
}
// 验证密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('输入内容不能为空'));
  }
  const reg =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,16}/;
  if (!reg.test(value)) {
    return callback(new Error('输入内容不符合规则'));
  }
  callback();
}

// 定义表单验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator:validateUsername, trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { validator:validateNickname, trigger: 'blur' },
  ],
  tel: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator:validateTel, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator:validatePass, trigger: 'blur' },
  ],
})
const oldData = JSON.parse(JSON.stringify(data.dialogData));
// 监听传入的数据
watch(()=> data.dialogData,()=>{
  if(dialogTitle.value=='修改用户') {
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
      console.log(oldData,inputValue.value);
        // 说明表单做出了修改 然后进行类型判断 分别进行请求的发送
        if(dialogTitle.value=='添加用户'){
          // 表单验证成功 则判断是否有没有做出修改
          if(oldData.username==inputValue.value.username&&oldData.password==inputValue.value.password&&oldData.tel==inputValue.value.tel) {
            ElMessage({type:'warning',message:"未作出修改",duration:1500});
            return emits('onCancelData',false);
          }else{
            const arg = {
              username:inputValue.value.username,
              password:inputValue.value.password,
              tel:inputValue.value.tel,
            }
            CreateUser(arg).then(res=>{
              console.log(res);
              if(res.data.code==200) return ElMessage({type:'success',message:res.data.msg,duration:1500});
            })
            emits('onCreateData',false);
          }
        }else{
          // 表单验证成功 则判断是否有没有做出修改
          if(oldData.nickname==inputValue.value.nickname) {
            ElMessage({type:'warning',message:"未作出修改",duration:1500});
            return emits('onCancelData',false);
          }else{
            UpdateUser(inputValue.value.id,inputValue.value.nickname).then(res=>{
              if(res.data.code==200) return ElMessage({type:'success',message:res.data.msg,duration:1500});
            })
            emits('onCreateData',false);
          }
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