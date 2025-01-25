 // 商品数据，通常是从服务器获取的数据
 const products = [
    { id: 1, name: "广海三牙咸鱼礼盒装", price: "￥29.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 2, name: "广海三牙干贝礼盒装", price: "￥39.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 3, name: "海味大礼包", price: "￥99.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 4, name: "广海三牙香辣味", price: "￥49.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 4, name: "广海三牙香辣味", price: "￥49.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 4, name: "广海三牙香辣味", price: "￥49.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 4, name: "广海三牙香辣味", price: "￥49.9", imgSrc: "./images/三牙.png", link: "#" },
    { id: 5, name: "鲜活三牙咸鱼", price: "￥59.9", imgSrc: "./images/三牙.png", link: "#" }
  
  ];
  
    // 搜索按钮事件监听：点击时触发查询
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    
    searchBtn.addEventListener("click", function () {
      const query = searchInput.value;
    
      // 如果查询内容为空，清空查询结果
      if (query.trim() === "") {
        alert("请输入商品名称");
        return;
      }
    
      // 过滤商品数据
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    
      // 将查询结果存储到 localStorage 中
      localStorage.setItem("searchResults", JSON.stringify(filteredProducts));
    
      // 跳转到 buy all.html 页面
      window.location.href = "buy all.html"; // 跳转页面
    });
     
  // 获取存储的搜索结果
  const searchResults = JSON.parse(localStorage.getItem("searchResults"));
  
  function renderProducts(filteredProducts) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";  // 清空当前内容
  
    if (filteredProducts && filteredProducts.length > 0) {
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
    } else {
      container.innerHTML = "<p>未找到相关商品</p>";
    }
  }
  
  // 初始化：显示从 localStorage 获取的查询结果
  renderProducts(searchResults);
  