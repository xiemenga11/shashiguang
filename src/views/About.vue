<template>
  <div class="about">
    <div class="container">
      <!-- 公司简介 -->
      <section class="company-intro">
        <div class="intro-content">
          <h1>关于纱时光</h1>
          <p class="intro-subtitle">专业纱窗制造商，品质生活的守护者</p>
          <div class="intro-text">
            <p>
              纱时光成立于2010年，是一家专注于纱窗产品研发、生产和销售的现代化企业。
              我们致力于为客户提供高品质的纱窗产品和专业的服务，让每一个家庭都能享受到
              安全、舒适、美好的生活空间。
            </p>
            <p>
              凭借多年的行业经验和技术积累，纱时光已经成为国内纱窗行业的知名品牌。
              我们拥有先进的生产设备、完善的质量管理体系和专业的服务团队，产品远销
              全国各地，深受广大客户的信赖和好评。
            </p>
          </div>
        </div>
        <div class="intro-image">
          <el-image
            src="https://via.placeholder.com/600x400"
            fit="cover"
            :preview-src-list="['https://via.placeholder.com/600x400']"
          />
        </div>
      </section>

      <!-- 核心优势 -->
      <section class="core-advantages">
        <h2 class="section-title">我们的核心优势</h2>
        <div class="advantages-grid">
          <div class="advantage-card" v-for="advantage in advantages" :key="advantage.title">
            <div class="advantage-icon">
              <i :class="advantage.icon"></i>
            </div>
            <h3>{{ advantage.title }}</h3>
            <p>{{ advantage.description }}</p>
          </div>
        </div>
      </section>

      <!-- 发展历程 -->
      <section class="timeline">
        <h2 class="section-title">发展历程</h2>
        <el-timeline>
          <el-timeline-item
            v-for="(event, index) in timelineEvents"
            :key="index"
            :timestamp="event.date"
            placement="top"
          >
            <el-card>
              <h4>{{ event.title }}</h4>
              <p>{{ event.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </section>

      <!-- 资质荣誉 -->
      <section class="certifications">
        <h2 class="section-title">资质荣誉</h2>
        <div class="certifications-grid">
          <div class="certification-card" v-for="cert in certifications" :key="cert.name">
            <div class="certification-icon">
              <i class="el-icon-check"></i>
            </div>
            <h3>{{ cert.name }}</h3>
            <p>{{ cert.description }}</p>
          </div>
        </div>
      </section>

      <!-- 团队介绍 -->
      <section class="team">
        <h2 class="section-title">我们的团队</h2>
        <div class="team-grid">
          <div class="team-member" v-for="member in teamMembers" :key="member.name">
            <div class="member-avatar">
              <el-image
                :src="member.avatar"
                fit="cover"
              />
            </div>
            <div class="member-info">
              <h4>{{ member.name }}</h4>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-desc">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 企业文化 -->
      <section class="culture">
        <h2 class="section-title">企业文化</h2>
        <div class="culture-content">
          <div class="culture-item">
            <h3>企业使命</h3>
            <p>为客户提供高品质的纱窗产品，创造安全舒适的生活环境</p>
          </div>
          <div class="culture-item">
            <h3>企业愿景</h3>
            <p>成为国内领先的纱窗品牌，引领行业发展</p>
          </div>
          <div class="culture-item">
            <h3>核心价值观</h3>
            <p>品质第一、客户至上、诚信经营、创新发展</p>
          </div>
          <div class="culture-item">
            <h3>服务理念</h3>
            <p>专业、及时、贴心、周到</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  setup() {
    const advantages = [
      {
        title: '品质保证',
        description: '采用优质原材料，严格质量控制，确保产品经久耐用',
        icon: 'el-icon-check'
      },
      {
        title: '技术创新',
        description: '持续投入研发，引进先进技术，保持产品领先优势',
        icon: 'el-icon-connection'
      },
      {
        title: '专业团队',
        description: '拥有经验丰富的技术团队和安装团队，提供专业服务',
        icon: 'el-icon-user'
      },
      {
        title: '完善服务',
        description: '从咨询到安装到售后，提供一站式贴心服务',
        icon: 'el-icon-service'
      }
    ]

    const timelineEvents = [
      {
        date: '2010年',
        title: '公司成立',
        description: '纱时光正式成立，开始专注于纱窗产品的研发和生产'
      },
      {
        date: '2012年',
        title: '扩大生产',
        description: '引进先进生产设备，扩大生产规模，提升产能'
      },
      {
        date: '2015年',
        title: '品牌升级',
        description: '进行全面品牌升级，提升品牌形象和市场影响力'
      },
      {
        date: '2018年',
        title: '渠道拓展',
        description: '建立全国销售网络，产品覆盖全国主要城市'
      },
      {
        date: '2020年',
        title: '数字化转型',
        description: '启动数字化转型，提升管理效率和服务水平'
      },
      {
        date: '2023年',
        title: '创新突破',
        description: '推出多款创新产品，获得多项专利认证'
      }
    ]

    const certifications = [
      {
        name: 'ISO9001质量管理体系认证',
        description: '通过国际质量管理体系认证，确保产品质量稳定可靠'
      },
      {
        name: '环保产品认证',
        description: '产品通过环保认证，符合国家环保标准'
      },
      {
        name: '防火等级认证',
        description: '产品通过防火等级测试，安全性能优异'
      },
      {
        name: '消费者满意品牌',
        description: '连续多年获得消费者满意品牌称号'
      }
    ]

    const teamMembers = [
      {
        name: '张总',
        position: '总经理',
        description: '拥有15年行业经验，带领团队不断创新和发展',
        avatar: 'https://via.placeholder.com/100x100'
      },
      {
        name: '李工',
        position: '技术总监',
        description: '资深技术专家，负责产品研发和技术指导',
        avatar: 'https://via.placeholder.com/100x100'
      },
      {
        name: '王经理',
        position: '销售总监',
        description: '市场开拓专家，负责全国销售网络建设',
        avatar: 'https://via.placeholder.com/100x100'
      },
      {
        name: '刘主管',
        position: '客服主管',
        description: '客户服务专家，确保客户满意度',
        avatar: 'https://via.placeholder.com/100x100'
      }
    ]

    return {
      advantages,
      timelineEvents,
      certifications,
      teamMembers
    }
  }
}
</script>

<style scoped>
.about {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.company-intro {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 80px;
}

.intro-content h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 15px;
}

.intro-subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  font-style: italic;
}

