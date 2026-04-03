// app.js

// 1. Force unregister ALL Service Workers immediately for debugging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    for (let reg of regs) {
      console.warn('[SW Debug] Force unregistering service worker:', reg);
      reg.unregister();
    }
  });
}

// State management
let state = {
  unlockedFishIds: JSON.parse(localStorage.getItem('fishdex_unlocked')) || [],
  totalScans: parseInt(localStorage.getItem('fishdex_scans')) || 0
};

// Save state
function saveState() {
  localStorage.setItem('fishdex_unlocked', JSON.stringify(state.unlockedFishIds));
  localStorage.setItem('fishdex_scans', state.totalScans);
  updateStats();
}

// ---------------- Navigation ----------------
const screens = document.querySelectorAll('.screen');
const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target') + '-screen';
    
    // Update active class on buttons
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active screen
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    // Screen specific logic
    if(targetId === 'knowledge-screen') {
      renderPokedex();
    }
  });
});

document.getElementById('quick-scan-btn').addEventListener('click', () => {
  document.querySelector('.nav-btn[data-target="camera"]').click();
});

// ---------------- Home & Profile Stats ----------------
function updateStats() {
  document.getElementById('home-total-caught').innerText = state.totalScans;
  document.getElementById('home-unique-species').innerText = state.unlockedFishIds.length;
  
  // Knowledge progress
  const totalFish = fishDatabase.length;
  const unlocked = state.unlockedFishIds.length;
  
  if(document.getElementById('knowledge-count')) {
    document.getElementById('knowledge-count').innerText = unlocked;
    document.getElementById('knowledge-total').innerText = totalFish;
    document.getElementById('knowledge-progress').style.width = (unlocked / totalFish * 100) + '%';
  }

  renderRecentList();
  renderAchievements();
}

function renderRecentList() {
  const container = document.getElementById('recent-catches-list');
  if(state.totalScans === 0) {
    container.innerHTML = '<p class="empty-state">No fish caught yet. Go to Camera to start scanning!</p>';
    return;
  }
  if(state.unlockedFishIds.length === 0) return;
  
  // Grab the last unified fish caught (mock recent)
  const recentId = state.unlockedFishIds[state.unlockedFishIds.length - 1];
  const fish = fishDatabase.find(f => f.id === recentId);

  container.innerHTML = `
    <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px;">
      <img src="${fish.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
      <div>
        <h4 style="color: #fff; margin-bottom: 2px;">${fish.name}</h4>
        <span class="rarity-badge ${fish.rarity}" style="font-size: 0.6rem; padding: 2px 8px; margin:0;">${fish.rarity}</span>
      </div>
    </div>
  `;
}

function renderAchievements() {
  const container = document.getElementById('achievements-container');
  if(!container) return;
  
  let html = '';
  const totalScans = state.totalScans;
  const uniqueCount = state.unlockedFishIds.length;
  
  let legendaryCount = 0;
  let rareCount = 0;
  
  state.unlockedFishIds.forEach(id => {
    const f = fishDatabase.find(fish => fish.id === id);
    if(f) {
      if(f.rarity === 'Legendary') legendaryCount++;
      if(f.rarity === 'Rare') rareCount++;
    }
  });

  html += achievementCard('First Cast', 'Identify your first fish.', totalScans >= 1);
  html += achievementCard('Dedicated Angler', 'Perform 20 scans.', totalScans >= 20);
  html += achievementCard('Persistent Angler', 'Perform 50 scans.', totalScans >= 50);
  html += achievementCard('Addicted Catcher', 'Perform 100 scans.', totalScans >= 100);
  
  html += achievementCard('Novice Angler', 'Unlock 3 unique species.', uniqueCount >= 3);
  html += achievementCard('Seasoned Angler', 'Unlock 10 unique species.', uniqueCount >= 10);
  html += achievementCard('Ocean Explorer', 'Unlock 20 unique species.', uniqueCount >= 20);
  html += achievementCard('Deep Sea Diver', 'Unlock 30 unique species.', uniqueCount >= 30);
  
  html += achievementCard('Rare Collector', 'Discover 5 Rare fish.', rareCount >= 5);
  html += achievementCard('Legendary Hunter', 'Discover a Legendary fish.', legendaryCount >= 1);
  html += achievementCard('Mythic Fisher', 'Discover 3 Legendary fish.', legendaryCount >= 3);
  
  html += achievementCard('Master Biologist', 'Unlock every single species.', uniqueCount === fishDatabase.length);
  
  container.innerHTML = html;
}

