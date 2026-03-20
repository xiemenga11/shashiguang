<template>
  <div class="home">
    <!-- Hero Section - 正常文档流布局 -->
    <section class="hero">
      <el-carousel 
        height="100vh" 
        :autoplay="true" 
        :interval="5000" 
        arrow="never"
        indicator-position="none"
        @change="handleCarouselChange"
        ref="carouselRef"
      >
        <el-carousel-item v-for="(slide, index) in heroSlides" :key="index">
          <div class="slide-content">
            <div class="slide-image" :style="{ backgroundImage: `url(${slide.image})` }"></div>
            <div class="slide-overlay"></div>
            
            <!-- 右侧文字内容 -->
            <div class="slide-text">
              <h1 class="slide-title">{{ slide.title }}</h1>
              <div class="brand-line">
                <span class="brand-name">{{ slide.brand }}</span>
                <span class="brand-year">{{ slide.year }}</span>
              </div>
              <div class="slide-actions">
                <button class="action-btn primary" @click="$router.push('/products')">查看产品</button>
                <button class="action-btn secondary" @click="$router.push('/contact')">预约咨询</button>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <!-- 自定义指示器 -->
      <div class="custom-indicators">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="indicator-bar"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </section>

    <!-- Features Section - 优势展示 -->
    <section class="features" id="features">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">为什么选择我们</span>
          <h2 class="section-title">专业品质 值得信赖</h2>
          <p class="section-desc">专注于高品质纱窗定制，为您打造舒适安全的家居环境</p>
        </div>
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(feature, index) in features" 
            :key="feature.title"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Preview Section - 产品预览 -->
    <section class="products-preview" id="products">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">热门产品</span>
          <h2 class="section-title">精选高品质纱窗</h2>
          <p class="section-desc">满足不同场景需求，为您的家提供最佳防护</p>
        </div>
        <div class="products-grid">
          <div 
            class="product-card" 
            v-for="product in featuredProducts" 
            :key="product.id"
            @click="$router.push(`/products/${product.id}`)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" loading="lazy" />
              <div class="product-overlay">
                <span>查看详情</span>
              </div>
              <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <div class="product-price">
                <span class="price-value">¥{{ product.price }}</span>
                <span class="price-unit">/平米起</span>
              </div>
            </div>
          </div>
        </div>
        <div class="view-all-btn">
          <button class="primary-btn" @click="$router.push('/products')">
            查看全部产品
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section - 数据展示 -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta" id="contact">
      <div class="container">
        <div class="cta-content">
          <h2>需要专业定制？</h2>
          <p>我们的设计师将为您提供免费上门测量和方案设计服务</p>
          <button class="cta-btn" @click="$router.push('/contact')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            立即预约咨询
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/productStore'

export default {
  name: 'Home',
  setup() {
    const productStore = useProductStore()
    const carouselRef = ref(null)
    const currentSlide = ref(0)

    // 轮播图数据
    const heroSlides = [
      {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
        title: '无距自然 纵横科技',
        brand: '纱时光',
        year: 'SINCE 1999'
      },
      {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
        title: '隐形防护 清晰视野',
        brand: '纱时光',
        year: 'SINCE 1999'
      },
      {
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=1080&fit=crop',
        title: '智能防护 品质生活',
        brand: '纱时光',
        year: 'SINCE 1999'
      }
    ]

    const features = [
      {
        title: '品质保证',
        description: '采用优质材料，严格质量控制，确保每一件产品都经久耐用',
        icon: 'el-icon-circle-check'
      },
      {
        title: '专业团队',
        description: '拥有多年行业经验的专业团队，为您提供专业的安装服务',
        icon: 'el-icon-user'
      },
      {
        title: '定制服务',
        description: '根据您的需求提供个性化定制服务，满足不同场景需求',
        icon: 'el-icon-setting'
      },
      {
        title: '售后保障',
        description: '完善的售后服务体系，让您购买无忧，使用放心',
        icon: 'el-icon-phone'
      }
    ]

    const stats = [
      { value: '10+', label: '年行业经验' },
      { value: '5000+', label: '服务客户' },
      { value: '98%', label: '客户满意度' },
      { value: '50+', label: '专利技术' }
    ]

    const featuredProducts = computed(() => {
      return productStore.products.slice(0, 4)
    })

    const handleCarouselChange = (index) => {
      currentSlide.value = index
    }

    const goToSlide = (index) => {
      if (carouselRef.value) {
        carouselRef.value.setActiveItem(index)
      }
    }

    return {
      heroSlides,
      features,
      stats,
      featuredProducts,
      currentSlide,
      carouselRef,
      handleCarouselChange,
      goToSlide
    }
  }
}
</script>

