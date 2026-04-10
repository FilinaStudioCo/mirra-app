// ===== MIRRA INSIGHTS — Flo-style Story Cards =====
// Day-specific, category-tagged tip library

const INSIGHT_CATEGORIES = {
  wound:    { label: 'Wound Care',    emoji: '🩹', color: '#0b7a82', bg: '#e0f2f3' },
  food:     { label: 'Nutrition',     emoji: '🥗', color: '#28825a', bg: '#e8f6ef' },
  avoid:    { label: 'What to Avoid', emoji: '🚫', color: '#9a7200', bg: '#fef7e0' },
  activity: { label: 'Movement',      emoji: '🚶‍♀️', color: '#7a39bb', bg: '#f0eaf8' },
  sleep:    { label: 'Rest & Sleep',  emoji: '😴', color: '#006494', bg: '#e0eef6' },
  mind:     { label: 'Mind & Mood',   emoji: '💛', color: '#c85a78', bg: '#fce8ee' },
  hygiene:  { label: 'Hygiene',       emoji: '🚿', color: '#2d6e8e', bg: '#dff0f8' },
  warning:  { label: 'Watch For',     emoji: '⚠️', color: '#964219', bg: '#f5e8df' },
};

// Each insight: { id, category, days (range or 'all'), title, body, tip (short bold line), source }
const INSIGHTS_LIBRARY = [

  // ── WOUND CARE ──────────────────────────────────────────────────────────────
  {
    id: 'w1', category: 'wound', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Keep it clean, keep it dry',
    body: 'Gently clean around your incision with mild soap and water during your shower. Pat it dry with a clean towel — do not rub. A damp wound is more likely to become infected.',
    tip: 'Pat, don\'t rub. Dry is healing.',
    gradient: 'linear-gradient(145deg, #0b7a82 0%, #0e6470 100%)'
  },
  {
    id: 'w2', category: 'wound', days: [1,2,3,4,5],
    title: 'Leave the dressing alone',
    body: 'Your healthcare team applied the dressing for a reason. Don\'t lift the edges to peek underneath — this breaks the seal and introduces bacteria. Change it only when instructed.',
    tip: 'Trust the dressing. Don\'t touch it.',
    gradient: 'linear-gradient(145deg, #0b7a82 0%, #166b75 100%)'
  },
  {
    id: 'w3', category: 'wound', days: [6,7,8,9,10,11,12,13,14],
    title: 'Sun protection for your scar',
    body: 'UV light darkens healing scars permanently. Once your wound is fully closed, apply SPF 30+ sunscreen or keep it covered for at least 12 months. This single habit dramatically improves long-term scar appearance.',
    tip: 'Shade your scar for a better result.',
    gradient: 'linear-gradient(145deg, #0b7a82 0%, #095e65 100%)'
  },
  {
    id: 'w4', category: 'wound', days: [3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Normal vs. not normal',
    body: 'Some redness directly at the incision line is normal in the first few days. What\'s NOT normal: spreading redness, warmth spreading outward, a bad smell, thick yellow-green discharge, or edges pulling apart.',
    tip: 'When in doubt, check it out.',
    gradient: 'linear-gradient(145deg, #0b7a82 0%, #0e7a70 100%)'
  },
  {
    id: 'w5', category: 'wound', days: [7,8,9,10,11,12,13,14],
    title: 'Scar massage — when and how',
    body: 'Once your wound is fully closed (no open areas), gentle circular massage with a plain moisturiser for 5 minutes a day can soften the scar and reduce itchiness. Start lightly and increase pressure gradually over weeks.',
    tip: 'Gentle massage = softer scar.',
    gradient: 'linear-gradient(145deg, #0b7a82 0%, #0a5a60 100%)'
  },

  // ── NUTRITION ───────────────────────────────────────────────────────────────
  {
    id: 'n1', category: 'food', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Protein is your healing superpower',
    body: 'Your body needs protein to rebuild tissue after surgery. Aim for 70–100g per day: eggs, chicken, fish, Greek yoghurt, beans, lentils, tofu. Protein literally builds the collagen that closes your wound.',
    tip: 'Every meal = a protein source.',
    gradient: 'linear-gradient(145deg, #28825a 0%, #1e6a48 100%)'
  },
  {
    id: 'n2', category: 'food', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Vitamin C speeds healing',
    body: 'Vitamin C is essential for collagen production — the scaffold of wound healing. Oranges, kiwi, bell peppers, broccoli, and strawberries are all excellent sources. Try to include one at every meal.',
    tip: 'Citrus, peppers, and kiwi — daily.',
    gradient: 'linear-gradient(145deg, #28825a 0%, #1f7248 100%)'
  },
  {
    id: 'n3', category: 'food', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Drink more water than you think',
    body: 'Dehydration slows healing and thickens breast milk (if breastfeeding). Aim for 2–3 litres of water per day. Keep a bottle next to you at all times — you\'re too busy with a newborn to remember to drink.',
    tip: 'Bottle within reach = you\'ll drink it.',
    gradient: 'linear-gradient(145deg, #006494 0%, #005280 100%)'
  },
  {
    id: 'n4', category: 'food', days: [1,2,3,4,5,6,7],
    title: 'Iron: fight the fatigue',
    body: 'Blood loss during your caesarean may have left your iron stores low. Red meat, dark leafy greens, lentils, and fortified cereals help replenish iron. Pair with vitamin C to absorb it better.',
    tip: 'Iron + vitamin C = better absorption.',
    gradient: 'linear-gradient(145deg, #28825a 0%, #255e40 100%)'
  },
  {
    id: 'n5', category: 'food', days: [3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Zinc closes wounds faster',
    body: 'Zinc is directly involved in tissue repair and immune function. Good sources: pumpkin seeds, meat, shellfish, chickpeas. A small handful of seeds per day makes a difference.',
    tip: 'A small snack of seeds daily.',
    gradient: 'linear-gradient(145deg, #28825a 0%, #1d6040 100%)'
  },
  {
    id: 'n6', category: 'food', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Constipation warning',
    body: 'Pain medication (especially opioids) and reduced movement after surgery commonly cause constipation. This is very uncomfortable with an abdominal scar. Eat plenty of fibre (oats, fruit, vegetables), drink water, and ask about a stool softener if needed.',
    tip: 'Fibre + water = avoid straining.',
    gradient: 'linear-gradient(145deg, #28825a 0%, #1c5a38 100%)'
  },

  // ── WHAT TO AVOID ────────────────────────────────────────────────────────────
  {
    id: 'a1', category: 'avoid', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'No lifting over 4 kg',
    body: 'Your abdominal muscles have been cut. Lifting more than about 4 kg (roughly the weight of your baby) puts direct strain on your internal stitches — which you cannot see or feel tearing. This rule applies for at least 6 weeks.',
    tip: 'If it\'s heavier than your baby, don\'t lift it.',
    gradient: 'linear-gradient(145deg, #9a7200 0%, #7a5a00 100%)'
  },
  {
    id: 'a2', category: 'avoid', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'No driving — yet',
    body: 'Most women should not drive for 4–6 weeks after a caesarean. In an emergency stop, you may not be able to push the brake pedal hard enough, and the seatbelt sits directly on your incision. Check with your doctor before getting behind the wheel.',
    tip: 'Check with your doctor first.',
    gradient: 'linear-gradient(145deg, #9a7200 0%, #7d5e00 100%)'
  },
  {
    id: 'a3', category: 'avoid', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'No baths or swimming',
    body: 'Submerging your wound in water — bath, swimming pool, hot tub — increases infection risk significantly. Showers only until your wound is fully healed and closed. This usually means at least 4–6 weeks.',
    tip: 'Showers only. No soaking.',
    gradient: 'linear-gradient(145deg, #9a7200 0%, #7e6200 100%)'
  },
  {
    id: 'a4', category: 'avoid', days: [1,2,3,4,5,6,7],
    title: 'Avoid tight waistbands',
    body: 'Tight trousers, underwear, or waistbands that sit directly on your scar create pressure and friction that slows healing and causes pain. High-waisted underwear worn above the scar is much more comfortable.',
    tip: 'High-waisted underwear is your friend.',
    gradient: 'linear-gradient(145deg, #9a7200 0%, #6e5000 100%)'
  },
  {
    id: 'a5', category: 'avoid', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'No strenuous exercise yet',
    body: 'Yoga, Pilates, running, gym workouts, and housework that involves bending or lifting are all off-limits for at least 6 weeks. Your core muscles need time to heal internally, even when you feel fine on the outside.',
    tip: 'Feel fine ≠ fully healed inside.',
    gradient: 'linear-gradient(145deg, #9a7200 0%, #836200 100%)'
  },

  // ── MOVEMENT ────────────────────────────────────────────────────────────────
  {
    id: 'm1', category: 'activity', days: [1,2,3,4,5,6,7],
    title: 'Walk — just a little',
    body: 'Short, slow walks (even just to the kitchen and back) help prevent blood clots, aid digestion, reduce bloating, and boost your mood. Start with 5 minutes, twice a day. Even gentle movement matters enormously.',
    tip: 'Short walks, multiple times a day.',
    gradient: 'linear-gradient(145deg, #7a39bb 0%, #5e28a0 100%)'
  },
  {
    id: 'm2', category: 'activity', days: [7,8,9,10,11,12,13,14],
    title: 'Increase walking gradually',
    body: 'If your first week went well, try adding 5 minutes to each walk every few days. By week two, 15–20 minute strolls are a great goal. Listen to your body — stop if you feel pulling, pain, or increased bleeding.',
    tip: 'Add 5 minutes every few days.',
    gradient: 'linear-gradient(145deg, #7a39bb 0%, #6635a8 100%)'
  },
  {
    id: 'm3', category: 'activity', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'How to get out of bed safely',
    body: 'Roll onto your side first, then use your arms to push yourself up. Never sit straight up from lying flat — this puts enormous strain on your incision. It feels slow, but it prevents pain and protects your stitches.',
    tip: 'Roll, push, rise. Not sit up straight.',
    gradient: 'linear-gradient(145deg, #7a39bb 0%, #6230b0 100%)'
  },
  {
    id: 'm4', category: 'activity', days: [3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Splint your wound when moving',
    body: 'When coughing, sneezing, or getting up, press a folded pillow or your hand gently against your scar. This "splinting" technique supports the wound and dramatically reduces the sharp pain you might feel during sudden movements.',
    tip: 'Hand or pillow = pain relief when moving.',
    gradient: 'linear-gradient(145deg, #7a39bb 0%, #5c2090 100%)'
  },

  // ── REST & SLEEP ─────────────────────────────────────────────────────────────
  {
    id: 's1', category: 'sleep', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Sleep when the baby sleeps',
    body: 'This advice sounds clichéd, but sleep is literally when your body repairs itself. Every hour of deep sleep triggers growth hormone release, which drives tissue healing. Dishes, emails, and visitors can wait.',
    tip: 'Rest is medicine. Protect it.',
    gradient: 'linear-gradient(145deg, #006494 0%, #00527c 100%)'
  },
  {
    id: 's2', category: 'sleep', days: [1,2,3,4,5,6,7],
    title: 'Best sleeping position after CS',
    body: 'Sleeping on your back with a pillow under your knees reduces pressure on your incision. On your side with a pillow between your knees also works well. Avoid sleeping on your stomach for at least 4 weeks.',
    tip: 'Back with knee pillow = most comfortable.',
    gradient: 'linear-gradient(145deg, #006494 0%, #014e72 100%)'
  },
  {
    id: 's3', category: 'sleep', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Say yes to help',
    body: 'When someone offers to hold the baby while you sleep, or to bring you food, say yes. Many new mothers feel guilty accepting help. But you\'ve had major surgery — recovery is a medical need, not a luxury.',
    tip: 'Accepting help = faster recovery.',
    gradient: 'linear-gradient(145deg, #006494 0%, #005580 100%)'
  },

  // ── HYGIENE ──────────────────────────────────────────────────────────────────
  {
    id: 'h1', category: 'hygiene', days: [1,2,3,4,5,6,7],
    title: 'Showering after a caesarean',
    body: 'You can shower 24 hours after your operation, but let water flow gently over the wound — do not aim the showerhead directly at it. Use a mild, unperfumed soap. Pat the area completely dry afterwards.',
    tip: 'Gentle water flow. Unperfumed soap.',
    gradient: 'linear-gradient(145deg, #2d6e8e 0%, #1e5572 100%)'
  },
  {
    id: 'h2', category: 'hygiene', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Keep the skin fold dry',
    body: 'The fold where your lower abdomen meets the scar is a warm, moist place where bacteria and fungi thrive. After showering, dry this area carefully. If redness or itching develops, tell your midwife.',
    tip: 'Dry the fold. Every time.',
    gradient: 'linear-gradient(145deg, #2d6e8e 0%, #26607e 100%)'
  },
  {
    id: 'h3', category: 'hygiene', days: [1,2,3,4,5,6,7],
    title: 'No creams on the fresh wound',
    body: 'In the first week, do not apply lotions, oils, antiseptic creams, or natural remedies directly on the wound without medical advice. Many products interfere with normal healing and some increase infection risk.',
    tip: 'Fresh wound: nothing extra. Ask first.',
    gradient: 'linear-gradient(145deg, #2d6e8e 0%, #1d4e6a 100%)'
  },

  // ── MIND & MOOD ──────────────────────────────────────────────────────────────
  {
    id: 'mn1', category: 'mind', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Baby blues are normal — this is different',
    body: 'Up to 80% of new mothers experience "baby blues" — mood swings, tearfulness, and anxiety in the first 2 weeks. This is different from postpartum depression. But if you feel persistently hopeless, disconnected from your baby, or unable to cope, please speak to someone.',
    tip: 'Persistent low mood: tell someone today.',
    gradient: 'linear-gradient(145deg, #c85a78 0%, #a8416a 100%)'
  },
  {
    id: 'mn2', category: 'mind', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Your birth story matters',
    body: 'If your caesarean was unexpected or felt distressing, you may have complicated feelings about it. These feelings are valid. Speaking to a midwife, partner, or counsellor about your birth experience often helps process it — don\'t dismiss those emotions.',
    tip: 'Your feelings about your birth are valid.',
    gradient: 'linear-gradient(145deg, #c85a78 0%, #ae3d65 100%)'
  },
  {
    id: 'mn3', category: 'mind', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Ask for what you need',
    body: 'You\'ve had major abdominal surgery and just became a mother. If you need pain relief, ask for it. If you need someone to take the baby, ask. If you need to cry, cry. Recovery looks different for everyone — your needs are not a burden.',
    tip: 'Asking for help is strength, not weakness.',
    gradient: 'linear-gradient(145deg, #c85a78 0%, #b84070 100%)'
  },

  // ── WATCH FOR ───────────────────────────────────────────────────────────────
  {
    id: 'red1', category: 'warning', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: '5 signs to seek care immediately',
    body: '1. Wound edges pulling apart\n2. Thick yellow or green discharge with smell\n3. Fever above 38°C\n4. Spreading redness or warmth beyond the wound\n5. Sudden increase in pain after it was improving\n\nAny of these = contact your care team today.',
    tip: 'Don\'t wait. Contact your midwife.',
    gradient: 'linear-gradient(145deg, #964219 0%, #7a3010 100%)'
  },
  {
    id: 'red2', category: 'warning', days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    title: 'Blood clot warning signs',
    body: 'After any surgery, blood clots in the legs (DVT) or lungs (PE) are a risk. Watch for: calf pain, swelling, or redness in one leg; sudden shortness of breath; chest pain. These are emergencies — call 112 immediately.',
    tip: 'Calf pain or breathlessness = call 112.',
    gradient: 'linear-gradient(145deg, #964219 0%, #823518 100%)'
  },
];

// ───────────────────────────────────────────────────
// Get insights relevant to a given recovery day
// ───────────────────────────────────────────────────
function getInsightsForDay(day) {
  return INSIGHTS_LIBRARY.filter(ins => ins.days.includes(Math.min(day, 14)));
}

// Get today's "featured" insight (one per category, day-rotated)
function getFeaturedInsights(day) {
  const byCategory = {};
  const available = getInsightsForDay(day);
  available.forEach(ins => {
    if (!byCategory[ins.category]) byCategory[ins.category] = [];
    byCategory[ins.category].push(ins);
  });
  // Pick one per category, rotated by day
  return Object.values(byCategory).map(arr => arr[day % arr.length]);
}

// ───────────────────────────────────────────────────
// RENDER INSIGHTS VIEW
// ───────────────────────────────────────────────────
function renderInsightsView(recoveryDay) {
  const featured = getFeaturedInsights(recoveryDay || 5);

  // Build the stories row (horizontal scroll, Flo-style)
  const storiesHTML = featured.map((ins, i) => {
    const cat = INSIGHT_CATEGORIES[ins.category];
    return `
      <div class="story-bubble" onclick="openShort(${i})" data-index="${i}" style="--story-color:${cat.color}">
        <div class="story-ring" style="background:conic-gradient(${cat.color} 0%, ${cat.color} ${70 + i * 5}%, var(--color-border) ${70 + i * 5}%)">
          <div class="story-inner">${cat.emoji}</div>
        </div>
        <span class="story-label">${cat.label}</span>
      </div>
    `;
  }).join('');

  // Build the daily tip card
  const dayTip = featured[recoveryDay % featured.length];
  const tipCat = INSIGHT_CATEGORIES[dayTip.category];

  // Build category filter chips
  const usedCats = [...new Set(getInsightsForDay(recoveryDay).map(i => i.category))];
  const chipsHTML = ['all', ...usedCats].map(cat => {
    if (cat === 'all') return `<button class="cat-chip active" data-cat="all" onclick="filterInsights('all', this)">All</button>`;
    const c = INSIGHT_CATEGORIES[cat];
    return `<button class="cat-chip" data-cat="${cat}" onclick="filterInsights('${cat}', this)">${c.emoji} ${c.label}</button>`;
  }).join('');

  // Build the full card grid
  const allForDay = getInsightsForDay(recoveryDay);
  const cardsHTML = allForDay.map((ins, i) => {
    const cat = INSIGHT_CATEGORIES[ins.category];
    return `
      <div class="insight-card" data-cat="${ins.category}" onclick="openShort(${INSIGHTS_LIBRARY.indexOf(ins)}, true)">
        <div class="insight-card-top" style="background:${ins.gradient}">
          <span class="insight-cat-tag" style="background:rgba(255,255,255,0.2);color:white">${cat.emoji} ${cat.label}</span>
        </div>
        <div class="insight-card-body">
          <h4>${ins.title}</h4>
          <p>${ins.tip}</p>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('view-insights').innerHTML = `
    <div class="insights-page">

      <div class="insights-header">
        <div>
          <h2>Today's Insights</h2>
          <p>Day ${recoveryDay} of recovery · ${featured.length} tips for you</p>
        </div>
      </div>

      <!-- Stories row -->
      <div class="stories-row-wrap">
        <div class="stories-row" id="stories-row">
          ${storiesHTML}
        </div>
      </div>

      <!-- Daily highlight card -->
      <div class="daily-highlight" onclick="openShort(${INSIGHTS_LIBRARY.indexOf(dayTip)}, true)" style="background:${dayTip.gradient}">
        <div class="dh-tag">${tipCat.emoji} Today's highlight</div>
        <h3>${dayTip.title}</h3>
        <p>${dayTip.tip}</p>
        <div class="dh-cta">Read more →</div>
      </div>

      <!-- Filter chips -->
      <div class="cat-chips-wrap">
        <div class="cat-chips" id="cat-chips">${chipsHTML}</div>
      </div>

      <!-- Card grid -->
      <div class="insights-grid" id="insights-grid">
        ${cardsHTML}
      </div>

      <footer>
        <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
        &nbsp;·&nbsp; MIRRA Recovery Prototype
      </footer>
    </div>
  `;

  // Store for filtering
  window._insightsDay = recoveryDay;
}

function filterInsights(cat, btn) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.insight-card');
  cards.forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// ───────────────────────────────────────────────────
// SHORTS PLAYER  (full-screen swipeable cards)
// ───────────────────────────────────────────────────
let currentShortIndex = 0;
let shortsPool = [];
let fromGrid = false;

function openShort(globalIndex, fromGridMode = false) {
  fromGrid = fromGridMode;
  const day = window._insightsDay || (typeof state !== 'undefined' ? state.recoveryDay : 5);
  if (fromGridMode) {
    shortsPool = getInsightsForDay(day);
    // find position in pool
    const poolIdx = shortsPool.findIndex(ins => INSIGHTS_LIBRARY.indexOf(ins) === globalIndex);
    currentShortIndex = poolIdx >= 0 ? poolIdx : 0;
  } else {
    // from stories bubbles — show featured
    shortsPool = getFeaturedInsights(day);
    currentShortIndex = globalIndex;
  }
  renderShorts();
  showView('shorts');
}

function renderShorts() {
  const container = document.getElementById('view-shorts');
  const ins = shortsPool[currentShortIndex];
  if (!ins) return;
  const cat = INSIGHT_CATEGORIES[ins.category];
  const total = shortsPool.length;
  const hasPrev = currentShortIndex > 0;
  const hasNext = currentShortIndex < total - 1;

  // Format body with line breaks
  const bodyHTML = ins.body.replace(/\n/g, '<br>');

  container.innerHTML = `
    <div class="short-screen" style="background:${ins.gradient}">

      <!-- Progress dots -->
      <div class="short-progress">
        ${shortsPool.map((_, i) => `<div class="short-prog-dot ${i === currentShortIndex ? 'active' : i < currentShortIndex ? 'done' : ''}"></div>`).join('')}
      </div>

      <!-- Close -->
      <button class="short-close" onclick="closeShort()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <!-- Content -->
      <div class="short-content">
        <div class="short-cat-badge">${cat.emoji} ${cat.label}</div>
        <h2 class="short-title">${ins.title}</h2>
        <p class="short-body">${bodyHTML}</p>
        <div class="short-tip-box">
          <span class="short-tip-label">Remember</span>
          <p class="short-tip-text">${ins.tip}</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="short-nav">
        <button class="short-nav-btn ${!hasPrev ? 'invisible' : ''}" onclick="navigateShort(-1)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Previous
        </button>
        <span class="short-counter">${currentShortIndex + 1} / ${total}</span>
        <button class="short-nav-btn ${!hasNext ? 'invisible' : ''}" onclick="navigateShort(1)">
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Swipe hint (first time) -->
      <div class="swipe-hint" id="swipe-hint">Swipe left/right to browse</div>
    </div>
  `;

  // Touch swipe support
  setupSwipe(container);
  // Hide hint after 2s
  setTimeout(() => {
    const hint = document.getElementById('swipe-hint');
    if (hint) hint.style.opacity = '0';
  }, 2000);
}

function navigateShort(dir) {
  const next = currentShortIndex + dir;
  if (next < 0 || next >= shortsPool.length) return;
  currentShortIndex = next;
  renderShorts();
}

function closeShort() {
  showView('insights');
}

function setupSwipe(el) {
  let startX = 0, startY = 0;
  el.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      navigateShort(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}
