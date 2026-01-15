
let loading = document.getElementById('loading');
let all = document.getElementById('all');

// البحث
let nSearch = document.getElementById("nSearch");
let qSearch = document.getElementById("qSearch");
// كل البلايرات
let players = document.querySelectorAll(".audioItem");
let img1 = document.getElementById('img1')
// لما الصفحة تخلص تحميل
window.addEventListener("load", function() {
    loading.style.display = "none";
  	all.style.display = "block"
});

// ألوان زرار البحث
function searchColor() {
  document.getElementById("search").style.background = "#999";
  document.getElementById('home').style.background = "none";
  nSearch.style.display = "block";
  qSearch.style.display = "block";
  setTimeout(function(){
    nSearch.style.opacity = "1";
    nSearch.style.width = "48%";
    nSearch.style.border = "2px solid #000";
    qSearch.style.opacity = "1";
    qSearch.style.width = "48%";
    qSearch.style.border = "2px solid #000";
    
  }, 100);
}

// ألوان زرار الهوم
function homeColor() {
  document.getElementById("home").style.background = "#999";
  document.getElementById('search').style.background = "none";
  qSearch.style.width = "0%";
  qSearch.style.opacity = "0";
  nSearch.style.width = "0%";
  nSearch.style.opacity = "0";
  setTimeout(function(){
    nSearch.style.display = "none";
    qSearch.style.display = "none";
  }, 1500);
}

// فورمات الوقت
function format(t) {
  let m = Math.floor(t / 60);
  let s = Math.floor(t % 60);
  if (s < 10) s = "0" + s;
  return m + ":" + s;
}

// البحث في الصوتيات
function searchFunction() {
  let qSearchValue = qSearch.value.toLowerCase();
  let nSearchValue = nSearch.value.toLowerCase();
  let items = document.querySelectorAll(".audioItem");

  items.forEach(function(item) {
    let qse = item.querySelector("#qse").textContent.toLowerCase();
		let nse = item.querySelector("#nse").textContent.toLowerCase();



    if (qse.includes(qSearchValue) && nse.includes(nSearchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// تشغيل كل بلاير لوحده
players.forEach(function(player){

  let audio = player.querySelector(".audio");
  let play = player.querySelector(".play");
  let pause = player.querySelector(".pause");
  let range = player.querySelector(".range");
  let current = player.querySelector(".current");
  let duration = player.querySelector(".duration");
  let replay = player.querySelector(".replay");
  let forward = player.querySelector(".forward");

  // زرار تشغيل
  play.addEventListener("click", function(){
    audio.play();
    play.style.display = "none";
    pause.style.display = "inline-block";
    audio.volume = 100
  });

  // زرار إيقاف
  pause.addEventListener("click", function(){
    audio.pause();
    pause.style.display = "none";
    play.style.display = "inline-block";
  });
	forward.addEventListener("click", 
	function(){
		audio.currentTime += 5
	})
	replay.addEventListener("click", 
	function(){
		audio.currentTime -= 5
	})
  // لما الملف يتحمّل
  audio.addEventListener("loadedmetadata", function(){
    duration.textContent = format(audio.duration);
    range.max = Math.floor(audio.duration);
  });

  // أثناء التشغيل
  audio.addEventListener("timeupdate", function(){
    current.textContent = format(audio.currentTime);
    range.value = Math.floor(audio.currentTime);
  });

  // تحريك الشريط
  range.addEventListener("input", function(){
    audio.currentTime = range.value;
  });

});