import type LoginData from '@/modules/login.arg.type';
import type { NoticeReqArgType } from '@/modules/notice.arg.type';
import type { UserCreateType, UserReqArgType } from '@/modules/user.arg.type';
import type { AxiosPromise } from 'axios';
import http from '../utils/request';


// 管理员登录请求
export function AdminLoginRequest(loginData:LoginData):AxiosPromise{
  const {account,password} = loginData;
  // console.log(account,password);
  return http.request({
    url:'/login',
    method:'post',
    headers:{
      "Content-Type":"application/json"
    },
    data:{
      account,
      password
    }
  })
}

// 请求菜单页面
export function GetMenuListRequest(){
  const token:any = localStorage.getItem('token');
  return http.request({
    url:'/menu_list',
    method:'get',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 请求系统通知数据
export function GetNoticeListRequest(arg?:NoticeReqArgType,Like?:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  let currentPage:number;
  let limit:number;
  let like = Like ? Like : 'all';
  if(arg){
    currentPage = arg.currentPage;
    limit = arg.limit 
  }else{
    currentPage = 1;
    limit = 5;
  }
  return http.request({
    url:`/notice_list/${currentPage}/${limit}/${like}`,
    method:'get',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 修改通知数据的状态
export function ChangeNoticeStatus(id:string|number,status:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/notice_list/status/${id}/${status}`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 删除通知数据
export function delNoticeStatus(id:string|number):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/notice_list/del/${id}`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 新增通知数据
export function CreateNotice(title:string,content:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/notice_list/create`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      title,
      content
    }
  })
}

// 修改通知数据
export function ChangeNotice(id:string|number,title:string,content:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/notice_list/edit`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      id,
      title,
      content
    }
  })
}

// 请求用户数据
export function GetUserListRequest(arg?:UserReqArgType,Like?:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  let currentPage:number;
  let limit:number;
  let like = Like ? Like : 'all';
  if(arg){
    currentPage = arg.currentPage;
    limit = arg.limit 
  }else{
    currentPage = 1;
    limit = 5;
  }
  return http.request({
    url:`/user_list/${currentPage}/${limit}/${like}`,
    method:'get',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 修改用户状态
export function delUserStatus(id:string|number,status:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/user_list/status/${id}/${status}`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    }
  })
}

// 添加用户
export function CreateUser(arg:UserCreateType):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/user_list/create`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      ...arg
    }
  })
}

// 更新用户
export function UpdateUser(id:string,nickname:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/user_list/update`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      id,
      nickname
    }
  })
}

// 修改用户密码
export function UpdateUserPassword(id:string,password:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/user_list/edit/password`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      id,
      password
    }
  })
}

// 修改用户头像
export function UpdateUserAvatar(id:string,password:string):AxiosPromise{
  const token:any = localStorage.getItem('token');
  return http.request({
    url:`/user_list/edit/avatar`,
    method:'post',
    headers:{
      "token":token,
      "Content-Type":"application/json"
    },
    data:{
      id,
      password
    }
  })
}