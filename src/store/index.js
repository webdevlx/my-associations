import { createStore } from 'vuex'
import AssociationService from '../services/AssociationService'

export default createStore({
  state: {
    associations: []
  },
  mutations: {
    SET_ASSOCIATIONS(state, associations) {
      state.associations = associations;
    }
  },
  actions: {
    fetchAssociations(context) {
      AssociationService.getAssociations().then((response) => {
        context.commit("SET_ASSOCIATIONS", response.data);
      });
    }
  },
  getters: {
    getAssociations(state) {
      return state.associations
    }
  },
  modules: {
  }
})
