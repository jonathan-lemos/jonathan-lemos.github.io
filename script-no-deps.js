const __do_resize_nodeps = () => {
    const tw = document.getElementById("ls-command").offsetWidth + "px";
    document.getElementById("ls-output").style.width = tw;
    document.getElementById("shell").style.width = tw;
};

window.onload = __do_resize_nodeps;
window.onresize = __do_resize_nodeps;
__do_resize_nodeps();