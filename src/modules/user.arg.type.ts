export interface UserReqArgType{
  currentPage:number;
  limit:number;
}
export interface UserCreateType{
  username:string;
  password:string;
  tel:string;
}
export interface UserData{
  id:string;
  username:string;
  nickname:string;
  tel:string;
  address:string;
  avatar:string;
  status:boolean|string; // '0'正常 ,'-1'冻结
  createtime:string
}