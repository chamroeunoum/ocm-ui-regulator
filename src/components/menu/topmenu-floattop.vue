<template>
  <div class="fixed top-0 right-0 left-0 flex border-gray-300 bg-white p-2 border-b h-12 font-pvh overflow-hidden" >
    <div class="flex-none m-1 w-5">
      <img :src="ocmLogoUrl" class="bg-white w-full"/>
    </div>
    <div class="flex-grow h-8 font-moul text-left text-xs leading-9">{{ store.state.system.name }}</div>
    <div class="text-right flex-none -mt-2 pr-2 w-40 h-8 font-moul text-xs leading-9">
      <div class=" font-moul text-gray-600" style="font-size: 0.5rem; " >{{ countesy }}</div>
      <div class="text-xs  font-moul" >{{ username }}</div>
    </div>
    <div class="flex-none w-8 h-8 cursor-pointer">
      <n-tooltip trigger="hover" >
        <template #trigger >
          <div @click="toggleDock" class="w-8 h-8 p-1 mx-auto text-center bg-gray-100 bg-opacity-20 rounded-full border text-blue-500  cursor-pointer" >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect x="64" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="64" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="216" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="64" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="216" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect><rect x="368" y="368" width="80" height="80" rx="40" ry="40" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></rect></svg>
          </div>
          <!-- <div class="rounded-full w-8 h-8 overflow-hidden" @click="toggleDock" >
            <svg v-if="profilePicture==null" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <img v-if="profilePicture!==null" :src="profilePicture" />
          </div> -->
        </template>
        ចុចដើម្បីបង្ហាញមុខងារផ្សេងៗទៀតក្នុងប្រព័ន្ធ
      </n-tooltip>
    </div>
  </div>
  <Dock v-bind:show="show" :close="function(){show=false}"/>
</template>

<script >
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../../plugins/authentication'
import Dock from './../widgets/dock.vue'
import ocmLogoUrl from './../../assets/logo.svg'

export default {
  name: 'Topmenu'  ,
  components: {
    Dock
  },
  setup(){
    const store = useStore()
    const show = ref(false)
    const username = computed(() => {
      let user = getUser()
      return user !== null 
        ? ( user.lastname + " " + user.firstname 
          // + ( user.roles != undefined && user.roles != null ? ' (' + user.roles[0].name + ')' : '' ) 
          )
        : "មិនមាន" 
    })
    const countesy = computed(() => {
      let user = getUser()
      return user !== null && user.person !== null
        ? user.person.countesies.map( c => c.name ).join(' ')
        : "" 
    })

    const profilePicture = computed(() => {
      let user = getUser()
      return user !== null && user.avatar_url !== null ? user.avatar_url : null 
    })
    
    function toggleDock(){
        show.value = true
    }

    return {
      username ,
      countesy ,
      profilePicture ,
      store ,
      show ,
      toggleDock ,
      ocmLogoUrl
    }
  }
}
</script>