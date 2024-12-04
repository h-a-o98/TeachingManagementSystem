export default {
  namespaced:true,
  state:{
    selectIndex:"0"
  },
  mutations:{
    changeSelect(state, index){
       state.selectIndex = index;
    }
  }
}