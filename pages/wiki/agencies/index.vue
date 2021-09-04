<template>
  <div class="row">
    <div class="col-12">
      <v-toolbar flat>
        <v-text-field
          v-model="search"
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          placeholder="Type something e.g. Spacex, Roscosmos, Blue Origin"
        ></v-text-field>

        <v-menu v-model="menu" :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
              <v-form ref="agenciesForm">
                <v-checkbox
                  v-model="featured"
                  label="Featured agencies only"
                ></v-checkbox>

                <v-select
                  v-model="agencyType"
                  :items="allAgencyTypes"
                  label="Agency type"
                  clearable
                  hide-selected
                ></v-select>

                <v-autocomplete
                  v-model="country"
                  :items="allCountries"
                  label="Country"
                  clearable
                  hide-selected
                ></v-autocomplete>

                <v-select
                  v-model="itemsPerPage"
                  :items="itemsPerPageVariants"
                  label="Items per page"
                  hide-selected
                ></v-select>

                <v-btn
                  color="success"
                  class="mr-4"
                  small
                  rounded
                  @click="fetchFiltered"
                >
                  Filter
                </v-btn>

                <v-btn
                  color="primary"
                  class="mr-4"
                  small
                  rounded
                  @click="reset"
                >
                  Reset Filters
                </v-btn>

                <v-btn
                  color="secondary"
                  class="mr-4"
                  small
                  rounded
                  @click="close"
                >
                  Cancel
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-toolbar>
    </div>
    <div v-for="(agency, idx) in agencies" :key="idx" class="col-4">
      <v-card class="mx-auto" height="100%">
        <v-card-text>
          <div class="row">
            <div class="col-12 dense-p">
              <p class="text-h4 text--primary">
                {{ agency.name }}
              </p>
            </div>
            <div class="col-12 dense-p">
              <p>{{ agency.type }} Organization</p>
              <p v-if="agency.country_code">
                from {{ getCountryName(agency.country_code) }}.
              </p>
              <p v-if="agency.parent">Owned by {{ agency.parent }}</p>
              <p v-if="agency.administrator">
                Administrated by {{ agency.administratorData.name }}
              </p>
            </div>
            <div class="col-12">
              <div class="text--primary">
                {{ agency.description }}
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { AGENCY_TYPES } from "@/helpers/ApiConfig";
import { Alpha3Codes } from "@/helpers/Alpha3Codes";
import { AgenciesParams } from "@/helpers/ApiParams";

export default {
  data() {
    return {
      menu: false,
      awaitingSearch: false,
      awaitingDelay: 1000,

      filterParams: new AgenciesParams(),
      alphaCodes: new Alpha3Codes(),

      search: "",
      featured: false,
      agencyType: "",
      allAgencyTypes: [],
      country: "",
      allCountries: [],
      itemsPerPage: 9,
      itemsPerPageVariants: [3, 9, 15, 30]
    };
  },
  watch: {
    search: function() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchFiltered();
          this.awaitingSearch = false;
        }, this.awaitingDelay);
      }
      this.awaitingSearch = true;
    }
  },
  async mounted() {
    this.allAgencyTypes = AGENCY_TYPES();
    this.allCountries = this.alphaCodes.all;

    this.itemsPerPage = this.agenciesFiltes.itemsPerPage;
    this.search = this.agenciesFiltes.search;
    this.featured = this.agenciesFiltes.featured;
    this.agencyType = this.agenciesFiltes.agencyType;
    this.country = this.agenciesFiltes.country;

    await this.fetchFiltered();
  },
  computed: {
    ...mapGetters("agencies", ["agencies", "agenciesFiltes"])
  },
  methods: {
    ...mapActions("agencies", ["fetchAgencies"]),
    ...mapMutations("agencies", ["SET_AGENCIES_FILTERS"]),

    async fetchFiltered() {
      this.SET_AGENCIES_FILTERS({
        search: this.search,
        featured: this.featured,
        agencyType: this.agencyType,
        country: this.country,
        itemsPerPage: this.itemsPerPage
      });

      this.close();

      let country_code = "";
      let agency_type = 0;

      if (this.agencyType) {
        agency_type = AGENCY_TYPES(this.agencyType);
      }

      if (this.country) {
        country_code = this.alphaCodes.getByName(this.country);
      }

      this.filterParams.addParams({
        limit: this.itemsPerPage,
        search: this.search,
        featured: this.featured,
        agency_type,
        country_code
      });

      await this.fetchAgencies(this.filterParams);
    },
    reset() {
      this.$refs.agenciesForm.reset();
      this.itemsPerPage = 9;
      this.search = "";
      this.close();
      this.fetchFiltered();
    },
    close() {
      this.menu = false;
    },
    getCountryName(key) {
      const keys = key.split(",");
      const resultArr = [];

      keys.forEach(el => {
        const abbr = el.trim();
        resultArr.push(this.alphaCodes.getByKey(abbr));
      });

      return resultArr.join(", ");
    },
    test() {
      console.log("GO");
    }
  }
};
</script>

<style lang="scss" scoped>
.dense-p p {
  margin-bottom: 0 !important;
}
</style>
