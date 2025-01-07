class RenderOrder {
  constructor(settings = {}) {
    this.el = document.querySelector(settings.el);
    this.selectAllCheckbox = document.querySelector('#select-all');
    this.deleteButton = document.querySelector('#delete-selected');
    this.searchInput = document.querySelector('#searchInput');  // 查询框输入框
    this.searchButton = document.querySelector('#searchBtn');  // 查询按钮
    this.orders = JSON.parse(localStorage.getItem('order')) || []; // 获取所有订单
    this.filteredOrders = [...this.orders];  // 初始时显示所有订单
    this.render();  // 渲染订单列表
  }

  // 渲染已下单商品
  render() {
    let strHTML = '';

    // 如果没有订单，提示用户
    if (this.filteredOrders.length === 0) {
      strHTML = `<p>没有找到符合条件的订单！</p>`;
    } else {
      this.filteredOrders.forEach((item, index) => {
        const subtotal = item.price * item.quantity; // 小计
        const actualPayment = subtotal * 0.95; // 实付金额，考虑 5% 折扣

        strHTML += `
          <li>
            <div class="order-item">
              <div class="checkbox">
                <input type="checkbox" class="order-checkbox" data-index="${index}">
              </div>
              <div class="pic">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="info">
                <p>${item.name}</p>
                <p>规格：${item.spec}</p>
                <p>数量：${item.quantity}</p>
                <p>单价：¥${item.price.toFixed(2)}</p>
                <p>小计：¥${subtotal.toFixed(2)}</p>
                <p>实付：¥${actualPayment.toFixed(2)}</p> <!-- 显示折扣后的实付金额 -->
                <p>下单时间：${item.orderDate}</p> <!-- 显示下单时间 -->
              </div>
            </div>
          </li>
        `;
      });
    }

    // 将渲染的 HTML 插入到页面
    this.el.innerHTML = strHTML;

    // 绑定事件
    this.bindEvents();
  }

  bindEvents() {
    // 绑定勾选框事件
    const checkboxes = this.el.querySelectorAll('.order-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this.updateSelectAllStatus.bind(this));
    });

    // 绑定全选框事件
    this.selectAllCheckbox.addEventListener('change', this.toggleSelectAll.bind(this));

    // 绑定删除按钮事件
    this.deleteButton.addEventListener('click', this.deleteSelected.bind(this));

    // 绑定查询按钮点击事件
    this.searchButton.addEventListener('click', this.searchOrders.bind(this));
  }

  // 查询订单
  searchOrders() {
    const query = this.searchInput.value.trim().toLowerCase();  // 获取查询内容，转为小写以忽略大小写差异

    if (query) {
      // 进行模糊查询，过滤包含查询文本的订单
      this.filteredOrders = this.orders.filter(item => item.name.toLowerCase().includes(query));
    } else {
      // 如果没有查询内容，恢复显示所有订单
      this.filteredOrders = [...this.orders];
    }

    this.render();  // 重新渲染过滤后的订单列表
  }

  // 更新全选框的状态
  updateSelectAllStatus() {
    const checkboxes = this.el.querySelectorAll('.order-checkbox');
    const checkedCheckboxes = this.el.querySelectorAll('.order-checkbox:checked');
    this.selectAllCheckbox.checked = checkboxes.length === checkedCheckboxes.length;
  }

  // 全选/取消全选
  toggleSelectAll(event) {
    const checkboxes = this.el.querySelectorAll('.order-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
    });
  }

  // 删除已勾选的商品
  deleteSelected() {
    const checkboxes = this.el.querySelectorAll('.order-checkbox:checked');
    if (checkboxes.length === 0) {
      alert('请勾选至少一个商品进行删除！');
      return;
    }

    const indexesToDelete = [];
    checkboxes.forEach(checkbox => {
      indexesToDelete.push(parseInt(checkbox.dataset.index));
    });

    // 删除选中的商品
    this.orders = this.orders.filter((_, index) => !indexesToDelete.includes(index));
    this.filteredOrders = [...this.orders];  // 更新过滤后的订单列表

    // 更新 localStorage
    localStorage.setItem('order', JSON.stringify(this.orders));

    // 重新渲染页面
    this.render();
  }
}

// 初始化渲染订单
new RenderOrder({
  el: '.order-list' // 确保页面中有一个 ul 或 div 来容纳这些订单项
});
