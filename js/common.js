(function () {
  // 从 localStorage 获取用户数据
  let username = localStorage.getItem('username');
  let isLogin = document.querySelector('#isLogin');

  // 判断用户是否已登录
  if (!username) {
    // 用户未登录，显示登录/注册链接
    isLogin.innerHTML = `<a href="./login.html">登录/注册</a>`;
  } else {
    // 用户已登录，显示用户名，并提供退出登录的功能
    isLogin.innerHTML = `
      <a href="javascript:void(0);" id="welcomeMessage">欢迎: ${username}</a>
      <a href="javascript:void(0);" id="logoutLink">退出登录</a>
    `;

    // 获取退出登录按钮
    let logoutLink = document.getElementById('logoutLink');

    // 退出登录事件
    if (logoutLink) {
      logoutLink.addEventListener('click', function () {
        // 清除 localStorage 中的用户名
        localStorage.removeItem('username');

        // 更新页面内容为登录/注册链接
        isLogin.innerHTML = `<a href="./login.html">登录/注册</a>`;

        // 可选：跳转到登录页面或者刷新页面
        // window.location.href = './login.html';  // 如果你希望跳转到登录页面
        location.reload();  // 或者刷新当前页面
      });
    }
  }
  
})();
document.addEventListener('DOMContentLoaded', function() {
  // 检查本地存储中是否存在用户登录信息（比如 token 或其他标识）
  const userToken = localStorage.getItem('username');

  // 如果没有登录信息，则重定向到登录页面
  if (!userToken) {
      alert('请先登录！');
      window.location.href = './login.html';  // 或者重定向到登录页面
  }
});
