// 获取地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 提示对话框 
export const showModal = ({content}) => {
  return new Promise((resolve,reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      success: res => resolve(res),
      fail: err => reject(err)
    });
  })
}

// 提示弹框
export const showToast = ({title}) => {
  return new Promise((resolve,reject) => {
    uni.showToast({
      title: title,
      icon: "none",
      success: res => resolve(res),
      fail: err => reject(err)
    });
  })
}

// Promsie请求 login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// Promsie请求 requestPayment 微信支付
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}