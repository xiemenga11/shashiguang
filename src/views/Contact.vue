<template>
  <div class="contact">
    <div class="container">
      <div class="contact-header">
        <h1>联系我们</h1>
        <p>我们随时为您提供专业的咨询和服务</p>
      </div>

      <div class="contact-content">
        <!-- 联系信息 -->
        <div class="contact-info">
          <h2>联系信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-icon">
                <i class="el-icon-phone"></i>
              </div>
              <div class="info-content">
                <h4>联系电话</h4>
                <p>{{ contactInfo.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="el-icon-message"></i>
              </div>
              <div class="info-content">
                <h4>电子邮箱</h4>
                <p>{{ contactInfo.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="el-icon-location"></i>
              </div>
              <div class="info-content">
                <h4>公司地址</h4>
                <p>{{ contactInfo.address }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="el-icon-time"></i>
              </div>
              <div class="info-content">
                <h4>营业时间</h4>
                <p>{{ contactInfo.businessHours }}</p>
              </div>
            </div>
          </div>

          <!-- 地图 -->
          <div class="map-section">
            <h3>地理位置</h3>
            <div class="map-container">
              <!-- 这里可以集成地图API，如高德地图或百度地图 -->
              <div class="map-placeholder">
                <p>地图加载中...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系表单 -->
        <div class="contact-form">
          <h2>在线留言</h2>
          <p>请填写以下信息，我们会尽快与您联系</p>
          
          <el-form 
            :model="form" 
            :rules="rules" 
            ref="formRef" 
            label-width="100px"
            v-if="!submitted"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
            </el-form-item>
            <el-form-item label="留言内容" prop="message">
              <el-input 
                type="textarea" 
                v-model="form.message" 
                placeholder="请描述您的需求或问题"
                :rows="5"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" :loading="submitting">
                提交留言
              </el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 提交成功提示 -->
          <div v-else class="success-message">
            <el-result
              icon="success"
              title="提交成功"
              sub-title="感谢您的留言，我们会尽快与您联系！"
            >
              <template #extra>
                <el-button type="primary" @click="resetForm">继续留言</el-button>
                <el-button @click="$router.push('/')">返回首页</el-button>
              </template>
            </el-result>
          </div>
        </div>
      </div>

      <!-- 常见问题 -->
      <div class="faq-section">
        <h2>常见问题</h2>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(faq, index) in faqs"
            :key="index"
            :title="faq.question"
            :name="index"
          >
            <div>{{ faq.answer }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useContactStore } from '../stores/contactStore'

export default {
  name: 'Contact',
  setup() {
    const contactStore = useContactStore()
    const formRef = ref(null)
    const submitting = ref(false)
    const submitted = computed(() => contactStore.submitted)
    const activeNames = ref(['0'])

    const form = reactive({
      name: '',
      phone: '',
      email: '',
      message: ''
    })

    const rules = {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ],
      message: [
        { required: true, message: '请输入留言内容', trigger: 'blur' },
        { min: 10, max: 500, message: '留言内容在 10 到 500 个字符', trigger: 'blur' }
      ]
    }

    const faqs = [
      {
        question: '纱窗的使用寿命是多久？',
        answer: '正常使用情况下，我们的纱窗产品使用寿命可达5-8年。定期清洁和维护可以延长使用寿命。'
      },
      {
        question: '安装纱窗需要多长时间？',
        answer: '一般情况下，安装一扇纱窗需要30-60分钟。具体时间取决于窗户的尺寸和安装环境。'
      },
      {
        question: '纱窗可以自己拆卸清洗吗？',
        answer: '是的，我们的纱窗设计便于拆卸和清洗。具体操作方法请参考产品说明书或咨询我们的客服人员。'
      },
      {
        question: '如何选择合适的纱窗类型？',
        answer: '选择纱窗时需要考虑使用场景、安全需求、通风要求等因素。我们的专业顾问会根据您的具体需求推荐合适的产品。'
      }
    ]

    const submitForm = async () => {
      if (!formRef.value) return
      
      try {
        await formRef.value.validate()
        submitting.value = true
        
        // 提交表单
        const result = await contactStore.submitForm()
        
        if (result.success) {
          ElMessage.success('留言提交成功！')
        } else {
          ElMessage.error('提交失败，请稍后重试')
        }
      } catch (error) {
        console.error('表单验证失败:', error)
      } finally {
        submitting.value = false
      }
    }

    const resetForm = () => {
      formRef.value?.resetFields()
      contactStore.resetForm()
    }

    return {
      contactInfo: contactStore.contactInfo,
      form,
      rules,
      formRef,
      submitting,
      submitted,
      activeNames,
      faqs,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-header {
  text-align: center;
  margin-bottom: 60px;
}

.contact-header h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 15px;
}

.contact-header p {
  color: #666;
  font-size: 16px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 80px;
}

.contact-info h2,
.contact-form h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.contact-form p {
  color: #666;
  margin-bottom: 30px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.info-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.info-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.info-icon i {
  font-size: 20px;
  color: white;
}

.info-content h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.info-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.map-section {
  margin-top: 40px;
}

.map-section h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.map-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 300px;
}

.map-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
}

.faq-section {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.faq-section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.success-message {
  text-align: center;
  padding: 40px 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-header h1 {
    font-size: 28px;
  }
  
  .faq-section {
    padding: 20px;
  }
}
</style>