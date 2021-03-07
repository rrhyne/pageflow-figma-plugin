<template>
  <div class="container">

    <div v-if="pages == null && !settings">
      <h5>Setup PageFlow</h5>
      <p class="type type--large">PageFlow allows you to quickly create pages your team uses in its workflow as you need them. 
        To get started, select the pages your team uses from this default list or add your own:</p>
      
      <ul class="page-list">
        <li v-for="(page, index) in defaultPages" :key="index">
            <input v-bind:id="'page'+index" type="checkbox"   @change="addToSelected(page)">
            <label v-bind:for="'page'+index" >{{page}}</label>
        </li>
      </ul>
      
      <div style='margin-bottom:10px;'>
        <p class="type type--large">Add page:</p>
        <input v-model="tempDefault" type="input" class="input__field"  style='width: 215px;float:left;margin-right:10px;' />
        <button class='button button--secondary' @click="addTempDefault()" style='float:left'>+</button>
        <br style="overflow: auto;">
      </div>

      <div style='margin-top:10px;padding-top:10px;'>
        <button class='button button--primary' @click="setDefaults()">Set default pages</button>
      </div>
    </div>

    <div v-if="pages != null && !settings">
      
      <h5>Add page:</h5>
      <div>
        <ul class="page-list button-list">
          <li v-for="(page, index) in pages" :key="index">
            <button class='button button--secondary' @click="createPage(page)">+ {{page}}</button>
          </li>
        </ul>
      </div>

      <button @click="toggleSettings()" class='button button--secondary'>⚙️ Settings</button>
    </div>


    <div v-if='settings'>
      <h5>Settings</h5>
      <div style='padding-top:10px;padding-bottom:10px;'>
        <label class="type type--large">Add default page:</label>
        <input v-model="tempDefault" type="input" class="input__field"  style='width: 215px;float:left;margin-right:10px;' />
        <button class='button button--secondary' @click="storeDefault()" style='float:left'>+</button>
        <br style="overflow: auto;">
        <p>
          <span v-if='successStoring' class="type type--large" style="color:green">Added: {{tempDefault}}</span>
        </p>
      </div>

      <div style='padding-top:10px;padding-bottom:10px;'>
        <button  class='button button--secondary-destructive' @click="clearPrefs()">Clear prefs</button>
      </div>

      <div style='padding-bottom:10px;'>
        <button @click="settings=false" class='button button--secondary'>Close settings</button>
      </div>
    </div>
    

  </div>

</template>

<script lang="ts">

import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'PageCreator',
})


export default class PageCreator extends Vue {
  settings = false
  pages = []
  tempDefault = ''
  defaultPages = [
    '🎟 Cover',
    '🖼 Visual Design',
    '📱 Responsive',
    '🎮 Prototypes',
    '🟥 QA',
    '⚙️ Wireframes',
    '☈ Flows',
    '⚽️ Playground',
    '🧬 Research',
    '📦 Archive',
  ]
  selectedDefaults = [] //watch selected form inputs and 
  newPage = ''
  successStoring = true


  toggleSettings(){
    this.settings = !this.settings
    if(this.successStoring == true) this.successStoring = false
    console.log('toggle settings', this.settings);
  }

  addToSelected (page){
    this.selectedDefaults.push(page)
  }

  //todo consume message type from plugin code and respond accordingly
  consumePluginMsg (msg): void {

    console.log('consumePluginMsg', msg)
    if(msg == undefined) return
    
    if(msg.type == 'prefs-set'){

      //todo set the pages from the msg
      this.pages = msg.data

    } else if (msg.type == 'prefs'){
      //ask for page config or show only new files
      
      console.log('msg prefs', msg);
      this.pages = msg.data

      //todo: tell the user this is default pags
      //todo: ask for a config file that might live in a gist
      if(msg.data == undefined){
        // this.pages = defaultPages;
      }
    } else if (msg.type == 'prefs-cleared'){
      console.log('setting pages to null')
      this.pages = null
      this.settings = false
    }

  }

  createPage(pageText){
    console.log('createPage', pageText)
    parent.postMessage({ pluginMessage: { type: 'create-page', data: pageText} }, '*')
  }

  storeDefault() {
    parent.postMessage({ pluginMessage: { type: 'add-default', data: this.tempDefault } }, '*')
    //todo: this is pretty fake... show on response from add-default
    this.successStoring = true
  }

  setDefaults(){
    parent.postMessage({ pluginMessage: { type: 'set-prefs', data: this.selectedDefaults } }, '*')
  }

  clearPrefs(){
    parent.postMessage({ pluginMessage: { type: 'clear-prefs' } }, '*')
  }

  addTempDefault(){
    this.defaultPages.push(this.tempDefault)
    this.tempDefault = ""
  }

}
</script>

<style lang="scss">

h5{
  margin:0em;
  padding:0em;
}

.container {
  padding: 0.75rem;
}
.page-list{
  padding-left:0px;
  margin-left:0px;
}

.page-list li{
  list-style:none;
  padding-left:0px;
  margin-left:0px;
}

.button-list li{
  margin-bottom:.25em;
}
</style>
