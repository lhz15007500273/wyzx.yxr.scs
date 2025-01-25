   // 商品数据，通常是从服务器获取的数据
   const products = [
    { id: 1, name: "广海三牙咸鱼礼盒装", price: "￥29.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 2, name: "广海三牙干贝礼盒装", price: "￥39.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 3, name: "海味大礼包", price: "￥99.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 4, name: "广海三牙香辣味", price: "￥49.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 5, name: "鲜活三牙咸鱼", price: "￥59.9", imgSrc: "./images/三牙.png", link: "#" }
  ];
  
  
  // 渲染商品列表函数
  function renderProducts(filteredProducts) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";  // 清空当前内容

    if (filteredProducts.length === 0) {
      container.innerHTML = "<p>未找到相关商品</p>";
    } else {
      filteredProducts.forEach(product => {
        const productElement = document.createElement("a");
        productElement.href = product.link;
        productElement.innerHTML = `
          <div class="one">
            <img src="${product.imgSrc}" style="float: left;">
            <div class="text">
              ${product.name}
              <div class="shou">收藏上千</div>
            </div>
            <div class="jiage">${product.price}</div>
          </div>
        `;
        container.appendChild(productElement);
      });
    }
  }

  // 模糊查询函数
  function searchProducts(query) {
    if (query.trim() === "") {
      // 如果搜索框为空，则显示所有商品
      renderProducts(products);
      return;
    }

    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    renderProducts(filteredProducts);
  }

  // 初始化：显示指定商品
  // 这里你可以指定要初始化显示的商品，例如
  const initialProducts = [
    products[0], // 广海三牙咸鱼礼盒装
    products[1]  // 广海三牙干贝礼盒装
  ];
  renderProducts(initialProducts);

  // 搜索按钮事件监听：点击时触发查询
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", function () {
    const query = searchInput.value;
    searchProducts(query);
  });