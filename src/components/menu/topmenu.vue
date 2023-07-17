<template>
  <div class="font-pvh flex w-full h-16 p-2 mb-4 border-b border-gray-300" >
    <div class="flex-none w-12 h-12">
      <router-link to="/dashboard">
        <img src="./../../assets/logo.png" class="w-full rounded-full p-1 bg-gray-100" alt="SCT Logo" title="SCT Logo" />
      </router-link>
    </div>
    <div class="flex-grow h-12 text-xl leading-10 text-left pl-4 pt-1 ">{{ systemName }}</div>
    <div class="flex-none ">
      <!-- User profile -->
      <div v-if="isLoggedIn" class="relative w-12 h-12 "  >
        <!-- <div class="w-12 h-12 rounded-full" >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mt-2" fill="none" viewBox="0 0 24 24" stroke="#195598">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div> -->
        <div class="w-12 h-12 rounded-full overflow-hidden" @click="subMenuHelper=!subMenuHelper" >
          <svg v-if="profilePicture==null" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <img v-if="profilePicture!=null" :src="profilePicture" class="h-12 cursor-pointer" />
          <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 550 550" class="pt-2 " @click="subMenuHelper=!subMenuHelper" >
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path>
          </svg> -->
        </div>
        <div v-if="subMenuHelper" class="submenu fixed bg-white shadow-md left-0 right-0 top-0 p-4 flex flex-wrap text-left z-50 ">
          <router-link to="/welcome" class="searchDocument w-32 h-32 m-2 p-4 rounded border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow duration-300 " >
            <div class="submenu-icon h-24 flex flex-wrap justify-center text-center">
              <svg class="flex-none mx-auto h-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.44 9.439A1.495 1.495 0 0 1 7.5 9h5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H9.121l-.56-.56A4.482 4.482 0 0 0 9 13.5V15h3.5a.5.5 0 0 0 .5-.5V13H9v.5a4.481 4.481 0 0 0-1-2.829V10h-.5a.5.5 0 0 0-.145.021a4.503 4.503 0 0 0-.915-.582zM13 10.5a.5.5 0 0 0-.5-.5H9v2h4v-1.5zM5 9.027a4.551 4.551 0 0 0-1 0V4a2 2 0 0 1 2-2h4.586a1.5 1.5 0 0 1 1.06.44l3.915 3.914A1.5 1.5 0 0 1 16 7.414V16a2 2 0 0 1-2 2h-3.085a1.495 1.495 0 0 0-.354-.56l-.44-.44H14a1 1 0 0 0 1-1V8h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v5.027zM11.5 7h3.293L11 3.207V6.5a.5.5 0 0 0 .5.5zm-4.197 8.596a3.5 3.5 0 1 0-.707.707l2.55 2.55a.5.5 0 1 0 .708-.707l-2.55-2.55zM7 13.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0z" fill="currentColor"></path></g></svg>
              <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ស្វែងរក</div>
            </div>
          </router-link>
          <router-link to="/regulators" class="myRegulators w-32 h-32 m-2 p-4 rounded border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow duration-300 " >
            <div class="submenu-icon h-24 flex flex-wrap justify-center text-center">
              <svg class="flex-none mx-auto h-16 text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
              <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ឯកសារ</div>
            </div>
          </router-link>
          <router-link to="/folders" class="myFolders w-32 h-32 m-2 p-4 rounded border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow duration-300 " >
            <div class="submenu-icon h-24 flex flex-wrap justify-center text-center">
              <svg class="flex-none mx-auto h-16 text-yellow-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
              <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ថតឯកសារ</div>
            </div>
          </router-link>
          <router-link to="/profile" class="myProfile w-32 h-32 m-2 p-4 rounded border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow duration-300 " >
            <div class="submenu-icon h-24 flex flex-wrap justify-center text-center">
              <svg class="flex-none mx-auto h-16 text-blue-500 " xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="#0066FF">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ព៌ត័មានខ្ញុំ</div>
            </div>
          </router-link>
          <router-link to="/password/change"  class="changePassword w-32 h-32 m-2 p-4 rounded border border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow duration-300 " >
            <div class="submenu-icon h-24 flex flex-wrap justify-center text-center">
              <svg class="flex-none mx-auto h-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z" fill="currentColor"></path><circle cx="22" cy="10" r="2" fill="currentColor"></circle></svg>
              <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ប្ដូរពាក្យសម្ងាត់</div>
            </div>
          </router-link>
          <div class="logout w-32 h-32 m-2 p-4 rounded border border-gray-200 text-center cursor-pointer hover:border-gray-300 hover:shadow duration-300 " @click="logout()" >
            <svg class="flex-none mx-auto h-16 text-red-500" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
              <g fill="none" ><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g>
            </svg>
            <div class="submenu-icon-title h-8 w-full leading-9 font-bold" >ចាកចេញ</div>
          </div>
          <div class="relative w-full mt-4 " >
            <svg @click="subMenuHelper=!subMenuHelper" class="w-32 hover:bg-gray-100 hover:border border-gray-200 duration-300 rounded h-6 p-1 mx-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 512"><path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>
      <!-- End of user profile-->
      <!-- User profile -->
      <div v-if="!isLoggedIn" class="w-12 h-12 cursor-pointer " @click="$router.push('/login')" >
        <div class=" leading-10 p-1 my-2 mr-2 w-12 h-12 rounded-full bg-blue-500 text-white" >
          ចូល
        </div>
      </div>
      <!-- End of user profile-->
    </div>
  </div>
</template>

<script >
import { computed, ref  } from 'vue'
import { useStore } from 'vuex'
import { useRoute , useRouter } from 'vue-router'
import { isAuth , getUser , authLogout } from './../../plugins/authentication'
import { useDialog, useNotification, useMessage } from 'naive-ui'
export default {
  name: 'Topmenu'  ,
  setup(){
    const store = useStore()
    const dialog = useDialog()
    const router = useRouter()
    const route = useRoute()

    const subMenuHelper = ref(false)

    const systemName = computed( () => {
      return store.state.system.name != "" ? store.state.system.name : 'ប្រព័ន្ធបណ្ដុំឯកសារ'
    })
    const username = computed(() => {
      let user = getUser()
      return user !== null ? user.lastname + ' ' + user.firstname : "" 
    })

    const profilePicture = computed(() => {
      let user = getUser()
      return user !== null && user.avatar_url !== null ? user.avatar_url : null 
    })
    
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
      username ,
      profilePicture ,
      isLoggedIn ,
      subMenuHelper ,
      systemName ,
      logout
    }
  }
}
</script>