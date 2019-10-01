const byId = e => document.getElementById(e);
const byCss = e => document.querySelector(e);
const byCssAll = e => document.querySelectorAll(e);

const doResize = () => {
    const tw = byId("ls-command").offsetWidth + "px";
    byId("ls-output").style.width = tw;
    byId("shell").style.width = tw;
    stickPos = byId("main").offsetTop + byId("main").offsetHeight;
};

const doScroll = () => {
    if (window.pageYOffset >= stickPos) {
        byId("navbar").classList.add("sticky");
    } else {
        byId("navbar").classList.remove("sticky");
    }

    byCssAll("nav.navbar a.nav-link").forEach(elem => {
        let section;
        let title;

        if (elem.innerText === "/home") {
            section = byId("main");
            title = byId("main");
        } else {
            section = byCss(`#${elem.innerText} div.section-content`);
            title = byCss(`#${elem.innerText} div.section-content a.title`);
        }

        if (section == null || title == null) {
            return;
        }
        if (title.offsetTop + title.offsetHeight < window.pageYOffset + window.innerHeight &&
            section.offsetTop + section.offsetHeight > window.pageYOffset + byId("navbar").offsetHeight) {
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
        }
    });
};

let stickPos = byId("main").offsetTop + byId("main").offsetHeight;

window.onresize = doResize;
window.onload = () => {
    doResize();
    doScroll();
};
window.onscroll = doScroll;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const shellInputType = async text => {
    let i = 0;
    byId("shell-input").innerText = "";
    while (i < text.length) {
        if (byId("shell-input").innerText !== text.substring(0, i)) {
            break;
        }

        byId("shell-input").innerText = byId("shell-input").innerText + text.charAt(i);
        i++;
        await sleep(50);
    }
};

const shellInputBlank = () => {
    byId("shell-input").innerText = "";
};

byId("anchor-about").onmouseover = () => shellInputType("cd about/");
byId("anchor-contact").onmouseover = () => shellInputType("ping jonathan");
byId("anchor-experience").onmouseover = () => shellInputType("history");
byId("anchor-projects").onmouseover = () => shellInputType("git clone projects");
byId("anchor-resume").onmouseover = () => shellInputType("curl resume.pdf");
byId("anchor-skills").onmouseover = () => shellInputType("cat skills");
byCssAll("a.anchor").forEach(x => x.onmouseleave = shellInputBlank);

doResize();
