// ===== MIRRA RECOVERY — APP LOGIC =====

// ===== STATE =====
const state = {
  patientName: 'Sarah',
  surgeryDate: null,
  recoveryDay: 5,
  riskFactors: [],
  hasPhoto: false,
  symptoms: {
    fever: null,
    drainage: null,
    erythema: null,
    pain: null
  },
  checkinsCompleted: false,
  history: [
    { day: 1, date: 'Mar 9', score: 1.2, status: 'green', label: 'Healing well' },
    { day: 2, date: 'Mar 10', score: 1.5, status: 'green', label: 'Healing well' },
    { day: 3, date: 'Mar 11', score: 1.8, status: 'green', label: 'Healing well' },
    { day: 4, date: 'Mar 12', score: 2.1, status: 'green', label: 'Mild concern' },
  ]
};

// Demo patient data for clinician dashboard
const patients = [
  { id: 'MK', name: 'M. Kowalski', day: 7,  scores: [1.2, 1.5, 2.0, 2.8, 3.5, 4.2, 4.8], riskFactors: ['Emergency CS', 'BMI ≥30'], status: 'red' },
  { id: 'LM', name: 'L. Müller',   day: 5,  scores: [1.0, 1.2, 1.5, 2.8, 3.1], riskFactors: ['Diabetes'], status: 'yellow' },
  { id: 'AS', name: 'A. Schmidt',  day: 9,  scores: [1.1, 1.0, 1.2, 1.3, 1.1, 1.4, 1.2, 1.0, 1.1], riskFactors: [], status: 'green' },
  { id: 'TB', name: 'T. Braun',    day: 3,  scores: [1.4, 1.6, 1.9], riskFactors: [], status: 'green' },
  { id: 'EH', name: 'E. Hoffmann', day: 6,  scores: [1.2, 1.8, 2.2, 2.0, 1.7, 1.5], riskFactors: ['Emergency CS'], status: 'green' },
  { id: 'KW', name: 'K. Wagner',   day: 4,  scores: [1.3, 1.1, 1.4, 1.2], riskFactors: [], status: 'green' },
  { id: 'PF', name: 'P. Fischer',  day: 8,  scores: [1.0, 1.2, 1.1, 1.3, 1.5, 1.4, 1.2, 1.1], riskFactors: [], status: 'green' },
  { id: 'JR', name: 'J. Richter',  day: 2,  scores: [1.5, 1.8], riskFactors: ['Immunosuppressed'], status: 'green' },
  { id: 'NK', name: 'N. Klein',    day: 5,  scores: [1.2, 1.5, 1.8, 2.2, 2.4], riskFactors: ['BMI ≥30'], status: 'yellow' },
  { id: 'OB', name: 'O. Becker',   day: 7,  scores: [1.1, 1.3, 1.2, 1.4, 1.3, 1.1, 1.2], riskFactors: [], status: 'green' },
  { id: 'HZ', name: 'H. Zimmermann', day: 3, scores: [1.0, 1.2, 1.1], riskFactors: [], status: 'green' },
];

// ===== VIEW MANAGEMENT =====
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function switchTab(name) {
  showView(name);
  // Update bottom tab bar
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tabMap = { 'patient-home': 'tab-home', 'insights': 'tab-insights', 'clinician-dashboard': 'tab-clinician' };
  if (tabMap[name]) document.getElementById(tabMap[name])?.classList.add('active');
  // Side effects
  if (name === 'clinician-dashboard') renderClinicianDashboard();
  if (name === 'insights') renderInsightsView(state.recoveryDay);
  if (name === 'patient-home') setupPatientHome();
}

// ===== ONBOARDING =====
function startOnboarding() {
  showView('onboard-1');
  // Set default date to 5 days ago
  const d = new Date();
  d.setDate(d.getDate() - 5);
  document.getElementById('surgery-date').value = d.toISOString().split('T')[0];
}

function onboard1Next() {
  const name = document.getElementById('patient-name').value.trim();
  if (!name) {
    document.getElementById('patient-name').focus();
    return;
  }
  state.patientName = name;
  showView('onboard-2');
}

