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
    if(targetId === 'camera-screen') {
      startCamera();
    } else {
      stopCamera();
    }
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

// ---------------- Camera & Mock AI Logic ----------------
let videoStream = null;

async function startCamera() {
  console.log('[Camera] Attempting to start camera...');
  const video = document.getElementById('camera-preview');
  const errorContainer = document.getElementById('camera-error-container');
  const errorMsg = document.getElementById('camera-error-message');
  const retryBtn = document.getElementById('retry-camera-btn');
  
  // Hide error UI
  if(errorContainer) errorContainer.style.display = 'none';
  
  // Reset the video state
  video.pause();
  video.srcObject = null;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  
  // 1. Check for Secure Context
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isHttps = window.location.protocol === 'https:';
  const isFile = window.location.protocol === 'file:';
  
  if (!isHttps && !isLocalhost && !isFile) {
    showCameraError("Mobile browsers require HTTPS for camera access. Please use HTTPS.");
    return;
  }
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showCameraError("Your browser does not support the camera API (getUserMedia).");
    return;
  }

  try {
    document.getElementById('camera-status').innerText = "Initializing Hardware...";
    
    // Keep constraints extremely simple to prevent Overconstrained errors dropping frames
    const constraints = {
      video: { facingMode: 'environment' },
      audio: false
    };
    
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    
    // Check if the stream actually contains video data
    if (!videoStream || !videoStream.getVideoTracks().length) {
       throw new Error("Stream acquired but no video tracks were found. Camera may be broken.");
    }
    
    console.log('[Camera] Stream acquired with tracks:', videoStream.getVideoTracks());
    video.srcObject = videoStream;
    
    // Safari specifically needs a tiny delay to paint the display:block correctly before playing
    setTimeout(() => {
      console.log('[Camera] Firing manual play()...');
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('[Camera] Video playing successfully.');
          document.getElementById('camera-status').innerText = "Point at a fish to identify...";
        }).catch(e => {
          console.error('[Camera] Play promise rejected (Autoplay blocked):', e);
          showCameraError("Browser blocked automatic playback. Tap the button to start.", "Start Video feed", () => {
             errorContainer.style.display = 'none';
             video.play();
             document.getElementById('camera-status').innerText = "Point at a fish to identify...";
          });
        });
      }
    }, 250);
    
  } catch(err) {
    console.error("[Camera] Exception during getUserMedia:", err);
    let userMsg = "Camera access denied, unavailable, or blocked by the device.";
    
    if (err.name === 'NotAllowedError') {
      userMsg = "Permission denied. Please grant camera access in your browser site settings.";
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      userMsg = "No rear camera hardware detected on this device.";
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      userMsg = "Camera is already in use by another application or background tab.";
    } else if (err.name === 'OverconstrainedError') {
      // Fallback if environment failed
       tryFallbackCamera();
       return;
    }

    showCameraError(userMsg);
  }
}

// Emergency Fallback if the strict 'environment' camera isn't found
async function tryFallbackCamera() {
  console.warn("[Camera] Environment constraint failed. Attempting generalized fallback.");
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    const video = document.getElementById('camera-preview');
    video.srcObject = videoStream;
    setTimeout(() => { video.play(); }, 200);
  } catch(e) {
    showCameraError("Fatal Camera Error: " + e.message);
  }
}

function showCameraError(message, btnText = "Retry Camera", customAction = null) {
  const errorContainer = document.getElementById('camera-error-container');
  const errorMsg = document.getElementById('camera-error-message');
  const retryBtn = document.getElementById('retry-camera-btn');
  
  if(errorContainer) {
    errorMsg.innerText = message;
    retryBtn.innerText = btnText;
    
    // clear old listeners by cloning
    const newBtn = retryBtn.cloneNode(true);
    retryBtn.parentNode.replaceChild(newBtn, retryBtn);
    
    newBtn.addEventListener('click', customAction ? customAction : startCamera);
    errorContainer.style.display = 'flex';
  }
  document.getElementById('camera-status').innerText = "Camera Error";
}

function stopCamera() {
  if(videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
}

const captureBtn = document.getElementById('capture-btn');
captureBtn.addEventListener('click', () => {
  // Show scanning UI
  document.querySelector('.camera-overlay').classList.add('scanning');
  document.getElementById('camera-status').innerText = "AI Analyzing Species...";
  
  // Simulate network / AI processing delay (2 seconds)
  setTimeout(() => {
    document.querySelector('.camera-overlay').classList.remove('scanning');
    document.getElementById('camera-status').innerText = "Point at a fish to identify...";
    processMockScan();
  }, 2000);
});

function processMockScan() {
  state.totalScans++;
  let unlockedNew = false;
  
  // Try to find a locked fish. Give it a 70% chance to pick a new one, 30% duplicate
  let pool = [];
  if (Math.random() < 0.7 && state.unlockedFishIds.length < fishDatabase.length) {
    pool = fishDatabase.filter(f => !state.unlockedFishIds.includes(f.id));
    unlockedNew = true;
  } else {
    pool = fishDatabase; // Pick from any
  }
  
  // Pick random from pool
  const randomFish = pool[Math.floor(Math.random() * pool.length)];
  
  if(!state.unlockedFishIds.includes(randomFish.id)) {
    state.unlockedFishIds.push(randomFish.id);
  }
  
  saveState();
  showResultModal(randomFish, unlockedNew);
}

function showResultModal(fish, isNew) {
  const modal = document.getElementById('scan-result-modal');
  modal.classList.remove('hidden');
  
  const titleText = isNew ? "New Species Found!" : "Species Identified!";
  document.querySelector('#scan-result-modal h2').innerText = titleText;
  
  // Swap out spinner for image
  const imgContainer = document.getElementById('result-image-area');
  imgContainer.classList.remove('spinner');
  imgContainer.innerHTML = `<img src="${fish.image}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 12px;">`;
  
  document.getElementById('result-fish-name').innerText = fish.name;
  
  const rarityEl = document.getElementById('result-fish-rarity');
  rarityEl.innerText = fish.rarity;
  rarityEl.className = `rarity-badge ${fish.rarity}`;
  
  document.getElementById('result-fish-size').innerText = "Size: " + fish.size;
}

document.getElementById('result-close-btn').addEventListener('click', () => {
  document.getElementById('scan-result-modal').classList.add('hidden');
  // Reset spinner for next time
  const imgContainer = document.getElementById('result-image-area');
  imgContainer.innerHTML = '';
  imgContainer.classList.add('spinner');
});


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
