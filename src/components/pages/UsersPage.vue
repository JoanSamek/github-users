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
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <user-list :users="users.items" v-else-if="searchText" />
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
      loading: false,
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
  },
};
</script>
<style lang=""></style>
