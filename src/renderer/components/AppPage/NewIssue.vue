<template>
  <div class="new-issue">
    <aside class="new-issue-filter">
      <div class="centerx labelx" v-for="(item, index) in queryTexts" :key="index">
        <vs-input :vs-label="item.label" vs-placeholder="" v-model="item.value" />
      </div>
      <br>
      <!-- CheckBoxes -->
      <div class="">
        <vs-checkbox v-model="isOpen">Is Open</vs-checkbox>
      </div>
      <br>
      <div class="">
        <vs-checkbox v-model="isClose">Is Close</vs-checkbox>
      </div>
      <br>
      <vs-button style="width: 100%;" vs-type="relief" vs-color="success" @click.stop.prevent="test" :disabled="!isLoaded">Test Query</vs-button>
    </aside>
    <main class="new-issue-result">
      <div>
        Query : {{parsedTextQueries}}
        <div class="new-issue-form" v-if="isTested">
          <vs-input class="inputx input-new-issue-name" placeholder="Issue Filter Name" v-model="newIssueName"/>
          <vs-button vs-type="relief" vs-color="primary" @click.stop.prevent="submit">Save</vs-button>
        </div>
      </div>
      <vs-divider />
      <br>
      <div v-if="isLoaded && result">
        <div>
          <div style="text-align:center;">
            <h2>Total {{ result.total_count }} issue<template v-if="result.total_count > 1">s</template></h2>
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
import Store from '@/store/db'

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
      newIssueName: ''
    }
  },
  computed: {
    parsedTextQueries () {
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
      const name = this.newIssueName
      const query = this.resultQueries
      console.log(name, query)
      console.log(Store)
      Service.getUser().then((user) => {
        Store.createNewIssue(user.id, name, query)
      })
    },
    test () {
      if (!this.isLoaded) {
        return
      }
      this.$vs.loading()
      this.isLoaded = false
      setTimeout(() => {
        Service.getSearchResult(this.resultQueries, 1, 10).then((response) => {
          this.isLoaded = true
          this.isTested = true
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
  padding: 1rem 0;
}

.new-issue-result {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
.new-issue-form {
  margin-top: 1rem;
  display: flex;
  align-items: flex-end;
}

.input-new-issue-name {
  margin-right: 1rem;
}
</style>
