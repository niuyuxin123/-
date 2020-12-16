const rootState = function (){
  return {
    // winWidth:280,
    // winHeight:400,
    logged:{},
    menuListTop:[
      {
        label:'聊天',
        icon:'comment',
        router:'comment'
      },
      {
        label:'通讯录',
        icon:'address-card',
        router:'address'
      },
      {
        label:'收藏',
        icon:'cube',
        router:'cube'
      },
      {
        label:'微信文件',
        icon:'folder-open',
        router:'folder'
      },
      {
        label:'看一看',
        icon:'paper-plane',
        router:'paper'
      }
    ],
    menuListBottom:[
      {
        label:'小程序面板',
        icon:'asterisk'
      },
      {
        label:'手机',
        icon:'mobile'
      },
      {
        label:'更多',
        icon:'bars'
      }
    ]
  }
}
const mutations = {
  setLogin(state,payload){
    state.logged = payload
    // state.winHeight=700,
    // state.winWidth=850
  }
}
const actions = {
  changeLogin ({ commit },data) {
    commit('setLogin',data)
    // setLogin(data)
  }
}
export {
  rootState as state,
  mutations,
  actions
}