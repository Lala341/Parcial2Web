import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider} from 'react-intl';

import PeliList from "./components/peliList";
import localeEsMessages from "./locales/es";

import localeEnMessages from "./locales/en";



let getLanguage=()=>{

    var u=navigator.language|| navigator.userLanguage;

    if(u==="es-ES"){
        return "es";
    }
    return "en";
}
let getLanguageData=()=>{

    var u=navigator.language|| navigator.userLanguage;

    if(u==="es-ES"){
        return localeEsMessages;
    }
    return localeEnMessages;
}


ReactDOM.render(
    
	<IntlProvider locale={getLanguage()} messages={getLanguageData()}>
		<PeliList/>
	</IntlProvider>, document.getElementById("root")
);