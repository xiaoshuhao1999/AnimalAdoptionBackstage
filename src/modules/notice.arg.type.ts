export interface NoticeReqArgType{
  currentPage:number;
  limit:number;
}

export interface NoticeData{
  id:number;
  title:string;
  content:string;
  createtime:string;
  status:boolean|string; // '0'正常 ,'-1'删除
  show:'0'|'1'; // '0'不显示,'1'显示
}
