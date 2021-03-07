import Vue from 'Vue'
import PageCreator from './PageCreator'

let vm = new Vue({
  el: '#app',
  render (createElement) {
    return createElement('page-creator',{
      ref: 'appUi'
    })
  },
  components: {
    PageCreator
  },
  methods: {
    passMsg(msg){
      this.$refs.appUi.consumePluginMsg(msg)
    }
  },
  mounted(){
    //todo add selected check and warning here  
    //parent figma property 
    parent.postMessage({ pluginMessage: { type: 'start-plugin'} }, '*')
  }
  
})

//faciliates passing messages from plugin to the ui
onmessage = (event) => {
  vm.passMsg(event.data.pluginMessage);
}
