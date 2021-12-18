import Axios from 'axios'

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {

    },
    mutations: {
        getAllProducts(state, results) {
            state.products = results;
        },
        decrementProductInventory(state, { id }) {
            const product = state.products.find(item => item.id === id);
            product.inventory--;
        },
        addProductInventory(state, { id }) {
            const product = state.products.find(item => item.id === id);
            product.inventory++;
        }
    },
    actions: {
        //    async getAllProducts({commit}){
        //         try {
        //             const res = await Axios.get('/api/products');
        //             const results = res.data.results;
        //             commit('getAllProducts',results)
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     },
        getAllProducts({ commit }) {
            const results = [
                { id: 1, title: 'javaScript百炼成仙', price: 77, inventory: 7999 },
                { id: 2, title: 'javaScript之王者归来', price: 66, inventory: 6999 },
                { id: 3, title: 'javaScript忍者禁书', price: 55, inventory: 5999 },
            ]
            commit('getAllProducts', results)
        }

    }
}