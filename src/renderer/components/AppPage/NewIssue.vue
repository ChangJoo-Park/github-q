<template>
  <div class="new-issue">
    <aside class="new-issue-filter">
      <div class="centerx labelx" v-for="(item, index) in queryTexts" :key="index">
        <vs-input :vs-label="item.label" vs-placeholder="" v-model="item.value" />
      </div>
      <!-- CheckBoxes -->
      <div class="">
        <label for="">isOpen</label>
        <input type="checkbox" v-model="isOpen">
      </div>

      <div class="">
        <label for="">isClose</label>
        <input type="checkbox" v-model="isClose">
      </div>

      <!-- Default -->
      <div class="">
        <label for="">Archived</label>
        <input type="checkbox" v-model="archive">
      </div>
      <button type="button" name="button" @click.stop.prevent="test" :disabled="!isLoaded">Test</button>
    </aside>
    <main class="new-issue-result">
      <pre>{{parsedTextQueries}}</pre>
      <div v-if="isLoaded">
        <div>{{ items }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import Service from '@/services'

import LoaderWrapper from '@/components/Shared/LoaderWrapper'

export default {
  components: {
    LoaderWrapper
  },
  data () {
    return {
      isTested: false,
      isLoaded: true,
      items: [],
      author: '',
      archive: false,
      isOpen: false,
      isClose: false,
      isPublic: false,
      isPrivate: false,
      queryTexts: [
        {
          label: 'Organizations',
          value: '',
          prefix: 'org'
        },
        {
          label: 'Author',
          value: '',
          prefix: 'author'
        },
        {
          label: 'Mentions',
          value: '',
          prefix: 'mentions'
        },
        {
          label: 'Assignee',
          value: '',
          prefix: 'assignee'
        },
        {
          label: 'Involves',
          value: '',
          prefix: 'involves'
        },
        {
          label: 'Commenters',
          value: '',
          prefix: 'commenter'
        },
        {
          label: 'Labels (Includes)',
          value: '',
          prefix: 'label'
        },
        {
          label: 'Labels (Excludes)',
          value: '',
          prefix: '-label'
        }
      ],
      newIssue: {
        name: 'ABCD',
        query: ''
      }
    }
  },
  computed: {
    parsedTextQueries () {
      console.log(this.queryTexts)
      return this.queryTexts.map(query => this.querifyString(query.value, query.prefix)).join(' ')
    },
    stateQueries () {
      if ((this.isOpen && this.isClose)) {
        return ''
      } else {
        const open = this.isOpen ? 'is:open' : ''
        const close = this.isClose ? 'is:close' : ''
        return `${open} ${close}`
      }
    },
    archiveQuery () {
      return this.archive ? 'archived:true' : 'archived:false'
    },
    resultQueries () {
      return `${this.parsedTextQueries} ${this.stateQueries} ${this.archiveQuery}`.trim()
    }
  },
  methods: {
    querifyString (source, prefix) {
      if (source === '') {
        return ''
      }
      return source
        .split(',')
        .map(s => {
          const trimmedString = s.trim()
          const wrapQuotes = trimmedString.includes(' ') ? `"${trimmedString}"` : trimmedString
          return trimmedString === '' ? '' : `${prefix}:${wrapQuotes} `
        })
        .join('')
        .trim()
    },
    submit () {
      window.alert('submit')
    },
    test () {
      if (!this.isLoaded) {
        return
      }
      this.$vs.loading()
      this.isLoaded = false
      setTimeout(() => {
        Service.getSearchResult(this.resultQueries, 1, 3).then((response) => {
          this.isLoaded = true
          this.$vs.loading.close()
          this.items = response.data
        }).catch(_ => {
          this.isLoaded = true
          this.$vs.loading.close()
        })
      }, 300)
    }
  }
}
</script>

<style>
.new-issue {
  display: flex;
  overflow: hidden;
  height: 100vh;
}

.new-issue-filter {
  flex: 0;
  min-width: 200px;
  overflow-y: auto;
}

.new-issue-result {
  flex: 1;
  overflow-y: auto;
}
</style>
