<template>
  <div>
    <div class="loading" v-show="show">
      <img src="/static/img/loading2.svg">
    </div>
    <div class="desccontent">
      <div class="onebook">
        <div class="bookimg">
          <img :src="bookMsg.img">
        </div>
        <div class="bookdetail">
          <div class="title">
            {{bookMsg.title}}
          </div>
          <div class="detai author">
            作者： {{bookMsg.author}}
          </div>

          <div class="detai looknum">
            {{bookMsg.looknums}} 人在看
          </div>
          <div class="detai likenum">
            {{bookMsg.startsnums}} 人喜欢
          </div>
        </div>
      </div>

      <div class="xuanxiang">
        <button class="xuanbtn" @click="handleClect" v-show="isCollect == 0">加入收藏</button>
        <button class="xuanbtn" v-show="isCollect == 1">已收藏</button>
        <button class="xuanbtn" open-type="share">分享好友</button>
      </div>


      <div class="role"></div>


      <div class="intro w710">
        <div class="title">
          简介
        </div>

        <div class="desc">
          {{bookMsg.desc}}
        </div>
      </div>
      <!--简介-->

      <!--目录-->
      <div class="catalog">
        <div class="catalog-l">
        <span class="show-catalog">
          查看目录
        </span>
          <span class="total">
          共{{titleLength}}章
        </span>
        </div>
        <div class="catalog-r">
          更新于2天前 >
        </div>
      </div>
      <!--目录-->

      <div class="read-book">
        <button @click="handleRead">
          阅读该书籍
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  import { fetch } from '@/utils/axios.js'

  export default {
    data () {
      return {
        show: true,
        bookId: '',
        bookMsg: {},
        titleLength: 0,
        isCollect:''
      }
    },
    methods:{
      getData(){
        this.bookMsg=''
        this.titleLength=''
        fetch.get(`/book/${this.bookId}`).then(res => {
          this.show= false
          this.bookMsg = res.data
          this.titleLength = res.length
          this.isCollect = res.isCollect
          // console.log(this.bookMsg);
          // console.log(this.bookId);
        })
      },
      onShareAppMessage(obj){
          // console.log(obj)
        return {
          title: this.bookMsg.title,
          path: `/pages/articledesc/main?id=${this.bookId}`,
          imageUrl: this.bookMsg.img
        }
      },
      handleRead () {
        wx.navigateTo({
          url: `/pages/list/main?id=${this.bookId}`
        })
      },
      handleClect(){
        fetch.post('/collection',{bookId:this.bookId}).then(res=>{
          if (res.code == 200){
            wx.showToast({
              title: '收藏成功',
              icon: 'succes',
              mask:true
            })
            this.isCollect = 1
          } else {
            wx.showModal({
              title: '提示',
              content: res.msg,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: `/pages/login/main`
                  })
                }
              }
            })
          }
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
    },
  };
</script>

<style scoped src="@/css/articledesc.css">

</style>
