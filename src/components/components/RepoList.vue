<template lang="">
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Repository</th>
        <th class="text-left">Statistics</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in repos" :key="item.id">
        <td class="hoverUrl" @click="goToRepo(item.html_url)">
          {{ item.name }}
        </td>
        <td></td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import api from "../../services/api.js";
export default {
  name: "RepoList",
  props: ["user"],
  data() {
    return { loading: false, repos: [] };
  },
  methods: {
    goToRepo(url) {
      window.open(url, "_blank");
    },
  },
  created() {
    api
      .get(`users/${this.user}/repos`)
      .then((res) => {
        this.repos = res.data;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
};
</script>
<style lang="scss" scoped>
.hoverUrl:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
