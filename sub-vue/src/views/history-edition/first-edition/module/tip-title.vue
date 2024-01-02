<template>
  <sd-title :title="field.label"></sd-title>
</template>

<script>
export default {
  name: 'tipTitle',
  props: {
    field: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="" scoped></style>
