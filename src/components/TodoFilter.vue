<template>
  <h2 onclick="save()">
    {{filterText}}
    <span id="donecount"></span>
  </h2>
</template>

<script>
export default {
  name: 'TodoFilter',
  props: ['filterText']
}
</script>