function onboard2Next() {
  const dateVal = document.getElementById('surgery-date').value;
  if (!dateVal) {
    document.getElementById('surgery-date').focus();
    return;
  }
  state.surgeryDate = new Date(dateVal);
  const now = new Date();
  const diff = Math.floor((now - state.surgeryDate) / (1000 * 60 * 60 * 24));
  state.recoveryDay = Math.max(1, diff);
  showView('onboard-3');
}

function onboard3Next() {
  const rfs = [];
  if (document.getElementById('rf-emergency').checked) rfs.push('Emergency CS');
  if (document.getElementById('rf-diabetes').checked) rfs.push('Diabetes');
  if (document.getElementById('rf-bmi').checked) rfs.push('BMI ≥30');
  if (document.getElementById('rf-immune').checked) rfs.push('Immunosuppressed');
  state.riskFactors = rfs;
  showView('onboard-4');
}

function completeOnboarding() {
  document.getElementById('app-nav').classList.remove('hidden');
  document.getElementById('bottom-tab-bar').classList.remove('hidden');
  setupPatientHome();
  renderTeaserStrip();
  switchTab('patient-home');
}

// ===== PATIENT HOME =====
function setupPatientHome() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting-text').textContent = greeting;
  document.getElementById('patient-display-name').textContent = state.patientName;
  document.getElementById('recovery-day').textContent = 'Day ' + state.recoveryDay;
  renderTimeline();
  renderTeaserStrip();
}

function renderTeaserStrip() {
  const day = state.recoveryDay || 5;
  const featured = getFeaturedInsights(day);
  const container = document.getElementById('teaser-scroll');
  if (!container) return;
  container.innerHTML = featured.slice(0, 6).map((ins) => {
    const cat = INSIGHT_CATEGORIES[ins.category];
    return `
      <div class="teaser-card" onclick="switchTab('insights'); setTimeout(() => openShort(${INSIGHTS_LIBRARY.indexOf(ins)}, true), 100)" style="background:${ins.gradient}">
        <div class="teaser-emoji">${cat.emoji}</div>
        <div class="teaser-label">${cat.label}</div>
        <div class="teaser-title">${ins.title}</div>
      </div>
    `;
  }).join('');
}

function renderTimeline() {
  const container = document.getElementById('timeline-entries');
  container.innerHTML = '';
  // Show history in reverse (most recent first)
  const sorted = [...state.history].reverse();
  sorted.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'timeline-entry';
    div.innerHTML = `
      <div class="timeline-entry-left">
        <div class="timeline-dot ${entry.status}"></div>
        <div>
          <div class="timeline-entry-label">Day ${entry.day} — ${entry.label}</div>
          <div class="timeline-entry-date">${entry.date}</div>
        </div>
      </div>
      <div class="timeline-score ${entry.status}">${entry.score.toFixed(1)}</div>
    `;
    container.appendChild(div);
  });
}

// ===== CHECK-IN =====
function startCheckin() {
  // Reset symptom state
  state.hasPhoto = false;
  state.symptoms = { fever: null, drainage: null, erythema: null, pain: null };
  // Reset UI
  document.getElementById('photo-placeholder').classList.remove('hidden');
  document.getElementById('photo-preview').classList.add('hidden');
  document.getElementById('photo-frame').classList.remove('has-photo');
  document.getElementById('photo-next-btn').disabled = true;
  document.querySelectorAll('.symptom-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.pain-btn').forEach(b => b.classList.remove('selected'));
  showView('checkin-photo');
}

function triggerPhoto() {
  document.getElementById('photo-input').click();
}

function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('photo-preview');
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    document.getElementById('photo-placeholder').classList.add('hidden');
    document.getElementById('photo-frame').classList.add('has-photo');
    state.hasPhoto = true;
    document.getElementById('photo-next-btn').disabled = false;
  };
  reader.readAsDataURL(file);
}

// Allow proceeding without photo for demo purposes
document.addEventListener('DOMContentLoaded', () => {
  // After 1.5s on photo screen, enable the next button anyway (demo mode)
  document.getElementById('view-checkin-photo').addEventListener('transitionend', () => {});
});

