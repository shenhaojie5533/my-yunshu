<template>
<div>
  <div class="mycontent">
    <div class="bluebg">
      <div class="usermsg" @click="handleJum"  v-if="shows">
        <div class="icon"><img src="/static/img/moren.jpg"></div>
        <div class="nametext">
          <div class="name">未登录</div>
          <div class="logintext">立即登录，开启您的云档之旅</div>
        </div>
      </div>

      <div class="usermsg" v-else="shows">
        <div class="icon"><img :src="value.avatarUrl"></div>
        <div class="nametext">
          <div class="name">{{value.nickName}}</div>
          <div class="logintext">这家伙很懒，什么也没留下</div>
        </div>
      </div>

      <div class="readinf">
        <div class="myread" @click="handleclected">
          <div class="clnum">{{length}}</div>
          <div class="clnum">收藏</div>
        </div>
        <div class="myread">
          <div class="clnum">0</div>
          <div class="clnum">关注</div>
        </div>
      </div>
    </div>

    <div class="wtbg">
      <div class="shuicon">
        <span class="iconfont icon-shu1"></span>
        <div class="shuoming">云书免费共享平台</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { fetch } from '@/utils/axios.js'
  export default {
    data(){
      return{
        shows:true,
        value:{},
        length:0
      }
    },
    methods:{
      handleJum () {
        wx.navigateTo({
          url: `/pages/login/main`
        })
      },
      handleclected(){
        wx.navigateTo({
          url: `/pages/clectbook/main`
        })
      },
      getNum(){
        fetch.get(`/collection`).then(res=>{
         if (res.data){
           this.length=res.data.length
         } else {
           this.length=0
         }
        })
      }
    },
    onShow(){
      this.getNum();
      var value = wx.getStorageSync('key')
      if (value) {
        this.value=value
       this.shows=false
      }
    }
  };
</script>

<style scoped src="@/css/my.css">

</style>