<style scoped>
.home {
  background-color: white;
}

/* Hero Section - 正常文档流 */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero :deep(.el-carousel) {
  height: 100vh;
}

.hero :deep(.el-carousel__container) {
  height: 100vh;
}

.hero :deep(.el-carousel__indicators) {
  display: none;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100vh;
}

.slide-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 10s ease;
}

.slide-content:hover .slide-image {
  transform: scale(1.03);
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

/* 右侧文字内容 */
.slide-text {
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translateY(-50%);
  color: white;
  z-index: 10;
  text-align: right;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 300;
  margin: 0 0 24px 0;
  line-height: 1.2;
  letter-spacing: 6px;
  animation: fadeInRight 0.8s ease-out;
}

.brand-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-bottom: 40px;
  animation: fadeInRight 0.8s ease-out 0.2s both;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 4px;
}

.brand-year {
  font-size: 0.875rem;
  opacity: 0.8;
  letter-spacing: 2px;
}

.slide-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  animation: fadeInRight 0.8s ease-out 0.4s both;
}

.action-btn {
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: white;
  color: #333;
  border: none;
}

.action-btn.primary:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.action-btn.secondary {
  background: transparent;
  color: white;
  border: 1px solid white;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 自定义指示器 */
.custom-indicators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 20;
}

.indicator-bar {
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.indicator-bar:hover {
  background: rgba(255, 255, 255, 0.7);
}

.indicator-bar.active {
  background: white;
  width: 60px;
}

/* Features Section */
.features {
  padding: 120px 0;
  background-color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-tag {
  display: inline-block;
  font-size: 0.875rem;
  color: #3498db;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.section-desc {
  font-size: 1.125rem;
  color: #666;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  background-color: #f8f9fa;
  transition: all 0.4s ease;
  animation: fadeInUp 0.6s ease-out both;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
}

.feature-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #2C3E50 0%, #3498db 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.feature-icon i {
  font-size: 28px;
  color: white;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}

.feature-card p {
  font-size: 0.9375rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Products Preview Section */
.products-preview {
  padding: 120px 0;
  background-color: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 62, 80, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-overlay span {
  color: white;
  font-size: 14px;
  padding: 10px 24px;
  border: 1px solid white;
  border-radius: 25px;
}

.product-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-info {
  padding: 24px;
}

.product-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.product-category {
  color: #3498db;
  font-size: 0.875rem;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e74c3c;
}

.price-unit {
  font-size: 0.875rem;
  color: #999;
}

.view-all-btn {
  text-align: center;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 36px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background: #3498db;
  transform: translateX(4px);
}

.primary-btn svg {
  transition: transform 0.3s ease;
}

.primary-btn:hover svg {
  transform: translateX(4px);
}

/* Stats Section */
.stats {
  padding: 80px 0;
  background: linear-gradient(135deg, #2C3E50 0%, #3498db 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;
}

.stat-item {
  color: white;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* CTA Section */
.cta {
  padding: 120px 0;
  background-color: white;
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.cta p {
  font-size: 1.125rem;
  color: #666;
  margin: 0 0 40px 0;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background: #3498db;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .features-grid,
  .products-grid,
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .slide-title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
}

@media (max-width: 768px) {
  .features,
  .products-preview,
  .cta {
    padding: 80px 0;
  }
  
  .section-header {
    margin-bottom: 48px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid,
  .products-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .slide-title {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }
  
  .slide-text {
    left: 5%;
    right: 5%;
    text-align: center;
  }
  
  .brand-line {
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }
  
  .slide-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .custom-indicators {
    bottom: 30px;
  }
}
</style>
