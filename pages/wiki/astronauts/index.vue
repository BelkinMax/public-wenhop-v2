<template>
  <div>
    {{ astronauts }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AstronautsParams } from "@/helpers/ApiParams";

export default {
  async mounted() {
    await this.fetchAstronauts(new AstronautsParams());
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
