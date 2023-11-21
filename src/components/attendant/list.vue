<template>
  <div class="w-full" >
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200 py-4 ">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg class="flex-none h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>' ,
        <div class="leading-9 font-muol" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <div class="mr-2">
          <digital-clock />
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel">
      <Transition name="slide-fade" >
        <div class="vcb-table w-full" >
          <div class="flex w-full flex-wrap" >
            <div class="w-1/5 p-1" v-for="(day, index) in daysOfMonth" :key='index' >
              <div class="day border border-gray-200 rounded p-4" :style=" 'color: ' + ( daysOfWeek.find( (dow ) => dow.number == day.number ).color.hexa ) + '; ' " >
                <!-- Case there are more than one attendants -->
                <table class="w-full" v-if="Object.keys( table.records.matched ).length > 0" >
                  <tr >
                    <td class=" py-1 text-left " colspan="2" >កាលបរិច្ឆែទ ៖ </td>
                    <td class=" py-1 text-right font-bold" colspan="2"  >{{ table.records.matched[ day.date ].date }}</td>
                  </tr>
                  <tr class="bg-gray-100 " >
                    <td class="font-muol py-1 text-left ">វេន</td>
                    <td class="font-muol py-1 text-left ">ចូល</td>
                    <td class="font-muol py-1 text-left ">ចេញ</td>
                    <td class="font-muol py-1 text-right ">សរុប</td>
                  </tr>
                  <tr v-for="(ct , ctIndex) in table.records.matched[ day.date ].calculateTime.checktimes" :key="ctIndex">
                    <td class=" py-1 text-left " >{{ ct.timeslot.title }}</td>
                    <td class=" py-1 text-left " >{{ ct.checkin }}</td>
                    <td class=" py-1 text-left " >{{ ct.checkout }}</td>
                    <td class=" py-1 text-right font-bold" >{{ ct.workedTime }}</td>
                  </tr>
                  <tr >
                    <td class=" py-1 text-left " colspan="2" >សរុបរយះពេលបំពេញការងារ</td>
                    <td class=" py-1 text-right font-bold" colspan="2"  >{{ table.records.matched[ day.date ].calculateTime.total.workedTime }}</td>
                  </tr>
                  <tr >
                    <td class=" py-1 text-left " colspan="2" >រយះពេលដែល{{ ( table.records.matched[ day.date ].calculateTime.total.lateOrEarly > 0 ? ' លើស ' : ' ខ្វះ ' ) }}</td>
                    <td :class="'pb-2 text-right text-xl font-bold' + ( table.records.matched[ day.date ].calculateTime.total.lateOrEarly > 0 ? ' text-green-600 ' : ' text-red-600 ' )" colspan="2"  >{{ table.records.matched[ day.date ].calculateTime.total.lateOrEarly }}</td>
                  </tr>
                </table>
                <!-- In case there is none attendants -->
                <table v-if="Object.keys( table.records.matched ).length <= 0" class="w-full" >
                  <tr >
                    <td class=" py-1 text-left " colspan="2" >កាលបរិច្ឆែទ ៖ </td>
                    <td class=" py-1 text-right font-bold" colspan="2"  >{{ day.date }}</td>
                  </tr>
                  <tr class="bg-gray-100 " >
                    <td class="font-muol py-1 text-left ">វេន</td>
                    <td class="font-muol py-1 text-left ">ចូល</td>
                    <td class="font-muol py-1 text-left ">ចេញ</td>
                    <td class="font-muol py-1 text-right "></td>
                  </tr>
                  <tr v-for="(timeslot , index) in day.timeslots" :key="index" >
                    <td class=" py-1 text-left ">{{ timeslot.title }}</td>
                    <td class=" py-1 text-left ">{{ timeslot.start }}</td>
                    <td class=" py-1 text-left ">{{ timeslot.end }}</td>
                    <td class=" py-1 text-right ">
                      <n-button type="primary" secondary round size="tiny" >ចូល</n-button>&nbsp;
                      <n-button type="error" secondary round size="tiny" >ចេញ</n-button>
                    </td>
                  </tr>
                </table>

              </div>
              <!-- {{  table.records.all[ day.date ] }} -->
            </div>
          </div>
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
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
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <Transition name="fade" >
      <!-- Pagination of crud -->
      <div class="fixed left-0 right-0 bottom-12 h-12 flex" >
        <div class="vcb-table-pagination ">
          <!-- First -->
          <!-- Previous -->
          <!-- <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div> -->
          <!-- Pages (7) -->
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(1) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">1</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(2) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">2</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(3) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">3</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(4) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">4</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(5) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">5</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(6) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">6</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(7) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">7</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(8) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">8</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(9) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">9</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(10) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">10</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(11) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">11</div>
          </div>
          <div class="vcb-pagination-page pages h-8 mx-2 font-bold" @click="goToMonth(12) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">12</div>
          </div>
          <!-- Next -->
          <!-- <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div> -->
          <!-- Last -->
          <!-- Go to -->
          <!-- Total per page -->
        </div>
      </div>
    </Transition>
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
import { isAuth, getUser , authLogout } from './../../plugins/authentication.js'
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import VuePdfEmbed from 'vue-pdf-embed'
import { Switcher, Filter, DataStructured , ParentChild} from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
import dateFormat from 'dateformat'
import DigitalClock from './../widgets/DigitalClock.vue'

