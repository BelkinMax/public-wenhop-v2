<template>
  <div>
    <section class="row">
      <div v-for="astronaut in astronauts" :key="astronaut.id" class="col-4">
        <v-card
          hover
          class="mx-auto"
          height="100%"
          :dark="astronaut.date_of_death"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div v-if="astronaut.agency.name" class="text-overline mb-4">
                {{ astronaut.agency.name }}
              </div>
              <div v-else class="text-overline mb-4">
                {{ astronaut.nationality }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ astronaut.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ astronaut.bio }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar rounded="50%" size="80" color="grey">
              <v-img
                :src="astronaut.profile_image_thumbnail || thumbnailPlaceholder"
                :alt="astronaut.name"
                aspect-ratio="1"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              v-if="astronaut.wiki"
              class="mx-2"
              icon
              color="grey darken-2"
              :href="astronaut.wiki"
              target="_blank"
            >
              <v-icon dark>
                mdi-wikipedia
              </v-icon>
            </v-btn>

            <v-btn
              v-if="astronaut.twitter"
              class="mx-2"
              icon
              color="light-blue darken-1"
              :href="astronaut.twitter"
              target="_blank"
            >
              <v-icon dark>
                mdi-twitter
              </v-icon>
            </v-btn>

            <v-btn
              v-if="astronaut.instagram"
              class="mx-2"
              icon
              color="pink lighten-2"
              :href="astronaut.instagram"
              target="_blank"
            >
              <v-icon dark>
                mdi-instagram
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AstronautsParams } from "@/helpers/ApiParams";

export default {
  data() {
    return {
      filterParams: new AstronautsParams(),
      thumbnailPlaceholder:
        "https://maximbelkin.s3.eu-central-1.amazonaws.com/astronaut_placeholder.webp"
    };
  },
  mounted() {
    this.filterParams.addParams({ limit: 30 });
    this.fetchAstronauts(this.filterParams);
  },
  computed: {
    ...mapGetters("astronauts", ["astronauts"])
  },
  methods: {
    ...mapActions("astronauts", ["fetchAstronauts"])
  }
};
</script>

<style lang="scss" scoped></style>
