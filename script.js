const byIdCache = {};
const byId = e => {
    if (e in byIdCache) {
        return byIdCache[e];
    }
    byIdCache[e] = document.getElementById(e);
    return byIdCache[e];
};

const doResize = () => {
    const tw = byId("ls-command").offsetWidth;
    byId("ls-output").style.width = tw + "px";
    byId("shell").style.width = tw + "px";
};

window.onresize = doResize;
window.onload = doResize;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const shellInputType = async text => {
    let i = 0;
    byId("shell-input").innerText = "";
    while (i < text.length) {
        if (byId("shell-input").innerText.length !== i) {
            break;
        }

        byId("shell-input").innerText += text.charAt(i);
        i++;
        await sleep(35);
    }
};

const shellInputBlank = () => {
    byId("shell-input").innerText = "";
};

byId("anchor-about").onmouseover = () => shellInputType("cd About/");

byId("anchor-about").onmouseleave = shellInputBlank;
