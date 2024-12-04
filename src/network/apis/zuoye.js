export default{
    // 作业检查列表的请求
    getzycM(){
        return{
            url:"/exam/zycM/"
        }
    },
     // 删除作业列表的请求
     delKhzuoye(meta){
        return{
            method:'DELETE',
            url:`/exam/zycO/${meta}/`
        }
      },
    // 获取添加课程作业的班级名称请求
    getclasses(){
        return{
            url:"/exam/classes/"
        }
    },
    // 获取添加课程作业的学科阶段名称
    getcourseM(){
        return{
            url:"/exam/courseM/"
        }
    },
     // 提交录入作业内容
  postzycM(meta){
    return{
      url:"/exam/zycM/",
      method:'POST',
      data:meta
    }
  },
  putzyjlO(meta){
    // console.log(meta);
    return{
        method:'PUT',
        url:`/exam/zyjlO/${meta.id}/`,
        data:meta
    }
  },
    // 获取课后作业模块的阶段的作业成绩
    getJDScore(meta) {
      return {
        url: `/exam/zy_check/?jieduan_name=${meta.jieduan_name}&className=${meta.className}`,
        method: "GET",
        data: meta
      }
    },
      // 点击编辑进入zuoyelist页面，若zyj为空进行的post请求
  postZyj(meta){
    return {
      url:"/exam/zyjlM/",
      method:"POST",
      data:meta
    }
  },
  getClasses() {
    return {
      url: "/exam/classes/"  //111111111111111
    }
  },
}