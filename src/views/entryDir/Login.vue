<template>
  <div class="we-chat-login">
    <div class="we-chat-login__headers">
      <span class="we-chat-login__title">微信</span>
      <div class="we-chat-login__menus">
        <ul>
          <li>
            <font-awesome-icon icon="cog" class="icons" />
          </li>
          <li @click="handleSelect">
            <font-awesome-icon icon="times" class="icons" />
          </li>
        </ul>
      </div>
    </div>
    <div class="we-chat-login__code">
      <div id="qrcode" ref="codes">

      </div>
    </div>
    <el-button @click="login" style="margin-top:50px">登录</el-button>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {

    }
  },
  created() {
    // this.createCode()
  },
  mounted() {
     this.createCode()
  },
  methods:{
    login(){
      var user = {
        nickName: '薰衣草',
        faces: 'head.jpg',
        logined:true
      }
      this.$store.dispatch('changeLogin',user)
      this.$electron.ipcRenderer.send('login',this.$store.state.logged)
      this.$router.push('/home')
    },
    createCode(){
      var qrcode = new QRCode(this.$refs.codes, {
            text: '登录', // 需要转换为二维码的内容
            width: 185,
            height: 185,
            colorDark: '#000000',
            colorLight: '#ffffff',
            // correctLevel: QRCode.CorrectLevel.H
      })
      console.log(qrcode)
    },
    handleSelect () {
      this.$electron.ipcRenderer.send('window-close')
    }
  }
}
</script>

<style lang="scss">
  @import '@/theme/theme-default.scss';
  @include b(login){
    width: 100%;
    height: 100%;
    text-align: center;
    background: $--color-login;
    color:  $--color-text-min;
    // text-align: center;
    @include e(headers){
      width: 100%;
      height: 25px;
      font-size: 12px;
      -webkit-app-region: drag;
      @include e(title){
        float: left;
        line-height: 25px;
        padding-left: 10px;
      }
      @include e(menus){
        float: right;
        width: 60px;
        height: 25px;
        line-height: 25px;
        -webkit-app-region: no-drag;
        ul{
          list-style: none;
          float: left;
          margin: 0;
          padding: 0;
        }
        li{
          width: 30px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          float: left;
          color:$--color-text-min;
          &:hover{
            background: $--color-list;
            color: rgba(51, 51, 51, 0.8);
          }
          .icons{
            width: 10px;
            height: 10px;
          }
        }
      }
    }
    @include e(code){
      width:100%;
      height:185px;
      margin-top: 50px;
      // vertical-align: middle;
      position: relative;
      #qrcode{
        position: absolute;
        width: 185px;
        height: 185px;
        top: 50%;
        left: 50%;
        margin-left: -92px;
        margin-top: -92px;
      }
    }
  }
</style>