<template>
    <div class="logcontent">
      <div class="shuicon">
        <span class="iconfont icon-shu1"></span>
        <div class="shuoming">云书免费共享平台</div>
      </div>
      <div class="logbtn">
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
          授权登录
        </button>
      </div>
    </div>
</template>

<script>
  import { login,fetch } from '@/utils/axios.js'
  export default {
    data(){
      return{
      }
    },
    methods:{
      bindGetUserInfo(e){
        console.log(e);
        if (e.mp.detail.errMsg ==='getUserInfo:ok'){
          wx.setStorageSync('key', e.mp.detail.userInfo)
          if (!wx.getStorageSync('token')) {
            login()
          }
        }else {
          wx.showToast({
            title: '授权失败，无法登陆',
            icon: 'none'
          })
        }

      }
    }
  };
</script>

<style scoped src="@/css/login.css">

</style>
