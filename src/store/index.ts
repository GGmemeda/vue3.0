/**
 * @author chuzhixin 1204505056@qq.com
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import { createStore } from 'vuex';

const files = import.meta.globEager('./modules/*.ts');
const modules:any={};
Object.keys(files).forEach((key) => {
  const module:Object= files[key].default;
  // @ts-ignore
  module['namespaced'] = true;
  modules[key.replace(/(\.\/modules\/|\.ts)/g,'')] =  module;
})
console.log(modules);
export default createStore({
  modules:modules,
})