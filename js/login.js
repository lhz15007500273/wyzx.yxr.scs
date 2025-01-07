document.addEventListener("DOMContentLoaded", function () {
  // 切换登录与注册
  const loginHeader = document.getElementById('login_register');
  const loginBtn = document.getElementById('login');
  const regeditBtn = document.getElementById('regedit');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginBtn.addEventListener('click', function () {
    loginForm.style.display = 'block';  // 显示登录表单
    registerForm.style.display = 'none';  // 隐藏注册表单
    document.getElementById('login').classList.add('current');
    document.getElementById('regedit').classList.remove('current');
  });

  regeditBtn.addEventListener('click', function () {
    loginForm.style.display = 'none';  // 隐藏登录表单
    registerForm.style.display = 'block';  // 显示注册表单
    document.getElementById('regedit').classList.add('current');
    document.getElementById('login').classList.remove('current');
  });

  // 登录按钮事件
  const submitLogin = document.getElementById('submitLogin');
  const phoneInput = document.getElementById('phone');
  const pwdInput = document.getElementById('pwd');
  const phoneMsg = document.querySelector('.phoneMsg');
  const pwdMsg = document.querySelector('.pwdMsg');

  submitLogin.addEventListener('click', function (e) {
    e.preventDefault();
    let isValid = true;

    // 手机号验证
    const phoneValue = phoneInput.value.trim();
    if (!phoneValue || !/^\d{11}$/.test(phoneValue)) {
      if (phoneMsg) {
        phoneMsg.textContent = '请输入有效的手机号码';
      }
      isValid = false;
    } else {
      if (phoneMsg) {
        phoneMsg.textContent = '';
      }
    }

    // 密码验证
    const pwdValue = pwdInput.value.trim();
    if (!pwdValue || pwdValue.length < 6) {
      if (pwdMsg) {
        pwdMsg.textContent = '密码必须至少6个字符';
      }
      isValid = false;
    } else {
      if (pwdMsg) {
        pwdMsg.textContent = '';
      }
    }

    // 登录逻辑
    if (isValid) {
      console.log('登录中...');

      // 模拟从 localStorage 获取已存储的用户信息
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && user.username === phoneValue && user.password === pwdValue) {
        // 登录成功，存储用户名到 localStorage
        localStorage.setItem('username', user.username);
        
        // 打印确认信息，确保用户名已存储
        console.log('登录成功，用户名已存储到 localStorage:', user.username);
      
        // 登录成功后跳转到首页
        window.location.href = 'index.html';  // 登录成功后跳转到首页
      } else {
        alert('账号或密码错误！');
      }
      
    }
  });
// 登录成功后，检查是否成功存储用户名
const storedUsername = localStorage.getItem('username');
console.log('存储在 localStorage 中的用户名:', storedUsername);

  // 注册按钮事件
  const submitRegister = document.getElementById('submitRegister');
  const regPhoneInput = document.getElementById('regPhone');
  const regPwdInput = document.getElementById('regPwd');
  const confirmPwdInput = document.getElementById('confirmPwd');
  const confirmMsg = document.querySelector('.confirmMsg');
  const phoneMsgRegister = document.querySelector('.phoneMsgRegister');
  const pwdMsgRegister = document.querySelector('.pwdMsgRegister');

  submitRegister.addEventListener('click', function (e) {
    e.preventDefault();
    let isValid = true;

    // 手机号验证
    const regPhoneValue = regPhoneInput.value.trim();
    if (!regPhoneValue || !/^\d{11}$/.test(regPhoneValue)) {
      if (phoneMsgRegister) {
        phoneMsgRegister.textContent = '请输入有效的手机号码';
      }
      isValid = false;
    } else {
      if (phoneMsgRegister) {
        phoneMsgRegister.textContent = '';
      }
    }

    // 密码验证
    const regPwdValue = regPwdInput.value.trim();
    if (!regPwdValue || regPwdValue.length < 6) {
      if (pwdMsgRegister) {
        pwdMsgRegister.textContent = '密码必须至少6个字符';
      }
      isValid = false;
    } else {
      if (pwdMsgRegister) {
        pwdMsgRegister.textContent = '';
      }
    }

    // 确认密码验证
    const confirmPwdValue = confirmPwdInput.value.trim();
    if (confirmPwdValue !== regPwdValue) {
      if (confirmMsg) {
        confirmMsg.textContent = '两次密码输入不一致';
      }
      isValid = false;
    } else {
      if (confirmMsg) {
        confirmMsg.textContent = '';
      }
    }

    // 检查手机号是否已注册
    const existingUser = localStorage.getItem('user');
    if (existingUser && JSON.parse(existingUser).username === regPhoneValue) {
      alert('该手机号已注册，请直接登录！');
      isValid = false;
    }

    // 注册逻辑
    if (isValid) {
      console.log('注册成功...');

      // 直接将用户信息保存到 localStorage
      localStorage.setItem('user', JSON.stringify({
        username: regPhoneValue,
        password: regPwdValue
      }));

      alert('注册成功，请登录！');

      // 跳转到登录页
      window.location.href = 'login.html';  // 注册成功后跳转到登录页
    } else {
      // 注册失败时弹出错误信息
      alert('注册失败，请检查输入的字段是否正确！');
    }
  });
});
