<template>
  <div class="products-page">
    <!-- Hero Section - 现代简约风格 -->
    <section class="products-hero">
      <div class="hero-bg" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-tag">Product Center</span>
        <h1 class="hero-title">产品中心</h1>
        <p class="hero-subtitle">精选高品质纱窗，为您打造舒适安全的家居环境</p>
      </div>
    </section>

    <!-- Filter Bar - 简约分类导航 -->
    <div class="filter-section">
      <div class="container">
        <div class="filter-content">
          <div class="filter-categories">
            <button 
              class="filter-btn" 
              :class="{ active: selectedCategory === '' }"
              @click="selectCategory('')"
            >
              <span class="btn-text">全部产品</span>
              <span class="btn-count">{{ products.length }}</span>
            </button>
            <button 
              class="filter-btn" 
              v-for="cat in categories" 
              :key="cat.name"
              :class="{ active: selectedCategory === cat.name }"
              @click="selectCategory(cat.name)"
            >
              <span class="btn-text">{{ cat.name }}</span>
              <span class="btn-count">{{ cat.count }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid - 现代卡片布局 -->
    <section class="products-section">
      <div class="container">
        <div class="products-grid">
          <div 
            class="product-card" 
            v-for="product in filteredProducts" 
            :key="product.id"
            @click="goToProductDetail(product.id)"
          >
            <!-- 产品图片区域 -->
            <div class="product-image-wrapper">
              <img :src="product.image" :alt="product.name" loading="lazy" />
              <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
              <div class="product-overlay">
                <span class="view-btn">查看详情</span>
              </div>
              <div class="discount-tag" v-if="product.discount">-{{ product.discount }}%</div>
            </div>
            
            <!-- 产品信息区域 -->
            <div class="product-info">
              <div class="product-category-tag">{{ product.category }}</div>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.shortDescription }}</p>
              
              <!-- 产品规格 -->
              <div class="product-specs">
                <div class="spec-item">
                  <span class="spec-label">材质</span>
                  <span class="spec-value">{{ product.material || '优质合金' }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">款式</span>
                  <span class="spec-value">{{ product.style || '标准款' }}</span>
                </div>
              </div>
              
              <!-- 价格和操作 -->
              <div class="product-footer">
                <div class="price-wrapper">
                  <span class="price-label">起价</span>
                  <span class="price-value">¥{{ product.price }}</span>
                  <span class="price-unit">/平米</span>
                </div>
                <button class="consult-btn" @click.stop="openConsult(product)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  预约咨询
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <p>暂无符合条件的产品</p>
          <button class="reset-btn" @click="selectCategory('')">查看全部产品</button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-left">
            <h2>需要专业定制？</h2>
            <p>我们的设计师将为您提供免费上门测量和方案设计服务</p>
          </div>
          <div class="cta-right">
            <button class="cta-btn" @click="$router.push('/contact')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              立即预约咨询
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Modal -->
    <div class="modal-overlay" v-if="consultDialogVisible" @click.self="consultDialogVisible = false">
      <div class="consult-modal">
        <div class="modal-header">
          <h3>预约咨询</h3>
          <button class="close-btn" @click="consultDialogVisible = false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="product-preview" v-if="currentProduct">
            <img :src="currentProduct.image" :alt="currentProduct.name" />
            <div class="product-preview-info">
              <span class="preview-name">{{ currentProduct.name }}</span>
              <span class="preview-price">¥{{ currentProduct.price }}/平米起</span>
            </div>
          </div>
          <form @submit.prevent="submitConsult" class="consult-form">
            <div class="form-group">
              <label>您的姓名</label>
              <input type="text" v-model="consultForm.name" placeholder="请输入您的姓名" required />
            </div>
            <div class="form-group">
              <label>联系电话</label>
              <input type="tel" v-model="consultForm.phone" placeholder="请输入您的联系电话" required />
            </div>
            <div class="form-group">
              <label>留言</label>
              <textarea v-model="consultForm.message" placeholder="请描述您的需求（如窗户尺寸、颜色偏好等）" rows="3"></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? '提交中...' : '提交预约' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useRouter } from 'vue-router'