function achievementCard(title, desc, unlocked) {
  const color = unlocked ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)';
  const bg = unlocked ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255,255,255,0.02)';
  const iconColor = unlocked ? 'var(--accent-primary)' : '#555';
  
  return `
    <div style="background: ${bg}; border: 1px solid ${color}; padding: 15px; border-radius: 12px; margin-bottom: 10px; display: flex; align-items: center; gap: 15px;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.5); display: flex; align-items:center; justify-content:center; color: ${iconColor};">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <div>
        <h4 style="color: ${unlocked ? '#fff' : '#888'}; margin-bottom: 4px;">${title}</h4>
        <p style="color: #888; font-size: 0.8rem;">${desc}</p>
      </div>
    </div>
  `;
}

// ---------------- Image Upload & Processing State Machine ----------------
const uploadInput = document.getElementById('fish-upload-input');
const triggerBtn = document.getElementById('trigger-upload-btn');
const previewArea = document.getElementById('upload-preview-area');
const previewImg = document.getElementById('upload-preview-img');
const placeholderSvg = document.getElementById('upload-placeholder-svg');
const placeholderTxt = document.getElementById('upload-placeholder-text');

const actionArea = document.getElementById('analyze-action-area');
const analyzeBtn = document.getElementById('analyze-btn');
const uploadStatus = document.getElementById('upload-status');
const resetBtn = document.getElementById('reset-upload-btn');

let currentScannedFish = null;

