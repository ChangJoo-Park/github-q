<template>
  <div class="">
    <form @submit.prevent="submit">
      <div class="">
        <label for="issue-name">Issue Name</label>
        <input type="text" id="issue-name" name="issue-name" v-model="newIssue.name">
      </div>
      <div class="">
        <div class="">
          <label for="issue-query">Query</label>
          <input type="text" id="issue-query" name="issue-query" v-model="newIssue.query">
        </div>
        <hr>
        <div class="" v-for="(item, index) in queryTexts" :key="index">
          <label for="">{{ item.label }}</label>
          <input type="text" v-model="item.value">
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
      </div>
      <div class="">
        <button type="button" name="button" @click.stop.prevent="test" :disabled="!isLoaded">Test</button>
        <button type="submit" name="button" :disabled="!isTested">Submit</button>
      </div>
    </form>
    <div v-if="isLoaded">
      <div>{{ items }}</div>
    </div>
    <div v-else>
      <h1>불러오는 중입니다.</h1>
    </div>
    </div>
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
      this.isLoaded = false
      setTimeout(() => {
        Service.getSearchResult(this.resultQueries, 1, 3).then((response) => {
          this.isLoaded = true
          console.log(response.data)
          this.items = response.data
        }).catch(_ => {

        })
      }, 300)
    }
  }
}
</script>

<style>

</style>