function selectSymptom(btn) {
  const group = btn.closest('.symptom-options');
  const question = group.dataset.question;
  group.querySelectorAll('.symptom-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.symptoms[question] = btn.dataset.value;
  checkSymptomsComplete();
}

function selectPain(btn) {
  document.querySelectorAll('.pain-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.symptoms.pain = parseInt(btn.dataset.value);
  checkSymptomsComplete();
}

function checkSymptomsComplete() {
  const { fever, drainage, erythema, pain } = state.symptoms;
  const allAnswered = fever !== null && drainage !== null && erythema !== null && pain !== null;
  document.getElementById('symptoms-submit-btn').disabled = !allAnswered;
}

// Initialize symptom submit button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('symptoms-submit-btn').disabled = true;
});

// ===== SCORE CALCULATION =====
function calculateScore() {
  // Simulate image analysis score (since we can't actually run a CNN)
  // Base image score derived from symptom data with some random variation
  const { fever, drainage, erythema, pain } = state.symptoms;

  // Symptom score (30% of total)
  let symptomScore = 0;
  // Fever (40% weight within symptoms)
  if (fever === 'mild') symptomScore += 0.4 * 0.4;
  else if (fever === 'high') symptomScore += 1.0 * 0.4;
  // Drainage (30% weight)
  if (drainage === 'clear') symptomScore += 0.35 * 0.3;
  else if (drainage === 'purulent') symptomScore += 1.0 * 0.3;
  // Erythema (20% weight)
  if (erythema === 'mild') symptomScore += 0.4 * 0.2;
  else if (erythema === 'severe') symptomScore += 1.0 * 0.2;
  // Pain (10% weight) — normalise 0-10 to 0-1
  if (pain !== null) symptomScore += (pain / 10) * 0.1;

  // Image score (simulated — 70% of total)
  // Correlate loosely with symptoms + small random variation for realism
  const imageBase = symptomScore * 0.9 + Math.random() * 0.15;
  const imageScore = Math.min(1, Math.max(0, imageBase));

  // Composite score on 1–5 scale
  const composite = (imageScore * 0.70 + symptomScore * 0.30) * 4 + 1;
  return Math.min(5, Math.max(1, parseFloat(composite.toFixed(1))));
}

function getStatusFromScore(score) {
  if (score <= 2.5) return 'green';
  if (score <= 3.5) return 'yellow';
  return 'red';
}

function submitCheckin() {
  showView('result');
  runAnalysis();
}

function runAnalysis() {
  const analyzing = document.getElementById('analyzing-state');
  const resultCard = document.getElementById('result-card');
  analyzing.classList.remove('hidden');
  resultCard.classList.add('hidden');

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  // Animate analysis steps
  setTimeout(() => {
    step1.classList.add('active');
  }, 400);
  setTimeout(() => {
    step1.classList.remove('active');
    step1.classList.add('done');
    step2.classList.add('active');
  }, 1400);
  setTimeout(() => {
    step2.classList.remove('active');
    step2.classList.add('done');
    step3.classList.add('active');
  }, 2400);
  setTimeout(() => {
    step3.classList.remove('active');
    step3.classList.add('done');
  }, 3200);

  // Show result
  setTimeout(() => {
    const score = calculateScore();
    const status = getStatusFromScore(score);

    analyzing.classList.add('hidden');
    displayResult(score, status);
    // Show result day
    const rdEl = document.getElementById('result-day-num');
    if (rdEl) rdEl.textContent = state.recoveryDay;

    // Save to history
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    state.history.push({
      day: state.recoveryDay,
      date: dateStr,
      score,
      status,
      label: status === 'green' ? 'Healing well' : status === 'yellow' ? 'Moderate concern' : 'High concern'
    });
    state.checkinsCompleted = true;

    // Update home view
    updateHomeAfterCheckin(score, status);
  }, 3600);
}

