<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: Array,
  selectedItem: Number,
})

const emit = defineEmits(['block-navigation', 'unblock-navigation'])

const isModalOpen = ref(false)
const isLoading = ref(false)
const modalItem = ref(null)

const accessSound = new Audio('/audios/audio_access.mp3')

const getItemOpacity = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  if (distance === 0) return 1
  if (distance === 1) return 0.5
  if (distance === 2) return 0.5
  return 0
}

const isItemVisible = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)
  return distance <= 2
}

const getItemTransform = (idx) => {
  const distance = Math.abs(idx - props.selectedItem)

  const direction = idx > props.selectedItem ? 1 : -1

  let translateY = 0

  if (direction < 0) {
    translateY = distance * 150
  } else {
    translateY = distance * 20
  }

  return `translateY(${translateY * direction}px)`
}

const playAccessSound = () => {
  accessSound.currentTime = 0
  accessSound.play()
}

const toggleModal = (item) => {
  if (isModalOpen.value && modalItem.value === item) {
    closeModal()
  } else {
    openModal(item)
  }
}

const openModal = (item) => {
  playAccessSound()
  isLoading.value = true
  emit('block-navigation')

  modalItem.value = item

  setTimeout(() => {
    isLoading.value = false
    isModalOpen.value = true
  }, 500)
}

const closeModal = () => {
  isModalOpen.value = false
  modalItem.value = null
  emit('unblock-navigation')
}

const openExternalLink = (item) => {
  playAccessSound()

  let url = ''

  switch (item.label) {
    case 'LinkedIn':
      url = 'https://www.linkedin.com/in/juan-manuel-l%C3%B3pez-arrieta-0594912ab/'
      break
    case 'Github':
      url = 'https://github.com/CodeXJUAN'
      break
    case 'Email':
      url = 'mailto:juanmanuellopezarrieta@gmail.com'
      break
    default:
      openModal(item)
      return
  }
  setTimeout(() => {
    window.open(url, '_blank')
  }, 500)
}

