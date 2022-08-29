<template>
  <div class="loginPage">
    <div class="left">
      <img src="@/assets/images/Group605.png" alt="" srcset="">
    </div>
    <div class="right">
      <h2>BACKSTAGE</h2>
      <div class="l_form">
        <i>Sign In ——</i>
        <el-form label-position="top" ref="ruleFormRef" :rules="rules" label-width="100px" :model="inputValues" style="max-width: 460px;width: 460px;">
          <el-form-item label="Account" prop="account">
            <el-input v-model="inputValues.account" placeholder="Please input your account" clearable />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="inputValues.password" placeholder="Please input your password" show-password />
          </el-form-item>
        </el-form>
        <div class="login_btn" @click="loginReques(ruleFormRef)">Sign In</div>
      </div>
      <i>如果忘记密码,请联系管理员</i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AdminLoginRequest } from '@/http/api';
import { ElMessage, type FormInstance } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();



const ruleFormRef = ref<FormInstance>(); // 获取表单dom 
// 监听输入框数据
const inputValues = reactive({ account: '', password: '' });
//  表单验证规则
const rules = reactive({
  account:[
    { required: true, message: 'Please input your account', trigger: 'blur' },
    { min: 5, max: 18, message: 'Length should be 5 to 18', trigger: 'blur' },
  ],
  password:[
    { required: true, message: 'Please input your password', trigger: 'blur' },
    { min: 5, max: 18, message: 'Length should be 5 to 18', trigger: 'blur' },
  ]
});
// 点击登录时 判断表单校验是否通过  需传入一个form实例
const loginReques = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      AdminLoginRequest(inputValues).then(res=>{
        const token = res.data.data.token
        if(res.data.code==200){
          // 判断返回code是否为200， 如果是则进行下一步操作
          localStorage.setItem('token',token); // 将token存入本地
          delete res.data.data.token;
          localStorage.setItem('info',JSON.stringify(res.data.data));
          const path = route.query.redirect;
          // console.log(path);
          if(path==undefined){
            router.push('/dashboard')
          }else{
            router.push(`${path}`)
          }
          return;
        }
        // 否则弹出提示信息
        return ElMessage({message:res.data.msg,type:'error',duration:1500})
      }).catch(err=>{
        console.log(err);
      })
    } else {
      ElMessage.error('登录失败,请稍后再试.')
    }
  })
}
</script>
<style scoped>
.loginPage {display: flex;height: 100vh;min-width: 1366px;min-height: 768px;background-color: var(--vt-c-white-soft);}
.loginPage .left {display: flex;align-items: center;justify-content: center;width: 60%;border-top-right-radius: 100px;border-bottom-right-radius: 100px;background-color: var(--login-bg);user-select: none;}
.loginPage .left img {width: 450px;cursor: pointer;}
.loginPage .right{display: flex;flex: 1;align-items: center;justify-content: space-between;flex-direction: column;}
.loginPage .right h2{font-size: 27px;color: var(--login-title-t);font-family: 'DB';margin-top: 68px;}
.loginPage .right>i{font-size: 14px;margin-bottom: 12px;color: var(--login-title-t);}
.l_form{display: flex;flex-direction: column;flex: 1;justify-content: center;}
.l_form>i{margin: 24px 0;color: var(--login-title-t);font-size: 30px;}
.login_btn{width: 100%;height: 42px;line-height: 42px;color: var(--vt-c-white);cursor: pointer; background-color: var(--login-bg);border-radius: 6px;text-align: center;margin: 24px 0;}
</style>