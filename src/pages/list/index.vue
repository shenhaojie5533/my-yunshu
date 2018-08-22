<template>
  <div>
    <div class="loading" v-show="show">
      <img src="/static/img/loading2.svg">
    </div>
    <div class="listcontent">
      <a :href="'/pages/articletext/main?id=' + item._id + '&booklistId='+bookId" v-for="(item, index) in titles" :key="index" class="title">
      {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
  import { fetch } from '@/utils/axios.js'

  export default {
    data(){
      return{
        titles:[],
        bookId:'',
        show:true
      }
    },
  methods:{
    getData(){
      this.titles=''
      fetch.get(`/titles/${this.bookId}`).then(res => {
        this.show=false
        this.titles = res.data
      })
    }
  },
    onLoad (options) {
      // console.log(options)
      this.bookId = options.id
      this.getData()
    },
  };
</script>

<style scoped src="@/css/list.css">

</style>
