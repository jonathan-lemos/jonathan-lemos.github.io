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

window.onscroll = function () {

};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const shellInputType = async text => {
    let i = 0;
    byId("shell-input").innerText = "";
    while (i < text.length) {
        if (byId("shell-input").innerText !== text.substring(0, i)) {
            break;
        }

        byId("shell-input").innerText += text.charAt(i);
        i++;
        await sleep(50);
    }
};

const shellInputBlank = () => {
    byId("shell-input").innerText = "";
};

byId("anchor-about").onmouseover = () => shellInputType("cd about/");
byId("anchor-about").onmouseleave = shellInputBlank;

byId("anchor-contact").onmouseover = () => shellInputType("ping jonathan");
byId("anchor-contact").onmouseleave = shellInputBlank;

byId("anchor-experience").onmouseover = () => shellInputType("history");
byId("anchor-experience").onmouseleave = shellInputBlank;

byId("anchor-projects").onmouseover = () => shellInputType("git clone projects");
byId("anchor-projects").onmouseleave = shellInputBlank;

byId("anchor-resume").onmouseover = () => shellInputType("curl resume.pdf");
byId("anchor-resume").onmouseleave = shellInputBlank;

byId("anchor-skills").onmouseover = () => shellInputType("cat skills");
byId("anchor-skills").onmouseleave = shellInputBlank;