function displayResult(score, status) {
  const resultCard = document.getElementById('result-card');
  resultCard.classList.remove('hidden');

  // Score ring
  const scoreNum = document.getElementById('result-score');
  scoreNum.textContent = score.toFixed(1);
  scoreNum.style.color = `var(--color-${status})`;

  // Animate ring
  const arc = document.getElementById('score-ring-arc');
  const circumference = 264;
  const fraction = (score - 1) / 4; // 1–5 range → 0–1
  const offset = circumference - (fraction * circumference * 0.85); // max 85% of ring
  arc.style.stroke = `var(--color-${status})`;
  setTimeout(() => {
    arc.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)';
    arc.style.strokeDashoffset = offset;
  }, 50);

  // Badge
  const badge = document.getElementById('result-status-badge');
  const badges = { green: '✓ Low Risk', yellow: '⚠ Moderate Concern', red: '🔴 Urgent Review' };
  badge.className = 'result-badge ' + status;
  badge.textContent = badges[status];

  // Headline & message
  const headlines = {
    green: 'Your wound is healing well',
    yellow: 'Some signs worth monitoring',
    red: 'Please contact your care team'
  };
  const messages = {
    green: 'Your check-in looks reassuring. Keep doing what you\'re doing and complete your next check-in tomorrow.',
    yellow: 'Your midwife has been notified and will follow up within 2 hours. Keep an eye on any changes.',
    red: 'Your care team has been alerted urgently. Please contact them or go to your nearest healthcare provider.'
  };
  document.getElementById('result-headline').textContent = headlines[status];
  document.getElementById('result-message').textContent = messages[status];

  // Breakdown
  const breakdownItems = document.getElementById('breakdown-items');
  const { fever, drainage, erythema, pain } = state.symptoms;
  const feverLabels = { none: 'No fever', mild: 'Mild fever', high: 'High fever' };
  const drainageLabels = { none: 'None', clear: 'Clear/light', purulent: 'Purulent' };
  const erythemaLabels = { none: 'Normal', mild: 'Some redness', severe: 'Severe redness' };
  const severities = { none: 0, mild: 0.4, clear: 0.3, high: 1, purulent: 1, severe: 1 };
  const painSeverity = (pain || 0) / 10;

  breakdownItems.innerHTML = `
    <div class="breakdown-item">
      <div class="breakdown-label">Fever</div>
      <div class="breakdown-value">${feverLabels[fever] || '—'}</div>
      <div class="breakdown-bar"><div class="breakdown-fill" style="width:${(severities[fever] || 0) * 100}%; background:${fever === 'high' ? 'var(--color-red)' : fever === 'mild' ? 'var(--color-yellow)' : 'var(--color-green)'}"></div></div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Discharge</div>
      <div class="breakdown-value">${drainageLabels[drainage] || '—'}</div>
      <div class="breakdown-bar"><div class="breakdown-fill" style="width:${(severities[drainage] || 0) * 100}%; background:${drainage === 'purulent' ? 'var(--color-red)' : drainage === 'clear' ? 'var(--color-yellow)' : 'var(--color-green)'}"></div></div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Skin appearance</div>
      <div class="breakdown-value">${erythemaLabels[erythema] || '—'}</div>
      <div class="breakdown-bar"><div class="breakdown-fill" style="width:${(severities[erythema] || 0) * 100}%; background:${erythema === 'severe' ? 'var(--color-red)' : erythema === 'mild' ? 'var(--color-yellow)' : 'var(--color-green)'}"></div></div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-label">Pain level</div>
      <div class="breakdown-value">${pain !== null ? pain + ' / 10' : '—'}</div>
      <div class="breakdown-bar"><div class="breakdown-fill" style="width:${painSeverity * 100}%; background:${painSeverity > 0.6 ? 'var(--color-red)' : painSeverity > 0.3 ? 'var(--color-yellow)' : 'var(--color-green)'}"></div></div>
    </div>
  `;

  // Action box
  const actionBox = document.getElementById('result-action');
  const actions = {
    green: { title: 'What to do next', text: 'Continue resting and caring for your wound. Complete your next check-in tomorrow at the same time. Contact your midwife if anything changes significantly.' },
    yellow: { title: 'Your midwife has been notified', text: 'You\'ll receive a call within 2 hours. In the meantime, keep the wound area clean and dry. If symptoms worsen rapidly, contact your care team immediately.' },
    red: { title: 'Urgent: Please seek care now', text: 'Your care team has been alerted. Please call your midwife or obstetrics ward immediately, or go to your nearest emergency department if you feel very unwell.' }
  };
  actionBox.className = 'result-action ' + status;
  actionBox.innerHTML = `<h4>${actions[status].title}</h4><p>${actions[status].text}</p>`;
}

