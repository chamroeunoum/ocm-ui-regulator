<template>
  <div>
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <div class="submenu-icon h-8 flex">
          <svg class="flex-none mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
          <div class="submenu-icon-title flex-grow w-full leading-9 leading-8 font-bold" v-html="model.title" ></div>
        </div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <div class="mt-1 ml-2">
          <!-- <n-button type="success" @click="showCreateModal()" >
            <template #icon>
              <n-icon>
                <Add20Regular />
              </n-icon>
            </template>
            បន្ថែម
          </n-button> -->
        </div>
        <div class="w-2/5 relative" >
          <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-9 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 " placeholder="ស្វែងរក" />
          <Icon size="27" class="absolute right-1 top-2 text-gray-400 hover:text-blue-700 cursor-pointer" @click="filterRecords(false)" >
            <n-icon>
              <Search20Regular />
            </n-icon>
          </Icon>
          <!-- <Icon size="27" class="absolute -left-10 top-2 text-gray-500 hover:text-blue-700 cursor-pointer" @click="filterPanel=!filterPanel">
            <n-icon>
              <Filter />
            </n-icon>
          </Icon> -->
        </div>
        <div class="mt-1 ml-2">
          <n-button type="default" @click="$router.push('/folders')" class="mx-2"  >
            <template #icon>
              <n-icon>
                <ArrowBackIosRound />
              </n-icon>
            </template>
            បកក្រោយ
          </n-button>
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative flex">
      <table class="vcb-table" >
        <tr class="vcb-table-headers" >
          <th class="vcb-table-header" >ល.រ</th>
          <th class="vcb-table-header">កម្មវត្ថុ</th>
          <th class="vcb-table-header">លេខ</th>
          <th class="vcb-table-header w-32">ប្រភេទ</th>
          <th class="vcb-table-header w-24">ថ្ងៃខែឆ្នាំ</th>
          <th class="vcb-table-header text-right w-28" >ប្រតិបត្តិការ</th>
        </tr>
        <tr v-for="(record, index) in table.records.matched" :key='index' class="vcb-table-row" >
          <td class="vcb-table-cell font-bold" >{{ index + 1 }}</td>
          <td class="vcb-table-cell" v-html="record.objective" ></td>
          <td  class="vcb-table-cell" >{{ record.fid }}</td>
          <td  class="vcb-table-cell" >{{ record.type.name }}</td>
          <td class="vcb-table-cell" >{{ record.document_year.slice(0,10) }}</td>
          <td class="vcb-table-actions-panel text-right" >
            <!-- <n-icon size="22" class="cursor-pointer text-blue-500" @click="showEditModal(record)" title="កែប្រែព័ត៌មាន" >
              <Edit20Regular />
            </n-icon>
             -->
            <!-- <n-icon size="22" :class="'cursor-pointer ' + (record.active == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
              <IosCheckmarkCircleOutline />
            </n-icon> -->
            <!-- <n-icon size="30" :class="'cursor-pointer ' + (record.pdf == 1 ? ' text-green-500 ' : ' text-gray-500 ') " @click="activateRegulator(record)" :title="record.active == 1 ? 'គណនីនេះកំពុងបើកតំណើរការ' : 'គណនីនេះកំពុងត្រូវបានបិទមិនអាចប្រើប្រាស់បាន' " >
              <DocumentPdf24Regular />
            </n-icon> -->
            <n-icon size="20" class="cursor-pointer text-red-500 p-2  pt-1  mx-1" @click="removeDocumentFromFolder(record)" title="ដកឯកសារចេញពីថត" >
              <TrashOutline />
            </n-icon>
            <!-- <n-icon size="20" class="cursor-pointer text-red-500 p-2 mx-1" @click="viewPdf(record)" title="មើលឯកសារយោង" >
              <DocumentPdf24Regular />
            </n-icon> -->
            <n-icon v-if="record.pdf != 1" size="20" class="cursor-pointer text-red-500 p-2 pt-1  mx-1"  @click="viewPdf(record)" title="មើលឯកសារ" alt="មើលឯកសារ"  >
              <DocumentPdf24Regular />
            </n-icon>
          </td>
        </tr>
      </table>
      <!-- Loading -->
      <div v-if="table.loading" class="table-loading absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-75 ">
        <div class="spinner mt-24">
          <Icon size="40" class="animate-spin  text-blue-500" >
           <IosRefresh />
          </Icon><br/><br/>
          កំពុងអាន...
        </div>
        <div class="absolute top-3 right-3 " @click="closeTableLoading" >
          <Icon size="40" class="text-red-600" >
           <CloseCircleOutline />
          </Icon>
        </div>
      </div>
      <!-- PDF Dialog -->
      <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white ">
        <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
        <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
          <Icon size="40" class="text-red-600" >
            <CloseCircleOutline />
          </Icon>
        </div>
      </div>
      <!-- End PDF Dialog -->
    </div>
    <!-- Pagination of crud -->
    <div class="vcb-table-pagination">
      <!-- First -->
      <!-- Previous -->
      <div class="vcb-pagination-page" v-html='"<"' @click="previous()" ></div>
      <!-- Pages (7) -->
      <div v-for="(page, index) in table.pagination.buttons" :key="index" class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="table.pagination.page == page ? false : goTo(page) " >
        <div :class="'page w-8 h-8 text-center align-middle leading-8 cursor-pointer' + (table.pagination.page == page ? ' text-blue-500' : '' ) ">{{ page }}</div>
      </div>
      <!-- Next -->
      <div class="vcb-pagination-page" v-html='">"' @click="next()" ></div>
      <!-- Last -->
      <!-- Go to -->
      <!-- Total per page -->
    </div>
    <!-- Filter panel of crud -->
    <div v-if="filterPanel" class="vcb-filter-panel h-64">
      <div class="filter-container relative w-full flex">
        <Icon size="40" class="absolute right-0 top-0 cursor-pointer text-red-700" @click="filterPanel=!filterPanel" >
          <CloseCircleOutline />
        </Icon>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { Switcher, Filter, DataStructured } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { ArrowBackIosRound } from '@vicons/material'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular } from '@vicons/fluent'
