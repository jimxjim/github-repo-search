<template>
  <div class="home">
    <div class="input-wrapper">
      <text-input title="keywords" v-model="terms" placeholder="repository, user, etc."></text-input>
    </div>
    <div class="repos-wrapper">
      <template v-if="terms && repos.length && terms === lastTerms">
        <repo-box v-for="repo in repos" :key="repo.node_id" :repo="repo"></repo-box>
      </template>
      <template v-if="terms && (!repos.length || loading)">
        <span>Searching...</span>
      </template>
      <template v-if="isFailed && !loading">
        <button @click="retry">Retry</button>
      </template>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'
import RepoBox from '@/components/RepoBox'

export default {
  name: 'Home',
  components: {
    TextInput,
    RepoBox
  },
  data () {
    return {
      terms: '',
      lastTerms: '',
      pageNow: 1,
      timer: {
        search: null,
        scroll: null
      },
      repos: [],
      loading: false,
      isSame: false,
      isScrollEnd: false
    }
  },
  methods: {
    getRect () {
      const container = document.querySelector('.repos-wrapper')
      const { top, height } = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      this.isScrollEnd = windowHeight - top >= height
    },
    debounce (func, name, ms = 1000) {
      if (!this.timer[name]) {
        this.timer[name] = setTimeout(func, ms)
      } else {
        clearTimeout(this.timer[name])
        this.timer[name] = setTimeout(func, ms)
      }
    },
    search () {
      this.pageNow = this.terms && this.terms === this.lastTerms ? this.pageNow + 1 : 1
      const form = {
        q: this.terms.trim(),
        page: this.pageNow,
        per_page: 20
      }
      if (this.terms) {
        this.$store.dispatch('searchRepo', form)
          .then(() => {
            if (this.terms === this.lastTerms) {
              // this.isSame = true
            } else {
              this.lastTerms = this.terms
              // this.isSame = false
            }
            this.loading = false
          })
          .catch(() => {
            this.isScrollEnd = false
            this.loading = false
          })
        this.$nextTick(() => window.scrollBy(0, 50))
      }
    },
    loadAndSearch () {
      this.isSame = this.terms === this.lastTerms
      this.loading = true
      this.$nextTick(() => window.scrollBy(0, 50))
      this.debounce(this.search, 'search', this.isSame ? 6000 : 1000)
    },
    retry () {
      this.loading = true
      this.search()
    }
  },
  computed: {
    rawRepos () {
      const items = this.$store.state.github.data.searchRepo ? this.$store.state.github.data.searchRepo.items : []
      return items
    },
    totalPage () {
      const totalPage = this.$store.state.github.data.searchRepo ? this.$store.state.github.data.searchRepo.totalCount : null
      return totalPage ? Math.ceil(totalPage / 10) : null
    },
    isDataEnd () {
      return this.totalPage && this.pageNow ? this.pageNow >= this.totalPage : true
    },
    isFailed () {
      const error = this.$store.state.github.error.searchRepo || null
      return error
    }
  },
  watch: {
    terms (val) {
      if (val) {
        this.loadAndSearch()
      } else {
        this.repos = []
        this.pageNow = 1
        this.lastTerms = ''
      }
    },
    rawRepos (repos) {
      this.isScrollEnd = false
      if (this.isSame) {
        this.repos = [...this.repos, ...repos]
      } else {
        this.repos = [...repos]
      }
    },
    isScrollEnd (bool) {
      if (bool && !this.isDataEnd) {
        this.loadAndSearch()
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => this.debounce(this.getRect, 'scroll'))
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    padding: 8px;
  }
  .input-wrapper {
    position: fixed;
    display: flex;
    width: 100%;
    top: 0;
    left: 0;
    padding: 8px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .repos-wrapper {
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
