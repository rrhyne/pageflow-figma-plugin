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

    if (msg.type == 'clear-prefs'){
        clearPrefs()
    }

    if (msg.type == 'set-prefs'){
        setPrefs(msg.data)

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

    if (msg.type == 'add-default') {

        console.log('add-default', msg.data)

        figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
            prefs.push(msg.data)
            figma.clientStorage.setAsync('pagFlowPrefs', prefs).then(() => {
                //return the prefs
                figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
                    console.log('start plugin, get prefs', prefs);
                    figma.ui.postMessage({'type':'prefs','data':prefs})
                })
            });

        })

    }

    if (msg.type == 'remove-page') {
        
        removePageFromPrefs(msg.data)

    }

    if (msg.type == 'create-page') {

        figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
            prefs.push(msg.data)
        })

        let page = figma.createPage()
        page.name = msg.data
        //figma.ui.postMessage(m)
    }


})