function resetUploadState() {
  if(uploadInput) uploadInput.value = "";
  if(previewImg) { previewImg.src = ""; previewImg.classList.add('state-hidden'); }
  if(placeholderSvg) placeholderSvg.classList.remove('state-hidden');
  if(placeholderTxt) placeholderTxt.classList.remove('state-hidden');
  
  if(actionArea) {
    actionArea.classList.add('state-hidden');
    actionArea.classList.remove('fade-in');
  }
  
  if(analyzeBtn) {
    analyzeBtn.disabled = false;
    analyzeBtn.style.opacity = '1';
    analyzeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Analyze Fish`;
  }
  currentScannedFish = null;
}

[triggerBtn, previewArea].forEach(el => {
  if(el) el.addEventListener('click', () => uploadInput.click());
});

if(resetBtn) resetBtn.addEventListener('click', resetUploadState);

if(uploadInput) {
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    // Validation
    if(file.size > 10 * 1024 * 1024) {
      alert("Please select an image smaller than 10MB.");
      resetUploadState();
      return;
    }
    
    // Transition to Preview
    previewImg.src = URL.createObjectURL(file);
    previewImg.classList.remove('state-hidden');
    placeholderSvg.classList.add('state-hidden');
    placeholderTxt.classList.add('state-hidden');
    
    // Transition to Actions
    actionArea.classList.remove('state-hidden');
    actionArea.classList.add('fade-in');
    uploadStatus.innerText = "Image loaded. Ready for AI.";
    
    // Auto-Scroll to guide UX
    setTimeout(() => {
      analyzeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  });
}

if(analyzeBtn) {
  analyzeBtn.addEventListener('click', async () => {
    if(!uploadInput.files.length) return;
    
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.8';
    analyzeBtn.innerHTML = `<div class="spinner" style="width:20px; height:20px; margin:0 10px 0 0; display:inline-block; border-top-color:#fff; border-width: 2px;"></div> Analyzing...`;
    uploadStatus.innerText = "Running AI routines...";
    
    try {
      const file = uploadInput.files[0];
      const compressedDataUrl = await compressImage(file, 1024, 0.8);
      
      setTimeout(() => {
        uploadStatus.innerText = "Identification Complete!";
        processMockScan(); 
      }, 1800);
      
    } catch(err) {
      console.error(err);
      uploadStatus.innerText = "Could not identify fish. Try another image.";
      analyzeBtn.disabled = false;
      analyzeBtn.style.opacity = '1';
      analyzeBtn.innerHTML = `Analyze Fish`;
    }
  });
}

// Image Compressor using HTML5 Canvas
function compressImage(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = error => reject(error);
    };
    reader.onerror = error => reject(error);
  });
}

function processMockScan() {
  let pool = fishDatabase; 
  if (Math.random() < 0.7 && state.unlockedFishIds.length < fishDatabase.length) {
    pool = fishDatabase.filter(f => !state.unlockedFishIds.includes(f.id));
  }
  currentScannedFish = pool[Math.floor(Math.random() * pool.length)];
  
  // Show modal, but DO NOT save state yet
  showResultModal(currentScannedFish);
}

function showResultModal(fish) {
  const modal = document.getElementById('scan-result-modal');
  modal.classList.remove('hidden');
  
  const isNew = !state.unlockedFishIds.includes(fish.id);
  const titleText = isNew ? "New Species Found!" : "Species Identified!";
  document.querySelector('#scan-result-modal h2').innerText = titleText;
  
  const imgContainer = document.getElementById('result-image-area');
  imgContainer.classList.remove('spinner');
  imgContainer.innerHTML = `<img src="${fish.image}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 12px; box-shadow: 0 0 20px rgba(255,255,255,0.1);">`;
  
  document.getElementById('result-fish-name').innerText = fish.name;
  
  const rarityEl = document.getElementById('result-fish-rarity');
  rarityEl.innerText = fish.rarity;
  rarityEl.className = `rarity-badge ${fish.rarity}`;
  
  document.getElementById('result-fish-size').innerText = "Size: " + fish.size;
}

// Gamification Save 
document.getElementById('result-save-btn').addEventListener('click', () => {
  if (currentScannedFish) {
    state.totalScans++;
    if(!state.unlockedFishIds.includes(currentScannedFish.id)) {
      state.unlockedFishIds.push(currentScannedFish.id);
    }
    saveState();
  }
  closeAndCleanModal();
});

// Gamification Discard (Scan Another)
const discardBtn = document.getElementById('result-discard-btn');
if(discardBtn) {
  discardBtn.addEventListener('click', closeAndCleanModal);
}

function closeAndCleanModal() {
  document.getElementById('scan-result-modal').classList.add('hidden');
  const imgContainer = document.getElementById('result-image-area');
  imgContainer.innerHTML = '';
  imgContainer.classList.add('spinner');
  
  resetUploadState();
}


// ---------------- Knowledge Base / Pokedex ----------------
const detailModal = document.getElementById('fish-detail-modal');

function renderPokedex() {
  const grid = document.getElementById('pokedex-grid');
  grid.innerHTML = '';
  
  fishDatabase.forEach(fish => {
    const isUnlocked = state.unlockedFishIds.includes(fish.id);
    const item = document.createElement('div');
    item.className = `fish-item ${isUnlocked ? 'unlocked' : ''} rarity-${fish.rarity.toLowerCase()}`;
    
    // Using simple logic for silhouette vs visible
    item.innerHTML = `
      <img src="${fish.image}" alt="${fish.name}" />
      <span class="fish-name">${isUnlocked ? fish.name : '???'}</span>
    `;
    
    if(isUnlocked) {
      item.addEventListener('click', () => showDetailView(fish));
    }
    
    grid.appendChild(item);
  });
}

function showDetailView(fish) {
  detailModal.classList.remove('hidden');
  document.getElementById('detail-hero').innerHTML = `<img src="${fish.image}" />`;
  document.getElementById('detail-name').innerText = fish.name;
  
  const rarityEl = document.getElementById('detail-rarity');
  rarityEl.innerText = fish.rarity;
  rarityEl.className = `rarity-badge ${fish.rarity}`;
  
  document.getElementById('detail-habitat').innerText = fish.habitat;
  document.getElementById('detail-diet').innerText = fish.diet;
  document.getElementById('detail-size').innerText = fish.size;
  document.getElementById('detail-desc').innerText = fish.description;
}

document.getElementById('close-detail-btn').addEventListener('click', () => {
  detailModal.classList.add('hidden');
});

// Init
saveState();
updateStats();
