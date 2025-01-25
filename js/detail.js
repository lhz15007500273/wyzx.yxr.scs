(function () {
  window.addEventListener('load', () => {
    // 模拟商品数据
    const mockData = {
      name: "台山特产 广海咸鱼 去头三牙鱼干 淡口三齿鱼 划鱼仔 新广隆海产",
      text_l: "台山正宗 咸香可口",
      text_f: "查看评价",
      tag: "限时折扣",
      tag_time: "距优惠结束3天09时09分",
      priceNew: "29.9",
      priceOld: "39.9",
      fz: "天天免邮Pro会员立享免邮",
      cx: "打骨折",
      gwf: "最高返2积分",
      xz: "特价商品不可与优惠券叠加使用",
      yf: "满99元免邮",
      ps: "广东江门",
      fw: [
        "五邑臻选自营", 
        "不支持无忧退换", 
        "不可用券", 
        "国内部分地区不可配送"
      ],
      gg: [
        { text: "带头·开背三牙鱼干232克*1包（足干品质 约4条）", price: "29.9" },
        { text: "无头·开肚三牙鱼干200克*1包（足干品质 约4条）", price: "25.9" }
      ]
    };

    // 渲染商品数据的类
    class RenderData {
      constructor(settings = {}) {
        // 获取到指定的容器
        this.el = document.querySelector(settings.el);
        if (!this.el) {
          console.error('指定的容器未找到！');
          return;
        }
        
        // 获取需要填充的元素
        this.name = this.el.querySelector('.intro h2');
        this.text_l = this.el.querySelector('.intro .text span');
        this.text_f = this.el.querySelector('.intro .text a');
        this.tag = this.el.querySelector('.m-limitedPrice .content');
        this.tag_time = this.el.querySelector('.m-limitedPrice .countdown');
        this.priceNew = this.el.querySelector('.price span:nth-of-type(2)');
        this.priceOld = this.el.querySelector('.price span:nth-of-type(3)');
        this.fz = this.el.querySelector('.price .canClick span:nth-of-type(2)');
        this.cx = this.el.querySelector('.price .sale span:nth-of-type(2)');
        this.gwf = this.el.querySelector('.price .m-feedbackBonus span:nth-of-type(2)');
        this.xz = this.el.querySelector('.price .pointInfo span:nth-of-type(2)');
        this.yf = this.el.querySelector('.price .freightText a');
        this.ps = this.el.querySelector('.price .delivery span:nth-of-type(2)');
        this.fw = this.el.querySelector('.price .policyBox a');
        this.gg = this.el.querySelector('.specProp ul');  // 规格列表
        this.selectedSpecText = this.el.querySelector('.selected-spec-text');
        
        // 调用渲染方法
        this.render();
        this.bindEvents();  // 绑定事件
      }

      render() {
        // 将数据渲染到页面元素中
        this.name.innerText = mockData.name;
        this.text_l.innerText = mockData.text_l;
        this.text_f.innerHTML = mockData.text_f + '<i class="iconfont">&#xe621;</i>';
        this.tag.innerText = mockData.tag;
        this.tag_time.innerText = mockData.tag_time;
        this.priceNew.innerText = mockData.priceNew;
        this.priceOld.innerText = mockData.priceOld;
        this.fz.innerText = mockData.fz;
        this.cx.innerText = mockData.cx;
        this.gwf.innerText = mockData.gwf;
        this.xz.innerText = mockData.xz;
        this.yf.innerText = mockData.yf;
        this.ps.innerText = mockData.ps;

        // 渲染配送政策信息
        this.fw.innerHTML = ` 
          <span>${mockData.fw[0]}  </span>
          <span>${mockData.fw[1]} > </span>
          <span>${mockData.fw[2]} > </span>
          <span>${mockData.fw[3]}  </span>
        `;

        // 渲染规格为文字（优化：避免重复渲染）
        this.renderSpecItems(mockData.gg);
      }

      // 渲染规格项
      renderSpecItems(specData) {
        // 清空现有的规格项
        this.gg.innerHTML = '';
        
        // 动态创建并插入规格项
        specData.forEach(item => {
          const li = document.createElement('li');
          li.classList.add('spec-item');
          li.dataset.spec = item.text;
          li.textContent = item.text;
          this.gg.appendChild(li);
        });
      }

      // 绑定规格选择事件（使用事件委托）
      bindEvents() {
        this.el.addEventListener('click', (e) => {
          const specItem = e.target.closest('.spec-item');
          
          if (specItem) {
            // 处理规格选择
            const selectedSpec = specItem.dataset.spec;
            const specItems = this.el.querySelectorAll('.spec-item');
            specItems.forEach(i => i.classList.remove('selected')); // 移除所有选中状态
            specItem.classList.add('selected'); // 添加当前项的选中状态
            this.selectedSpecText.textContent = selectedSpec; // 更新显示的规格
          }
        });
      }
    }

    // 初始化并渲染数据
    new RenderData({
      el: '.detailHD'
    });
  });
})();
