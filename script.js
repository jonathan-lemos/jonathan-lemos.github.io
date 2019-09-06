//todo separate width logic into new js file

const doResize = () => {
    const tw = $("#ls-command").width();
    $("#ls-output").width(tw);
    $("#shell").width(tw);
};

const doScroll = () => {
    if (window.pageYOffset >= stickPos) {
        $("#navbar").addClass("sticky");
    } else {
        $("#navbar").removeClass("sticky");
    }

    $("nav.navbar a.nav-link").each((i, elem) => {
        let section;
        let title;

        if (elem.innerText === "/home") {
            section = $(`#main`);
            title = $(`#main`);
        } else {
            section = $(`#${elem.innerText} div.section-content`);
            title = $(`#${elem.innerText} div.section-content a.title`);
        }

        if (section.offset() == null || title.offset() == null) {
            return;
        }
        if (title.offset().top + title.height() < window.pageYOffset + window.innerHeight && section.offset().top + section.height() > window.pageYOffset + $("#navbar").innerHeight()) {
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
        }
    });
};

const stickPos = $("#navbar").offset().top;

$(window).on({
    resize: doResize,
    load: () => {
        doResize();
        doScroll();
    },
    scroll: doScroll
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const shellInputType = async text => {
    let i = 0;
    $("#shell-input").text("");
    while (i < text.length) {
        if ($("#shell-input").text() !== text.substring(0, i)) {
            break;
        }

        $("#shell-input").text($("#shell-input").text() + text.charAt(i));
        i++;
        await sleep(50);
    }
};

const shellInputBlank = () => {
    $("#shell-input").text("");
};

$("#anchor-about").on("mouseover", () => shellInputType("cd about/"));
$("#anchor-contact").on("mouseover", () => shellInputType("ping jonathan"));
$("#anchor-experience").on("mouseover", () => shellInputType("history"));
$("#anchor-projects").on("mouseover", () => shellInputType("git clone projects"));
$("#anchor-resume").on("mouseover", () => shellInputType("curl resume.pdf"));
$("#anchor-skills").on("mouseover", () => shellInputType("cat skills"));
$("a.anchor").on("mouseleave", shellInputBlank);
