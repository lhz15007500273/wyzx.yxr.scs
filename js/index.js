(function () {
  window.addEventListener('load', () => {

    // 防抖，主要用于搜索等功能
    function debounce(fn, delay) {
      let timer = null;
      return function () {
        let that = this;
        let args = arguments;

        if (timer) clearInterval(timer);
        timer = setTimeout(function () {
          fn.apply(that, args);
        }, delay);
      }
    }

    // 获取自身到body的距离函数
    function offsetDis(obj) {
      let left = 0;
      let top = 0;

      while (obj) {
        left += obj.offsetLeft;
        top += obj.offsetTop;
        obj = obj.offsetParent;
      }
      return { left, top };
    }

    // 轮播图类
    class SwiperBanner {
      constructor(settings = {}) {
        this.settings = Object.assign({}, settings);
        this.el = document.querySelector(this.settings.el);
        this.imgs = this.el.querySelectorAll('.swiper-wrapper a img');
        this.prev = this.el.querySelector('.prev');
        this.next = this.el.querySelector('.next');
        this.pageC = this.el.querySelectorAll('.swiper-pagination li');
        this.indexTemp = 0;
        this.timer = null;
    
        // 初始化
        this.init();
        this.autoPlay();
    
        // 事件绑定
        this.bindEvents();
      }
    
      init() {
        this.updateView();
      }
    
      updateView() {
        this.imgs.forEach((img, index) => {
          img.style.opacity = index === this.indexTemp ? 1 : 0;
        });
        this.pageC.forEach((dot, index) => {
          dot.classList.toggle('active', index === this.indexTemp);
        });
      }
    
      autoPlay() {
        this.timer = setInterval(() => {
          this.indexTemp = (this.indexTemp + 1) % this.imgs.length;
          this.updateView();
        }, 2000);
      }
    
      bindEvents() {
        // 停止和恢复自动播放
        this.el.addEventListener('mouseenter', () => clearInterval(this.timer));
        this.el.addEventListener('mouseleave', () => this.autoPlay());
    
        // 上一张
        this.prev.addEventListener('click', () => {
          this.indexTemp = (this.indexTemp - 1 + this.imgs.length) % this.imgs.length;
          this.updateView();
        });
    
        // 下一张
        this.next.addEventListener('click', () => {
          this.indexTemp = (this.indexTemp + 1) % this.imgs.length;
          this.updateView();
        });
    
        // 分页器点击
        this.pageC.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            this.indexTemp = index;
            this.updateView();
          });
        });
      }
    }
    
    // 实例化轮播图
    new SwiperBanner({
      el: '.swiper-container',
    });

    // 滚动轮播类（盖楼层部分）
    class swiperBanner {
      constructor(settings = {}) {
        this.el = document.querySelector(settings.el);
        // ul list
        this.oList = this.el.children[0];
        // prev next
        this.prev = this.el.nextElementSibling;
        this.next = this.prev.nextElementSibling;
        // 当前是第几张图
        this.indexTemp = 0;
        // 位置, 宽度为364(包含了padding)
        this.pos = 0;
        // 节流阀
        this.flag = true;
        this.clickHandler(() => { this.flag = true });
      }

      // 数据的渲染
      render() {
        let strHTML = ``;
        this.data.forEach((item, index) => {
          strHTML += `<li data-id="${index}">${item}</li>`;
        });
        this.el.children[2].innerHTML = strHTML;
      }

      // 正在输入，加入防抖
      inputChange() {
        // 这里加了防抖，防止过多请求
        let that = this;
        this.ipt.addEventListener('input', debounce(search, 200));
        function search() {
          // 拿到内容，发送给搜索接口
          let keywordPrefix = that.ipt.value;
          let __timestamp = Date.now();
          $.ajax({
            type: "get",
            url: '/search',
            data: {
              __timestamp: __timestamp,
              keywordPrefix: keywordPrefix
            }
          }).then(res => {
            if (!res) { return false; }
            that.data = res.data || [];
            that.render();
          });
        }
      }

      // 触摸我，变色
      overHanlder() {
        this.el.children[2].addEventListener('mouseover', (event) => {
          let e = event || window.event;
          let target = e.target || e.srcElement;

          if (target.nodeName !== 'LI') {
            return false;
          }
          // 自己变色，其他的不变色
          let id = target.getAttribute('data-id');
          Array.prototype.slice.call(this.el.children[2].children).forEach((item, index) => {
            item.style.backgroundColor = index == id ? '#f40' : '#fff';
          });
        });

        // 离开就清除
        this.el.children[2].addEventListener('mouseleave', () => {
          this.data = [];
          this.render();
        });
      }

      // 点击，删除搜索数据，放到输入框
      clickHandler() {
        this.el.children[2].addEventListener('click', (event) => {
          let e = event || window.event;
          let target = e.target || e.srcElement;
          if (target.nodeName !== 'LI') {
            return false;
          }
          this.ipt.value = target.innerText;
          this.el.children[2].innerHTML = '';
        });
      }
    }
  })
})();
