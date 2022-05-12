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
      @change="getUsers"
      @input="setTyping"
      :messages="foundUsers"
    />
    <user-list
      :users="users.items"
      :loading="loading"
      v-if="!typing && searchText"
    />
  </div>
</template>
<script>
import api from "../services/api.js";
import UserList from "./users/UserList";
export default {
  name: "UserPage",
  components: { UserList },
  data() {
    return {
      searchText: "",
      users: {},
      loading: false,
      typing: false,
    };
  },
  computed: {
    foundUsers() {
      if (this.typing) return "Press enter to search.";
      if (!this.searchText) return "";
      if (this.loading) return "Fetching data, please wait...";
      return `Found ${Number(this.users.total_count)} users.`;
    },
  },
  methods: {
    getUsers() {
      this.typing = false;
      this.loading = true;
      let params = { q: this.searchText };
      api
        .get("search/users", { params })
        .then((res) => {
          this.users = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    setTyping() {
      this.typing = true;
    },
  },
};
</script>
<style lang=""></style>