import VuePdfEmbed from 'vue-pdf-embed'
/**
 * CRUD component form
 */
export default {
  name: "FolderRegulator" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    IosRefresh ,
    CloseCircleOutline ,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter,
    ArrowBackIosRound ,
    VuePdfEmbed
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const route = useRoute()
    /**
     * Variables
     */    
    const model = reactive( {
      name: "FolderRegulator" ,
      title: "ឯកសារដែលបានរក្សារទុក"
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
      store.dispatch("folder/regulators",{
        id: route.params.id ,
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page
      }).then(res => {
        console.log( res )
        if( res.data.ok ){
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
        }else{
          notify.warning({
            title: 'អានឯកសារ' ,
            description: res.data.message ,
            duration: 3000
          })
        }
        closeTableLoading()
      }).catch( err => {
        notify.warning({
            title: 'អានឯកសារ' ,
            description: err.response.data.message ,
            duration: 3000
          })
          closeTableLoading()
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

    function removeDocumentFromFolder(document){
      dialog.warning({
        title: "ដកឯកសារ" ,
        content: "តើអ្នកចង់ ដកឯកសារនេះចេញមែនទេ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('folder/removeRegulator',{
            id: route.params.id ,
            document_id : document.id
          }).then( res => {
            notify.success({
              title: "ដកឯកសារចេញពីថត" ,
              content: res.data.message ,
              duration: 3000
            })
            getRecords()
          }).catch( err => {
            console.log( err.response.data )
            notify.error({
              title: "ដកឯកសារចេញពីថត" ,
              content: res.response.data.message ,
              duration: 3000
            })
          })
        },
        onNegativeClick: () => {
        }
      })
    }

    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    function viewPdf(record){
      if( record.pdf ){
        store.dispatch('regulator/pdf',{id:record.id})
          .then( res => {
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            notify.success({
              title: "បង្ហាញឯកសារយោង" ,
              content: res.data.message ,
              duration: 3000
            })
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
      pdf.viewer = false
      pdf.url = ""
    }
  
    /**
     * Initial the data
     */
    getRecords()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      paginationButtons ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Functions
       */
      removeDocumentFromFolder ,
      viewPdf ,
      closePdf
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply absolute right-4 left-4 mt-4 mb-16 top-12 overflow-auto;
  }
  .vcb-table {
    @apply w-full ;
  }
  .vcb-table tr.vcb-table-row {
    @apply border-b border-gray-100 text-left ;
  }
  .vcb-table tr.vcb-table-row td {
    @apply p-2;
  }
  .vcb-table-actions-panel {
    @apply flex flex-row-reverse ;
  }
  .vcb-table-actions-panel .vcb-action-button {
    @apply  rounded-full border border-gray-200 w-8 h-8 mx-2 text-center cursor-pointer hover:border-blue-500 hover:text-blue-500  duration-300;
  }
  .vcb-table-headers {
    @apply border-b border-gray-200;
  }
  .vcb-table-headers .vcb-table-header {
    @apply px-2 py-4 text-left ;
  }
  .vcb-table-pagination {
    @apply flex flex-row absolute bg-white right-0 bottom-0 border border-l p-3 ;
  }
  .vcb-pagination-page {
    @apply  rounded-full border border-gray-200 mx-1 leading-7 w-8 h-8 font-bold cursor-pointer hover:text-blue-500 hover:border-blue-500 duration-300;
  }
  .vcb-filter-panel {
    @apply flex flex-row fixed bg-white right-0 bottom-0 left-0 border border-l p-3 ;
  }
  .vcb-table-cell {
    @apply leading-6 align-text-top;
  }
</style>