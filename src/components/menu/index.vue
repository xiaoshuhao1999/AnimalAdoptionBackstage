<template>
  <el-menu :default-active="currentRoute" router class="el-menu-vertical-stage">
    <template v-for="item in MenuList.homeMenuList" :key="item.m_id">
      <el-sub-menu :index="item.path" v-if="item.children && item.children.length !== 0" :key="item.m_id">
        <template #title>
          <span class="iconfont menu_ico" :class="item.icon"></span>
          <span>{{ item.meta }}</span>
        </template>
        <el-menu-item v-for="_item in item.children" :key="_item.m_id" :index="_item.path">{{ _item.meta }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else>
        <span class="iconfont menu_ico" :class="item.icon"></span>
        <span>{{ item.meta }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const _router = router.currentRoute.value.path
const currentRoute = ref(_router);


interface List{
  path:string,
  m_id:number,
  meta:object,
  icon:string,
  children:Array<List>
}

let MenuList = defineProps({
  homeMenuList:{
    type:Array<List>,
    default:[],
  }
})

// 菜单栏展开
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
//  菜单栏关闭
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>
<style lang="">
  
</style>