export default {
  // 得到题库的内容
  getTiKu(meta){
    return {
      url:"/exam/many/",
      params:{
        page:1,
        xk: meta.xk ? meta.xk:"html"
      }
    }
  },
  // 删除题库的内容
  delTiKu(meta){
    // console.log(meta);
    return{
      method:"DELETE" ,
      url:`/exam/one/${meta}/`
    }
  },
  // 提交录入题库内容
  postTiKu(meta){
    return{
      url:"/exam/many/",
      method:'POST',
      data:meta
    }
  },
  getChengJi1(){
    return{
      url:"/exam/tms/",
    }
  },
  getChengJi(){
    return{
      url:"/exam/classes/?page=1",
    }
  },
  postChengji(meta){
    console.log(meta);
    return{
      url:`/exam/zk/${meta.t_id}/`,
      method:'PUT',
      data:meta
    }
  },
  postbkChengji(meta){
    console.log(meta);
    return{
      url:`/exam/zk/${meta.t_id}/`,
      method:'PUT',
      data:meta
    }
  },
  getBanJicj(){
    return{
      url:"/exam/classes/?page=1"
    }
  },
  getxmJiancha(){
    return{
      url:"/exam/bjxiangmuM/"
    }
  },
  getxmWanc(meta){
    console.log(meta);
    return{
      url:`/exam/xmCheckO/${meta}/`
    }
  }

}