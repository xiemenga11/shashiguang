<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- 品牌介绍 -->
          <div class="footer-col brand-col">
            <div class="footer-logo">
              <img src="../../assets/logo.png" alt="纱时光" />
              <span class="logo-text">纱时光</span>
            </div>
            <p class="brand-desc">专业纱窗制造商，致力于为客户提供高品质的纱窗产品和优质服务，让您的家更舒适、更安全。</p>
            <div class="social-icons">
              <a href="#" class="social-link" title="微信">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.69 13.3c.39-.39.89-.64 1.45-.73L11 12l-.86.57c-.56.09-1.06.34-1.45.73zm-.69-3.3c.17-.4.52-.69.95-.79l1.2-.3-1.35-.54c-.43.1-.78.39-.95.79l.15.84zM16 8a6 6 0 0 1-6 6H6a6 6 0 0 1 6-6V8z"/></svg>
              </a>
              <a href="#" class="social-link" title="微博">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20c-4.453 0-8.098-2.352-8.098-5.25 0-1.32.756-2.94 1.962-4.482C5.67 7.92 8.11 7.5 9.47 8.28c.71.41 1.21 1.04 1.46 1.82.25-.78.75-1.41 1.46-1.82 1.36-.78 3.8-.36 5.51 2.09 1.2 1.54 1.96 3.16 1.96 4.47 0 2.9-3.65 5.25-8.09 5.25h-1.21z"/></svg>
              </a>
            </div>
          </div>

          <!-- 快速链接 -->
          <div class="footer-col">
            <h3 class="col-title">快速链接</h3>
            <ul class="footer-links">
              <li><a href="#">关于我们</a></li>
              <li><a href="#">产品中心</a></li>
              <li><a href="#">工程案例</a></li>
              <li><a href="#">新闻资讯</a></li>
              <li><a href="#">联系我们</a></li>
            </ul>
          </div>

          <!-- 产品分类 -->
          <div class="footer-col">
            <h3 class="col-title">产品分类</h3>
            <ul class="footer-links">
              <li><a href="#">隐形纱窗</a></li>
              <li><a href="#">金刚网纱窗</a></li>
              <li><a href="#">磁吸纱窗</a></li>
              <li><a href="#">智能纱窗</a></li>
              <li><a href="#">纱门系列</a></li>
            </ul>
          </div>

          <!-- 联系方式 -->
          <div class="footer-col contact-col">
            <h3 class="col-title">联系我们</h3>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span class="contact-text">400-888-8888</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span class="contact-text">info@shashiguang.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span class="contact-text">上海市浦东新区张江高科技园区</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">⏰</span>
                <span class="contact-text">周一至周日 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">© 2024 纱时光 All Rights Reserved</p>
        <p class="beian">沪ICP备20240001号</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.site-footer {
  background: #2c3e50;
  color: #ecf0f1;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-main {
  padding: 60px 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
}

/* Brand Column */
.brand-col {
  padding-right: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-logo img {
  height: 40px;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.brand-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #bdc3c7;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 36px;
  height: 36px;
  background: #34495e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: background 0.3s;
}

.social-link:hover {
  background: #3498db;
}

/* Footer Columns */
.footer-col {
  color: #ecf0f1;
}

.col-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #3498db;
}

/* Contact Column */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #bdc3c7;
  font-size: 14px;
}

.contact-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.contact-text {
  line-height: 1.5;
}

/* Footer Bottom */
.footer-bottom {
  background: #1a252f;
  padding: 20px 0;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright,
.beian {
  margin: 0;
  font-size: 13px;
  color: #7f8c8d;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom .container {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