.intro-text p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.intro-image {
  border-radius: 8px;
  overflow: hidden;
}

.section-title {
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 60px;
}

.core-advantages {
  margin-bottom: 80px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.advantage-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.advantage-card:hover {
  transform: translateY(-5px);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.advantage-icon i {
  font-size: 24px;
  color: white;
}

.advantage-card h3 {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #333;
}

.advantage-card p {
  color: #666;
  line-height: 1.6;
}

.timeline {
  margin-bottom: 80px;
}

.timeline .el-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.timeline .el-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.timeline h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.timeline p {
  color: #666;
  margin: 0;
}

.certifications {
  margin-bottom: 80px;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.certification-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.certification-icon {
  width: 60px;
  height: 60px;
  background: #409EFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.certification-icon i {
  font-size: 24px;
  color: white;
}

.certification-card h3 {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #333;
}

.certification-card p {
  color: #666;
  line-height: 1.6;
}

.team {
  margin-bottom: 80px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.team-member {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 3px solid #409EFF;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h4 {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #333;
}

.member-position {
  color: #409EFF;
  font-size: 14px;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.member-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.culture {
  margin-bottom: 80px;
}

.culture-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.culture-item {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.culture-item h3 {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #333;
}

.culture-item p {
  color: #666;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .company-intro {
    grid-template-columns: 1fr;
  }
  
  .advantages-grid,
  .certifications-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .culture-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .advantages-grid,
  .certifications-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .intro-content h1 {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 24px;
  }
}
</style>