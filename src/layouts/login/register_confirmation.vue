<template >
    <div class="flex justify-center ">
        <Transition name="slide-fade" >
            <div v-if="slideFadeHelper" class="w-full mx-4 xs:w-full sm:w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/5 p-8 mt-12 mb-24">
                <div class="w-24 mx-auto my-1">
                    <img src="./../../assets/logo.svg" class="w-full" >
                </div>
                <div class="text-center my-2" >
                    <div class="my-2 font-moul hidden">{{ store.state.organization.name }}</div>
                    <div class="my-2 font-moul hidden">នាយកដ្ឋានឯកសារអេឡិចត្រូនិចនិងព័ត៌មានវិទ្យា</div>
                    <div class="my-2 font-moul text-yellow-500">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
                    <div class="my-2 text-4xl font-tacteing" >3</div>
                </div>
                <div class="w-full mx-auto my-2 font-moul">{{ store.state.system.name }}</div>
                <div class="w-full mx-auto mt-8 mb-4 border-b pb-2 text-left text-md">បញ្ជាក់ការចុះឈ្មោះជាសមាជិក</div>
                <div class="w-full mx-auto mt-4 mb-4 pb-2 text-left text-md">សូមបញ្ចូល លេខកូដ ដែលបានបញ្ជូនទៅអ៊ីមែលរបស់អ្នក ដើម្បីបញ្ចប់ការចុះឈ្មោះ ក្នុងប្រអប់ខាងក្រោម។</div>
                <n-form :model="model" :rules="rules" class="mb-24 text-md" >
                    <n-form-item path="code" label="សូមបញ្ចូលកូតសម្ងាត់" class="text-md">
                        <n-input v-model:value="model.code" @keydown.enter.prevent placeholder="កូតសម្ងាត់" class="text-left text-md" />
                    </n-form-item>
                    <n-button @click="$router.push('/login')" secondary type="default" class="mx-4 my-1 w-44 text-md" size="medium" >បកក្រោយ</n-button>
                    <n-button @click="handleSubmit" secondary type="success" class="mx-4 my-1 w-44 text-md" size="medium" >បញ្ជាក់លេខកូដចុះឈ្មោះ</n-button>
                </n-form>
            </div>
        </Transition>
        <div class="fixed bottom-0 w-full"><Footer /></div>
    </div>
</template>
<script>
import Footer from './../../components/footer/copy-right.vue'
import { reactive , ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
export default {
    name: "register" ,
    components: {
        Footer
    },
    setup(){

        const store = useStore()
        const notify = useNotification()
        const router = useRouter()
        const model = reactive({
            code: ''
        })

        const slideFadeHelper = ref(false)

        const rules = {
            code: [
                { required: true, message: 'សូមបញ្ចូលកូតសម្ងាត់ដែលអ្នកទទួលបានតាមរយះ អ៊ីមែល ឬ សារទូរសព្ទ !', trigger: 'blur' }
            ]
        }
        function handleSubmit(){
            if( model.code !== "" && model.code !== null ){
                store.dispatch('user/signupConfirmation',{token:model.code}).then( res => {
                    if( res.data.ok ){
                        notify.success({
                            title: "បញ្ជាក់ការចុះឈ្មោះ" ,
                            content: res.data.message ,
                            duration:  1500,
                            closable: true
                        })
                        router.push('/login')
                    }else{
                        nofity.warning({
                            title: "បញ្ជាក់ការចុះឈ្មោះ" ,
                            content: res.data.message ,
                            duration:  1500,
                            closable: true
                        })
                    }
                }).catch(err => {
                    notify.error({
                        title: "បញ្ជាក់ការចុះឈ្មោះ" ,
                        content: err.response.data.message ,
                        duration:  1500,
                        closable: true
                    })
                })
            }
        }

        setTimeout( function(){
            slideFadeHelper.value = true
        }, 300 )

        return {
            model ,
            rules ,
            handleSubmit ,
            store ,
            slideFadeHelper
        }
    }
}
</script>
<style >
    
    #app {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .layout {
        height: 100%;
        width: 100%;
    }
    .ivu-layout {
        height: 100%;
    }
    .ivu-layout-footer {
        background: #f5f7f9;
        padding: 12px 50px;
        color: #515a6e;
        font-size: 14px;
        position: absolute;
        bottom: 0px;
        width: 100%;
    }
    .ivu-form-item {
        margin: auto auto 10px auto;
    }
    .ivu-form-item-error-tip {
        position: relative;
    }
</style>