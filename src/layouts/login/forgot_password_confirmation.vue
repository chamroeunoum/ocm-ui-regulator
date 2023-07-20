<template >
    <div class="flex mx-auto pb-8 mt-8 mb-20 sm:w-12/12 md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-6/12">  
        <div class="w-full p-8" >
            <div class="w-28 mx-auto my-4">
                <img src="./../../assets/logo.png" alt="SASTRA Logo" class="w-full" >
            </div>
            <div class="text-center" >
                <div class="my-2 text-lg">{{ companyName }}</div>
            </div>
            <div class="w-full mx-auto my-8 text-lg ">{{ systemName }}</div>
            <div class="w-full mx-auto mt-12 mb-8 border-b pb-2 text-left text-lg">បញ្ជាក់ការប្ដូរពាក្យសម្ងាត់</div>
            <n-form :model="model" :rules="rules" class="mb-24">
                <n-form-item path="code" label="កូតសម្ងាត់">
                    <n-input v-model:value="model.code" @keydown.enter.prevent placeholder="កូតសម្ងាត់" class="text-left " @keyup.enter="confirm()" />
                </n-form-item>
                
                <n-button @click="$router.push({ name: 'PasswordForgot', params: { email: model.email } })"  type="default" class="mx-4 my-1 w-60" size="medium" >បកក្រោយ</n-button>
                <n-button @click="confirm()" secondary type="success" class="mx-4 my-1 w-60" size="medium" >បញ្ជាក់លេខកូដប្ដូរពាក្យសម្ងាត់</n-button>
                
            </n-form>
        </div>
    </div>
    <div class="fixed bottom-0 w-full"><Footer /></div>
</template>
<script>
import Footer from '../../components/footer/copy-right.vue'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router' 
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
        const route = useRoute()


        const model = reactive({
            email: '' ,
            code: ''
        })

        const systemName = computed( () => {
            return store.state.system.name != "" ? store.state.system.name : 'ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច' 
        })
        const companyName = computed( () => {
            return store.state.organization.name != "" ? store.state.organization.name : 'ឈ្មោះក្រុមហ៊ុន' 
        })

        const rules = {
            code: [
                { required: true, message: 'សូមបញ្ចូលកូតសម្ងាត់ដែលអ្នកទទួលបានតាមរយះ អ៊ីមែល ឬ សារទូរសព្ទ !', trigger: 'blur' }
            ]
        }

        function confirm(){
            let email = localStorage.getItem( 'email')
            if( email == "" || email == null || email == undefined ){
                notify.warning({
                    title: 'ប្ដូរពាក្យសម្ងាត់' ,
                    description: 'មានបញ្ហាក្នុងពេលកំពុងប្ដូរពាក្យសម្ងាត់។ សូមស្នើរសុំប្ដូរ សារជាថ្មីម្ដងទៀត ។' ,
                    duration: 3000
                })
                return false
            }
            store.dispatch('user/passwordForgotConfirmation',{
                email: email ,
                code: model.code
            }).then( res => {
                if( res.data.ok ){
                    notify.success({
                        title: 'ប្ដូរពាក្យសម្ងាត់' ,
                        content: res.data.message ,
                        duration: 1000
                    })
                    router.push({
                        name: "PasswordUpdate" ,
                        params: {
                            email: email
                        }
                    })
                }else{
                    notify.warning({
                        title: 'បញ្ចាក់កូត' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                }
            }).catch( err => {
                notify.error({
                    title: 'បញ្ចាក់កូត' ,
                    content: err.response.data.message ,
                    duration: 3000
                })
            })
        }

        return {
            model ,
            rules ,
            confirm ,
            companyName ,
            systemName
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