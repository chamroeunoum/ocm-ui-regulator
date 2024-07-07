import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import regulator from './modules/regulator'
import search_regulator from './modules/search_regulators'
import folder from './modules/folder'
import regulatorType from './modules/regulator/type'
import organization from './modules/regulator/organization'
import signature from './modules/regulator/signature'
import attendant from './modules/attendant'
import task from './modules/task'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // Local computer
    apiServer: 'http://127.0.0.1:8000/api/client' ,
    
    // Internal OCM Server
    // apiServer: 'http://192.168.200.101:8000/api/client' ,
    // apiServer: 'https://edoc.onetechcambodia.com/api/client' ,
    // apiServer: 'https://ns2.ocm.gov.kh/api/client' ,
    // apiServer: 'https://apis.ocm.gov.kh/api/client' ,

    company: {
      name: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ'
    },
    
    system: {
      // name: 'ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច'
      name: 'ប្រព័ន្ធគ្រប់គ្រង ឯកសារសាធារណៈ'
    }
    // branch: '' 
  },
  modules: {
    // product ,
    auth,
    user,
    folder ,
    attendant ,
    task ,
    /**
     * Regulator Section
     */
    regulator ,
    search_regulator ,
    regulatorType ,
    organization ,
    signature
    // client ,
    // staff
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})