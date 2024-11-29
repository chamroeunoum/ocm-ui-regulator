import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "attendants" ,
    title: "វត្តមាន" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        search: false ,
        date: params.date ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read')
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async checkinwithfinger ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkin/finter",params)
  },
  async checkinwithface ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkin/face",params)
  },
  async checkinwithsystem ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkin/system",params)
  },
  async checkoutwithfinger ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkout/finget",params)
  },
  async checkoutwithface ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkout/face",params)
  },
  async checkoutwithsystem ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/checkout/system",params)
  },
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}