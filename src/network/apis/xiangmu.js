export default {
    getxmWanc(meta){
      return{
        url:`/exam/xmCheckO/${meta}/`
      }
    },
    getxmjd(){
        return{
          url:"/exam/xiangmuM/"
        }
      },
      postbjxiangmuM(meta){
        return{
            url:"/exam/bjxiangmuM/",
            method:'POST',
            data:meta
        }
      },
      postxmCheckM(meta){
        // console.log(meta);
        return{
            url:"/exam/xmCheckM/",
            method:'POST',
            data:meta
        }
      },
      postbjCheckM(meta){
        return{
            url:"/exam/bjCheckM/",
            method:'POST',
            data:meta
        }
      },
      // 删除项目列表的请求
      delJCjilu(meta){
        return{
            method:'DELETE',
            url:`/exam/xmCheckO/${meta}/`
        }
      },
      getbjStudent(meta){
        return{
            url:`/exam/bjStudent/${meta}/`
        }
      },
      putjibie(meta){
        return{
            method:'PUT',
            url:`/exam/bjStudent/${meta.id}/`,
            data:meta
        }
      },
      putshouye(meta){
        console.log(meta);
        return{
            method:'PUT',
            url:`/exam/bjCheckO/${meta.id}/`,
            data:meta
        }
      },
      putxiangqing(meta){
        console.log(meta);
        return{
            method:'PUT',
            url:`/exam/bjCheckO/${meta.id}/`,
            data:meta
        }
      },
      putlianxiwm(meta){
        console.log(meta);
        return{
            method:'PUT',
            url:`/exam/bjCheckO/${meta.id}/`,
            data:meta
        }
      },
      // 当bjs数组为空时，进行的post请求，为每个学生添加项目进度
  addStu(meta){
    return {
      url:"/exam/bjStudents/",
      method:"POST",
      data:meta
    }
  },
  // 进入学生个人进度的时候，若bjc为空，则进行post请求
  addBjc(meta){
    return {
      url:"/exam/bjCheckM/",
      method:"POST",
      data:meta
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
    // 项目检查列表的班级名称数据
    getClasses() {
      return {
        url: "/exam/classes/"
      }
    },
  }