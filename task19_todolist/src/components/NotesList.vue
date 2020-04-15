<template>
  <v-container>
    <v-row>
      <v-col class="col col-lg-5">
        <ul>
          <li :key="item.id" class="mt-1" v-for="item in this.$store.state.items">
            <template v-if="!item.isEditing">
              <span class="px-2" v-text="item.text"></span>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="editNote(item)"
                    class="mr-1"
                    color="secondary"
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

              <v-dialog
                max-width="290"
                v-model="dialog"
              >
                <template v-slot:activator="{ on: dialog }">

                  <v-tooltip top>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        @click.stop="dialog = true"
                        color="tertiary"
                        dark
                        fab
                        v-on="{ ...tooltip, ...dialog }"
                        x-small
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Удалить</span>
                  </v-tooltip>
                </template>

                <v-card>
                  <v-card-title>Удалить запись?</v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      @click="dialog = false"
                      color="primary"
                      text
                    >
                      Нет
                    </v-btn>

                    <v-btn
                      @click="deleteNote(item)"
                      color="primary"
                      text
                    >
                      Да
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </template>

            <template v-else>
              <div class="d-flex pl-2">
                <v-text-field :rules="editingRules" class="mt-0 mr-4 mb-n3" dense v-model="item.text">
                </v-text-field>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click="cancelEditing(item)"
                      class="mr-1"
                      color="tertiary"
                      dark
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
                      color="secondary"
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
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "NotesList",

    data() {
      return {
        editingRules: [
          value => !!value || "Введите текст!"
        ],
        editingText: "",
        dialog: false
      };
    },

    methods: {
      deleteNote(item) {
        this.dialog = false;
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
