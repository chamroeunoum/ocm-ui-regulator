<template>
  <div class="flex flex-wrap content-center z-50 relative " >
    <!-- Start transaction of the apps -->
    <Transition  name="fade" >
        <!-- Apps -->
        <div v-if="toggleApps || show" class="
        fixed top-0 bottom-0 left-0 right-0 
        z-40 flex flex-wrap content-start w-full px-4 py-16 
        sm:px-4 md:px-4 lg:p-24 xl:p-24 
        bg-opacity-50
        backdrop-filter backdrop-brightness-50 backdrop-blur-xl
        overflow-y-auto">
            <!-- Search -->
            <!-- <div class='absolute top-0 left-0 right-0 flex flex-wrap content-center w-2/5 py-4 m-auto md:w-2/5 xl:w-1/5 lg:w-1/5 ' >
                <n-input 
                  placeholder="ស្វែងរក ..." 
                  clearable 
                  v-model:value="search" 
                  @keyup="filterApps()"  
                  class="text-left rounded-full"
                ></n-input>
            </div> -->
            <!-- End search -->
            <!-- Apps -->
            <div class="flex flex-wrap justify-center w-full apps overflow-y-auto">
                <div 
                  v-for="(app, index) in matchedApps" :key="index" 
                  @click="toggleAppFunc(app.url);$router.push(app.url)" 
                  class="py-4 px-8 m-4 hover:scale-110 transform-gpu duration-200 text-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div class='w-full dashboard-widget-link' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " v-html="app.svg" ></div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" v-html="app.name" ></div>
                    </div>
                </div>
                <div class="py-4 px-8 m-4 hover:scale-110 transform-gpu duration-200 text-center  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div @click="logout()" class='w-full dashboard-widget-link' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
                      </div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" >ចាកចេញ</div>
                    </div>
                </div>
                <div class="py-4 px-8 m-4 hover:scale-110 transform-gpu duration-200 text-center  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg">
                    <div v-if="!showLuncher" @click="close()" class='w-full dashboard-widget-link' >
                      <div class="text-gray-100 w-16 mx-auto my-2 " >
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
                      </div>
                      <div class="font-pvh p-2 m-auto text-xs text-center text-gray-100" >បិទផ្ទាំងមុខងារ</div>
                    </div>
                </div>

            </div>
            <!-- End apps -->
            <!-- Apps launcher -->
            <!-- <div class='absolute bottom-0 left-0 right-0 z-50 flex flex-wrap justify-center w-full py-4' >
              <div v-if="!showLuncher" @click="close()" class="w-12 h-12 p-1 mx-auto text-center bg-gray-100 bg-opacity-20 rounded-full shadow-md border-2 border-gray-300 cursor-pointer duration-300 transform-gpu hover:scale-110 text-gray-200" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
              </div>
              <div v-if="!showLuncher" @click="toggleAppFunc()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect></svg>
              </div>
              <div v-if="!showLuncher" @click="logout()" class="w-14 h-14 p-2 -mt-20 mx-2 ml-8 text-center text-red-600 bg-white rounded-full shadow-md border border-gray-300 cursor-pointer " >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6zM13.743 4a.5.5 0 1 0-.499.867a6.5 6.5 0 1 1-6.494.004a.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4z" fill="currentColor"></path></g></svg>
              </div>
            </div> -->
        </div>
    </Transition>
    <!-- End transaction of the apps -->
  </div>
</template>

