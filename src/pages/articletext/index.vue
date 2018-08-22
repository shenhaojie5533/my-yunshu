<template>
<div>
  <div class="loading" v-show="show">
    <img src="/static/img/loading2.svg">
  </div>
  <div class="textcontent">
    <div class="text" :style="{fontSize:fontSize + 'rpx'}">
      <div class="title">{{articletext.title}}</div>
      <wemark :md="content" link :highlight="true" type="rich-text"></wemark>
    </div>

    <div class="showlist" v-show="isShowMask" @click="cloShow"></div>
      <scroll-view class="textlist" :scroll-y="true" :style="{transform:'translate3d('+trans+',0,0)'}">
        <div v-for="(item, index) in titles"
             :style="item._id == listId?'background:#ccc':''"
             :key="index"
             class="littlelist"
             @click="newText(item._id)">
          {{item.title}}
        </div>
      </scroll-view>


    <div class="tabbar">
      <div class="list" @click="handleLast">
        <span class="iconfont icon-shangyiye-copy-copy"></span>
      </div>
      <div class="list" @click="handleShow">
        <span class="iconfont icon-liebiao"></span>
      </div>
      <div class="list" @click="handleBig">
        <span class="iconfont icon-ziti"></span>
      </div>
      <div class="list" @click="handleLittle">
        <span class="iconfont icon-ziti-"></span>
      </div>
      <div class="list" @click="handleNext">
        <span class="iconfont icon-xiayiye"></span>
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
        isShowMask:false,
        titles:[],
        articletext:{},
        listId:'',
        fontSize:40,
        content:'',
        index: 0,
        trans:'-600rpx',
        show:'true'
      }
    },
    methods:{
       getData(){
         this.articletext=''
         this.content=''
        fetch.get(`/article/${this.listId}`).then(res => {
          // console.log(res.data);
          this.show=false
          this.articletext= res.data
          this.content = res.data.article.content
        })
      },
      newText(val){
        this.show=true
        this.listId=val
        this.isShowMask=false
        this.trans='-600rpx'
        this.getData()
      },
      getlistData(){
        fetch.get(`/titles/${this.booklistId}`).then(res => {
          // console.log(res.data);
          this.titles = res.data
          this.titles.forEach(item=>{
            if (item._id ===this.listId) {
              this.index=item.index
            }
          })
        })
      },
      handleShow(){
        this.isShowMask= true
        this.trans=0

      },
      cloShow(){
        this.isShowMask= false
        this.trans='-600rpx'
      },
      handleBig(){
        if(this.fontSize >= 120){
          wx.showModal({
            title: '提示',
            content: '已缩放到最大',
          })
        }else {
          this.fontSize += 4
        }
      },
      handleLittle(){
        if(this.fontSize <= 24){
          wx.showModal({
            title: '提示',
            content: '已缩放到最小',
          })
        }else {
          this.fontSize -= 4
        }
      },
      handleLast(){
        if (this.index===0) {
          wx.showToast({title: '已经是第一章'})
        }else {
          this.show=true
         this.index=this.index -1
          this.listId=this.titles[this.index]._id
          this.getData()
        }
      },
      handleNext(){
        if (this.index >= this.titles.length -1) {
          wx.showToast({title: '已经是最后一章了'})
        }else {
          this.show=true
          this.index=this.index +1
          this.listId=this.titles[this.index]._id
          this.getData()
        }
      }
    },
    onLoad (options) {
      // console.log(options)
      this.listId = options.id
      this.booklistId = options.booklistId
      this.getData()
      this.getlistData()
    },
  };
</script>

<style scoped src="@/css/articletext.css">

</style>
