<template>
    <div>
      <div class="loading" v-show="show">
        <img src="/static/img/loading2.svg">
      </div>

      <div class="classcontent">
        <div class="alllist">
          <div class="listname">
            {{title}}
          </div>

          <div class="list" v-for="(ite,index) in articles" :key="index" @click="handleDesc(ite._id)">
            <div class="bookimg">
              <img :src="ite.img">
            </div>
            <div class="bookdetail">
              <div class="title">
                {{ite.title}}
              </div>
              <div class="text">
                {{ite.desc}}
              </div>

              <div class="foot">
                <div class="author">
                  <span>{{ite.author}}</span>
                </div>
                <div class="looknum">
                  <span>两天前</span>
                  <span>{{title}}    {{ite.looknums}}人在看</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
  import { fetch } from '@/utils/axios.js'
  // import gettime from '@/components/gettime'
  export default {
    // components: { gettime },
    data () {
      return {
        pn:1,
        title:'',
        typeId:'',
        show:true,
        articles:[],
        onbottom:true,
        enablePullDownRefresh: true
      }
    },
    methods:{
      getDetails(){
        this.articles=''
        let typeId=this.typeId
        let pn = this.pn
        fetch.get(`/category/${typeId}/books?pn=${pn}&size=5`).then(res => {
          if (res.data.books.length == 0){
            this.onbottom = false
          }else {
            this.articles=res.data.books
            this.title=res.data.title
          }
          this.show=false
        })
      },
      handleDesc(val){
        wx.navigateTo({
          url: `/pages/articledesc/main?id=${val}`
        })
      }
    },
    onLoad(options){
      this.typeId = options.id
      this.getDetails()
    },
    onReachBottom(){
      if(this.onbottom){
        this.pn += 1
        this.getDetails()
      }
    },
    onUnload(){
      this.articles = []
    },
    onPullDownRefresh(){
      var that = this;

      wx.stopPullDownRefresh()
    },
    watch:{
      title(){
        let title = this.title
        wx.setNavigationBarTitle({
          title
        })
      }
    }
  };
</script>

<style scoped src="@/css/classify.css">

</style>
