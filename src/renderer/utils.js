import MarkdownIt from 'markdown-it'
const md = MarkdownIt()
  .use(require('markdown-it-checkbox'))
  .use(require('markdown-it-link-attributes'), {
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  })

const parseMarkdown = (body) => {
  return md.render(body)
}

export default {
  parseMarkdown
}
