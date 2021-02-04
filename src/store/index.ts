/**
 * @author chuzhixin 1204505056@qq.com
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {getters} from "@/store/getters";

const vuexPersisted = createPersistedState({
  key: 'persist_main',
  storage: window.localStorage,
  paths: ['app']
});

const files = import.meta.globEager('./modules/*.ts');
const modules:any={};
Object.keys(files).forEach((key) => {
  const module:Object= files[key].default;
  // @ts-ignore
  module['namespaced'] = true;
  modules[key.replace(/(\.\/modules\/|\.ts)/g,'')] =  module;
})
export default createStore({
  modules:modules,
  getters,
  plugins:[vuexPersisted]
})