function updateHomeAfterCheckin(score, status) {
  document.getElementById('checkin-prompt')?.classList.add('hidden');
  document.getElementById('checkin-done')?.classList.remove('hidden');

  const labels = { green: 'Healing well', yellow: 'Moderate concern', red: 'Urgent: seek care' };
  const latestCard = document.getElementById('latest-result-card');
  latestCard.classList.remove('hidden');
  latestCard.innerHTML = `
    <div class="home-result-card">
      <h3>Today's Result</h3>
      <div class="home-result-row">
        <div>
          <span class="home-score-big ${status}">${score.toFixed(1)}</span>
          <span style="font-size:var(--text-sm); color:var(--color-text-muted)"> / 5</span>
        </div>
        <div class="result-badge ${status}">${labels[status]}</div>
      </div>
    </div>
  `;

  renderTimeline();
}

function goHome() {
  switchTab('patient-home');
}

// ===== CLINICIAN DASHBOARD =====
function renderClinicianDashboard() {
  const container = document.getElementById('patient-rows');
  container.innerHTML = '';

  // Sort: red first, then yellow, then green
  const sorted = [...patients].sort((a, b) => {
    const order = { red: 0, yellow: 1, green: 2 };
    return order[a.status] - order[b.status];
  });

  const trends = {
    'increasing': '↑',
    'stable': '→',
    'decreasing': '↓'
  };

  sorted.forEach(p => {
    const scores = p.scores;
    const latest = scores[scores.length - 1];
    const prev = scores[scores.length - 2] || latest;
    const trendDir = latest > prev + 0.2 ? '↑' : latest < prev - 0.2 ? '↓' : '→';
    const trendColor = latest > prev + 0.2 ? 'var(--color-red)' : latest < prev - 0.2 ? 'var(--color-green)' : 'var(--color-text-muted)';

    const row = document.createElement('div');
    row.className = 'patient-row';
    row.onclick = () => openPatient(p.id);
    row.innerHTML = `
      <div class="patient-name-cell">
        <span class="patient-row-name">${p.name}</span>
        <span class="patient-row-sub">${p.riskFactors.join(', ') || 'No risk factors'}</span>
      </div>
      <div class="patient-row-day">${p.day}</div>
      <div class="patient-row-score ${p.status}">${latest.toFixed(1)}</div>
      <div class="trend-icon" style="color:${trendColor}">${trendDir}</div>
      <div class="chevron-icon">›</div>
    `;
    container.appendChild(row);
  });
}