<script>
import { reactive, ref , computed, onMounted } from 'vue'
import { isAuth, authLogout , isAdmin , getUser } from './../../plugins/authentication'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDialog , useMessage } from 'naive-ui'
export default {  
  components: {
  } ,
  name: 'dock' ,
  props: {
    show : false ,
    showLuncher: false ,
    close: {
      type: Function
    } ,
  },
  setup(props){
    
    let search = ref(null)
    let apps = ref([
      {
          url: '/search' ,
          icon: '' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.44 9.439A1.495 1.495 0 0 1 7.5 9h5a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5H9.121l-.56-.56A4.482 4.482 0 0 0 9 13.5V15h3.5a.5.5 0 0 0 .5-.5V13H9v.5a4.481 4.481 0 0 0-1-2.829V10h-.5a.5.5 0 0 0-.145.021a4.503 4.503 0 0 0-.915-.582zM13 10.5a.5.5 0 0 0-.5-.5H9v2h4v-1.5zM5 9.027a4.551 4.551 0 0 0-1 0V4a2 2 0 0 1 2-2h4.586a1.5 1.5 0 0 1 1.06.44l3.915 3.914A1.5 1.5 0 0 1 16 7.414V16a2 2 0 0 1-2 2h-3.085a1.495 1.495 0 0 0-.354-.56l-.44-.44H14a1 1 0 0 0 1-1V8h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v5.027zM11.5 7h3.293L11 3.207V6.5a.5.5 0 0 0 .5.5zm-4.197 8.596a3.5 3.5 0 1 0-.707.707l2.55 2.55a.5.5 0 1 0 .708-.707l-2.55-2.55zM7 13.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0z" fill="currentColor"></path></g></svg>' ,
          name: 'ឯកសារគិតយុត្ត',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
            4, // client
          ]
      },
      {
          url: '/folders' ,
          icon: '' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>' ,
          name: 'ថតឯកសារ',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
            4, // client
          ]
      },
      {
          url: '/profile' ,
          icon: '' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>' ,
          name: 'ព៌ត័មានខ្ញុំ',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
            4, // client
          ]
      },
      {
          url: '/password/change' ,
          icon: '' ,
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z" fill="currentColor"></path><circle cx="22" cy="10" r="2" fill="currentColor"></circle></svg>' ,
          name: 'ប្ដូរពាក្យសម្ងាត់',
          roles: [
            1, // Super
            2, // Administrator
            3, // backend
            4, // client
          ]
      }
    ])
    /** End app metadata */
    let toggleApps = ref(false)
    let user = reactive({})

    let matchedApps = ref([])
    function filterApps(){
      matchedApps.value = []
      /**
       * Filter the apps base on the search string
       */
      matchedApps.value = ( search.value != null && search.value.trim() != '' ) 
      ? apps.value.filter( app => app.name.indexOf( search.value ) != -1 )
      : apps.value
      /**
       * Filter the apps base on the user role
       */
      let userRoleIds = ( getUser() != null && getUser().roles != undefined && Array.isArray( getUser().roles ) ) ? getUser().roles.map(r=>r.id) : false
      
      /**
       * Error getting user role
       */
      matchedApps.value = matchedApps.value.filter( 
        app => app.roles.find( 
          role => userRoleIds.includes(role)
        ) 
      )
    }
    
    function toggleAppFunc(url){
      // if( url == route.path ) props.close()
      toggleApps.value = !toggleApps
      props.close()
    }
    function logoutConfirmation(){
        console.log( "confirm before logout" )
    }

    const dialog = useDialog();
    const message = useMessage();
    const store = useStore();
    const router = useRouter()
    const route = useRoute()

    async function logout(){
      const d = dialog.warning({
        title: 'ចាកចេញ',
        content: 'តើអ្នកចង់ចាកចេញមែនទេ?',
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          /**
           * Check whether the user has logged out already
           */
          if( isAuth() ) {
            /**
             * Show confirm dialog
             */
            d.loading = true
            store.dispatch('auth/logout').then( res => {
              message.success("អ្នកបានចាកចេញដោយជោគជ័យ។")
              d.loading = false
            }).catch( err => {
              console.log( err )
            })
            authLogout()
            window.location.href = '/'
          }else{
            window.location.href = '/login'
          }
        },
        // onNegativeClick: () => {
        //   message.error('Not Sure')
        // }
      })
    }
    function isAdminAccount(){
      return isAdmin()
    }

    filterApps()

    return {
      logout ,
      search ,
      matchedApps ,
      apps ,
      toggleApps ,
      user ,
      filterApps ,
      toggleAppFunc ,
      logoutConfirmation ,
      isAdminAccount 
    }
  }
}
</script>
<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>