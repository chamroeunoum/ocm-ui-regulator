<template>
  <div class="profilePage flex flex-col">
    <!-- Menu -->
    <div class="flex w-full h-20 p-2 border-b" >
      <div class="flex-none w-16 rounded-full" >
        <img src="./../../assets/ocmlogo.png" alt="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" title="ប្រពន្ធ័គ្រប់គ្រងឯកសារ អេឡិចត្រូនិច" class="w-full" >
      </div>
      <div class="flex-grow px-4 text-left text-lg leading-10 py-3">ព័ត៌មានអ្នកប្រើប្រាស់</div>
      <div class="flex-none hidden">
        <div class="border rounded-full w-12 h-12 my-2 leading-10 p-1 bg-red-500 text-white cursor-pointer" alt="ចាកចេញពីប្រព័ន្ធ" title="ចាកចេញពីប្រព័ន្ធ" @click="logout" >
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
        </div>
      </div>
    </div>
    <!-- End Menu -->    
    <div class="profileInformation p-8 sm:w-2/3 md:w-3/5 lg:w-2/5 w-4/5 mx-auto border my-8">
      <div class="profileImage border rounded-full border-gray-200 p-2 w-40 max-h-40 flex-none mx-auto">
        <img src="./../../assets/ocmlogo.png" alt="Profile picture" class="w-full" >
      </div>
      <div class="my-12">
        <n-form
        ref="formRef"
        label-placement="left"
        :model="user"
        label-width="120"
        >
          <n-form-item-row label="ឈ្មោះគណនី" >
            <n-input placeholder="ឈ្មោះគណនី" class="text-left" v-model:value="user.username" />
          </n-form-item-row>
          <n-form-item-row label="គោត្តនាម" >
            <n-input placeholder="គោត្តនាម" class="text-left" v-model:value="user.lastname" />
          </n-form-item-row>
          <n-form-item-row label="នាម">
            <n-input placeholder="នាម" class="text-left" v-model:value="user.firstname" />
          </n-form-item-row>
          <n-form-item-row label="ទូរស័ព្ទ">
            <n-input placeholder="ទូរស័ព្ទ" class="text-left" v-model:value="user.phone" />
          </n-form-item-row>
          <n-form-item-row label="អ៊ីមែល" >
            <n-input placeholder="អ៊ីមែល" class="text-left" disabled v-model:value="user.email" />
          </n-form-item-row>
        </n-form>
        <router-link to="/welcome" class="mx-8 w-32" >បកក្រោយ</router-link>
        <n-button type="primary" secondary class="mx-8 w-32" @click="save()" >រក្សារទុក</n-button>
      </div>
    </div>
    <div class="fixed bottom-0 w-full ">
      <footer-component></footer-component>
    </div>
  </div>
</template>
<script >
import { isAuth, getUser , authLogout } from './../../plugins/authentication.js'
import { reactive, ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FooterComponent from './../../components/footer/copy-right.vue'

  export default {
    name: 'Profile' ,
    components: {
      FooterComponent
    },
    setup(){
      const router = useRouter()
      const store = useStore()
      const user = ref(null)
      if( isAuth() ){
        user.value = getUser()
      }else{
        user.value = ref({
          lastname: '' ,
          firstname: '' ,
          phone: '' ,
          username: '' ,
          email: ''
        })
      }
      function save(){
        store.dispatch('user/update',{
          lastname: user.value.lastname ,
          firstname: user.value.firstname ,
          phone: user.value.phone ,
          username: user.value.username
        }).then( res => {
          localStorage.setItem( 'token' , JSON.stringify ( response.data.token ) )
          localStorage.setItem( 'user' , JSON.stringify( response.data.user ) )
          console.log( res )
        }).catch( err => {
          console.log( err )
        })
      }

      function logout(){
        if( isAuth() ){
          authLogout()
        }
        router.push('/welcome')
      }
      return {
        user ,
        logout ,
        save
      }
    }

  }
</script>