function openPatient(patientId) {
  const p = patients.find(pt => pt.id === patientId);
  if (!p) return;

  document.getElementById('detail-patient-name').textContent = p.name;

  const latestScore = p.scores[p.scores.length - 1];
  const status = getStatusFromScore(latestScore);

  const badge = document.getElementById('detail-badge');
  badge.className = 'result-badge ' + status;
  const badgeLabels = { green: '✓ Low Risk', yellow: '⚠ Review', red: '🔴 Urgent' };
  badge.textContent = badgeLabels[status];

  // Build detail content
  const maxScore = 5;
  const chartBars = p.scores.map((s, i) => {
    const barStatus = getStatusFromScore(s);
    const heightPct = ((s - 1) / 4) * 100;
    return `<div class="chart-bar-wrap">
      <div class="chart-bar ${barStatus}" style="height:${Math.max(5, heightPct)}%"></div>
      <div class="chart-bar-label">D${i + 1}</div>
    </div>`;
  }).join('');

  const actionNotes = {
    green: 'Continue routine monitoring. Next check-in tomorrow.',
    yellow: 'Schedule remote review within 2 hours. Consider GP referral.',
    red: 'Urgent clinical review required. Contact patient within 1 hour.'
  };

  document.getElementById('detail-content').innerHTML = `
    <div class="detail-section">
      <h3>Risk Score Overview</h3>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:var(--space-4)">
        <div>
          <div class="detail-info-label">Latest Score</div>
          <div class="detail-latest-score ${status}">${latestScore.toFixed(1)}<span style="font-size:var(--text-base);color:var(--color-text-muted);font-family:var(--font-body)"> / 5</span></div>
        </div>
        <div style="text-align:right">
          <div class="detail-info-label">Day of Recovery</div>
          <div style="font-size:var(--text-lg);font-weight:600">${p.day}</div>
        </div>
      </div>
      <div class="detail-risk-chart">${chartBars}</div>
    </div>

    <div class="detail-section">
      <h3>Patient Information</h3>
      <div class="detail-info-grid">
        <div class="detail-info-item">
          <div class="detail-info-label">Risk Factors</div>
          <div class="detail-info-value">${p.riskFactors.length ? p.riskFactors.join(', ') : 'None identified'}</div>
        </div>
        <div class="detail-info-item">
          <div class="detail-info-label">Check-ins Completed</div>
          <div class="detail-info-value">${p.scores.length} of ${p.day}</div>
        </div>
        <div class="detail-info-item">
          <div class="detail-info-label">Engagement</div>
          <div class="detail-info-value">${Math.round(p.scores.length / p.day * 100)}%</div>
        </div>
        <div class="detail-info-item">
          <div class="detail-info-label">Alert Status</div>
          <div class="detail-info-value">${status === 'green' ? 'None' : status === 'yellow' ? 'Review pending' : 'Urgent'}</div>
        </div>
      </div>
    </div>

    <div class="detail-section result-action ${status}">
      <h4>Recommended Action</h4>
      <p>${actionNotes[status]}</p>
    </div>

    <div class="action-buttons">
      <button class="btn btn-primary" onclick="alert('📱 Calling patient...')">📞 Call Patient</button>
      <button class="btn btn-ghost" style="border:1.5px solid var(--color-border)" onclick="alert('📋 Generating clinical note...')">📋 Add Note</button>
      <button class="btn btn-ghost" style="border:1.5px solid var(--color-border)" onclick="alert('🏥 GP referral form opened...')">Refer to GP</button>
    </div>
  `;

  showView('patient-detail');
}

// ===== THEME TOGGLE =====
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if (t) {
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML = d === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
})();

// ===== DEMO SHORTCUT =====
// Allow clicking the photo frame even without camera (for desktop demo)
document.addEventListener('DOMContentLoaded', () => {
  const photoFrame = document.getElementById('photo-frame');
  if (photoFrame) {
    // After 0.5s delay, show a "demo mode" click to simulate photo
    photoFrame.addEventListener('click', () => {
      if (!state.hasPhoto) {
        // Create a canvas-based placeholder "wound photo" for demo
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        // Gradient background simulating skin tone
        const grad = ctx.createRadialGradient(200, 150, 20, 200, 150, 200);
        grad.addColorStop(0, '#d4a070');
        grad.addColorStop(0.5, '#c08860');
        grad.addColorStop(1, '#b07850');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 400, 300);
        // Incision line
        ctx.strokeStyle = '#8a4a30';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.bezierCurveTo(150, 148, 250, 152, 300, 150);
        ctx.stroke();
        // Suture dots
        ctx.fillStyle = '#5a2a10';
        for (let i = 120; i <= 280; i += 20) {
          ctx.beginPath();
          ctx.arc(i, 150, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        // Label
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Demo photo — Day ' + state.recoveryDay, 200, 290);

        const dataURL = canvas.toDataURL('image/png');
        const preview = document.getElementById('photo-preview');
        preview.src = dataURL;
        preview.classList.remove('hidden');
        document.getElementById('photo-placeholder').classList.add('hidden');
        document.getElementById('photo-frame').classList.add('has-photo');
        state.hasPhoto = true;
        document.getElementById('photo-next-btn').disabled = false;
      }
    });
  }

  // Set today's date as default surgery date (5 days ago)
  const surgDateInput = document.getElementById('surgery-date');
  if (surgDateInput) {
    const d = new Date();
    d.setDate(d.getDate() - 5);
    surgDateInput.value = d.toISOString().split('T')[0];
  }
});
