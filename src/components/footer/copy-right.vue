<template>
  <div class="w-full py-1 text-gray-500 mx-auto break-words bg-white">
    <div class="text-center copy-rightleading-9 flex justify-center flex-wrap text-gray-400" @click="toggleAbout=true" >
      <div class="mx-2 p-1 h-5 text-xs" >
        &copy; រក្សារសិទ្ធិគ្រប់យ៉ាង ២០២៣
      </div>
      <div class="mx-2 p-1 h-5 text-xs " >
        នាយកដ្ឋានឯកសារអេឡិចត្រូនិច និងព័ត៌មានវិទ្យា
      </div>
    </div>
  </div>
  <n-modal v-model:show="toggleAbout" @on-after-leave="toggleAbout=false" class="bg-white rounded" >
    <div v-if="toggleAbout" class="about-us p-8 " >
      <div class="w-28 mx-auto my-4">
        <img src="./../../assets/logo.svg" alt="SASTRA Logo" class="w-full" >
      </div>
      <div class="w-full font-muol text-center leading-9 text-xs" >ក្រោមការងារណែនាំពី<br/>ឧបនាយករដ្ឋមន្ត្រី រដ្ឋមន្ត្រីទទួលបន្ទុកទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
      <div class="font-tactieng w-full text-center h-4 leading-4 text-4xl" >6</div>
      <div class="w-full text-center font-muol leading-9 text-xs" >ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច<br/>អភិវឌ្ឍន៍ដោយក្រុមការងារ<br/>នៃ<br/>នាយកដ្ឋានឯកសារអេឡិចត្រូនិច និងព័ត៌មានវិទ្យា<br/>កំណែប្រែ ២.០</div>        
    </div>
  </n-modal>
</template>
<script >
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
/**
 * CRUD component form
 */
export default {
  name: "Footer" ,
  setup(){
    
    const toggleAbout = ref(false)

    return {
      toggleAbout
    }
  }
}
</script>
<style scoped>
</style>