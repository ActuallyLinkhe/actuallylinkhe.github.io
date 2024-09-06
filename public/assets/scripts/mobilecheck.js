function getcss(cssfile){
    loadcss = document.createElement('link')
    loadcss.setAttribute("rel", "stylesheet")
    loadcss.setAttribute("type", "text/css")
    loadcss.setAttribute("href", cssfile)
    document.getElementsByTagName("head")[0].appendChild(loadcss)
}

if(screen.width <= '700') {
    getcss('assets/styles/mobile.css')
} else {
    getcss('assets/styles/desktop.css')
}