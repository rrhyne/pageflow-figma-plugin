// This shows the HTML page in "ui.html".
figma.showUI(__html__);

async function setPrefs(data){
    return await figma.clientStorage.setAsync('pagFlowPrefs', data)
}

async function getPrefs(){
    let prefs = await figma.clientStorage.getAsync('pagFlowPrefs')
    if(prefs == null) prefs = []
    return prefs
}

async function getPrefsAndReturnToUI(){
    const prefs = await getPrefs()

    //return prefs to the UI
    let m = {'type':'prefs','data':prefs}
    figma.ui.postMessage(m)
}

async function removePageFromPrefs(pageToRemove: string){
    const prefs = await getPrefs()
    const index = prefs.indexOf(pageToRemove)

    //remove the page from the retrieved prefs array
    if(index != -1){
        prefs.splice(index, 1)
        await setPrefs(prefs)

        let m = {'type':'prefs','data':prefs}
        figma.ui.postMessage(m)
    }
}

async function clearPrefs(){
    await setPrefs(null)
    const prefs = await getPrefs()

    //return prefs to the UI
    let m = {'type':'prefs-cleared','data':prefs}
    figma.ui.postMessage(m)
}

//todo: cannot call async methods here. 
figma.ui.onmessage = ( msg => {

    if (msg.type == 'set-prefs'){

        //todo: test if successful and return an error if note
        setPrefs(msg.data)
        
        //todo: this is pretty ugly... it simply returns the prefs that were sent to the function
        //I do it to ensure an update of the UI is consistent with other functions that change prefs

        //return prefs to the UI
        let prefs = msg.data
        if(prefs == null) prefs = []
        let m = {'type':'prefs-set','data':prefs}
        figma.ui.postMessage(m)
    }

    if(msg.type == 'get-prefs'){
        getPrefsAndReturnToUI()
    }


    if (msg.type == 'start-plugin') {
        getPrefsAndReturnToUI()
    }

    if (msg.type == 'remove-page') {
        removePageFromPrefs(msg.data)
    }

    if (msg.type == 'create-page') {

        let page = figma.createPage()
        page.name = msg.data

        let m = {'type':'page-created','data':msg.data}
        figma.ui.postMessage(m)
    }


})
