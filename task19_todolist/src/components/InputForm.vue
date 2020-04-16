<template>
  <v-form
    lazy-validation
    ref="form"
  >
    <v-container>
      <v-row>
        <v-col class="d-flex col-md-7 col-sm-12">
          <v-text-field
            :rules="noteRules"
            label="Текст заметки"
            v-model="newTodoText"
            class="pl-4"
          ></v-text-field>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="addNote"
                class="mr-1"
                color="secondary"
                fab
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Добавить</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="reset"
                class="mr-4"
                color="tertiary"
                dark
                fab
                v-on="on"
              >
                <v-icon>mdi-broom</v-icon>
              </v-btn>
            </template>
            <span>Очистить</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: "InputForm",

    data() {
      return {
        newTodoText: "",
        noteRules: [
          value => !!value || "Введите текст!"
        ]
      };
    },

    methods: {
      addNote() {
        if (this.newTodoText === "") {
          this.$refs.form.validate();
          return;
        }

        this.$store.commit("addNote", this.newTodoText);
        this.newTodoText = "";
        this.$refs.form.resetValidation();
      },

      reset() {
        this.newTodoText = "";
        this.$refs.form.resetValidation();
      }
    }
  };
</script>
