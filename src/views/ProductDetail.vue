<template>
  <div class="product-detail-page" v-if="product">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <div class="container">
        <span @click="$router.push('/')">首页</span>
        <span class="separator">/</span>
        <span @click="$router.push('/products')">产品中心</span>
        <span class="separator">/</span>
        <span class="current">{{ product.name }}</span>
      </div>
    </div>

    <!-- Product Main Section -->
    <section class="product-main">
      <div class="container">
        <div class="product-grid">
          <!-- Left: Gallery -->
          <div class="gallery-section">
            <div class="main-image">
              <img :src="selectedImage" :alt="product.name" />
              <div class="badge" v-if="product.badge">{{ product.badge }}</div>
            </div>
            <div class="thumbnails" v-if="product.images && product.images.length">
              <div 
                class="thumb" 
                v-for="(img, idx) in product.images" 
                :key="idx"
                :class="{ active: selectedImage === img }"
                @click="selectedImage = img"
              >
                <img :src="img" :alt="product.name" />
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="info-section">
            <div class="product-category">{{ product.category }}</div>
            <h1 class="product-name">{{ product.name }}</h1>
            <p class="product-desc">{{ product.description }}</p>
            
            <div class="product-rating">
              <div class="stars">
                <svg v-for="i in 5" :key="i" width="18" height="18" viewBox="0 0 24 24" :fill="i <= Math.floor(product.rating) ? '#f39c12' : 'none'" :stroke="i <= Math.floor(product.rating) ? '#f39c12' : '#ccc'" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <span class="rating-text">{{ product.rating }} 分</span>
              <span class="reviews-count">({{ product.reviewsCount }}条评价)</span>
            </div>

            <!-- Specs Table -->
            <div class="specs-table">
              <div class="spec-row" v-if="product.material">
                <span class="spec-label">材质</span>
                <span class="spec-value">{{ product.material }}</span>
              </div>
              <div class="spec-row" v-if="product.style">
                <span class="spec-label">款式</span>
                <span class="spec-value">{{ product.style }}</span>
              </div>
              <div class="spec-row" v-if="product.colors">
                <span class="spec-label">颜色</span>
                <span class="spec-value">{{ product.colors.join('、') }}</span>
              </div>
              <div class="spec-row">
                <span class="spec-label">品牌</span>
                <span class="spec-value">纱时光</span>
              </div>
            </div>

            <!-- Price Section -->
            <div class="price-section">
              <div class="price-label">参考价格</div>
              <div class="price-wrapper">
                <span class="price-currency">¥</span>
                <span class="price-value">{{ product.price }}</span>
                <span class="price-unit">/平米起</span>
              </div>
              <div class="price-note">* 具体价格根据实际测量和定制需求确定</div>
            </div>

            <!-- Actions -->
            <div class="action-buttons">
              <button class="btn-primary" @click="openConsult">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                立即预约咨询
              </button>
              <button class="btn-secondary" @click="$router.push('/products')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                返回列表
              </button>
            </div>

            <!-- Trust Badges -->
            <div class="trust-badges">
              <div class="badge-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>品质保障</span>
              </div>
              <div class="badge-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>免费送货</span>
              </div>
              <div class="badge-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>售后无忧</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">产品特点</h2>
        <div class="features-grid">
          <div class="feature-item" v-for="feature in productFeatures" :key="feature.title">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="related-section" v-if="relatedProducts.length">
      <div class="container">
        <h2 class="section-title">相关产品</h2>
        <div class="related-grid">
          <div class="related-card" v-for="item in relatedProducts" :key="item.id" @click="$router.push(`/products/${item.id}`)">
            <div class="related-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="related-info">
              <h4>{{ item.name }}</h4>
              <span class="related-price">¥{{ item.price }}起</span>
            </div>
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
          <div class="product-preview" v-if="product">
            <img :src="product.image" :alt="product.name" />
            <div class="product-preview-info">
              <span class="preview-name">{{ product.name }}</span>
              <span class="preview-price">¥{{ product.price }}/平米起</span>
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

  <!-- Empty State -->
  <div class="empty-state" v-else>
    <div class="container">
      <div class="empty-content">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h2>未找到该产品</h2>
        <p>抱歉，您访问的产品不存在或已下架</p>
        <button class="btn-primary" @click="$router.push('/products')">返回产品列表</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productsData from '../data/products.json'

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productId = route.params.id
    const products = productsData?.products || []
    const product = computed(() => products.find(p => p.id === productId))
    const selectedImage = ref('')
    const consultDialogVisible = ref(false)
    const submitting = ref(false)
    
    const consultForm = ref({
      name: '',
      phone: '',
      message: ''
    })

    onMounted(() => {
      if (product.value) {
        selectedImage.value = product.value.images?.[0] ?? product.value.image ?? ''
      }
    })

    const productFeatures = computed(() => {
      if (!product.value) return []
      return [
        { title: '防蚊防虫', desc: '有效阻挡蚊虫进入室内', icon: 'el-icon-circle-check' },
        { title: '通风透气', desc: '保持室内空气流通', icon: 'el-icon-wind-power' },
        { title: '隐形美观', desc: '不影响窗户外观和视野', icon: 'el-icon-view' },
        { title: '易于清洁', desc: '可拆卸清洗，方便维护', icon: 'el-icon-brush' }
      ]
    })

    const relatedProducts = computed(() => {
      if (!product.value) return []
      return products
        .filter(p => p.id !== product.value.id && p.category === product.value.category)
        .slice(0, 4)
    })

    const openConsult = () => {
      consultDialogVisible.value = true
    }

    const submitConsult = async () => {
      if (!consultForm.value.name || !consultForm.value.phone) {
        alert('请填写姓名和联系电话')
        return
      }
      
      submitting.value = true
      
      setTimeout(() => {
        submitting.value = false
        consultDialogVisible.value = false
        alert('预约成功！我们的客服将在24小时内与您联系')
        
        consultForm.value = {
          name: '',
          phone: '',
          message: ''
        }
      }, 1000)
    }

    return {
      product,
      selectedImage,
      productFeatures,
      relatedProducts,
      consultDialogVisible,
      consultForm,
      openConsult,
      submitConsult,
      submitting
    }
  }
}
</script>

