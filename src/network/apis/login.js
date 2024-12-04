export default{
    postlogin(meta){
        return{
            url:"/exam/users/",
            method:'POST',
            data:meta
          }
    }
}