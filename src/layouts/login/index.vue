<template>
  <div class="flex justify-center">
    <div class="w-full mx-8 sm:w-1/2 md:w-2/4 lg:w-2/5 xl:w-1/4 p-8 mt-24">
      <div class="w-28 mx-auto my-4">
        <img src="./../../assets/ocmlogo.png" alt="SASTRA Logo" class="w-full" >
      </div>
      <div class="text-center" >
        <div class="my-2 text-md">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
        <div class="my-2 text-md">អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ</div>
        <div class="my-2 text-md">នាយកដ្ខានឯកសារអេឡិចត្រូនិច និងព័ត៌មានវិទ្យា</div>
      </div>
      <div class="w-full mx-auto my-8 text-lg ">ប្រព័ន្ធឯកសារអេឡិចត្រូនិច</div>
      <div class="w-full mx-auto my-8 text-left text-md">ចូលប្រព័ន្ធ</div>
      <n-space vertical>
        <n-input round 
          placeholder="អ៊ីមែល"
          v-model:value="credentials.email"
          clearable
          @keyup.enter="funcLogin"
        >
          <template #prefix>
            <n-icon size="12" class='text-gray-600 ' >
              <component :is="AlternateEmailOutlined" />
            </n-icon>
          </template>
        </n-input>
        <n-input round 
          placeholder="ពាក្យសំងាត់"
          v-model:value="credentials.password"
          type="password"
          clearable
          @keyup.enter="funcLogin"
        >
          <template #prefix>
            <n-icon size="12" class='text-gray-600 ' >
              <component :is="Key20Regular" />
            </n-icon>
          </template>
        </n-input>
      </n-space>
      <div class="w-full my-12">
        <n-button type="default" class="w-48 mr-4" @click="$router.push('/welcome')"  >
          ស្វែងរកឯកសារ
          <template #icon>
            <n-icon size="16" class='text-red-500 ' >
              <DocumentPdf />
            </n-icon>
          </template>
        </n-button>
        <n-button :loading="loading" @click="funcLogin" type="success" class="w-48"  >
          ចូល
          <template #icon>
            <n-icon size="16" class='text-white ' >
              <login />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="w-full mt-8">
        <router-link to="/register" class="w-50 px-8 text-blue-600"  >
          ចូលជាសមាជិកថ្មី
        </router-link>
        <router-link to="/password/forgot" class="w-48 px-8 text-blue-600"  >
          ភ្លេចពាក្យសម្ងាត់ ?
        </router-link>
      </div>
    </div>
    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import { getUser } from './../../plugins/authentication'
import FooterComponent from './../../components/footer/copy-right.vue'
import { Key20Regular } from "@vicons/fluent";
import { AlternateEmailOutlined } from '@vicons/material'
import { Login, DocumentPdf } from '@vicons/carbon'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'

export default {
  name: 'LoginTemplate' ,
  components: {
    Login ,
    DocumentPdf ,
    FooterComponent
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const router = useRouter()
    const notification = useNotification()

    if( getUser() !== undefined && getUser() !== null ){
      router.push('/welcome')  
    }
    
    /**
     * Data
     */
    const credentials = reactive({
        email: '' ,
        password: '' ,
      })
    const loading = ref( false )
    /**
     * Login function
     */
    function funcLogin(){
      if( credentials.email == "" || credentials.email == null ){
        notification.warning({
          title: "ព័ត៌មានមិនគ្រប់គ្រាន់" ,
          content: "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។"
        })
        return false
      }
      if( credentials.password == "" || credentials.password == null ){
        notification.warning({
          title: "ព័ត៌មានមិនគ្រប់គ្រាន់" ,
          content: "សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក រួចព្យាយាមម្ដងទៀត បាទ។"
        })
        return false
      }
      loading.value = true
      store.dispatch('auth/login',{
        email: credentials.email ,
        password: credentials.password
      }).then( res => {
        if( res.data.ok ){
          /**
           * Store the authenticated user into the store
           */
          store.commit('auth/setAuthentication',{
            user: res.data.record ,
            token: res.data.token ,
          })
          
          notification.success({
            title: "ចូលប្រព័ន្ធ " ,
            content: "សួស្ដី, " + res.data.record.lastname + ' ' + res.data.record.firstname ,
            duration:  1500,
            closable: false
          })
          router.push('/welcome')
          // if( res.data.user.role == 1 ){
          //   this.$router.push('/dashboard')
          // }else{
          //   this.$router.push('/receive')
          // }
        }else{
          notification.warning(res.data.message)
        }
        loading.value = false
      }).catch( err => {
        loading.value = false
        if( err.response !== null ){
          let message = err.response.status + ": " + err.response.statusText + ". " 
          if( err.response.data !== null ){
            for(var key in err.response.data.errors ){
              message += err.response.data.errors[key]
            }  
          }
          notification.error({
            content: 'បញ្ហា' ,
            meta: err.response.data.message !== "" ? err.response.data.message : message
          })
        }else{
          console.log( err.response )
        }
      });
    }
    /**
     * End login function
     */
    return {
      /**
       * data
       */
      credentials ,
      loading, 
      /**
       * Functions
       */
      funcLogin ,
      /**
       * Components
       */
      Key20Regular ,
      AlternateEmailOutlined ,
    }
  },
  mounted(){
    // console.log( this.credentials )
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.8rem;
}
</style>
