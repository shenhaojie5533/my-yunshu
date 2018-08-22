<template>
  <div>
    <div class="loading" v-show="show">
      <img src="/static/img/loading2.svg">
    </div>
<div class="container">
    <div class="swiperbox">
    <swiper
      :circular="true"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      indicator-active-color="#fff">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <a v-if="item.book" :href="'/pages/articledesc/main?id='+ item.book._id">
            <img :src="item.img">
          </a>
        </swiper-item>
      </block>
    </swiper>
  </div>

  <div class="content">
    <div class="alllist" v-for="(item,index) in articles" :key="index">
      <div class="classfy">
        <div class="listname">
          {{item.title}}
        </div>
        <div class="more" @click="handleMore(item)">
          更多>>
        </div>
      </div>


      <a :href="'/pages/articledesc/main?id=' + content._id"  class="list" v-for="(content,ind) in item.books" :key="ind">
        <div class="bookimg">
          <img :src="content.img">
        </div>
        <div class="bookdetail">
          <div class="title">
            {{content.title}}
          </div>
          <div class="text">
            {{content.desc}}
          </div>

          <div class="foot">
            <div class="author">
              <span>{{content.author}}</span>
            </div>
            <div class="looknum">
              <span>两天前</span>
              <span>  {{item.title}}  {{content.looknums}}人在看</span>
            </div>
          </div>
        </div>
      </a>

    </div>

  </div>
</div>
  </div>
</template>

<script>
import { fetch } from '@/utils/axios.js'
export default {
   data () {
    return {
      show:true,
      imgUrls: [],
      articles:[],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500
    }
  },
  methods:{
    getSwiper(){
      fetch.get('/swiper').then(data => {
        this.imgUrls = data.data
        // console.log(data.data);
      })
    },
    getDetails(){
      this.articles=''
      fetch.get('/category/books').then(res => {
        this.show=false
        // this.show=false
        this.articles=res.data
        // console.log(res.data);
      })
    },
    handleMore(val){
      wx.navigateTo({
        url: `/pages/classify/main?id=${val._id}`
      })
    }
  },
  created(){
    this.getSwiper()
    this.getDetails()
  },
  onPullDownRefresh(){
    wx.setBackgroundTextStyle({
      textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
    })
    let that = this
    if(that.articles){
      that.getSwiper()
      that.getDetails()
      wx.stopPullDownRefresh()
    }else{
      wx.showToast({
        title: '失败',
        icon:'cancel',
        duration: 2000
      })
    }
  },
  onReachBottom(){
  }

}
</script>

<style scoped src="@/css/index.css">

</style>
