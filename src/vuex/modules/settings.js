const state = {
  settings: {
    min: "",
    max: "",
    size: "",
    type: "",
    computes: [],

  }
}

const mutations = {
  setSettings: (state, settings) => {
    state.settings = settings
  }
}

const actions = {
  setSettings({
    commit
  }, settings) {
    commit('setSettings', settings)
  }
}

const getters = {
  settings: state => state.settings
}


export default {
  state,
  actions,
  getters,
  mutations
}