"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const byId = (id) => {
    const res = document.getElementById(id);
    if (res == null) {
        throw new Error(`No element with id '${id}'`);
    }
    return res;
};
const query = (selector) => {
    const res = document.querySelector(selector);
    if (res == null) {
        throw new Error(`No element matching selector '${selector}'`);
    }
    return res;
};
const queryAll = (selector) => [...document.querySelectorAll(selector)].map(x => x);
new IntersectionObserver(([e]) => {
    query("nav").classList.toggle("gradient", e.intersectionRatio < 1);
}, { threshold: [0, 1] }).observe(query(".sentinel"));
queryAll('nav a[href^="#"]').forEach(elem => {
    const anchor = elem;
    const targetId = anchor.hash.replace("#", "");
    const section = byId(targetId);
    new IntersectionObserver(([e]) => {
        anchor.classList.toggle("active", e.intersectionRect.height > window.innerHeight * 0.1);
    }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }).observe(section);
});
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const shellInputType = (text) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    byId("shell-input").innerText = "";
    while (i < text.length) {
        if (byId("shell-input").innerText !== text.substring(0, i)) {
            break;
        }
        byId("shell-input").innerText = byId("shell-input").innerText + text.charAt(i);
        i++;
        yield sleep(50);
    }
});
const shellInputBlank = () => {
    byId("shell-input").innerText = "";
};
byId("anchor-about").onmouseover = () => shellInputType("cd about/");
byId("anchor-contact").onmouseover = () => shellInputType("ping jonathan");
byId("anchor-experience").onmouseover = () => shellInputType("history");
byId("anchor-projects").onmouseover = () => shellInputType("git clone projects");
byId("anchor-resume").onmouseover = () => shellInputType("curl resume.pdf");
byId("anchor-skills").onmouseover = () => shellInputType("cat skills");
queryAll("#ls-output a").forEach(x => x.onmouseleave = shellInputBlank);
//# sourceMappingURL=script.js.map