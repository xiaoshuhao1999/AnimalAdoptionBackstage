import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

export const useMenuList = defineStore({
  id: 'menu_list',
  state: () => ({
    currentRouter:'',
    menu_list: [],
    route_list:[],
  }),
  getters: {
    getMenuList_store: (state) => state.menu_list
  },
  actions:{
  }
})