const handleKeyDown = (event) => {
  if (event.code === 'Space') {
    event.preventDefault()

    if (isModalOpen.value) {
      closeModal()
    } else if (props.selectedItem !== undefined && props.items) {
      const selectedItem = props.items[props.selectedItem]

      if (
        selectedItem.icon === 'mdi:linkedin' ||
        selectedItem.icon === 'mdi:github' ||
        selectedItem.icon === 'fa6-solid:paper-plane'
      ) {
        openExternalLink(selectedItem)
      } else {
        openModal(selectedItem)
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (isModalOpen.value) {
    emit('unblock-navigation')
  }
})
</script>

<template>
  <div class="xmb-subitems" :class="{ 'fade-out': isLoading || isModalOpen }" v-show="!isModalOpen">
    <div class="xmb-subitems-list">
      <button
        v-for="(subitem, idx) in items"
        :key="subitem.label"
        :class="['xmb-subitem', { selected: idx === selectedItem }]"
        :style="{
          opacity: getItemOpacity(idx),
          visibility: isItemVisible(idx) ? 'visible' : 'hidden',
          transform: getItemTransform(idx),
        }"
        @click="toggleModal(subitem)"
      >
        <Icon :icon="subitem.icon" class="xmb-subicon" />
        <span v-if="idx === selectedItem">{{ subitem.label }}</span>
      </button>
    </div>
  </div>

  <div v-if="isLoading" class="preloader">
    <div class="spinner"></div>
  </div>

  <Transition name="fade">
    <div v-if="isModalOpen && modalItem" class="xmb-detail-view">
      <div class="xmb-detail-content">
        <div class="header">
          <Icon class="subicons" :icon="modalItem.icon" />
          <h2>{{ modalItem.label }}</h2>
        </div>

        <div v-if="modalItem.label === 'Where and what did I study?'" class="detail-section">
          <div class="education_details">
            <div class="before_and_now">
              <p>
                I studied a medium-level training cycle in Microcomputer Systems and networks in
                Lacetània, Manresa.
              </p>
              <p>Where I learned:</p>
              <ul>
                <li>Hardware and Software</li>
                <li>Networks</li>
                <li>Programming</li>
                <li>Web Development</li>
                <li>Cybersecurity</li>
              </ul>
            </div>
            <div class="before_and_now">
              <p>
                Now I am studying my first year in a higher level training cycle in Multiplatform
                Application Development at the University of Vic, in Vic.
              </p>
              <p>Where I am currently expanding my knowledge in:</p>
              <ul>
                <li>Programming</li>
                <li>Web Development</li>
                <li>Database</li>
                <li>Project Management</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="modalItem.label === 'Languages'" class="detail-section">
          <div class="language-details">
            <p>
              When it comes to languages that I am fluent at there is 3. The first two are Spanish
              and Catalan because of where I live, and where I was raised, that is in Manresa,
              Catalonia.
            </p>
            <p>
              There is another language that I could say that I am fluent at, this one is English.
              Since i was 8 years of age my parents decided to enroll me in a language school where
              they chose me to learn english without my agreement.
            </p>
            <p>
              But I have to thank them because if they hadn't signed me up back then, I wouldn't be
              writing this now, and I wouldn't be able to do other things I like to do.
            </p>
          </div>
        </div>

        <div v-else-if="modalItem.label === 'Certifications'" class="detail-section">
          <p class="section-intro">
            Here are the certificates I have acquired throughout my professional journey:
          </p>
          <div class="certificates-container">
            <div class="certificate-card">
              <div class="certificate-icon">
                <Icon class="certicon" icon="mdi:school" />
              </div>
              <div class="certificate-content">
                <h4>Intermediate Vocational Training</h4>
                <div class="certificate-meta">
                  <span class="certificate-date">
                    <Icon icon="mdi:calendar" class="meta-icon" /> June 2024
                  </span>
                  <span class="certificate-issuer">
                    <Icon icon="mdi:building" class="meta-icon" /> Lacetània, Manresa
                  </span>
                </div>
                <p class="certificate-description">
                  Specialized in Microcomputer Systems and Networks
                </p>
              </div>
            </div>

            <div class="certificate-card">
              <div class="certificate-icon">
                <Icon class="certicon" icon="mdi:translate" />
              </div>
              <div class="certificate-content">
                <h4>First Certificate in English</h4>
                <div class="certificate-meta">
                  <span class="certificate-date">
                    <Icon icon="mdi:calendar" class="meta-icon" /> June 2023
                  </span>
                  <span class="certificate-issuer">
                    <Icon icon="mdi:certificate" class="meta-icon" /> Cambridge
                  </span>
                </div>
                <p class="certificate-description">
                  Official certification of English language proficiency at B2 level
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="modalItem.label === 'Experience'" class="detail-section">
          <p>Desarrollador Web - Empresa XYZ (2022-Presente)</p>
          <p>Desarrollador Junior - Startup ABC (2020-2022)</p>
        </div>

        <div v-else-if="modalItem.label === 'Skills'" class="detail-section">
          <div class="skills-container">
            <div class="skill-card">
              <div class="skill-icon">
                <Icon class="skillicon" icon="mdi:web" />
              </div>
              <div class="skill-content">
                <h4>Frontend</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Vue.js</span>
                  <span class="skill-tag">Astro</span>
                  <span class="skill-tag">HTML5</span>
                  <span class="skill-tag">CSS3</span>
                  <span class="skill-tag">JavaScript</span>
                </div>
              </div>
            </div>

            <div class="skill-card">
              <div class="skill-icon">
                <Icon class="skillicon" icon="mdi:server" />
              </div>
              <div class="skill-content">
                <h4>Backend</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Java</span>
                  <span class="skill-tag">Python</span>
                  <span class="skill-tag">PHP</span>
                </div>
              </div>
            </div>

            <div class="skill-card">
              <div class="skill-icon">
                <Icon class="skillicon" icon="mdi:database" />
              </div>
              <div class="skill-content">
                <h4>Base de Datos</h4>
                <div class="skill-tags">
                  <span class="skill-tag">MongoDB</span>
                  <span class="skill-tag">MySQL</span>
                  <span class="skill-tag">SQL Server</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="modalItem.label === 'Software Development'" class="detail-section">
          <p>Aplicación de gestión de inventario</p>
          <p>Sistema de análisis de datos</p>
        </div>

        <div v-else-if="modalItem.label === 'Web Development'" class="detail-section">
          <p>Sitio web de comercio electrónico</p>
          <p>Plataforma de aprendizaje en línea</p>
        </div>

        <div v-else-if="modalItem.label === 'Mobile Apps'" class="detail-section">
          <p>Aplicación de seguimiento de fitness</p>
          <p>Aplicación de notas y recordatorios</p>
        </div>

        <div v-else-if="modalItem.label === 'Profile'" class="detail-section">
          <p>Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras.</p>
          <p>Me encanta aprender nuevas tecnologías y enfrentar desafíos complejos.</p>
        </div>

        <div v-else-if="modalItem.label === 'Interests'" class="detail-section">
          <p>Desarrollo de videojuegos</p>
          <p>Inteligencia artificial</p>
          <p>Música y producción de audio</p>
        </div>

        <div v-else-if="modalItem.label === 'Goals'" class="detail-section">
          <p>Convertirme en un desarrollador full-stack senior</p>
          <p>Contribuir a proyectos de código abierto</p>
          <p>Crear mi propia startup tecnológica</p>
        </div>

        <div v-else class="detail-section">
          <p>Error en mostrar {{ modalItem.label }}</p>
        </div>

        <p class="modal-hint">Presiona espacio para cerrar</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.xmb-subitems {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
}
.xmb-subitems-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  margin: 20px 0;
  width: 101%;
  transition: transform 0.3s ease;
  transform: translateY(calc(15% - var(--selected-item, 0) * 60px));
}

