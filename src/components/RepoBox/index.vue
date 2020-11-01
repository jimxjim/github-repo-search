<template>
  <div class="repo-box-root">
    <a :href="repo.htmlUrl" target="_blank">
      <h4 class="title">{{ repo.fullName }}</h4>
    </a>
    <p class="desc">{{ repo.description }}</p>
    <div class="info-wrapper">
      <div class="column">{{ `Stars: ${repo.stargazersCount}` }}</div>
      <div class="column">{{ `Language: ${repo.language}` }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoBox',
  props: {
    repo: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .repo-box-root {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #dedede;
    border-radius: 8px;
    margin: 16px auto;
    padding: 8px;
    box-sizing: border-box;
    text-align: left;
    a {
      color: navy;
    }
    .title, .desc {
      margin: 0 0 10px 0;
      font-size: 16px;
    }
    .desc {
      color: #0a0a0a;
    }
  }
</style>
