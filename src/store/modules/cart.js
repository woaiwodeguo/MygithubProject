export default {
    // 为了使模块具有更高的封装度和复用性 添加 namespaced:true 的方式使其成为带冥命名空间的模块 只针对于getters mutations actions 
    namespaced: true,
    state: {
        cartList: [],
        count: 0
    },
    getters: {
        // 获取购物车的数据
        getCarList(state, getters, rootState) {
            return state.cartList.map(({ id, quantity }) => {
                const product = rootState.products.products.find(item => item.id === id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity,
                    id:product.id
                }
            })           
        },
        // 计算总价格
        cartTotalPrice(state, getters) {
            return getters.getCarList.reduce((total, product) => {
                return total + product.price * product.quantity
            }, 0)
        },
        cartTotalQuantity(state,getters){
            return getters.getCarList.reduce((total,product)=>{
                 return total+product.quantity
            },0)
        }
    },
    mutations: {
        // 第一次添加商品到购物车
        addProductToCart(state, { id, quantity }) {
            state.cartList.push({
                id,
                quantity
            })
        },
        // 购物车已有数据 只改变当前已有数量quantity
        incrementCartItemQuantity(state, { id }) {
            const product = state.cartList.find(item => item.id === id);
            product.quantity++;
        },
        // 点击购物车商品减一
        decrementCartList(state,{id}){
            const cart = state.cartList.find(item=>item.id===id);
            cart.quantity--;
            localStorage.getItem('cartList',JSON.stringify(state.cartList));
        },
        // 点击购物车商品加一
        addCartList(state,{id}){
            const cart = state.cartList.find(item=>item.id===id);
            cart.quantity++;
            localStorage.getItem('cartList',JSON.stringify(state.cartList));
        }
    },
    actions: {
        addProductToCart({ commit, state }, product) {
            if (product.inventory > 0) {  // 有库存
                const cartItem = state.cartList.find(item => item.id === product.id);
                if (!cartItem) {
                    //购物车无数据
                    commit('addProductToCart', { id: product.id, quantity: 1 })
                } else {
                    //购物车已有数据
                    commit('incrementCartItemQuantity', { id: product.id })
                }
                // 如果想提交一个模块中的方法 那么需要第三个参数{root:true}
                commit('products/decrementProductInventory',{id:product.id},{root:true});
            }

        },
        decrementCartList({commit},item){
            commit('decrementCartList',item);
            commit('products/addProductInventory',{id:item.id},{root:true})
        },
        addCartList({commit},item){
            commit('addCartList',item);
            commit('products/decrementProductInventory',{id:item.id},{root:true})
        }
    }
}