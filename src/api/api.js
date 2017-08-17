import axios from 'axios';

// let base = 'http://t.ejiabl.com'
let base = '/'

// 阿里OSS
export const getKey = params => { return axios.get(`${base}api/oss/key`, params).then(res => res.data) }

// 登录
export const login = params => { return axios.post(`${base}api/shop/login`, params).then(res => res.data) }

// 退出
export const logout = params => { return axios.post(`${base}api/shop/out`, params).then(res => res.data) }

// 商户资料
export const getShopDetail = params => { return axios.get(`${base}api/shop/detail`, params).then(res => res.data) }

// 获取队列列表
export const getQueueList = params => { return axios.get(`${base}api/queue/queuelist`, params).then(res => res.data) }

// 更新队列
export const upqueue = params => { return axios.post(`${base}api/queue/upqueue`, params).then(res => res.data) }

// 密码更改
export const passwordUpdate = params => { return axios.post(`${base}api/shop/passwordUpdate`, params).then(res => res.data) }

// 商品列表获取
export const getGoodslist = params => { return axios.get(`${base}api/wares/wareslist`, params).then(res => res.data) }

// 商品上下架
export const goodOnOff = params => { return axios.post(`${base}api/wares/onoff`, params).then(res => res.data) }

// 商品编辑
export const submitGood = params => { return axios.post(`${base}api/wares/upware`, params).then(res => res.data) }

// 商品删除
export const deleteWare = params => { return axios.post(`${base}api/wares/delware`, params).then(res => res.data) }

// 商品添加
export const addWare = params => { return axios.post(`${base}api/wares/addware`, params).then(res => res.data) }

// 商品排序
export const waresChsort = params => { return axios.post(`${base}api/wares/chsort`, params).then(res => res.data) }

// 订单列表 (包含搜索)
export const getOrderList = params => { return axios.get(`${base}api/lines/list`, params).then(res => res.data) }
//积分订单列表
export const getScoreOrderList = params => { return axios.get(`${base}api/porder/lists`, params).then(res => res.data) }

// 队列数据汇总
export const getReport = params => { return axios.get(`${base}api/lines/report`, params).then(res => res.data) }

// 用户提货
export const takeDelivery = params => { return axios.post(`${base}api/lines/take`, params).then(res => res.data) }

//积分商品提货
export const takeScoreDelivery = params => { return axios.post(`${base}api/porder/take`, params).then(res => res.data) }

// 会员列表
export const getMemberList = params => { return axios.get(`${base}api/user/list`, params).then(res => res.data) }

// 会员充值
export const pay = params => { return axios.post(`${base}api/user/getPay`, params).then(res => res.data) }

// 获取余额
export const getBalance = params => { return axios.get(`${base}api/user/balance`, params).then(res => res.data) }

// 流水列表
export const getBalanceLog = params => { return axios.get(`${base}api/user/shopBalanceLog`, params).then(res => res.data) }

// 会员资料
export const getUserInfo = params => { return axios.get(`${base}api/user/info`, params).then(res => res.data) }

// 会员充值
export const getUserBalance = params => { return axios.get(`${base}api/user/balance`, params).then(res => res.data) }

// 会员资料更新
export const setUserUpdate = params => { return axios.post(`${base}api/user/update`, params).then(res => res.data) }

// 提现审核列表
export const getDrawList = params => { return axios.get(`${base}api/widthdrawUser/list`, params).then(res => res.data) }

// 审核通过
export const checkDraw = params => { return axios.post(`${base}api/widthdrawUser/check`, params).then(res => res.data) }

// 审核完成
export const examineOk = params => { return axios.post(`${base}api/widthdrawUser/ok`, params).then(res => res.data) }

// 审核拒绝
export const drawFalse = params => { return axios.post(`${base}api/widthdrawUser/false`, params).then(res => res.data) }

// 积分兑换列表
export const getEx = params => { return axios.get(`${base}api/ex/lists`, params).then(res => res.data) }

// 积分兑换详情
export const getExInfo = params => { return axios.get(`${base}api/ex/info`, params).then(res => res.data) }

// 查看商户流水
export const getShopUserLog = params => { return axios.get(`${base}api/user/ShopUserLog`, params).then(res => res.data) }

// 查看商户流水
export const shopUserLog = params => { return axios.get(`${base}api/user/ShopUserLog`, params).then(res => res.data) }

// 积分兑换审核
export const exCheck = params => { return axios.post(`${base}api/ex/check`, params).then(res => res.data) }

// 推出明细
export const getIntroInfo = params => { return axios.get(`${base}api/introInfo`, params).then(res => res.data) }

// 队列助推
export const getDlzt = params => { return axios.get(`${base}api/lines/dlzt`, params).then(res => res.data) }

// 利润助推
export const getFrzt = params => { return axios.get(`${base}api/lines/frzt`, params).then(res => res.data) }

// 积分兑换审核拒绝
export const exRefuse = params => { return axios.post(`${base}api/ex/refuse`, params).then(res => res.data) }

// 商户收入流水
export const getMerchantProcess = params => { return axios.get(`${base}api/getMerchantProcess`, params).then(res => res.data) }

// 服务费列表
export const getExServ = params => { return axios.get(`${base}api/ex/serv`, params).then(res => res.data) }

// 分润金展示
export const getProfit = params => { return axios.get(`${base}api/profit/list`, params).then(res => res.data) }

// 结算明细
export const getWithdrawInfo = params => { return axios.get(`${base}api/widthr/list`, params).then(res => res.data) }

// 商户提现资金总概
export const getCapital = params => { return axios.get(`${base}api/shop/capital`, params).then(res => res.data) }

// 提现
export const withdrawal = params => { return axios.post(`${base}api/widthr/add`, params).then(res => res.data) }

// 提货
export const orderEdit = params => { return axios.post(`${base}api/order/edit`, params).then(res => res.data) }

// 商户订单管理
export const getOrderLists = params => { return axios.get(`${base}api/order/show`, params).then(res => res.data) }

// 商户会员搜索
export const searchUser = params => { return axios.get(`${base}api/user/searchUser`, params).then(res => res.data) }

// 协助会员绑定
export const bindToShop = params => { return axios.post(`${base}api/user/bindToShop`, params).then(res => res.data) }

