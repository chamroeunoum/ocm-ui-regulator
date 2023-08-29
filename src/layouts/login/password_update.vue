<template >
    <div class="flex justify-center ">
        <Transition name="slide-fade" >
            <div v-if="slideFadeHelper" class="w-full mx-4 xs:w-full sm:w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/5 p-8 md:mt-24 sm:mt-12 mb-24">
                <div class="w-28 mx-auto my-4">
                    <img src="./../../assets/logo.svg" class="w-full" >
                </div>
                <div class="text-center my-2" >
                    <div class="my-2 text-xs font-muol">{{ store.state.organization.name }}</div>
                    <div class="my-2 text-xs font-muol">នាយកដ្ឋានឯកសារអេឡិចត្រូនិចនិងព័ត៌មានវិទ្យា</div>
                    <div class="my-2 text-4xl font-tactieng" >3</div>
                </div>
                <div class="w-full mx-auto my-2 text-xs font-muol">{{ store.state.system.name }}</div>
                <div class="w-full mx-auto mt-12 mb-8 border-b pb-2 text-left text-md">ពាក្យសម្ងាត់ថ្មី</div>
                <n-form :model="model" :rules="rules">
                    <n-form-item path="password" label="ពាក្យសម្ងាត់" class="text-md">
                        <n-input type="password" v-model:value="model.password" @keyup.enter="updatePassword()" placeholder="ពាក្យសម្ងាត់" class="text-left text-md" />
                    </n-form-item>
                    <n-form-item path="confirmPassword" label="បញ្ជាក់ពាក្យសម្ងាត់" class="text-md">
                        <n-input type="password"  v-model:value="model.confirmPassword" @keyup.enter="updatePassword()" placeholder="បញ្ជាក់ពាក្យសម្ងាត់" class="text-left text-md" />
                    </n-form-item>
                    <n-form-item class="mt-2" >
                        <n-button @click="$router.push({ name: 'PasswordForgot', params: { email: model.email } })" secondary type="default" class="mx-auto text-md" size="medium" >បកក្រោយ</n-button>
                        <n-button @click="updatePassword()" secondary type="success" class="mx-auto text-md" size="medium" >រក្សារទុកពាក្យសម្ងាត់</n-button>
                    </n-form-item>
                </n-form>
            </div>
        </Transition>
        <div class="fixed bottom-0 w-full"><Footer /></div>
    </div>
</template>
<script>
import Footer from '../../components/footer/copy-right.vue'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router' 
import { useNotification } from 'naive-ui'
export default {
    name: "PasswordUpdate" ,
    components: {
        Footer
    },
    setup(){

        const store = useStore()
        const notify = useNotification()
        const router = useRouter()
        const route = useRoute()

        const slideFadeHelper = ref(false)

        const model = reactive({
            password: '' ,
            confirmPassword: ''
        })

        const systemName = computed( () => {
            return store.state.system.name != "" ? store.state.system.name : 'ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច' 
        })
        const companyName = computed( () => {
            return store.state.organization.name != "" ? store.state.organization.name : 'ឈ្មោះក្រុមហ៊ុន' 
        })

        const rules = {
            password: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់!', trigger: 'blur' }
            ],
            confirmPassword: [
                { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់ម្ដងទៀតដើម្បីបញ្ជាក់!', trigger: 'blur' }
            ]
        }

        function updatePassword(){
            if( model.password == '' || model.confirmPassword == '' ){
                notify.warning({  
                    title: 'ពិនិត្យពាក្យសម្ងាត់' ,
                    content: 'សូមបំពេញ ពាក្យសម្ងាត់ និង បញ្ជាក់ពាក្យសម្ងាត់។' ,
                    duration: 1000
                })
                return false
            }
            if( model.password !== model.confirmPassword ) {
                notify.warning({
                    title: 'ពិនិត្យពាក្យសម្ងាត់' ,
                    content: 'សូមប្រាកដថា ពាក្យសម្ងាត់ និង បញ្ជាក់ពាក្យសម្ងាត់ គឺដូចគ្នា។'
                })
                return false
            }
            let email = localStorage.getItem( 'email')
            if( email == "" || email == null || email == undefined ){
                notify.warning({
                    title: 'ប្ដូរពាក្យសម្ងាត់' ,
                    description: 'មានបញ្ហាក្នុងពេលកំពុងប្ដូរពាក្យសម្ងាត់។ សូមស្នើរសុំប្ដូរ សារជាថ្មីម្ដងទៀត ។' ,
                    duration: 3000
                })
                return false
            }
            store.dispatch('user/passwordUpdate',{
                email: email ,
                password: model.password
            }).then( res => {
                if( res.data.ok ){
                    notify.success({
                        title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                    localStorage.removeItem('email')
                    router.push({
                        name: "Login"
                    })
                }else{
                    notify.warning({
                        title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                        content: res.data.message ,
                        duration: 3000
                    })
                }
            }).catch( err => {
                notify.error({
                    title: 'ប្ដូរពាក្យសម្ងាត់ថ្មី' ,
                    content: err.response.data.message ,
                    duration: 3000
                })
            })
        }
        setTimeout( function(){
            slideFadeHelper.value = true
        }, 300 )

        return {
            model ,
            rules ,
            updatePassword ,
            companyName ,
            systemName, 
            slideFadeHelper ,
            store 
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