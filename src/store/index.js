import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import regulator from './modules/regulator'
import search_regulator from './modules/search_regulators'
import folder from './modules/folder'
import regulatorType from './modules/type'
// import client from './modules/client'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // apiServer: 'http://127.0.0.1:8000/api/webapp' ,
    apiServer: 'http://edocservice.sctthaicambodia.com/api/webapp' ,
    organization: {
      name: 'ក្រុមហ៊ុន'
    } ,
    system: {
      name: 'ប្រព័ន្ធគ្រប់គ្រងឯកសារអេឡិចត្រូនិច'
    }
    // branch: '' 
  },
  modules: {
    // product ,
    auth,
    user,
    folder ,
    /**
     * Regulator Section
     */
    regulator ,
    search_regulator ,
    regulatorType ,
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