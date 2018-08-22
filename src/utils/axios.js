const baseUrl = 'https://m.yaojunrong.com'

export const fetch = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header ={
        'content-type': 'application/json'
      }
      if (token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method: 'GET',
        data,
        header,
        success (res) {
          if (res.header.Token){
            wx.setStorageSync('token',res.header.Token)
          }
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header ={
        'content-type': 'application/json'
      }
      if (token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method: 'POST',
        data,
        header,
        success (res) {
          if (res.header.Token){
            wx.setStorageSync('token',res.header.Token)
          }
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },

  delete (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header ={
        'content-type': 'application/json'
      }
      if (token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method: 'DELETE',
        data,
        header,
        success (res) {
          if (res.header.Token){
            wx.setStorageSync('token',res.header.Token)
          }
          resolve(res.data)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}
export const login =function() {
  return new Promise(resolve => {
    wx.login({
      success (res) {
       fetch.post('/login',{
         code:res.code,
         appid:'wxf6464347f35f0207',
         secret:'3efe6cde8fca459bb803aec8d8d5599f'
       }).then(data =>{
         resolve(data.data)
         if(data.code == 200){
            wx.navigateBack({
              delta: 1
            })
         }
       })
      }
    })
  })
}
