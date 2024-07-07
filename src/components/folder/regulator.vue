<template>
  <div class="w-full" >
    <!-- Title of crud -->
    <div class="flex w-full h-10 py-2 pl-4 title mt-12  border-b bg-gray-100" >
      <!-- <svg class="text-red-500 mr-2 w-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
      <div class="leading-6 font-moul" v-html="model.title + ' ' + 'នៃថតឯកសារ' " ></div> -->
      <div class="submenu-icon h-6 flex w-1/2">
        <svg class="flex-none mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
        <div class="submenu-icon-title text-xs flex-grow  text-left leading-6 font-moul" v-html="model.title + ' ' + 'នៃថតឯកសារ' " ></div>
      </div>
      <div class="flex justify-end h-6 w-1/2" >
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="flex-grow relative flex justify-end" >
              <input type="text" 
                class="bg-gray-100 px-2 h-6 text-xs w-full rounded border border-gray-200 duration-300 focus:border-blue-600 hover:border-blue-600 "
                @keypress.enter="filterRecords(false)" v-model="table.search" 
                placeholder="ស្វែងរក"
                />
                <svg class="absolute w-4 right-1 top-1 text-gray-400 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
            </div>
          </template>
          ប្រអប់ស្វែងរកថតឯកសារ
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <svg 
              class="flex-none w-6 mr-2 h-6 ml-2 text-blue-500 cursor-pointer"
              @click="$router.push('/folders')"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M7.167 3c.27 0 .535.073.765.21l.135.09l1.6 1.2H15.5a2.5 2.5 0 0 1 2.479 2.174l.016.162L18 7v7.5a2.5 2.5 0 0 1-2.336 2.495L15.5 17h-11a2.5 2.5 0 0 1-2.495-2.336L2 14.5v-9a2.5 2.5 0 0 1 2.336-2.495L4.5 3h2.667zm.99 4.034a1.5 1.5 0 0 1-.933.458l-.153.008L3 7.499V14.5a1.5 1.5 0 0 0 1.356 1.493L4.5 16h11a1.5 1.5 0 0 0 1.493-1.355L17 14.5V7a1.5 1.5 0 0 0-1.355-1.493L15.5 5.5H9.617l-1.46 1.534zM7.168 4H4.5a1.5 1.5 0 0 0-1.493 1.356L3 5.5v.999l4.071.001a.5.5 0 0 0 .302-.101l.06-.054L8.694 5.02L7.467 4.1a.5.5 0 0 0-.22-.093L7.167 4z" fill="currentColor"></path></g></svg>
          </template>
          ថតឯកសារ
        </n-tooltip>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel">
      <Transition name="fade" >
        <div v-if="table.records.matched.length > 0" class="vcb-table w-full" >
          <div v-for="(document, index) in table.records.matched" :key='index' class="vcb-table-row text-left relative mb-8" >
            <div class="vcb-table-cell text-md mb-2 leading-7 text-left break-words " v-html=" getKhmer( index + 1 ) + '. ' + applyTagMark(document.objective)" ></div>
            <div  class="vcb-table-cell text-xs mb-2" >
              {{ document.types != undefined ? document.types.map( t => t.desp ).join(', ') : '' }} {{ '/' + getKhmer( document.fid ) }} {{ ' - ' + getKhmer( document.year.slice(0,10) ) }} 
              <!-- {{ document.createdBy != undefined ? ( ' - ' + document.createdBy.lastname + ' ' + document.createdBy.firstname ) : '' }} -->
            </div>
            <!-- Document Actions -->
            <div class="record-actions-panel flex  mb-2" >
                <!-- <n-icon size="22" class="cursor-pointer text-blue-500 mx-1" @click="showShareRegulatorModal(document)" title="ប្រតិបត្តិការផ្សេងៗ" >
                  <AppsList20Regular />
                </n-icon> -->
                <!-- <n-icon size="22" class="cursor-pointer mx-1  text-green-500" @click="showAccessibilityModal(document)" title="ឯកសារកំពុងបើកជាសាធារណ" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M22 14a8 8 0 1 0 8 8a8.01 8.01 0 0 0-8-8zm5.91 7h-1.954a12.03 12.03 0 0 0-1.218-4.332A6.01 6.01 0 0 1 27.91 21zm-7.854 0A10.014 10.014 0 0 1 22 16.015A10.012 10.012 0 0 1 23.945 21zm3.89 2A10.01 10.01 0 0 1 22 27.985A10.012 10.012 0 0 1 20.055 23zm-4.684-6.332A12.027 12.027 0 0 0 18.044 21H16.09a6.01 6.01 0 0 1 3.172-4.332zM16.09 23h1.953a12.027 12.027 0 0 0 1.218 4.332A6.01 6.01 0 0 1 16.09 23zm8.648 4.332A12.024 12.024 0 0 0 25.956 23h1.954a6.009 6.009 0 0 1-3.172 4.332z" fill="currentColor"></path><path d="M6 14h6v2H6z" fill="currentColor"></path><path d="M6 6h12v2H6z" fill="currentColor"></path><path d="M6 10h12v2H6z" fill="currentColor"></path><path d="M6 24h6v2H6z" fill="currentColor"></path><path d="M12 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v8h-2V4H4v24h8z" fill="currentColor"></path></svg>
                </n-icon> -->
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <svg class="cursor-pointer text-red-500 mr-4 w-6 " @click="removeDocumentFromFolder(document)" title="ដកឯកសារចេញពីថត"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path><path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path></svg>
                  </template>
                  ដកចេញពីថតឯកសារនេះ
                </n-tooltip>
                <n-tooltip v-if="document.pdf"  trigger="hover">
                  <template #trigger>
                    <svg class="cursor-pointer text-red-500 mr-4 w-6" @click="pdfPreview(document)"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
                  </template>
                  មើលឯកសារយោង
                </n-tooltip>
              </div>
          </div>
        </div>
      </Transition>
      <Transition name="slide-fade" >
        <div v-if=" table.pagination.totalPages > 1" class="vcb-table w-full p-16" >មិនមានព័ត៌មាននោះឡើយ។</div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-1 right-1 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-14 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Pagination of crud -->
    <Transition name="fade" >
      <!-- Pagination of crud -->
      <div v-if="table.pagination.totalPages > 1" class="fixed left-0 right-0 bottom-4 h-12 flex" >
        <div class="vcb-table-pagination ">
          <!-- First -->
          <!-- Previous -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='"<"' @click="previous()" ></div>
          <!-- Pages (7) -->
          <div v-for="(page, index) in table.pagination.buttons" :key="index" :class="'vcb-pagination-page pages h-8 mx-2 font-bold ' + (table.pagination.page == page ? ' bg-blue-500 text-white  rounded-full' : '' )" @click="table.pagination.page == page ? false : goTo(page) " >
            <div class="page w-8 h-8 text-center align-middle leading-8 cursor-pointer">{{ page }}</div>
          </div>
          <!-- Next -->
          <div class="vcb-pagination-page w-8 h-8 text-center align-middle leading-8 font-bold cursor-pointer" v-html='">"' @click="next()" ></div>
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
    <!-- Form create account -->
    <create-form v-bind:model="model" v-bind:show="createModal.show" :onClose="closeCreateModal"/>
    <!-- Form update account -->
    <update-form v-bind:model="model" v-bind:record="editRecord" v-bind:show="editModal.show" :onClose="closeEditModal"/>
    <!-- PDF Dialog -->
    <div v-if="pdf.viewer" class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white z-40">
      <vue-pdf-embed :source="pdf.url" class="w-full h-screen overflow-y-scroll" />
      <div class="absolute top-3 right-3 cursor-pointer " @click="closePdf" >
        <svg class="bg-white shadow-md rounded-full w-12 h-12 mr-0 mt-0 border-gray-200 duration-300 text-red-500 p-0 mx-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z" fill="currentColor"></path></svg>
      </div>
      <!-- <div class="absolute top-3 right-20 cursor-pointer " @click="copyShareLink" >
        <svg class="w-8 h-8 mr-4 mt-2 cursor-pointer font-bold ml-4"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><path d="M383.822,344.427c-16.045,0-31.024,5.326-41.721,15.979l-152.957-88.42c1.071-5.328,2.142-9.593,2.142-14.919
          c0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762,10.653,26.741,17.041,43.852,17.041c35.295,0,64.178-28.766,64.178-63.92
          C448,72.767,419.117,44,383.822,44c-35.297,0-64.179,28.767-64.179,63.92c0,5.327,1.065,9.593,2.142,14.919l-150.821,87.35
          c-11.767-10.654-26.741-17.041-43.856-17.041c-35.296,0-63.108,28.766-63.108,63.92c0,35.153,28.877,63.92,64.178,63.92
          c17.115,0,32.089-6.389,43.856-17.042l151.891,88.421c-1.076,4.255-2.141,8.521-2.141,13.847
          c0,34.094,27.806,61.787,62.037,61.787c34.229,0,62.036-27.693,62.036-61.787C445.858,372.12,418.052,344.427,383.822,344.427z"></path></g></g></svg>
      </div> -->
    </div>
    <!-- Form Action Menu -->
    <add-remove-reader-form v-bind:model="model" v-bind:record="regulatorRecord" v-bind:show="regulatorModal.show" :onClose="closeShareRegulatorModal"/>
    <!-- Form Accessibility -->
    <accessibility-form v-bind:model="model" v-bind:record="accessibilityRecord" v-bind:show="accessibilityModal.show" :onClose="closeAccessibilityModal"/>
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
        <div v-for="(folder, index) in listFolders" :key="index" class="p-2 cursor-pointer hover:bg-gray-100 rounded duration-500 flex" 
        >
          <div class="flex-grow">
            {{ (index +1 ) + '. ' + folder.name }}
          </div>
          <Icon v-if="!folder.exists" size="20" class="text-gray-600 flex-none" @click="addDocumentToFolder(folder)"  >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.854 7.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5zM5.682 3A2.682 2.682 0 0 0 3 5.682v8.636C3 15.8 4.2 17 5.682 17h8.636C15.8 17 17 15.8 17 14.318V5.682C17 4.2 15.8 3 14.318 3H5.682zM4 5.682C4 4.753 4.753 4 5.682 4h8.636C15.247 4 16 4.753 16 5.682v8.636c0 .929-.753 1.682-1.682 1.682H5.682A1.682 1.682 0 0 1 4 14.318V5.682z" fill="currentColor"></path></g></svg>
          </Icon>
          <Icon v-if="folder.exists" size="20" class="text-green-600 flex-none" @click="removeDocumentFromFolder(folder)"  >
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M13.854 7.854a.5.5 0 0 0-.708-.708L8.5 11.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l5-5zM5.682 3A2.682 2.682 0 0 0 3 5.682v8.636C3 15.8 4.2 17 5.682 17h8.636C15.8 17 17 15.8 17 14.318V5.682C17 4.2 15.8 3 14.318 3H5.682zM4 5.682C4 4.753 4.753 4 5.682 4h8.636C15.247 4 16 4.753 16 5.682v8.636c0 .929-.753 1.682-1.682 1.682H5.682A1.682 1.682 0 0 1 4 14.318V5.682z" fill="currentColor"></path></g></svg>
          </Icon>
        </div>  
        <!-- <template #footer>
          Footer
        </template> -->
      </n-card>
    </n-modal>
    <!-- End folder modal selection -->
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import VuePdfEmbed from 'vue-pdf-embed'
import { Switcher, Filter, DataStructured , ParentChild} from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { IosCheckmarkCircleOutline, IosRefresh } from '@vicons/ionicons4'
import { TrashOutline, CloseCircleOutline } from '@vicons/ionicons5'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { Edit20Regular, Key16Regular, Save20Regular, Add20Regular, Search20Regular , ContactCard28Regular, DocumentPdf24Regular, AppsList20Regular } from '@vicons/fluent'
/**
 * CRUD component form
 */
