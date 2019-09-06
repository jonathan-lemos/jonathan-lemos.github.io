const __doResize = () => {
    const tw = document.getElementById("ls-command").offsetWidth + "px";
    document.getElementById("ls-output").style.width = tw;
    document.getElementById("shell").style.width = tw;
};

window.onload = __doResize;
window.onresize = __doResize;
__doResize();