.xmb-subitem {
  display: flex;
  align-items: center;
  color: #bbb;
  font-size: 1.3rem;
  transition:
    color 0.2s,
    opacity 0.3s,
    visibility 0.3s,
    transform 0.3s ease;
  width: 100%;
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.xmb-subitem.selected {
  color: #fff;
  font-size: 1.6rem;
}
.xmb-subicon {
  margin-right: 8px;
  font-size: 2.5rem;
  transition: all 0.2s ease;
}
.xmb-subitem.selected .xmb-subicon {
  font-size: 3.5rem;
}

.xmb-detail-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.xmb-detail-content {
  padding: 30px;
  width: 90%;
  max-width: 800px;
  color: white;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.xmb-subitems.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.xmb-subitems {
  opacity: 1;
  transition: opacity 0.3s ease-in;
}

.preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transiciones para el modal */
.fade-enter-active {
  transition: opacity 0.8s ease-in;
}

.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.header {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50%;
  gap: 20px;
  align-items: center;
}

.header h2,
.subicons {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.header h2 {
  font-size: 1.3rem;
  margin: 0;
}

.subicons {
  font-size: 2.6rem;
}

.header {
  margin-bottom: 2vh;
}

.header h2 {
  margin: 0;
}
.detail-section {
  margin-bottom: 20px;
  line-height: 1.6;
}

.education_details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.before_and_now {
  height: 38vh;
  width: 50%;
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.language-details {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  gap: 10px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.certificate-div {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
}

.certificatesDiv {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
  border-radius: 10px;
}

.certificates {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-hint {
  margin-top: 30px;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  opacity: 0.7;
}

.certicon {
  font-size: 1.7rem;
  color: #fff;
}

.section-intro {
  margin-bottom: 25px;
  font-size: 1.1rem;
  color: #ddd;
}

.certificates-container {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}

.certificate-card {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.certificate-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.certificate-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #fff;
  margin-right: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.certificate-content {
  flex: 1;
}

.certificate-content h4 {
  margin: 0 0 10px 0;
  color: #fff;
}

.certificate-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #ddd;
}

.certificate-date,
.certificate-issuer {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 5px;
  font-size: 1.1rem;
}

.certificate-description {
  margin: 0;
  color: #bbb;
}

@media (max-width: 600px) {
  .certificates-container {
    flex-direction: column;
  }

  .certificate-card {
    width: 100%;
  }
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.skill-card {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skill-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #fff;
  margin-right: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.skillicon {
  font-size: 1.7rem;
  color: #fff;
}

.skill-content {
  flex: 1;
}

.skill-content h4 {
  margin: 0 0 10px 0;
  color: #fff;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.skill-tag:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

@media (max-width: 600px) {
  .skills-container {
    flex-direction: column;
  }

  .skill-card {
    width: 100%;
  }
}
</style>
