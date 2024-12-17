import { createStore } from 'vuex';
import auth from '@/moduls/auth.js';
import size from "@/moduls/size.js"
import user from "@/moduls/user.js"
import stock from '@/moduls/stock.js'
import client from '@/moduls/client.js'
import product from "@/moduls/product.js";
import supplier from "@/moduls/supplier.js"
import category from  '@/moduls/category.js'
import importInvoice from "@/moduls/importInvoice.js"
import productVariant from "@/moduls/productVariant.js"
import exportInvoice from "@/moduls/exportInvoice.js"
import rolePermission from "@/moduls/rolePermission.js"

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        auth,
        size,
        user,
        stock,
        client,
        product,
        category,
        supplier,
        exportInvoice,
        importInvoice,
        productVariant,
        rolePermission
    }

})
export default store