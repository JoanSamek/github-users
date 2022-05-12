<template lang="">
  <div>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-expansion-panels v-else variant="popout" class="pa-4">
      <v-expansion-panel v-for="user in users" :key="user.id" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col sm="2" md="1">
              <v-avatar size="36px">
                <v-img alt="Avatar" :src="user.avatar_url" />
              </v-avatar>
            </v-col>
            <v-col class="text-left pl-2" sm="10" md="11">
              <strong v-html="user.login"></strong>
            </v-col>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-card-text><repo-list :user="user.login" /></v-card-text>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import RepoList from "./RepoList.vue";
export default {
  name: "UserList",
  components: { RepoList },
  props: ["users", "loading"],
};
</script>
<style lang=""></style>
