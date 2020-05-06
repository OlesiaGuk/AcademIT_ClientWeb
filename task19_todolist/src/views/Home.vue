<template>
  <v-container class="ma-0 pa-0">
    <InputForm/>
    <NotesList/>
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
