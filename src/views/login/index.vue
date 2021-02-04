<template>
  <div @click="goHomePage">Login</div>
</template>

<script lang="ts">
import {defineComponent, onMounted,} from 'vue';
import {useStore } from 'vuex';
import router from '@/router';
import {setToken} from "@/utils/auth";

export default defineComponent({
  setup() {
    const store = useStore();
    const state = store.state;
    console.log(state.app);
    store.dispatch('app/LOOK_VUX_ACTION');
    setTimeout(()=>{
      console.log(state.app);
    })
    onMounted(() => {
      console.log(import.meta.env);
      console.log(import.meta);
    })
    function goHomePage(){
      setToken('aaaaaa');
      router.push('/Home');
    }
    return {
      goHomePage
    }
  }
})
</script>
