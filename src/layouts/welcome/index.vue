<template>
  <div>
    <!-- Logo of the Office of Council of Ministers -->
    <div class="w-48 mx-auto my-8">
      <img src="./../../assets/logo.svg" alt="SASTRA Logo" class="w-full" >
    </div>
    <div class="w-full mx-auto mt-4 mb-12 text-lg ">អង្គភាពចំណុះក្រោមទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
    <div class="p-4 flex justify-center  " >
      <div class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ</div>
      <div class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >នាយកដ្ឋានរាជកិច្ច</div>
      <div class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >នាយកដ្ឋានទំនាក់ទំនងអន្តរជាតិ</div>
      <div class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >នាយកដ្ឋានពិធីការ</div>
      <div class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >នាយកដ្ឋាន អង្គការក្រៅរដ្ឋាភិបាល</div>
      <div v-if="!isLoggedIn" class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >
        <router-link to="/login" >ចូលប្រើប្រាស់ ប្រព័ន្ធ</router-link>
      </div>
      <div v-if="isLoggedIn" class="m-4 p-8 border rounded bg-gray-100 text-lg border-gray-300 hover:bg-white duration-300 " >
        <router-link to="/search" >ស្វែងរកឯកសារ</router-link>
      </div>
    </div>
    <div class="flex flex-wrap bottom-0 mx-auto w-full fixed">
      <FooterComponent />
    </div>
  </div>
</template>
<script>

import { ref, computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useNotification, useMessage } from 'naive-ui'
import { isAuth, getUser , authLogout } from './../../plugins/authentication'
import FooterComponent from './../../components/footer/copy-right.vue'


export default {
  name: 'WelcomeTemplate' ,
  components: {
    /**
     * Component
     */
    FooterComponent
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const message = useMessage()
    const router = useRouter()
    const notify = useNotification()
    const dialog = useDialog()

    if( getUser() == undefined && getUser() == null ){
      router.push('/')  
    }

    /**
     * Check the authentication of the user
     */
    const isLoggedIn = computed(()=>{
      return isAuth()
    })

    function logout(){
      if( isAuth() ){
        dialog.warning({
          title : 'ចាកចេញ' ,
          content: () => 'តើអ្នកចង់ចាកចេញពីប្រព័ន្ធមែនទេ?' ,
          positiveText: 'បាទ / ចាស',
          negativeText: 'ទេ',
          onPositiveClick: () => {
            authLogout()
            router.push('/login')
          },
          onNegativeClick: () => {}
        })
      }
    }

    return {
      /**
       * Variables
       */

      /**
       * Functions
       */
       isLoggedIn
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