<style scoped>
.product-detail-page {
  background: #fafafa;
  min-height: 100vh;
  margin-top: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Breadcrumb */
.breadcrumb {
  background: white;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb .container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
}

.breadcrumb span {
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.breadcrumb span:hover {
  color: #3498db;
}

.breadcrumb .separator {
  color: #ddd;
  cursor: default;
}

.breadcrumb .current {
  color: #333;
  font-weight: 500;
}

/* Product Main */
.product-main {
  padding: 60px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

/* Gallery */
.gallery-section {
  position: sticky;
  top: 100px;
  align-self: start;
}

.main-image {
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image .badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.thumbnails {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.thumb {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumb:hover {
  border-color: #ddd;
}

.thumb.active {
  border-color: #3498db;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Info Section */
.info-section {
  padding: 20px 0;
}

.product-category {
  display: inline-block;
  font-size: 0.75rem;
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.product-name {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.product-desc {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin: 0 0 24px 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating-text {
  font-weight: 600;
  color: #f39c12;
}

.reviews-count {
  color: #999;
  font-size: 0.875rem;
}

/* Specs Table */
.specs-table {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.spec-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  width: 80px;
  color: #999;
  font-size: 0.875rem;
}

.spec-value {
  flex: 1;
  color: #333;
  font-size: 0.9375rem;
}

/* Price Section */
.price-section {
  background: linear-gradient(135deg, #fff9f0, #fff);
  border: 1px solid #ffe4c4;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.price-label {
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 8px;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-currency {
  font-size: 1.5rem;
  color: #e74c3c;
  font-weight: 600;
}

.price-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e74c3c;
}

.price-unit {
  font-size: 1rem;
  color: #999;
}

.price-note {
  font-size: 0.75rem;
  color: #999;
  margin-top: 8px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 16px 24px;
  background: #2C3E50;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #3498db;
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #2C3E50;
  color: #2C3E50;
}

/* Trust Badges */
.trust-badges {
  display: flex;
  gap: 24px;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #666;
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: white;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 48px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-item {
  text-align: center;
  padding: 32px 20px;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #2C3E50 0%, #3498db 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.feature-icon i {
  font-size: 28px;
  color: white;
}

.feature-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.feature-item p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

/* Related Section */
.related-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.related-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.related-image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-card:hover .related-image img {
  transform: scale(1.05);
}

.related-info {
  padding: 16px;
}

.related-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.related-price {
  font-size: 0.9375rem;
  color: #e74c3c;
  font-weight: 600;
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

/* Empty State */
.empty-state {
  padding: 120px 0;
}

.empty-content {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.empty-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 24px 0 12px 0;
}

.empty-content p {
  color: #999;
  margin-bottom: 32px;
}

/* Responsive */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .gallery-section {
    position: relative;
    top: 0;
  }
  
  .features-grid,
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .product-main {
    padding: 40px 0;
  }
  
  .product-name {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .features-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .trust-badges {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
