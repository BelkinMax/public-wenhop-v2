<template>
  <v-navigation-drawer app dark>
    <v-list nav>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-rocket</v-icon>
        </v-list-item-icon>
        <v-list-item-title
          >Wenhop <span class="attention-text">Live</span></v-list-item-title
        >
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item link to="/launches/next">
        <v-list-item-icon>
          <v-icon>mdi-timer</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Next Launch</v-list-item-title>
      </v-list-item>

      <v-list-group :value="true" prepend-icon="mdi-book-open-page-variant">
        <template v-slot:activator>
          <v-list-item-title>Wenhop Wiki</v-list-item-title>
        </template>

        <v-list-item v-for="(item, i) in wiki" :key="i" link :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      wiki: [
        { title: "Space Agencies", to: "/wiki/agencies" },
        { title: "Astronauts", to: "/wiki/astronauts" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.attention-text {
  color: #e14346;
  font-weight: bold;
}
</style>