export default {
  name: 'Products',
  setup() {
    const productStore = useProductStore()
    const router = useRouter()
    
    const selectedCategory = ref('')
    const consultDialogVisible = ref(false)
    const submitting = ref(false)
    const currentProduct = ref(null)
    
    const consultForm = ref({
      name: '',
      phone: '',
      message: ''
    })

    // Hero背景图 - 现代简约风格
    const heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=600&fit=crop'

    const products = computed(() => productStore.products)

    const categories = computed(() => {
      const cats = {}
      products.value.forEach(p => {
        if (!cats[p.category]) {
          cats[p.category] = { name: p.category, count: 0 }
        }
        cats[p.category].count++
      })
      return Object.values(cats)
    })

    const filteredProducts = computed(() => {
      if (!selectedCategory.value) {
        return products.value
      }
      return products.value.filter(p => p.category === selectedCategory.value)
    })

    const selectCategory = (category) => {
      selectedCategory.value = category
      window.scrollTo({ top: 600, behavior: 'smooth' })
    }

    const goToProductDetail = (productId) => {
      router.push(`/products/${productId}`)
    }

    const openConsult = (product) => {
      currentProduct.value = product
      consultDialogVisible.value = true
    }

    const submitConsult = async () => {
      if (!consultForm.value.name || !consultForm.value.phone) {
        alert('请填写姓名和联系电话')
        return
      }
      
      submitting.value = true
      
      // 模拟提交
      setTimeout(() => {
        submitting.value = false
        consultDialogVisible.value = false
        alert('预约成功！我们的客服将在24小时内与您联系')
        
        // 重置表单
        consultForm.value = {
          name: '',
          phone: '',
          message: ''
        }
      }, 1000)
    }

    return {
      heroImage,
      selectedCategory,
      products,
      categories,
      filteredProducts,
      selectCategory,
      goToProductDetail,
      consultDialogVisible,
      consultForm,
      currentProduct,
      openConsult,
      submitConsult,
      submitting
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.products-hero {
  position: relative;
  height: 450px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 8s ease;
}

.products-hero:hover .hero-bg {
  transform: scale(1.03);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(44, 62, 80, 0.5) 0%,
    rgba(52, 152, 219, 0.5) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}

.hero-tag {
  font-size: 0.875rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: 8px;
  color: white;
}

.hero-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0;
  max-width: 500px;
}

/* Filter Section */
.filter-section {
  background: white;
  padding: 40px 0;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 60px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.filter-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-categories {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid #e5e5e5;
  border-radius: 50px;
  background: white;
  color: #666;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #2C3E50;
  color: #2C3E50;
}

.filter-btn.active {
  background: #2C3E50;
  border-color: #2C3E50;
  color: white;
}

.btn-count {
  font-size: 0.75rem;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
}

.filter-btn:not(.active) .btn-count {
  background: #f5f5f5;
}

/* Products Section */
.products-section {
  padding: 60px 0 100px;
  background: #fafafa;
  min-height: 500px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Product Card */
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.product-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.08);
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

.discount-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f39c12;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 62, 80, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-btn {
  color: white;
  padding: 12px 32px;
  border: 1px solid white;
  border-radius: 30px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: white;
  color: #2C3E50;
}

/* Product Info */
.product-info {
  padding: 24px;
}

.product-category-tag {
  display: inline-block;
  font-size: 0.75rem;
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.product-desc {
  font-size: 0.875rem;
  color: #888;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.product-specs {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 16px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-label {
  font-size: 0.6875rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.spec-value {
  font-size: 0.8125rem;
  color: #333;
  font-weight: 500;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-label {
  font-size: 0.75rem;
  color: #999;
}

.price-value {
  font-size: 1.375rem;
  font-weight: 700;
  color: #e74c3c;
}

.price-unit {
  font-size: 0.75rem;
  color: #999;
}

.consult-btn {
display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.consult-btn:hover {
  background: #3498db;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 100px 0;
}

.empty-icon {
  color: #ddd;
  margin-bottom: 24px;
}

.empty-state p {
  color: #999;
  font-size: 1.125rem;
  margin-bottom: 24px;
}

.reset-btn {
  padding: 12px 32px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.reset-btn:hover {
  background: #3498db;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #2C3E50 0%, #3498db 100%);
  padding: 80px 0;
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cta-left h2 {
  font-size: 2rem;
  color: white;
  margin: 0 0 8px 0;
}

.cta-left p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin: 0;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: white;
  color: #2C3E50;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.consult-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 480px;
  overflow: hidden;
  animation: modalSlideUp 0.3s ease;
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 24px;
}

.product-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 24px;
}

.product-preview img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.product-preview-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-name {
  font-weight: 600;
  color: #1a1a1a;
}

.preview-price {
  font-size: 0.875rem;
  color: #e74c3c;
}

.consult-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 14px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  font-size: 0.9375rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-group textarea {
  resize: none;
}

.submit-btn {
  padding: 16px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #3498db;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }
}

@media (max-width: 768px) {
  .products-hero {
    height: 350px;
  }
  
  .hero-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    padding: 0 20px;
  }
  
  .filter-categories {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 10px 16px;
    font-size: 0.875rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .product-image-wrapper {
    height: 200px;
  }
  
  .cta-content {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
  
  .container {
    padding: 0 20px;
  }
}
</style>
