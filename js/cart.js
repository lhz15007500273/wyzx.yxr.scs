// 渲染购物车数据
function render() {
  // 从 localStorage 获取购物车数据
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let strHTML = ` 
    <li>
      <div class="w1">
        <input type="checkbox" class="all">
        <span>全选</span>
      </div>
      <div class="w2">商品信息</div>
      <div class="w3">单价</div>
      <div class="w4">数量</div>
      <div class="w5">小计</div>
      <div class="w6">操作</div>
    </li>
  `;

  cart.forEach(item => {
    // 商品小计
    const itemSubtotal = item.price * item.quantity;

    strHTML += `
      <li data-cid="${item.id}">
        <div class="w1">
          <input type="checkbox" class="box" ${item.selected ? 'checked' : ''}>
        </div>
        <div class="w2">
          <div class="pic">
            <a href="#">
              <img src="${item.image}" alt="">
            </a>
          </div>
          <div class="nameCon">
            <a href="#">${item.name}</a>
            <p class="spec-info">规格：${item.spec}</p> <!-- 显示规格信息 -->
          </div>
        </div>
        <div class="w3">
          <span>¥${item.price.toFixed(2)}</span>
        </div>
        <div class="w4">
          <span class="sub">-</span>
          <input type="text" value="${item.quantity}">
          <span class="sup">+</span>
        </div>
        <div class="w5">
          <span class="price">¥${itemSubtotal.toFixed(2)}</span>
        </div>
        <div class="w6">
          <a href="javascript:" class="del">删除</a>
        </div>
      </li>
    `;
  });

  // 将渲染后的 HTML 插入到页面中
  document.querySelector('.c-detail ul').innerHTML = strHTML;

  // 更新购物车总金额
  updateTotal();

  // 重新绑定事件
  bindEvents();
}

// 更新总金额
function updateTotal() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalAmount = 0;
  let totalDiscount = 0;

  // 计算总金额和优惠
  cart.forEach(item => {
    if (item.selected) {
      totalAmount += item.price * item.quantity;
      totalDiscount += item.price * item.quantity * 0.05; // 假设95折
    }
  });

  const totalElement = document.querySelector('.cart-total .info');
  const zje = document.getElementById('zje');
  const yfje = document.querySelector('.yfje');
  const dz = document.querySelector('.dz');

  zje.innerText = `¥${totalAmount.toFixed(2)}`;
  yfje.innerText = `¥${(totalAmount - totalDiscount).toFixed(2)}`;
  dz.innerText = `-¥${totalDiscount.toFixed(2)}`;
}

// 绑定事件
function bindEvents() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectAllCheckbox = document.querySelector('.m-cart .w1 input[type="checkbox"]');
  const itemCheckboxes = document.querySelectorAll('.box');
  const subButtons = document.querySelectorAll('.sub');
  const supButtons = document.querySelectorAll('.sup');
  const quantityInputs = document.querySelectorAll('.w4 input');
  const delButtons = document.querySelectorAll('.del');
  const submitButton = document.querySelector('.submit'); // 获取下单按钮

  // 全选/全不选
  selectAllCheckbox.addEventListener('change', function() {
    const isChecked = this.checked;
    cart.forEach(item => {
      item.selected = isChecked;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    render();
  });

  // 单个商品选择框
  itemCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
      cart[index].selected = this.checked;
      localStorage.setItem('cart', JSON.stringify(cart));
      render();
    });
  });

  // 检查是否需要更新全选框
  updateSelectAllCheckboxState();

  // 数量增加
  supButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      render();
    });
  });

  // 数量减少
  subButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        render();
      }
    });
  });

  // 手动输入数量
  quantityInputs.forEach((input, index) => {
    input.addEventListener('change', function() {
      const value = parseInt(this.value, 10);
      if (value > 0) {
        cart[index].quantity = value;
        localStorage.setItem('cart', JSON.stringify(cart));
        render();
      }
    });
  });

  // 删除商品
  delButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      render();
    });
  });

  // 绑定下单按钮事件
  if (submitButton) {
    submitButton.addEventListener('click', handleOrder);
  }
}

// 更新全选框的状态
function updateSelectAllCheckboxState() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const selectAllCheckbox = document.querySelector('.m-cart .w1 input[type="checkbox"]');
  const allSelected = cart.every(item => item.selected); // 如果所有商品都选中，全选框为选中状态
  selectAllCheckbox.checked = allSelected;
}

// 处理下单
function handleOrder() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // 获取选中的商品
  const selectedItems = cart.filter(item => item.selected);

  if (selectedItems.length === 0) {
    alert('请先选择商品!');
    return;
  }

  // 将已下单商品保存到 localStorage
  let previousOrders = JSON.parse(localStorage.getItem('order')) || [];
  previousOrders.push(...selectedItems); // 将已下单的商品添加到历史订单中
  localStorage.setItem('order', JSON.stringify(previousOrders));

  // 清空已下单商品，更新购物车
  cart = cart.filter(item => !item.selected);
  localStorage.setItem('cart', JSON.stringify(cart));

  // 显示下单成功提示
  alert('下单成功！');

  // 提示后刷新页面，重新渲染购物车
  setTimeout(() => {
    location.reload(); // 刷新页面
  }, 1000); // 延迟 1 秒刷新页面，给用户看到提示的时间
}

// 初始化购物车
function initCart() {
  render();
}

// 初始化购物车
initCart();