export default {
  name: "Regulator" ,
  components: {
    DigitalClock ,
    ParentChild, 
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
    Filter ,
    VuePdfEmbed ,
    AppsList20Regular
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const showFolderModal = ref(false)
    const listFolders = ref([])
    const selectedRegulatorId = ref(0)
    const attendantDate = ref(null)
    attendantDate.value = (new Date()).getTime()
    const daysOfMonth = ref([])
    const daysOfWeek = reactive([
      {
        name: {
          kh: 'អាទិត្យ' ,
          en: 'Sunday' 
        },
        symbol: 'Bravery / Courage' ,
        color: {
          kh: 'ក្រហម' ,
          en: 'red' ,
          hexa: '#D80032' 
        } ,
        number: 0
      },
      {
        name: {
          kh: 'ច័ន្ទ' ,
          en: 'Monday' 
        },
        symbol: 'Equality' ,
        color: {
          kh: 'ទឹកក្រូច' ,
          en: 'orange' ,
          hexa: '#EC8F5E' 
        } ,
        number: 1
      },
      {
        name: {
          kh: 'អង្គារ៍' ,
          en: 'Tuesday' 
        },
        symbol: 'Honesty / Loyalty' ,
        color: {
          kh: 'ស្វាយ' ,
          en: 'Purple' ,
          hexa: '#B15EFF' 
        } ,
        number: 2
      },
      {
        name: {
          kh: 'ពុធ' ,
          en: 'Wednesday' 
        },
        symbol: 'Embodying justice' ,
        color: {
          kh: 'ត្រួយចេក' ,
          en: 'Mustard Green' ,
          hexa: '#79AC78' 
        } ,
        number: 3
      },
      {
        name: {
          kh: 'ព្រហស្បត៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying hope' ,
        color: {
          kh: 'បៃតង' ,
          en: 'Green' ,
          hexa: '#004225' 
        } ,
        number: 4
      },
      {
        name: {
          kh: 'សុក្រ' ,
          en: 'Thursday' 
        },
        symbol: 'Forgiveness' ,
        color: {
          kh: 'ខៀវ' ,
          en: 'Blue' ,
          hexa: '#39A7FF' 
        } ,
        number: 5
      },
      {
        name: {
          kh: 'សៅរ៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying sadness' ,
        color: {
          kh: 'ឈាមជ្រូក' ,
          en: 'Burgundy' ,
          hexa: '#952323' 
        } ,
        number: 6
      }
    ])
    /**
     * Variables
     */    
    const model = reactive( {
      name: "attendant" ,
      title: "វត្តមាន"
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
        perPage: 50 ,
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
      store.dispatch(model.name+'/list',{
        userId: getUser().id ,
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        date: attendantDate.value != null && attendantDate.value > 0 ? dateFormat( new Date( attendantDate.value ) , 'yyyy-mm-dd' ) : dateFormat( new Date() , 'yyyy-mm-dd' )
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        daysOfMonth.value = res.data.daysOfMonth
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
        console.log( err )
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
    function goToMonth(month){
      let date = new Date()
      date.setYear(2024)
      date.setMonth(month-1)
      console.log( date )
      attendantDate.value = date.getTime()
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

    /**
     * Mark the matched text with in search box
     */
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
      daysOfMonth ,
      daysOfWeek ,
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
      applyTagMark ,
      goToMonth
    }
  }
}

</script>
