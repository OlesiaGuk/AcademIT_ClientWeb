<template>
  <v-container class="pt-0">
    <v-row>
      <v-col class="col-lg-12">

        <v-list flat>
          <v-list-item-group>
            <v-list-item
              :key="item.id" class="pa-0 px-md-4"
              v-for="item in $store.state.items"
            >
              <template v-if="!item.isEditing">
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
                          @click.stop="activateDeletingDialog(item)"
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
                        @click="deleteNote(deletingItem)"
                        color="primary"
                        text
                      >
                        Да
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-list-item-content>
                  <v-list-item-title class="px-2" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </template>

              <template v-else>
                <v-col class="d-flex pa-0">
                  <v-btn
                    class="mr-1 mt-2"
                    color="tertiary"
                    dark
                    fab
                    x-small
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-text-field :rules="editingRules" class="px-2" dense v-model="item.text">
                  </v-text-field>

                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="cancelEditing(item)"
                        class="mr-1 mt-2"
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
                        class="mt-2"
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
                </v-col>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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
        dialog: false,
        deletingItem: {}
      };
    },

    methods: {
      activateDeletingDialog(item) {
        this.deletingItem = item;
        this.dialog = true;
      },

      deleteNote(item) {
        this.dialog = false;
        this.$store.commit("deleteNote", item);
      },

      editNote(item) {
        item.isEditing = true;
        item.editingText = item.text;
      },

      cancelEditing(item) {
        item.text = item.editingText;
        item.isEditing = false;
      },

      saveEditing(item) {
        if (item.text === "") {
          return;
        }

        item.isEditing = false;
      }
    }
  };
</script>
