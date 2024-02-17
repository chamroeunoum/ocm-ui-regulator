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
                    <div class="my-2 text-4xl font-tactieng" >3</div>
                </div>
                <div class="w-full mx-auto my-2 font-moul">{{ store.state.system.name }}</div>
                <div class="w-full mx-auto mt-12 mb-8 border-b pb-2 text-left text-md">សំណើរប្ដូរពាក្យសម្ងាត់</div>
                <n-form :model="model" :rules="rules" class="mb-24 text-md" >
                    <!-- <n-form-item path="phone" label="ទូរស័ព្ទ">
                        <n-input v-model:value="model.phone" @keydown.enter.prevent placeholder="ទូរស័ព្ទ" class="text-left " />
                    </n-form-item> -->
                    <n-form-item path="email" label="អ៊ីមែល" class="text-md" >
                        <n-input v-model:value="model.email" placeholder="អ៊ីមែល" class="text-left text-md " @keyup.enter="requestReset()" :disabled="disabledHelper.value" />
                    </n-form-item>
                    
                    <n-button @click="$router.push('/login')" type="default" class="mx-4 my-1 w-36 text-md" size="medium" :disabled="disabledHelper.value" >ចូលប្រើប្រាស់</n-button>
                    <n-button secondary type="success" class="mx-4 my-1 w-36 text-md" size="medium" @click="requestReset()" :disabled="disabledHelper.value" >ស្នើរប្ដូរពាក្យសម្ងាត់</n-button>
                </n-form>
            </div>
        </Transition>
        <div v-if=" disabledHelper.value == true " class="" >សូមមេត្តារងចាំ! អ៊ីមែលរបស់អ្នកកំពុងត្រូវបានត្រួតពិនិត្យ ...</div>
        <div class="fixed bottom-0 w-full"><Footer /></div>
    </div>
</template>
<script>
import Footer from './../../components/footer/copy-right.vue'
import { reactive, ref, computed } from 'vue'
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
            phone: '',
            email: ''
        })
        const slideFadeHelper = ref(false)
        
        const systemName = computed( () => {
            return store.state.system.name != "" ? store.state.system.name : 'ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច' 
        })
        const companyName = computed( () => {
            return store.state.organization.name != "" ? store.state.organization.name : 'ឈ្មោះក្រុមហ៊ុន' 
        })

        const disabledHelper = ref(false)

        const rules = {
            email: [
                { required: true, message: 'សូមបំពេញអសយដ្ឋានសំបុត្រ !', trigger: 'blur' },
                { type: 'email' , message: 'ទម្រង់នៃ អ៊ីមែល មិនត្រឹមត្រូវ !' }
            ],
            // phone: [
            //     { required: true, message: 'សូមបំពេញលេខទូរស័ព្ទរបស់អ្នក !' , trigger: 'blur'}
            // ]
        }

        function requestReset(){
            if( model.email === "" || model.email == null ){
                notify.warning({
                    title: 'កំណត់ពាក្យសម្ងាត់' ,
                    content: 'សូមពិនិត្យ អ៊ីមែល របស់អ្នក។' ,
                    duration: 3000
                })
                return false
            }
            disabledHelper.value = true
            store.dispatch('user/passwordForgot',{ email: model.email }).then( res => {
                if( res.data.ok ){
                    notify.success({
                        title: 'កំណត់ពាក្យសម្ងាត់' ,
                        content: 'សូមពិនិត្យ អ៊ីមែល របស់អ្នក។ សូមប្រើប្រាស់ លេខកូត ដែលបានបញ្ជូនទៅអ៊ីមែលរបស់អ្នកដើម្បីកំណត់ពាក្យសម្ងាត់ថ្មី។' ,
                        // description: 'សូមពិនិត្យ អ៊ីមែល របស់អ្នក។ សូមប្រើប្រាស់ លេខកូត ដែលបានបញ្ជូនទៅអ៊ីមែលរបស់អ្នកដើម្បីកំណ់តពាក្យសម្ងាត់ថ្មី។'
                        duration: 3000
                    })
                    localStorage.setItem( 'email' , model.email )
                    router.push( { name: 'PasswordForgotConfirmation', params: { } } )
                }else{
                    notify.warning({
                        title: 'កំណត់ពាក្យសម្ងាត់' ,
                        content: res.data.message ,
                        // description: res.data.message ,
                        duration: 3000
                    })
                }
                disabledHelper.value = false
            }).catch( err => {
                console.log( err.response.data )
                disabledHelper.value = false
            })
        }

        setTimeout( function(){
            slideFadeHelper.value = true
        }, 300 )

        return {
            model ,
            rules ,
            requestReset ,
            disabledHelper ,
            companyName ,
            systemName ,
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