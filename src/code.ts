// This shows the HTML page in "ui.html".
figma.showUI(__html__);

function setPrefs(data){
    console.log('setPrefs', data)

    figma.clientStorage.setAsync('pagFlowPrefs', data)
    .then(() => {
        getPrefs()
    });
    
}

function getPrefs(){

    let p
    figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
        if (prefs) {
            console.log('get prefs', prefs);
            p = prefs;
        } else {
            p = null
            //figma.ui.postMessage({ type: 'prefs', prefs: null });
            // console.log('gotta save new prefs', message.defaultPrefs);
            // figma.clientStorage.setAsync('aeux.prefs', message.defaultPrefs)
            //     .then(() => {
            //     figma.ui.postMessage({ type: 'retPrefs', prefs: message.defaultPrefs });
            // });
            // return message.defaultPrefs;
        }
    })
    return p
}


figma.ui.onmessage = ( msg => {

    if (msg.type == 'clear-prefs'){
        
        setPrefs(null)

        //return prefs to the UI
        let m = {'type':'prefs-cleared','data':"Prefs were cleared"}
        figma.ui.postMessage(m)

    }

    if (msg.type == 'set-prefs'){
        console.log('set-prefs', msg.data)
        setPrefs(msg.data)
        //return prefs to the UI
        let m = {'type':'prefs-set','data':msg.data}
        figma.ui.postMessage(m)

    }

    if(msg.type == 'get-prefs'){

        const prefs = getPrefs()

        //return prefs to the UI
        let m = {'type':'prefs','data':prefs}
        console.log(m);
        figma.ui.postMessage(m)

    }


    if (msg.type == 'start-plugin') {

        figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
            console.log('start plugin, get prefs', prefs);
            figma.ui.postMessage({'type':'prefs','data':prefs})
        })

    }

    if (msg.type == 'add-default') {

        console.log('add-default', msg.data)

        figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
            console.log('add-default prefs', prefs)
            prefs.push(msg.data)
            console.log('add-default pages after adding', prefs)
            figma.clientStorage.setAsync('pagFlowPrefs', prefs).then(() => {

                //return the prefs
                figma.clientStorage.getAsync('pagFlowPrefs').then(prefs => {
                    console.log('start plugin, get prefs', prefs);
                    figma.ui.postMessage({'type':'prefs','data':prefs})
                })

            });

        })

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
