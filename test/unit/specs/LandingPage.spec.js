import Vue from 'vue'
import LoginPage from '@/components/LoginPage'

describe('LoginPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LoginPage)
    }).$mount()

    expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!')
  })
})
