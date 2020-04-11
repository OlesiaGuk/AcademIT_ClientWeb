<template>
  <v-container>
    <v-row>
      <v-col class="col col-lg-5">
        <ul>
          <li :key="item.id" v-for="item in this.$store.state.items">
            <div>
              <template v-if="!item.isEditing">
                <span class="pa-2" v-text="item.text"></span>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="editNote(item)"
                      color="primary"
                      dark
                      fab
                      v-on="on"
                      x-small
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="deleteNote(item)"
                      color="blue-grey"
                      dark
                      fab
                      v-on="on"
                      x-small
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Удалить</span>
                </v-tooltip>
              </template>

              <template v-else>
                <div class="d-flex col-7">
                  <v-text-field :rules="editingRules" class="mt-0 mr-4" dense v-model="item.text">
                  </v-text-field>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="cancelEditing(item)"
                        fab
                        v-on="on"
                        x-small
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Отменить</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="saveEditing(item)"
                        fab
                        v-on="on"
                        x-small
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </template>
                    <span>Сохранить</span>
                  </v-tooltip>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "NotesList",

    data: () => ({
      editingRules: [
        value => !!value || "Введите текст!"
      ],
      editingText: ""
    }),

    methods: {
      deleteNote(item) {
        this.$store.commit("deleteNote", item);
      },

      editNote: function (item) {
        item.isEditing = true;
        item.editingText = item.text;
      },

      cancelEditing: function (item) {
        item.text = item.editingText;
        item.isEditing = false;
      },

      saveEditing: function (item) {
        if (item.text === "") {
          return;
        }

        item.isEditing = false;
      }
    }
  };
</script>
