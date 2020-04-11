<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content>
          <h1>To Do List</h1>
          <InputForm/>
          <NotesList/>
        </v-content>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import InputForm from "../components/InputForm";
  import NotesList from "../components/NotesList";

  export default {
    name: "Home",
    components: { NotesList, InputForm }
  };
</script>
