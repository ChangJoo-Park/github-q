<template>
  <div class="new-issue">
    <aside class="new-issue-filter">
      <div class="centerx labelx" v-for="(item, index) in queryTexts" :key="index">
        <vs-input :vs-label="item.label" vs-placeholder="" v-model="item.value" />
      </div>
      <!-- CheckBoxes -->
      <ul>
        <li>
          <vs-checkbox v-model="isOpen">Is Open</vs-checkbox>
        </li>
        <li>
          <vs-checkbox v-model="isClose">Is Close</vs-checkbox>
        </li>
      </ul>

      <vs-button vs-type="relief" vs-color="primary" @click.stop.prevent="test" :disabled="!isLoaded">Test</vs-button>
    </aside>
    <main class="new-issue-result">
      <div>Query : {{parsedTextQueries}}</div>
      <br>
      <div v-if="isLoaded && result">
        <div>
          <div>
            <span>Total : {{ result.total_count }}</span>
          </div>
          <vs-list>
            <vs-list-item v-for="item in result.items" :key="item.id" :title="item.title" :subtitle="item.body">
              <template slot="avatar">
                <vs-avatar :src="item.user.avatar_url"/>
              </template>
            </vs-list-item>
          </vs-list>
        </div>
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
      result: null,
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
          this.result = response.data
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
  margin-right: 1rem;
}

.new-issue-result {
  flex: 1;
  overflow-y: auto;
}
</style>
