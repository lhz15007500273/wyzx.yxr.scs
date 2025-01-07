window.onload = function() {
  let currentIndex = 0;  // 当前图片的索引
  const items = document.querySelectorAll('.m-promContainer .promList ul li');  // 获取所有的图片项
  const totalItems = items.length;  // 获取总图片数
  const prevButton = document.querySelector('.m-promContainer .promList .prev');  // 上一张按钮
  const nextButton = document.querySelector('.m-promContainer .promList .next');  // 下一张按钮
  let autoPlayInterval = null; // 用来存储自动轮播的定时器

  // 设置轮播图的初始位置
  function goToSlide(index) {
    const offset = -100 * index / 4; // 每次切换4张图片
    document.querySelector('.m-promContainer .promList ul').style.transform = `translateX(${offset}%)`;
  }

  // 自动轮播的功能
  function startAutoPlay() {
    autoPlayInterval = setInterval(function() {
      currentIndex = (currentIndex + 1) % Math.ceil(totalItems / 4);  // 循环播放
      goToSlide(currentIndex);  // 切换到指定的图片
    }, 5000); // 每5秒自动切换一组图片
  }

  // 停止自动轮播
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // 前一个按钮点击事件
  prevButton.addEventListener('click', function() {
    stopAutoPlay(); // 点击时暂停自动播放
    currentIndex = (currentIndex === 0) ? Math.ceil(totalItems / 4) - 1 : currentIndex - 1; // 如果当前是第一组，切换到最后一组
    goToSlide(currentIndex);  // 切换到指定的图片
    startAutoPlay(); // 重新启动自动轮播
  });

  // 下一个按钮点击事件
  nextButton.addEventListener('click', function() {
    stopAutoPlay(); // 点击时暂停自动播放
    currentIndex = (currentIndex === Math.ceil(totalItems / 4) - 1) ? 0 : currentIndex + 1; // 如果当前是最后一组，切换到第一组
    goToSlide(currentIndex);  // 切换到指定的图片
    startAutoPlay(); // 重新启动自动轮播
  });

  // 初始化时启动自动轮播
  startAutoPlay();
};
