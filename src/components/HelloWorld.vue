<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
    <div class="shadow-test">shadow test
    <div>shadow child</div></div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                count: 0,
                array:[0,1,2,3,4,5,6,7,8,9]
            }
        },
        mounted() {
            console.log(process.env);
            console.log(import.meta.env);
            this.array.forEach((num,index)=>{
               this.array[index]= ++num
            });
            console.log(this.array);
        }
    }
</script>
<style lang="scss" scoped>
    .shadow-test {
        text-shadow: 1px 1px 1px #189fff;
        box-shadow: 1px 1px 1px #189fff;
        transition: 0.2s all linear;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-gap: 20px;
        background: linear-gradient(270deg, rgba(2, 16, 32, 0.9) 0%, rgba(2, 16, 32, 0.7) 30%, rgba(8, 17, 24, 0.2) 80%, transparent 99%);
    }
</style>
