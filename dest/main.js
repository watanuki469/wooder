
// ***********************BACKGROUND WHEN SCROLL***********************
let header = document.querySelector("header");
let slider = document.querySelector(".slider");
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;
let sections = [];
function changeBgHeader(){
    let scrollY = window.pageYOffset;
    if(scrollY > (heightSlider - heightHeader)){
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}


// ***********************BTN BACKTOTOP***********************
let btnBackToTop = document.querySelector("footer .backtotop");
let backtotop = document.querySelector(".btnBTT");
let getHeightWindow = window.innerHeight;
function showbackToTop(){
    let scrollY = window.pageYOffset;
    if(scrollY > getHeightWindow){
        backtotop.classList.add("active");
    } else {
        backtotop.classList.remove("active");
    }
}

backtotop.addEventListener("click",function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

btnBackToTop.addEventListener("click",function(e){
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

document.addEventListener("scroll", function(){
    changeBgHeader();
    showbackToTop();
})


// ***********************SCROLL AND CLICK SECTION***********************
function removeActiveMenu(){
    menus.forEach((menu_element,menu_index) => {
            menu_element.classList.remove("active");
    });
}
let menus = document.querySelectorAll("header .menu a");
menus.forEach((element,index )=> {
    let className = element.getAttribute("href").replace("#","");
    let section = document.querySelector("." + className);
    sections.push(section);
    element.addEventListener("click",function(e){
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,
            behavior: "smooth"
        });
        removeActiveMenu();
        element.classList.add("active");
    });
});

window.addEventListener("scroll",function(e){
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section,index){
        if(positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight){
            removeActiveMenu();
            menus[index].classList.add("active");
        } else {
            menus[index].classList.remove("active");
        }
    });
});



// ***********************POPUPS VIDEO***********************
let btnVideo = document.querySelectorAll(".video__item-img");
let popup_video = document.querySelector(".popup-video");
let closeVideo = document.querySelector(".popup-video .close");
let iframe = document.querySelector(".popup-video iframe");
btnVideo.forEach(function(button){
    button.addEventListener("click",function(){
        let videoid = button.getAttribute("data-video-id");
        iframe.setAttribute("src", "https://www.youtube.com/embed/"+ videoid);
        popup_video.style.display = "flex";
    });
});

closeVideo.addEventListener("click",function(){
    iframe.setAttribute("src","");
    popup_video.style.display = "none";
});

document.querySelector(".popup-video").addEventListener("click",function(){
     iframe.setAttribute("src","");
    popup_video.style.display = "none";
})


// ***********************MENU MOBILE***********************
let btnMenu = document.querySelector(".btnmenu");
let nav = document.querySelector(".nav");
btnMenu.addEventListener("click",function(){
    btnMenu.classList.toggle("active");
    nav.classList.toggle("active");
});
function hideNav(){
    btnMenu.classList.remove("active");
    nav.classList.remove("active");
}
window.addEventListener("resize",function(){
    let wWindow = window.innerWidth;
    if(wWindow > 992){
        hideNav();
    }
})

// ***********************CLICK MENU MOBILE***********************
let menuMobile = document.querySelectorAll("header .nav a");
let sectionsMobile = [];

menuMobile.forEach((element,index) => {
    let classNameMobile = element.getAttribute("href").replace("#","");
    let sectionMobile = document.querySelector("." + classNameMobile);
    sectionsMobile.push(sectionMobile);
    element.addEventListener("click",function(e){
        e.preventDefault();
        window.scrollTo({
            top: sectionMobile.offsetTop - heightHeader + 1,
            behavior: "smooth"
        });
        nav.classList.remove("active");
        btnMenu.classList.remove("active");
    })
})


// ***********************LANGUAGES***********************
function selectLang(){
    const lang = document.querySelector(".lang");
    const langCurrent = document.querySelector(".lang .lang__current span");
    const langItems = document.querySelectorAll(".lang .lang__option a");

    lang.addEventListener("click",function(e){
        e.stopPropagation();
        lang.classList.toggle("active");
    })

    langItems.forEach(function(item){
        item.addEventListener("click",function(e){
            e.preventDefault();
            let langText = this.textContent;
            let langCurrentSpan = langCurrent.textContent;
            langCurrent.innerHTML = langText;
            this.innerHTML = langCurrentSpan;
        })
    })
    document.addEventListener("click",function(){
        lang.classList.remove("active");
    })
}
selectLang();

// ***********************SLIDER***********************
// let listItemSllider = document.querySelectorAll(".slider__item")
// let number = document.querySelector(".slider__bottom-paging .number")
// let currentSlider = 0;
// let dot = document.querySelectorAll(".slider__bottom-paging .dotted li")
// listItemSllider.forEach(function(itemSlider,index){
//     if(itemSlider.classList.contains("active")){
//         currentSlider = index;
//     }
// });
// function showNumber(index){
//     number.innerHTML = (index).toString().padStart(2,"0");
// }
// showNumber(currentSlider+1);
// dot[currentSlider].classList.add("is-selected");


// document.querySelector(".btnctr.next").addEventListener("click",function(){
//     if(currentSlider < listItemSllider.length -1 ){
//         goTo(currentSlider + 1);
//     } else{
//         goTo(0);
//     }
// });

// document.querySelector(".btnctr.prev").addEventListener("click",function(){
//     if(currentSlider > 0){
//         goTo(currentSlider - 1);
//     } else{
//         goTo(listItemSllider.length - 1);
//     }
// });

// function goTo(index){
//     listItemSllider[currentSlider].classList.remove("active");
//     listItemSllider[index].classList.add("active");
//     dot[currentSlider].classList.remove("is-selected");
//     dot[index].classList.add("is-selected");
//     currentSlider = index;
//     showNumber(currentSlider + 1);
    
// }

// dot.forEach(function(li,index){
//     li.addEventListener("click",function(){
//         goTo(index);
//     })
// })

// ***********************SLIDER FLICKITY***********************//
let $carousel = $(".slider__item-wrap");
$carousel.flickity({
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    preNextButtons: false,
    on: {
        ready: function() {
            let dotted = $(".flickity-page-dots");
            paging = $(".slider__bottom-paging .dotted");
            dotted.appendTo(paging);
        },
        change: function(index) {
            let number = $(".slider__bottom-paging .number");
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2,0))
        }
    }
})
// PREVIOUS
$(".slider__bottom-control .prev").on("click", function(){
    $carousel.flickity("previous");
});
$(".slider__bottom-control .next").on("click", function(){
    $carousel.flickity("next");
});

// ***********************GALLERY FANCYBOX***********************//
Fancybox.blind("[data-fancybox]",{
    infinite: false,
    keyboard: {
        Escape: "close",
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "next",
        ArrowDown: "prev",
        ArrowRight: "next",
        ArrowLeft: "prev",
    },
    on: {
        ready: (fancybox) => {
            console.log(`fancybox #${fancybox.id} is ready!`)
        }
    },
    caption: function(fancybox, carousel, slide){

    },
});


// ***********************GALLERY FANCYBOX***********************//




































