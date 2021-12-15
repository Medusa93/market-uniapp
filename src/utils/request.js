// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = (params) => {
  // 判断url是否带了/my/请求的是私人路径 需要header带上token
  let header = {...params.header}
  if(params.url.includes("/my/")) {
    // 拼接header带上token
    header["Authorization"] =  uni.getStorageSync('token')
  }
  ajaxTimes++
  // 显示加载中效果
  uni.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise((resolve, reject) => {   
    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    uni.request({
      ...params,
      header: header,
      url: baseURL + params.url,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: res => {
        ajaxTimes--        
        if(ajaxTimes === 0) {
          // 关闭加载中效果
          uni.hideLoading()
        }
      }
    });
  })
}