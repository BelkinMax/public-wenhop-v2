<template>
  <div class="row">
    <div class="col-3" v-for="agency in agencies" :key="agency.id">
      <v-card elevation="2">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">
              {{ agency.type }}
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{ agency.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              agency.description
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AgenciesParams } from "@/helpers/ApiParams";
import { AGENCY_TYPES } from "@/helpers/ApiConfig";

export default {
  data() {
    return {
      params: {
        agencies: new AgenciesParams()
      }
    };
  },
  mounted() {
    this.params.agencies.addParams({
      agency_type: AGENCY_TYPES("Multinational"),
      limit: 15,

    });

    this.getAgencies(this.params.agencies);
  },
  computed: {
    ...mapGetters("agencies", ["agencies"])
  },
  methods: {
    ...mapActions("agencies", ["getAgencies"])
  }
};
</script>

<style lang="scss" scoped></style>
