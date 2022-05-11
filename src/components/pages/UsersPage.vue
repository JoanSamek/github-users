<template>
  <div class="pa-12">
    <v-text-field
      v-model="searchText"
      label="Search users..."
      variant="outlined"
      prepend-icon="mdi-github"
      clearable
      clear-icon="mdi-cancel"
      class="w-100"
      @input="getUsers"
      :messages="foundUsers"
    />
    <user-list :users="users.items" v-if="searchText" />
  </div>
</template>
<script>
import api from "../../services/api.js";
import UserList from "../components/UserList";
export default {
  name: "UserPage",
  components: { UserList },
  data() {
    return {
      searchText: "",
      users: {},
    };
  },
  computed: {
    foundUsers() {
      return this.searchText && this.users.total_count
        ? `Found ${this.users.total_count} users.`
        : undefined;
    },
  },
  methods: {
    getUsers() {
      let params = { q: this.searchText };
      api
        .get("search/users", { params })
        .then((res) => (this.users = res.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang=""></style>
