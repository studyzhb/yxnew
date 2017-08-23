import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: '登录',
      path: '/login',
      component: resolve => require(['components/login/login'], resolve)
    },
    {
  		path: '/',
      component: resolve => require(['components/home'], resolve),
      children: [
        {
          name: '店铺资料',
          path: '/storeInfo',
          component: resolve => require(['components/storeInfo/storeInfo'], resolve)
        },
        {
          name: '修改密码',
          path: '/modifyPassword',
          component: resolve => require(['components/modifyPassword/modifyPassword'], resolve)
        },
        {
          name: '广告图',
          path: '/advertisingMap',
          component: resolve => require(['components/advertisingMap/advertisingMap'], resolve)
        },
        {
          name: '队列资料',
          path: '/queueData',
          component: resolve => require(['components/queue/queueData'], resolve)
        },
        {
          name: '产品管理',
          path: '/productManageQueue',
          component: resolve => require(['components/queue/productManageQueue'], resolve)
        },
        {
          name: '订单管理',
          path: '/orderManage',
          component: resolve => require(['components/queue/orderManage'], resolve)
        },
        {
          name: '积分订单管理',
          path: '/scoreOrderManage',
          component: resolve => require(['components/score/orderManage'], resolve)
        },
        {
          name: '会员管理',
          path: '/memberManage',
          component: resolve => require(['components/memberManage/memberManage'], resolve)
        },
        {
          name: '流水',
          path: '/seeFlowWater/:id',
          component: resolve => require(['components/seeFlowWater/seeFlowWater'], resolve)
        },
        {
          name: '会员资料',
          path: '/memberInfo/:id',
          component: resolve => require(['components/memberInfo/memberInfo'], resolve)
        },
        {
          name: '提现审核',
          path: '/cashCheck',
          component: resolve => require(['components/cashCheck/cashCheck'], resolve)
        },
        {
          name: '积分兑换',
          path: '/exchange',
          component: resolve => require(['components/exchange/exchange'], resolve)
        },
        {
          name: '用户积分明细',
          path: '/exchangeStream/:id',
          component: resolve => require(['components/exchangeStream/exchangeStream'], resolve)
        },
        {
          name: '推出明细',
          path: '/introInfo/:id',
          component: resolve => require(['components/introInfo/introInfo'], resolve)
        },
        {
          name: '助推明细',
          path: '/boostInfo',
          component: resolve => require(['components/boostInfo/boostInfo'], resolve)
        },
        {
          name: '用户交易流水',
          path: '/processUsr',
          component: resolve => require(['components/processUsr/processUsr'], resolve)
        },
        {
          name: '商户收入流水',
          path: '/processMerchant',
          component: resolve => require(['components/processMerchant/processMerchant'], resolve)
        },
        {
          name: '服务费',
          path: '/service',
          component: resolve => require(['components/service/service'], resolve)
        },
        {
          name: '结算明细',
          path: '/settlementInfo',
          component: resolve => require(['components/settlementInfo/settlementInfo'], resolve)
        },
        {
          name: '订单管理',
          path: '/productManage',
          component: resolve => require(['components/productManage/productManage'], resolve)
        },
        {
          name:'积分产品管理',
          path:'/productScoreManage',
          component:resolve=>require(['components/productScoreManage/productScoreManage'],resolve)
        },
        {
          name: '绑定会员',
          path: '/bindUser',
          component: resolve => require(['components/bind-user/bind-user'], resolve)
        },
        {
          name: '帮助',
          path: '/help',
          component: resolve => require(['components/help/help'], resolve)
        }
      ]
    }
  ]
})
