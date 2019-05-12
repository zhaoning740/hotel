<style scoped>
</style>
<template>
  <Breadcrumb :style="{margin: '16px 0'}">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Components</BreadcrumbItem>
    <BreadcrumbItem>Layout</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      breadList: []
    };
  },
  computed: {},
  methods: {},
  watch: {
    $route(to, from) {
      
    }
  },
};
</script>
