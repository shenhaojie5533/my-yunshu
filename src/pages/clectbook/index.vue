<template>
  <div class="clectcontent">
    <div class="loading" v-show="show">
      <img src="/static/img/loading2.svg">
    </div>
    <div class="allbooks">
      <div class="clectlist">
        <div class="onebook"
             v-for="(item,index) in clected"
             :key="index"
             @touchstart="mytouchstart"
             @touchend="mytouchend"
             @tap="editAddress(item.book._id)"
        >
          <img :src="item.book.img">
          <div class="booktitle">{{item.book.title}}</div>
          <icon type="cancel" size="30" color="red" v-show="showCancel" @click.stop="handleDel(item.book._id)"/>
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
        showCancel:false,
        clected:[],
        pn:1,
        show:true,
        touch_start:0,
        touch_end:0,
        enablePullDownRefresh: true
      }
    },
    methods:{
      getData(){
        let pn = this.pn
        fetch.get(`/collection?pn=${pn}&size=8`).then(res=>{
          this.show=false
          this.clected=res.data
        })
      },
      handleDel(val){
        let that = this
        wx.showModal({
          title: '提示',
          content: '是否取消收藏',
          success: function(res) {
            if (res.confirm) {
              fetch.delete(`/collection/${val}`).then(res=>{
                // console.log(res.data);
                if (res.code ==200) {
                  fetch.get(`/collection?pn=1&size=8`).then(res=>{
                    that.showCancel=false
                    that.clected=res.data
                  })
                }
              })
            }else if(res.cancel){
              that.showCancel=false
            }
          }
        })
      },

      editAddress(options) {
        var touchTime = this.touch_end - this.touch_start;
        if (touchTime > 350) {
         this.showCancel=true
        } else {
          wx.navigateTo({
            url: `/pages/articledesc/main?id=${options}`
          })
        }
      },
      //按下事件开始
      mytouchstart(e) {
        this.touch_start= e.timeStamp
      },
      //按下事件结束
      mytouchend(e) {
          this.touch_end = e.timeStamp
      }
    },
    onPullDownRefresh(){
      var that = this;

      wx.stopPullDownRefresh()
    },
    onLoad(){
      this.getData()
    }
  };
</script>

<style scoped src="@/css/clectbook.css">

</style>
