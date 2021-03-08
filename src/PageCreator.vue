<template>
  <div class="container">

    <div v-if=" (pages == null || pages == []) && !settings">
      <h5>Setup PageFlow</h5>
      <p class="type type--large">PageFlow allows you to quickly create pages your team uses in its workflow as you need them. 
        To get started, select the pages your team uses from this default list or add your own:</p>
      
      <ul class="page-list">
        <li v-for="(page, index) in defaultPages" :key="index">
            <input v-bind:id="'page'+index" type="checkbox" @change="addToSelected(page)">
            <label v-bind:for="'page'+index" >{{page}}</label>
        </li>
      </ul>
      
      <div style='margin-bottom:10px;'>

        <p class="type type--large">Add page</p>

        <input v-model="tempDefault" type="input" class="input__field"  style='width: 215px;float:left;margin-right:10px;' />
        <button class='button button--secondary' @click="addTempDefault()" style='float:left'>+</button>
        <br style="overflow: auto;">

      </div>

      <div style='margin-top:10px;padding-top:10px;'>
        <button class='button button--primary' @click="setDefaults()">Set default pages</button>
      </div>
    </div>

    <div v-if="pages != null && !settings">
      
      <div style="display:flex;">
        <div style="flex-grow: 1;margin-top:8px;">
            <h5>Add page</h5>
        </div>
        <div style="flex-grow: 1;text-align:right;">
          <button @click="toggleSettings()" class='page-button'>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6167 6.89716C8.45001 6.89716 6.72778 8.61938 6.72778 10.786C6.72778 12.9527 8.45001 14.6749 10.6167 14.6749C12.7833 14.6749 14.5056 12.9527 14.5056 10.786C14.5056 8.61938 12.7833 6.89716 10.6167 6.89716ZM10.6167 13.5638C9.06112 13.5638 7.83889 12.3416 7.83889 10.786C7.83889 9.23049 9.06112 8.00827 10.6167 8.00827C12.1722 8.00827 13.3944 9.23049 13.3944 10.786C13.3944 12.3416 12.1722 13.5638 10.6167 13.5638Z" fill="black"/>
            <path d="M18.7832 8.95277L17.2277 8.45277L16.8943 7.61944L17.6721 6.17499C17.8388 5.84166 17.7832 5.39722 17.5055 5.11944L16.1721 3.78611C15.8943 3.50833 15.4499 3.45277 15.1166 3.61944L13.6721 4.39722L12.8388 4.06388L12.3388 2.50833C12.2277 2.17499 11.8943 1.89722 11.5055 1.89722H9.61656C9.22767 1.89722 8.89434 2.17499 8.83879 2.56388L8.33879 4.11944C8.00545 4.17499 7.72767 4.28611 7.4499 4.45277L6.00545 3.67499C5.67212 3.50833 5.22767 3.56388 4.9499 3.84166L3.61656 5.17499C3.33879 5.45277 3.28323 5.89722 3.4499 6.23055L4.17212 7.61944C4.06101 7.89722 3.9499 8.23055 3.83879 8.50833L2.28323 9.00833C1.9499 9.11944 1.67212 9.45277 1.67212 9.84166V11.7306C1.67212 12.1194 1.9499 12.4528 2.33879 12.5639L3.89434 13.0639L4.22767 13.8972L3.4499 15.3417C3.28323 15.675 3.33879 16.1194 3.61656 16.3972L4.9499 17.7306C5.22767 18.0083 5.67212 18.0639 6.00545 17.8972L7.4499 17.1194L8.28323 17.4528L8.78323 19.0639C8.89434 19.3972 9.22767 19.675 9.61656 19.675H11.5055C11.8943 19.675 12.2277 19.3972 12.3388 19.0639L12.8388 17.4528L13.6721 17.1194L15.1166 17.8972C15.4499 18.0639 15.8943 18.0083 16.1721 17.7306L17.5055 16.3972C17.7832 16.1194 17.8388 15.675 17.6721 15.3417L16.8943 13.8972L17.2277 13.0639L18.8388 12.5639C19.1721 12.4528 19.4499 12.1194 19.4499 11.7306V9.84166C19.4499 9.45277 19.1721 9.06388 18.7832 8.95277V8.95277ZM18.3388 11.5639L16.3388 12.175L16.2832 12.4528L15.7832 13.6194L15.6166 13.8972L16.6166 15.7306L15.5055 16.8417L13.6721 15.8417L13.3943 16.0083C13.0055 16.2306 12.6166 16.3972 12.2277 16.5083L11.9499 16.5639L11.3388 18.5639H9.78323L9.17212 16.5639L8.89434 16.5083L7.72767 16.0083L7.4499 15.8417L5.61656 16.8417L4.50545 15.7306L5.50545 13.8972L5.33879 13.6194C5.11656 13.2306 4.9499 12.8417 4.83879 12.4528L4.78323 12.175L2.78323 11.5639V10.0083L4.67212 9.45277L4.78323 9.175C4.89434 8.73055 5.06101 8.34166 5.28323 7.95277L5.4499 7.67499L4.50545 5.84166L5.61656 4.73055L7.39434 5.73055L7.67212 5.56388C8.06101 5.34166 8.4499 5.17499 8.89434 5.06388L9.17212 4.95277L9.78323 3.00833H11.3388L11.9499 4.95277L12.2277 5.06388C12.6166 5.17499 13.0055 5.34166 13.3943 5.56388L13.6721 5.73055L15.5055 4.73055L16.6166 5.84166L15.6166 7.67499L15.7832 7.95277C16.0055 8.34166 16.1721 8.73055 16.2832 9.11944L16.3388 9.39722L18.3388 10.0083V11.5639V11.5639Z" fill="black"/>
            </svg>
          </button>
        </div>
      </div>

      <div>
        <ul class="page-list button-list">
          <li v-for="(page, index) in pages" :key="index">
            <div style="display:flex;">
              <div style="flex-grow: 1;">
                  <button class='page-button' @click="createPage(page)">{{page}}</button>
              </div>
              <div style="flex-grow: 1;text-align:right">
                <button  class='page-button' @click="removePage(page)">-</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>


    <div v-if='settings'>

      <div style="display:flex;">
        <div style="flex-grow: 1;margin-top:8px;">
            <h5>Settings</h5>
        </div>
      </div>

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
    '📘 Cover',
    '🖼 Visual Design',
    '📱 Responsive',
    '📱 Phone',
    '🎮 Prototypes',
    '⚙️ Wireframes',
    '↪ Flows',
    '🟥 QA',
    '🧫 Experimentation',
    '⚽️ Playground',
    '🧬 Research',
    '📍 Components',
    '📦 Archives',
  ]
  selectedDefaults = [] //watch selected form inputs and 
  newPage = ''
  successStoring = true

  showMinus(){
    console.log('show minus')
  }

  toggleSettings(){
    this.settings = !this.settings
    if(this.successStoring == true) this.successStoring = false
    console.log('toggle settings', this.settings);
  }

  addToSelected (page){
    this.selectedDefaults.push(page)
  }

  addToPages (page, oldValue){
    console.log('addToPage',page, oldValue)
    //this.pages.push(page)
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
    parent.postMessage({ pluginMessage: { type: 'create-page', data: pageText} }, '*')
  }

  removePage(pageText){
    console.log('removePage', pageText)
    parent.postMessage({ pluginMessage: { type: 'remove-page', data: pageText} }, '*')
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
  line-height:1em;
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

button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable `input` types in iOS */
    -webkit-appearance: none;
}

.page-button{
  border:none;
  background-color:none;
  padding:.25em;
  text-align:center;
  border-radius:5px;
  line-height:1em;
  cursor:pointer;
}

.page-button:hover{
  background-color:#f2f2f2;
}
</style>
