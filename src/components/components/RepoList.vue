<template lang="">
  <div>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-table density="compact" v-else>
      <thead>
        <tr>
          <th class="text-left">Repository</th>
          <th class="text-right">Statistics</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in repos" :key="item.id">
          <td class="hoverUrl" @click="goToRepo(item.html_url)">
            {{ item.name }}
          </td>
          <td class="text-right">
            <span v-for="(statData, statName) in stats" :key="statName">
              <v-icon large :color="statData.color" class="ml-6">
                {{ statData.icon }}
              </v-icon>
              {{ statName }}: {{ statData.count }}
            </span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import api from "../../services/api.js";
export default {
  name: "RepoList",
  props: ["user"],
  data() {
    return {
      loading: true,
      repos: [],
      stats: {
        stars: { icon: "mdi-star", color: "orange", count: 0 },
        watchers: { icon: "mdi-eye", color: "blue", count: 0 },
        comments: { icon: "mdi-comment", color: "green", count: 0 },
        commits: {
          icon: "mdi-source-commit",
          color: "purple",
          count: 0,
        },
        open_issues: {
          icon: "mdi-alert-circle-outline",
          color: "red",
          count: 0,
        },
      },
    };
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
