import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    currentId: 0
  },

  mutations: {
    addNote(state, newNote) {
      state.items.push({
        text: newNote,
        id: state.currentId++,
        isEditing: false
      });
    },

    deleteNote(state, item) {
      state.items = state.items.filter(x => x !== item);
    }
  }
});
