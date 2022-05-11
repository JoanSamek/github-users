<template lang="">
  <v-expansion-panels variant="popout" class="pa-4">
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
        <v-card-text>tekst testowy</v-card-text>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "UserList",
  props: ["users"],
};
</script>
<style lang=""></style>
