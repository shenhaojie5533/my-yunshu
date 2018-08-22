<template>
  <div>
    <div class="loading" v-show="show">
      <img src="/static/img/loading2.svg">
    </div>

<div class="readcontent">
  <div class="noread"></div>

  <div class="afterread">
    <div class="list" v-for="(item,index) in  readlist" :key="index">
      <div class="bookimg">
        <img :src="item.book.img">
      </div>
      <div class="bookdetail">
        <div class="title">
          {{item.book.title}}
        </div>
        <div class="jindu">
          <div class="jindutext">书籍{{item.title.index + 1}}/{{item.title.total}}章节</div>
          <div class="tiao">
            <progress
            class="progress"
            :percent="item.percent"
            :active="true"
            stroke-width="4"
            activeColor="#409eff"
            backgroundColor=" #999"
            ></progress>
            <span>已看{{item.percent}}%</span>
          </div>
          <div class="time">
            <div class="lastname">上次查看：{{item.title.title}}</div>
            <div class="istime"><gettime :time="item.updatedTime"></gettime></div>
          </div>
        </div>

        <div class="foot">
          <button @click="handleWilldo(item.title)">继续阅读</button>
          <button @click="jumList( item.book)">查看文档</button>
        </div>
      </div>
    </div>

    <div class="nomore">------------------  没有更多了  ------------------</div>

  </div>
</div>
</div>
</template>

<script>
  import { fetch } from '@/utils/axios.js'
  import gettime from '@/components/gettime'
  export default {
    components:{ gettime },
    data(){
      return{
        enablePullDownRefresh: true,
        readlist:[],
        show:true
      }
    },
    methods:{
      getData(){
        fetch.get('/readList').then(res => {
          this.show=false
         if(res.code == 200){
           this. readlist=res.data.map(item =>{
             item.percent = Math.ceil((item.title.index + 1)/item.title.total*100)
             return item
           })
         }else{
           wx.showModal({
             title: '提示',
             content: res.msg,
             success: function(res) {
               if (res.confirm) {
                 wx.navigateTo({
                   url: `/pages/login/main`
                 })
               } else if (res.cancel) {

               }
             }
           })
         }
        })
      },
      handleWilldo(item){
        wx.navigateTo({
          url: `/pages/articletext/main?id=`+ item._id + '&booklistId='+ item.bookId
        })
      },
      onPullDownRefresh(){
        var that = this;

        wx.stopPullDownRefresh()
      },
      jumList(item){
        wx.navigateTo({
          url: `/pages/articledesc/main?id=`+ item._id
        })
      },
    },
    onLoad(){
      this.getData()
    }
  };
</script>

<style scoped src="@/css/readbook.css">

</style>
