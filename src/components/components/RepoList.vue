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
            <div class="iconGrid">
              <span v-for="(statData, statName) in stats" :key="statName">
                <v-icon large :color="statData.color">
                  {{ statData.icon }}
                </v-icon>
                {{ statName }}: {{ item[statData.count] }}
              </span>
            </div>
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
        stars: { icon: "mdi-star", color: "orange", count: "stargazers_count" },
        watchers: { icon: "mdi-eye", color: "blue", count: "watchers_count" },
        comments: {
          icon: "mdi-comment",
          color: "green",
          count: "comments_count",
        },
        commits: {
          icon: "mdi-source-commit",
          color: "purple",
          count: "commits_count",
        },
        open_issues: {
          icon: "mdi-alert-circle-outline",
          color: "red",
          count: "open_issues_count",
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
        this.repos.forEach((element) => {
          //fetch commits list for repo
          api
            .get(
              element.commits_url
                .replace("https://api.github.com/", "")
                .replace("{/sha}", "")
            )
            .then((commits) => {
              console.log(commits.data);
              element["commits_count"] = commits.data.length;
            })
            .catch((err) => {
              console.log(err);
            });
          //fetch comments list for repo
          api
            .get(
              element.comments_url
                .replace("https://api.github.com/", "")
                .replace("{/number}", "")
            )
            .then((comments) => {
              element["comments_count"] = comments.data.length;
            })
            .catch((err) => {
              console.log(err);
            });
        });
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
.iconGrid {
  display: inline-grid;
  grid-template-columns: repeat(5, 140px);
  justify-items: start;
}
</style>
