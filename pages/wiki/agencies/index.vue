<template>
  <div>
    <section class="row">
      <div class="col-12">
        <v-toolbar flat>
          <v-toolbar-title class="mr-6 subtitle-2">{{
            itemsFoundText
          }}</v-toolbar-title>

          <v-text-field
            v-model="search"
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            placeholder="Type something e.g. Spacex, Roscosmos, Blue Origin"
            class="mr-6"
          ></v-text-field>

          <v-checkbox
            v-model="featured"
            label="Show only featured agencies"
            hide-details
            class="mr-6"
          ></v-checkbox>

          <v-menu v-model="menu" :close-on-content-click="false" offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark small v-bind="attrs" v-on="on" color="primary">
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-text>
                <v-form ref="agenciesForm">
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
                    v-model="limit"
                    :items="limitVariants"
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
    </section>
    <section class="row">
      <div v-for="agency in agencies" :key="agency.id" class="col-4">
        <v-card hover class="mx-auto" height="100%">
          <v-img
            :src="agency.image_url || agencyPlaceholder"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            height="200px"
          >
            <v-card-title style="word-break: normal;">{{
              agency.name
            }}</v-card-title>
          </v-img>
          <v-card-text>
            <v-list dense>
              <!-- type -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="agency.type">
                  {{ agency.type }} Organization
                </v-list-item-content>
                <v-list-item-content v-else>
                  Unknown
                </v-list-item-content>
              </v-list-item>
              <!-- country -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-earth</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="agency.country_code">
                  {{ getCountryName(agency.country_code) }}
                </v-list-item-content>
                <v-list-item-content v-else>
                  Unknown
                </v-list-item-content>
              </v-list-item>
              <!-- agministrator -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-tie</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="agency.administrator">
                  {{ agency.administratorData.name }}
                </v-list-item-content>
                <v-list-item-content v-else>
                  Unknown
                </v-list-item-content>
              </v-list-item>
              <!-- description -->
              <v-list-item>
                <v-list-item-subtitle v-if="agency.description">
                  {{ agency.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  No description available...
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
    </section>
    <section class="row justify-center my-12">
      <div class="text-center col-4">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          circle
        ></v-pagination>
      </div>
    </section>
  </div>
</template>

<script>
// TODO: Make pagination

import { mapActions, mapGetters, mapMutations } from "vuex";

import { AGENCY_TYPES } from "@/helpers/ApiConfig";
import { Alpha3Codes } from "@/helpers/Alpha3Codes";
import { AgenciesParams } from "@/helpers/ApiParams";
import { pagination } from "@/helpers/Pagination";

export default {
  data() {
    return {
      menu: false,
      awaitingSearch: false,
      awaitingDelay: 1000,

      filterParams: new AgenciesParams(),
      alphaCodes: new Alpha3Codes(),
      agencyPlaceholder:
        "https://maximbelkin.s3.eu-central-1.amazonaws.com/placeholder.jpg",

      search: "",
      featured: false,
      agencyType: "",
      allAgencyTypes: [],
      country: "",
      allCountries: [],
      limit: 9,
      limitVariants: [3, 9, 15, 30],

      totalItems: 0,
      currentPage: 1,
      totalPages: 0,
      offset: 0
    };
  },
  watch: {
    search: function() {
      // Await user search input
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.fetchFiltered({ keepCurrentPage: false });
          this.awaitingSearch = false;
        }, this.awaitingDelay);
      }
      this.awaitingSearch = true;
    },
    featured: function() {
      this.fetchFiltered({ keepCurrentPage: false });
    },
    currentPage: function(page) {
      this.offset = (page - 1) * this.limit;
      this.totalPages = Math.ceil(this.totalItems / this.limit);

      this.fetchFiltered({ keepCurrentPage: true });
      this.scrollToTop();
    }
  },
  async mounted() {
    this.allAgencyTypes = AGENCY_TYPES();
    this.allCountries = this.alphaCodes.all;
    this.getFiltersFromStore();

    await this.fetchFiltered({ keepCurrentPage: false });
  },
  computed: {
    ...mapGetters("agencies", ["agencies", "agenciesFiltes", "agencyMeta"]),

    previousDisabled() {
      return this.currentPage <= 1;
    },
    nextDisabled() {
      return this.currentPage >= this.totalPages;
    },
    itemsFoundText() {
      if (this.totalItems === 1) return `Found 1 agency`;
      return `Found ${this.totalItems} agencies`;
    }
  },
  methods: {
    ...mapActions("agencies", ["fetchAgencies"]),
    ...mapMutations("agencies", ["SET_AGENCIES_FILTERS"]),

    async fetchFiltered(params) {
      const { keepCurrentPage } = params;
      this.SET_AGENCIES_FILTERS({
        search: this.search,
        featured: this.featured,
        agencyType: this.agencyType,
        country: this.country,
        limit: this.limit
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
        limit: this.limit,
        search: this.search,
        featured: this.featured,
        agency_type,
        country_code,
        offset: this.offset
      });

      await this.fetchAgencies(this.filterParams);

      if (keepCurrentPage) {
        this.setCurrentPage();
      } else {
        this.setFirstPage();
      }
    },
    reset() {
      this.$refs.agenciesForm.reset();
      this.limit = 9;
      this.search = "";
      this.close();
      this.fetchFiltered({ keepCurrentPage: false });
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

      if (resultArr.length > 3) {
        return `${resultArr.slice(0, 3).join(", ")} and ${resultArr.length -
          3} more`;
      }

      return resultArr.join(", ");
    },
    getFiltersFromStore() {
      this.limit = this.agenciesFiltes.limit;
      this.search = this.agenciesFiltes.search;
      this.featured = this.agenciesFiltes.featured;
      this.agencyType = this.agenciesFiltes.agencyType;
      this.country = this.agenciesFiltes.country;
    },
    // Pagination
    setCurrentPage() {
      this.totalItems = this.agencyMeta.count;

      const { currentPage, totalPages } = pagination({
        currentOffset: this.offset,
        totalItems: this.totalItems,
        limit: this.limit
      });

      this.currentPage = currentPage;
      this.totalPages = totalPages;
    },
    setFirstPage() {
      this.totalItems = this.agencyMeta.count;

      const { currentPage, totalPages } = pagination({
        currentOffset: 0,
        totalItems: this.totalItems,
        limit: this.limit
      });

      this.currentPage = currentPage;
      this.totalPages = totalPages;
    },
    // Scroll top
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.dense-p p {
  margin-bottom: 0 !important;
}
</style>
