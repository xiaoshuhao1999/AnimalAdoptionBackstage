// 判断数据是否为空
export const isNull = (val: any)=>{
  if(!val) return true;
  if(JSON.stringify(val)==='{}') return true;
  if(JSON.stringify(val)==='[]') return true;
}