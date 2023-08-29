<template>
  <div>
    <top-menu />
    <div class="flex w-full h-20 p-2 border-b z-50" >
      <div class="flex-grow px-4 py-3">
        <!-- Search box -->
        <div class="relative " >
          <input type="text" placeholder="សួមដកឃ្លាដើម្បីបន្ថែមលក្ខណស្វែងរក ..." @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 pl-4 pr-10 h-10 w-full rounded-full border border-gray-200 transition duration-500 focus:border-blue-600 hover:border-blue-600 text-xs" />
          <Icon size="30" class="absolute right-1 top-1 text-gray-400 cursor-pointer" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
        </div>
        <!-- Search box -->
      </div>
    </div>
    <!-- Public folder -->
    <Transition name="fade" >
      <div v-if="Array.isArray( folders ) && folders.length > 0" class="flex flex-wrap z-40">
        <div class="vcb-result-message w-full m-8 mb-0 border-b border-gray-100 pb-4 text-left font-bold">ថតឯកសារសាធារណៈ ៖ </div>
        <!-- Table of crud -->
        <div class="vcb-table-panel flex flex-row w-full ">
          <div v-for="(folder,index) in folders" :key="index" >
            <router-link :to="'/global/'+folder.id+'/regulators'" class="h-20 bg-gray-100 p-4 pr-6 rounded m-8 cursor-pointer hover:shadow relative flex flex-wrap" >
              <svg class="w-12 h-12 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
              <div class="global-folder-name inline-block align-middle h-8 leading-10 font-bold my-2" >{{  folder.name }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
    <!-- End public folder -->
    <Transition name="fade" >
      <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="flex flex-wrap z-40 text-xs">
        <div class="vcb-result-message w-full m-4 pb-2 border-b border-gray-100 text-left font-bold">លទ្ធផលនែការស្វែងរកគឺ ៖ <span class="text-lg text-blue-500">{{ table.pagination.totalRecords }}</span></div>
        <!-- Table of crud -->
        <div class="vcb-table-panel flex flex-row w-full mb-24 ">
          <div class="vcb-table w-full" >
            <div v-for="(document, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
              <div class="vcb-table-cell font-bold mb-2 leading-6 text-justify break-words text-xs" v-html="( index + 1 ) + ' . ' + applyTagMark(document.objective)" ></div>
              <div  class="vcb-table-cell text-xs" >
                លេខចុះ ៖ {{ document.fid }} 
                កាលបរិច្ឆែទ ៖ {{ document.type != undefined ? ' - ' + document.type.name : '' }} - {{ document.document_year.slice(0,10) }} 
                <!-- {{ document.createdBy != undefined ? ( ' - ' + document.createdBy.lastname + ' ' + document.createdBy.firstname ) : '' }} -->
              </div>
              <div class="vcb-table-actions-panel h-5 absolute bottom-0 right-0 text-right">
                <n-icon v-if="document.pdf"  size="20" class="cursor-pointer text-red-500 ml-4"  @click="showShareModalPopup(document)" title="មើលឯកសារ" alt="មើលឯកសារ" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M7.503 13.002a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-.5H8.5a1.5 1.5 0 0 0 0-3h-.997zm.997 2h-.497v-1H8.5a.5.5 0 1 1 0 1zm6.498-1.5a.5.5 0 0 1 .5-.5h1.505a.5.5 0 1 1 0 1h-1.006l-.001 1.002h1.007a.5.5 0 0 1 0 1h-1.007l.002.497a.5.5 0 0 1-1 .002l-.003-.998v-.002l.003-2.002zm-3.498-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h.498a2 2 0 0 0 0-4H11.5zm.5 3v-2a1 1 0 0 1 0 2zM20 20v-1.164c.591-.281 1-.884 1-1.582V12.75c0-.698-.409-1.3-1-1.582v-1.34a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7.168c-.591.281-1 .884-1 1.582v4.504c0 .698.409 1.3 1 1.582V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-2 .5H6a.5.5 0 0 1-.5-.5v-.996h13V20a.5.5 0 0 1-.5.5zm.5-10.5v1h-13V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5zm-1.122-1.5H14a.5.5 0 0 1-.5-.5V4.621L17.378 8.5zm-12.628 4h14.5a.25.25 0 0 1 .25.25v4.504a.25.25 0 0 1-.25.25H4.75a.25.25 0 0 1-.25-.25V12.75a.25.25 0 0 1 .25-.25z" fill="currentColor"></path></g></svg>
                </n-icon>
                <n-icon v-if="isLoggedIn"  size="20" class="cursor-pointer text-blue-700 font-bold ml-4" title="ដាក់ឯកសារចូលថត" alt="ដាក់ឯកសារចូលថត" @click="showFolderModalPopup(document)" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
                </n-icon>
              </div>
            </div>
          </div>
          <!-- Loading -->
          <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
            <div class="flex mx-auto items-center">
              <div class="spinner text-lg">
                <Icon size="80" class="animate-spin  text-blue-500" >
                  <Refresh />
                </Icon><br/><br/>កំពុងអាន...
              </div>
            </div>
            <div class="absolute top-3 right-3 cursor-pointer " @click="closeTableLoading" >
              <Icon size="40" class="text-red-600" >
                <CloseCircleOutline />
              </Icon>
            </div>
          </div>
          <!-- PDF Dialog -->
          <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white z-50 ">
            <Transition name="fade" >
              <vue-pdf-embed v-if="!showShareModalLoading" :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
            </Transition>
            <div v-if="!showShareModalLoading" class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
              <svg class="w-12 h-12 mr-4 mt-0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
            </div>
            <!-- <div v-if="!showShareModalLoading" class="absolute top-3 right-20 cursor-pointer " @click="copyShareLink" >
              <svg v-if="isLoggedIn" class="w-8 h-8 mr-4 mt-2 cursor-pointer font-bold ml-4"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><path d="M383.822,344.427c-16.045,0-31.024,5.326-41.721,15.979l-152.957-88.42c1.071-5.328,2.142-9.593,2.142-14.919
                c0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762,10.653,26.741,17.041,43.852,17.041c35.295,0,64.178-28.766,64.178-63.92
                C448,72.767,419.117,44,383.822,44c-35.297,0-64.179,28.767-64.179,63.92c0,5.327,1.065,9.593,2.142,14.919l-150.821,87.35
                c-11.767-10.654-26.741-17.041-43.856-17.041c-35.296,0-63.108,28.766-63.108,63.92c0,35.153,28.877,63.92,64.178,63.92
                c17.115,0,32.089-6.389,43.856-17.042l151.891,88.421c-1.076,4.255-2.141,8.521-2.141,13.847
                c0,34.094,27.806,61.787,62.037,61.787c34.229,0,62.036-27.693,62.036-61.787C445.858,372.12,418.052,344.427,383.822,344.427z"></path></g></g></svg>
            </div> -->
            <div v-if="showShareModalLoading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
              <div class="flex mx-auto items-center">
                <div class="spinner text-lg">
                  <Icon size="80" class="animate-spin  text-blue-500" >
                    <Refresh />
                  </Icon><br/><br/>កំពុងផ្ទុកឯកសារ...
                </div>
              </div>
              <div class="absolute top-3 right-3 cursor-pointer " @click="showShareModalLoading=false" >
                <Icon size="40" class="text-red-600" >
                  <CloseCircleOutline />
                </Icon>
              </div>
            </div>
          </div>
          <!-- End PDF Dialog -->
        </div>
        <!-- Pagination of crud -->
        <div class="fixed left-0 right-0 bottom-12 flex" >
          <div class="vcb-table-pagination">
            <!-- First -->
            <!-- Previous -->
            <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div>
            <!-- Pages (7) -->
            <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold' + (table.pagination.page == page ? ' bg-blue-500 text-white  rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
              <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
            </div>
            <!-- Next -->
            <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div>
            <!-- Last -->
            <!-- Go to -->
            <!-- Total per page -->
          </div>
        </div>
      </div>
    </Transition>
    <!-- Folder modal selection -->
    <n-modal v-model:show="showFolderModal" @on-after-leave="showFolderModal.value=false" >
      <n-card
        style="width: 600px"
        title="សូមជ្រើសរើសថតឯកសារ"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <!-- <template #header-extra>
          Oops!
        </template> -->
        <!-- Where the available folder of the user -->
        <div v-for="(folder, index) in listFolders.value" :key="index" class="p-2 cursor-pointer hover:bg-gray-100 rounded duration-500 flex" 
        >
          <div class="flex-grow">
            {{ (index +1 ) + '. ' + folder.name }}
          </div>
          <Icon v-if="!folder.exists" size="20" class="text-gray-600 flex-none" @click="addDocumentToFolder(folder)"  >
            <CheckboxChecked20Regular />
          </Icon>
          <Icon v-if="folder.exists" size="20" class="text-green-600 flex-none" @click="removeDocumentFromFolder(folder)"  >
            <CheckboxChecked20Regular />
          </Icon>
        </div>  
        <!-- <template #footer>
          Footer
        </template> -->
      </n-card>
    </n-modal>
    <!-- End folder modal selection -->
    <!-- Share file modal  -->
    <n-modal v-model:show="showShareModal" @on-after-leave="showShareModal.value=false" >
      <n-card
        title="សូមជ្រើសរើសឯកសារដើម្បីមើល"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        class="w-3/5"
      >
        <!-- <template #header-extra>
          Oops!
        </template> -->
        <!-- Where the available folder of the user -->
        <div v-for="(pdf, index) in shareDocumentPdfs" :key="index" class="flex flex-wrap justify-center " >
          <svg @click="pdfPreview(shareDocument)" class="shareDocumentPdf" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2h4z" fill="currentColor"></path><path d="M19 26h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-2-2h2a1.001 1.001 0 0 0 1-1v-4a1.001 1.001 0 0 0-1-1h-2z" fill="currentColor"></path><path d="M11 16H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3z" fill="currentColor"></path><path d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2zm-8-4V4.4l5.6 5.6z" fill="currentColor"></path></svg>
        </div>  
        <!-- <template #footer>
          Footer
        </template> -->
      </n-card>
    </n-modal>
    <!-- End share file modal -->
    <div class="flex flex-wrap bottom-0 mx-auto w-full fixed">
      <FooterComponent />
    </div>
  </div>
</template>
<script>
import { isAuth, getUser , authLogout } from './../../plugins/authentication'
import FooterComponent from './../../components/footer/copy-right.vue'
import { Key20Regular } from "@vicons/fluent";
import { AlternateEmailOutlined } from '@vicons/material'
import { ref, computed, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDialog, useNotification, useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { Search20Regular , DocumentPdf24Regular, Folder20Regular, CheckboxChecked20Regular } from '@vicons/fluent'
import { IosRefresh } from '@vicons/ionicons4'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { Refresh } from '@vicons/tabler'
import VuePdfEmbed from 'vue-pdf-embed'
import TopMenu from './../../components/menu/topmenu.vue'

export default {
  name: 'WelcomeTemplate' ,
  components: {
    CloseCircleOutline ,
    IosRefresh, 
    Refresh ,
    DocumentPdf24Regular, 
    FooterComponent ,
    Search20Regular ,
    Icon ,
    VuePdfEmbed ,
    Folder20Regular ,
    CheckboxChecked20Regular ,
    TopMenu
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
    const subMenuHelper = ref(false)
    const showFolderModal = ref(false)
    const listFolders = reactive([])
    const selectedDocumentId = ref(0)

    if( getUser() == undefined && getUser() == null ){
      router.push('/welcome')  
    }

    /**
     * Data
     */

    const profilePicture = computed(() => {
      let user = getUser()
      return user !== null && user.avatar_url !== null ? user.avatar_url : null 
    })

    /**
     * Variables
     */    
    const model = reactive( {
      name: "search_regulator" ,
      title: "លិខិតបទដ្ឋានគតិយុត្ត"
    })
    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })
    const filterPanel = ref(false)
    /**
     * Login function
     */
    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( goTo(1) , 500 )
      }
    }

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination

        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
        }

        closeTableLoading()
      }).catch( err => {
        notify.warning({
          title : "កំហុសលេខ ៖ " + err.response.status ,
          content: err.response.data.message
          // content: "ការប្រើប្រាស់មានចំនួនច្រើន សូមរងចាំ បន្តិច ។"
        })
        console.log( err )
        table.loading = false
      })
    }
    function closeTableLoading(){
      table.loading = false
    }

    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    function applyTagMark(str){
      // Split the string by whitespace
      if( table.search.trim() != "" ){
        var arrStrSearch = table.search.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    }

    /**
     * Check the authentication of the user
     */
    const isLoggedIn = computed(()=>{
      return isAuth()
    })
  
    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    function pdfPreview(record){
      showShareModal.value = false
      pdf.viewer = true
      showShareModalLoading.value = true
      if( record.pdf ){
        store.dispatch('search_regulator/pdf',{
          // id:record.id 
          serial : record.pdf
        })
          .then( res => {
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            showShareModalLoading.value = false
            // notify.success({
            //   title: "បង្ហាញឯកសារយោង" ,
            //   content: res.data.message ,
            //   duration: 3000
            // })
          }).catch( err => {
            notify.error({
              title: "បង្ហាញឯកសារយោង" ,
              content: err.response.data.message ,
              duration: 3000
            })
          })
      }else{
        notify.info({
          title: 'ឯកសារយោង' ,
          description: "មិនមានឯកសារយោងសម្រាប់បង្ហាញ" ,
          duration: 3000
        })  
      }
    }
    function closePdf(){
      pdf.url = ""
      pdf.viewer = false 
      shareDocument.value = null
    }

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

    function getFolders(){
      store.dispatch('folder/listDocumentWithValidation',{
        search: '' ,
        page: 1 ,
        perPage: 50 ,
        document_id : selectedDocumentId.value
      }).then( res => {
        listFolders.value = res.data.records
      }).catch( err => {
        console.log( err.response )
      })
    }

    function showFolderModalPopup(document){
      showFolderModal.value = true
      /**
       * Mark the selected document
       */
      selectedDocumentId.value = document.id
      getFolders()
    }

    function closeFolderModalPopup(){
      showFolderModal.value = false
      listFolders.value = []
      selectedDocumentId.value = 0
    }

    function addDocumentToFolder(folder){
      store.dispatch('folder/addRegulator',{
        id: folder.id ,
        document_id : selectedDocumentId.value
      }).then( res => {
        notify.success({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.data.message ,
          duration: 3000
        })
        showFolderModal.value = false
        getFolders()
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    function removeDocumentFromFolder(folder){
      store.dispatch('folder/removeRegulator',{
        id: folder.id ,
        document_id : selectedDocumentId.value
      }).then( res => {
        notify.success({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.data.message ,
          duration: 3000
        })
        showFolderModal.value
        getFolders( )
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដកឯកសារចេញពីថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    const showShareModal = ref(false)
    const showShareModalLoading = ref(false)
    const shareDocumentPdfs = ref([])
    const shareDocument = ref(null)
    function showShareModalPopup(document){
      shareDocument.value = document
      showShareModal.value = true
      shareDocumentPdfs.value = []
      if( Array.isArray( document.pdf ) ){
        shareDocumentPdfs.value = document.pdf
        showShareModal.value = true
      }else if( typeof document.pdf == 'string' ){
        shareDocumentPdfs.value.push( document.pdf )
        pdfPreview(shareDocument.value)
      }
    }
    function closeShareModalPopup(){
      shareDocumentPdfs.value = []
      shareDocument.value = null
      showShareModal.value = false
    }
    function copyShareLink(){
      if (window.isSecureContext) {
        navigator.clipboard.writeText(window.origin+"/#/globalshare/"+shareDocument.value.pdf)
        message.info("អសយដ្ឋាន សម្រាប់ចែករំលែកឯកសារនេះបាន ចម្លងទុកក្នុង Clipboart ។")
      } else {
        dialog.info({
          title: 'ចែករំលែកឯកសារ',
          content: () => 'អសយដ្ឋាននៃឯកសារ សម្រាប់ចែករំលែក ៖ ' + window.origin+"/#/globalshare/"+shareDocument.value.pdf ,
          // action: () => 'បិទ'
        })
      }
    }

    const folders = ref([]) 
    function getGlobalFolders(){
      store.dispatch('folder/globalFolder',{
        page: 1 ,
        perPage: 10 ,
        search : ''
      }).then( res => {
        if( res.data.ok ){
          folders.value = res.data.records
        }
      }).catch( err => {
        console.log( err )
      })
    }
    

    /**
     * Start fetching records
     */
    getGlobalFolders()
    getRecords()

    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf ,
      subMenuHelper ,
      showFolderModal ,
      listFolders ,
      /**
       * Table
       */
      filterRecords ,
      pdfPreview ,
      closePdf ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      paginationButtons ,
      isLoggedIn ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Functions
       */
      logout ,
      addDocumentToFolder ,
      removeDocumentFromFolder ,
      showFolderModalPopup ,
      applyTagMark ,
      /**
       * Components
       */
      Key20Regular ,
      AlternateEmailOutlined ,
      /**
       * Show share modal
       */
      showShareModal ,
      showShareModalPopup ,
      closeShareModalPopup ,
      shareDocument ,
      shareDocumentPdfs ,
      copyShareLink ,
      profilePicture ,
      /**
       * Public folder
       */
      folders ,
      showShareModalLoading
    }
  },
  mounted(){
  }
}
</script>
<style scoped>
  .shareDocumentPdf {
    @apply text-red-500 m-8 w-48 h-48 p-8 cursor-pointer shadow border border-gray-100 rounded hover:border-gray-300 duration-300 ;
  }
</style>
