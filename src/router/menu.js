
//  {
//     path: 'homepage',
//     name: 'home-page',
//     component: () => import('../pages/home-page')
//   }


const dynamicRoutes = [
    {
        path: '/homepage',
        
        name: 'home-page',
        meta: {
            name: '大道至简',
            icon: 'el-icon-eleme'
        }  
    },
    {
        path: '/order',
        
        name: 'order-manage',
        meta: {
            name: 'order-manage',
            icon: 'el-icon-s-order'
        },
        children: [
            {
                path: '/list',
                name: 'order-list',
             
                meta: {
                    name: 'order-list',
                    icon: 'el-icon-menu'
                }
            },
            {
                path: '/product',
                name: 'product-manage',
        
                meta: {
                    name: 'prdMsg',
                    icon: 'el-icon-s-ticket'
                },
                children: [
                    {
                        path: '/list',
                        name: 'product-list',
                  
                        meta: {
                            name: 'product-list',
                            icon: 'el-icon-document'
                        }
                    },
                    {
                        path: '/review',
                        name: 'review-manage',
                  
                        meta: {
                            name: 'review-manage',
                            icon: 'el-icon-s-claim'
                        }
                    }
                ]
            },
            {
                path: '/returnGoods',
                name: 'return-goods',
         
                meta: {
                    name: 'return-goods',
                    icon: 'el-icon-help'
                }
            }
        ]
    },
    {
        path: '/goods',
    
        name: 'goods',
        meta: {
            name: 'goods',
            icon: 'el-icon-s-custom'
        },
        children: [
            {
                path: '/list',
                name: 'goods-list',
          
                meta: {
                    name: 'goods-list',
                    icon: 'el-icon-s-management'
                }
            },
            {
                path: '/classify',
                name: 'goods-classify',
         
                meta: {
                    name: 'goods-classify',
                    icon: 'el-icon-edit-outline'
                }
            }
        ]
    },
    {
        path: '/permission',
   
        name: 'permission',
        meta: {
            name: 'permission',
            icon: 'el-icon-lollipop'
        },
        children: [
            {
                path: '/user',
                name: 'user-manage',
            
                meta: {
                    name: 'user-manage',
                    icon: 'el-icon-s-custom'
                }
            },
            {
                path: '/role',
                name: 'role-manage',
            
                meta: {
                    name: 'role-manage',
                    icon: 'el-icon-video-camera-solid'
                }
            },
            {
                path: '/menu',
                name: 'menu-manage',
               
                meta: {
                    name: 'menu-manage',
                    icon: 'el-icon-document-copy'
                }
            }
        ]
    },
    {
        path: '/player',
        
        name: 'music-player',
        meta: {
            name: '简易音乐播放器',
            icon: 'el-icon-headset'
        }  
    },
    {
        path: '/countDown',
        
        name: 'count-down',
        meta: {
            name: '倒计时',
            icon: 'el-icon-watch'
        }  
    },
    {
        path: '/luckDraw',
        
        name: 'luck-draw',
        meta: {
            name: '抽奖',
            icon: 'el-icon-sugar'
        }  
    },
]

export default dynamicRoutes

// dynamicRoutes.forEach(item=>{
//     let item2= item.children;
//     item2.forEach(child=>{
//         console.log(child.meta.name)
//     })
// })
