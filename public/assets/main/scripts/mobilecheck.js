function getcss(cssfile){
    loadcss = document.createElement('link')
    loadcss.setAttribute("rel", "stylesheet")
    loadcss.setAttribute("type", "text/css")
    loadcss.setAttribute("href", cssfile)
    document.getElementsByTagName("head")[0].appendChild(loadcss)
}

if(screen.width <= '700') {
    getcss('assets/main/styles/mobile.css')
} else {
    getcss('assets/main/styles/desktop.css')
}