import CreateForm from './create.vue'
import UpdateForm from './update.vue'
import AddRemoveReaderForm from './actions/addremovereader.vue'
import AccessibilityForm from './actions/accessibility.vue'
import { getKhmer } from './../../plugins/kh/number.js'
export default {
  name: "Regulator" ,
  components: {
    ParentChild, 
    QrcodeVue ,
    Vue3Barcode,
    Switcher,
    Add20Regular ,
    DataStructured,
    Icon,
    IosCheckmarkCircleOutline,
    CreateForm,
    IosRefresh ,
    CloseCircleOutline ,
    UpdateForm,
    Search20Regular ,
    Edit20Regular,
    Key16Regular,
    DocumentPdf24Regular ,
    Save20Regular ,
    TrashOutline ,
    ContactCard28Regular ,
    Filter ,
    VuePdfEmbed ,
    AppsList20Regular ,
    AddRemoveReaderForm ,
    AccessibilityForm
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const showFolderModal = ref(false)
    const listFolders = ref([])
    const selectedDocumentId = ref(0)
    /**
     * Variables
     */    
    const model = reactive( {
      name: "regulator" ,
      title: "ឯកសារ"
    })

    const regulatorAccessibilities = ref([
      "បិទទាំងស្រុង" , // 0 
      "ខ្លួនឯង និង អ្នកដែលចែករំលែកទៅ" , // 1 
      "ទូទាំងប្រព័ន្ធ" , // 2 
      "" , // 3 
      "ជាសកល" , // 4 
    ])

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
          table.records.all = table.records.matched = []
          notify.warning({
            title: 'អានឯកសារ' ,
            description: res.data.message ,
            duration: 3000
          })
        }
        closeTableLoading()
      }).catch( err => {
        table.records.all = table.records.matched = []
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

    function activateRegulator(record){
      dialog.warning({
        title: "បិទ ឬ បើក ឯកសារ" ,
        content: "តើអ្នកចង់ " + ( record.active == 1 ? "បិទ" : "បើក" )+ " ឯកសារនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch( model.name+(parseInt(record.active)==1?'/deactivate':'/activate'),{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'ស្ថានភាពឯកសារ' ,
                description: 'ស្ថានភាពឯកសារបានកែប្រែជោគជ័យ។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.error({
                title: 'ស្ថានភាពគណនី' ,
                description: 'មានបញ្ហាក្នុងពេលកែប្រែស្ថានភាពឯកសារ។' ,
                duration: 3000
              })
            }
          }).catch( err => {
            message.error( err )
          })
        },
        onNegativeClick: () => {
          
        }
      })
    }
    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal(){
      createModal.show = false
      getRecords()
    }

    var editModal = reactive({show:false})
    var editRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 
    })
    function showEditModal(record){
      editRecord.id = record.id
      editRecord.number = record.fid
      editRecord.title = record.title
      editRecord.objective = record.objective
      editRecord.type_id = record.document_type
      editRecord.year = new Date( record.year ).getTime()
      editRecord.publish = record.publish
      editRecord.active = record.active
      // editRecord.pdfs = record.pdf
      editModal.show = true
    }
    function closeEditModal(record){
      editModal.show = false
      getRecords()
    }

    /**
     * Action Modal
     */
    var regulatorModal = reactive({show:false})
    var regulatorRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility: 0
    })
    function showShareRegulatorModal(record){
      regulatorRecord.id = record.id
      regulatorRecord.number = record.fid
      regulatorRecord.title = record.title
      regulatorRecord.objective = record.objective
      regulatorRecord.type_id = record.document_type
      regulatorRecord.year = new Date( record.year ).getTime()
      regulatorRecord.publish = record.publish
      regulatorRecord.active = record.active
      regulatorRecord.accessibility = record.accessibility
      // actionRecord.pdfs = record.pdf
      regulatorModal.show = true
    }
    function closeShareRegulatorModal(record){
      regulatorModal.show = false
      getRecords()
    }

    /**
     * Accessibility Modal
     */
    var accessibilityModal = reactive({show:false})
    var accessibilityRecord = reactive({
      id: 0 ,
      number: "" ,
      title: "" ,
      objective: "" ,
      type_id: null ,
      year: null ,
      pdfs: [] ,
      publish: 0 ,
      active: 0 ,
      accessibility : 0
    })
    function showAccessibilityModal(record){
      accessibilityRecord.id = record.id
      accessibilityRecord.number = record.fid
      accessibilityRecord.title = record.title
      accessibilityRecord.objective = record.objective
      accessibilityRecord.type_id = record.document_type
      accessibilityRecord.year = new Date( record.year ).getTime()
      accessibilityRecord.publish = record.publish
      accessibilityRecord.active = record.active
      accessibilityRecord.accessibility = record.accessibility
      // actionRecord.pdfs = record.pdf
      accessibilityModal.show = true
    }
    function closeAccessibilityModal(record){
      accessibilityModal.show = false
      getRecords()
    }

    function inputPassword(record){
      changePasswordModal.account = record
      changePasswordModal.form = {
        id: record.id ,
        password: record.password
      }
      changePasswordModal.show = true
    }

    function destroy(record){
      dialog.warning({
        title: "លុបឯកសារ" ,
        content: "តើអ្នកចង់ លុប ឯកសារនេះមែនទេ ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch(model.name+'/delete',{id:record.id}).then( res => {
            if( res.data.ok ){
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'លុបបានរួចរាល់។' ,
                duration: 3000
              })
              getRecords()
            }else{
              notify.success({
                title: 'លុបឯកសារ' ,
                description: 'មានបញ្ហាក្នុងពេលលុបឯកសារ។' ,
                duration: 3000
              })
            }
        }).catch( err => {
          message.error( err )
        })
        },
        onNegativeClick: () => {
        }
      })
    }

    /**
     * Load pivot data of this model
     */
    function getDocumentTypes(){
      store.dispatch('regulatorType/list').then(res=>{
        store.commit('regulatorType/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានប្រភេទឯកសារ' ,
          description: 'មានបញ្ហាក្នុងពេលអានប្រភេទឯកសារ។'
        })
        console.log( err )
      })
    }

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

    const pdf = reactive({
      viewer: false ,
      filename: '' ,
      url: ''
    })
    const pdfShareLink = ref(null)
    function pdfPreview(record){
      if( record.pdf ){
        store.dispatch('regulator/pdf',{id:record.id})
          .then( res => {
            pdfShareLink.value = res.data.serial != "" ? window.origin+"/#/globalshare/"+res.data.serial : null
            pdf.filename = res.data.filename
            pdf.url = res.data.pdf
            pdf.viewer = true
            // notify.success({
            //   title: "បង្ហាញឯកសារយោង" ,
            //   content: res.data.message ,
            //   duration: 1000
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
    }
    function copyShareLink(){
      if( pdfShareLink.value != "" && pdfShareLink.value != null && pdfShareLink.value != undefined ){
        if (window.isSecureContext) {
          navigator.clipboard.writeText( pdfShareLink.value )
          message.info("អសយដ្ឋាន សម្រាប់ចែករំលែកឯកសារនេះបាន ចម្លងទុកក្នុង Clipboart ។")
        } else {
          dialog.info({
            title: 'ចែករំលែកឯកសារ',
            content: () => 'អសយដ្ឋាននៃឯកសារ សម្រាប់ចែករំលែក ៖ ' + pdfShareLink.value
          })
        }
      }else{
        message.warning("មានបញ្ហាចែករំលែកពេលចម្លង អសយដ្ឋានឯកសារ ចូលក្នុង Clipboart ។")
      }
    }

    function showFolderModalPopup(document){
      showFolderModal.value = true
      /**
       * Mark the selected document
       */
      selectedDocumentId.value = document.id
      
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
        
      }).catch( err => {
        console.log( err.response.data )
        notify.error({
          title: "ដាក់ឯកសារចូលថត" ,
          content: res.response.data.message ,
          duration: 3000
        })
      })
    }

    function removeDocumentFromFolder(document){
      dialog.warning({
        title: "ដកឯកសារ" ,
        content: "តើអ្នកចង់ ដកឯកសារនេះចេញមែនទេ?" ,
        positiveText: 'បាទ / ចាស',
        negativeText: 'ទេ',
        onPositiveClick: () => {
          store.dispatch('folder/removeRegulator',{
            id: route.params.id ,
            regulator_id : document.id
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

    /**
     * Initial the data
     */
    getRecords()
    getDocumentTypes()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      pdf,
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
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,     
      /**
       * Editing
       */
      editModal ,
      showEditModal ,
      closeEditModal , 
      editRecord ,
      /**
       * Actions
       */
      showShareRegulatorModal ,
      closeShareRegulatorModal , 
      /**
       * Functions
       */
      activateRegulator ,
      destroy ,
      applyTagMark ,
      pdfPreview ,
      closePdf ,
      copyShareLink ,
      /**
       * Actions
       */
      regulatorModal ,
      showShareRegulatorModal ,
      closeShareRegulatorModal , 
      regulatorRecord ,
      /**
       * Accessibility
       */
      accessibilityModal ,
      showAccessibilityModal ,
      closeAccessibilityModal ,
      accessibilityRecord ,
      /**
       * Folder
       */
      showFolderModalPopup ,
      closeFolderModalPopup ,
      addDocumentToFolder ,
      removeDocumentFromFolder ,
      showFolderModal ,
      listFolders ,
      getKhmer
    }
  }
}

</script>

<style scoped>
  .vcb-table-panel {
    @apply relative p-4 overflow-auto;
  }
  .vcb-table {
    @apply w-full;
    height: fit-content ;
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
    @apply flex flex-row bg-white right-0 bottom-0 border border-l p-3  z-50;
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