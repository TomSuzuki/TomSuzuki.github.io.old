// メニュー用
function openMenu() {
    let s = document.getElementById("menu_list");
    if (s.style.display != "block") s.style.display = "block";
    else s.style.display = "none";
}

// 消す
function closeMenu(){
    if(window.innerWidth < 750) document.getElementById("menu_list").style.display = "none";
}

// 幅変更時にメニュー表示切り替え
window.addEventListener("resize", function () {
    if(window.innerWidth >= 750) document.getElementById("menu_list").style.display = "block";
    else document.getElementById("menu_list").style.display = "none";
});

