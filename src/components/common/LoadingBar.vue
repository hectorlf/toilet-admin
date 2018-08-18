<template>
<div class="loader-bar"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoadingBar extends Vue {}
</script>

<style>
.loader-bar {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
}
.loader-bar:before{
  display: block;
  position: absolute;
  content: "";
  left: 0px;
  width: 0px;
  height: 4px;
  background-color: #fbc658;
  animation: loader-bar 2s linear infinite;
}
@keyframes loader-bar {
    0% {left: 0%; width: 20px;}
    40% {width: 25%;}
    50% {left: 40%; width: 30%x;}
    60% {left: 60%; width: 25%;}
    70% {left: 80%; width: 15%;}
    80% {left: 100%;}
    95% {left: 120%;}
    100% {left: 150%; width: 0px;}
}
</style>