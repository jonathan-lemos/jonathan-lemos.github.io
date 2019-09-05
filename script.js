const doResize = () => {
    const tw = $("#ls-command").width();
    $("#ls-output").width(tw);
    $("#shell").width(tw);
};

const stickPos = $("#navbar").offset().top;

$(window).on({
    resize: doResize,
    load: doResize,
    scroll: function () {
        if (window.pageYOffset >= stickPos) {
            $("#navbar").addClass("sticky");
        } else {
            $("#navbar").removeClass("sticky");
        }

        $("nav.navbar a.nav-link").each((i, elem) => {
            if (elem.innerText === "/home") {
                return;
            }
            const section = $(`#${elem.innerText} div.section-content`);
            if (section.offset() == null) {
                return;
            }
            if (section.offset().top < window.pageYOffset + window.innerHeight && section.offset().top + section.height() > window.pageYOffset + $("#navbar").innerHeight()) {
                elem.classList.add("active");
            } else {
                elem.classList.remove("active");
            }
        });
    }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const shellInputType = async text => {
    let i = 0;
    $("#shell-input").innerText = "";
    while (i < text.length) {
        if ($("#shell-input").innerText !== text.substring(0, i)) {
            break;
        }

        $("#shell-input").innerText += text.charAt(i);
        i++;
        await sleep(50);
    }
};

const shellInputBlank = () => {
    $("#shell-input").innerText = "";
};

$("#anchor-about").onmouseover = () => shellInputType("cd about/");
$("#anchor-contact").onmouseover = () => shellInputType("ping jonathan");
$("#anchor-experience").onmouseover = () => shellInputType("history");
$("#anchor-projects").onmouseover = () => shellInputType("git clone projects");
$("#anchor-resume").onmouseover = () => shellInputType("curl resume.pdf");
$("#anchor-skills").onmouseover = () => shellInputType("cat skills");
$("a.anchor").onmouseleave = shellInputBlank;
