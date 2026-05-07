<template>
  <!-- Floating ball launcher -->
  <button
    v-show="!open"
    class="sp-ball"
    :class="mode === 'mobile' ? 'sp-ball--mobile' : 'sp-ball--desktop'"
    @click="toggleOpen"
  >
    <i class="fa-solid fa-mobile-screen-button"></i>
  </button>

  <!-- Backdrop (closes phone when tapped outside) -->
  <div v-show="open" class="sp-backdrop" @click="toggleOpen"></div>

  <!-- Phone frame -->
  <div
    v-show="open"
    ref="phoneFrame"
    class="sp-frame"
    :class="mode === 'mobile' ? 'sp-frame--mobile' : 'sp-frame--desktop'"
    :style="frameStyle"
  >
      <!-- Phone device body -->
      <div class="sp-device">
        <!-- Screen -->
        <div class="sp-screen">
          <!-- Wallpaper -->
          <div class="sp-wallpaper"></div>

          <!-- Notch -->
          <div class="sp-notch">
            <div class="sp-notch-dot"></div>
          </div>

          <!-- Status bar (drag handle) -->
          <div data-drag-handle="phone" class="sp-statusbar">
            <div class="sp-statusbar-left">
              <span class="sp-statusbar-time">{{ currentTime }}</span>
            </div>
            <div class="sp-statusbar-right">
              <i class="fa-solid fa-signal sp-statusbar-icon"></i>
              <i class="fa-solid fa-wifi sp-statusbar-icon"></i>
              <i class="fa-solid fa-battery-full sp-statusbar-icon"></i>
            </div>
          </div>

          <!-- Body / screen content -->
          <div class="sp-body">
            <!-- Home screen -->
            <div v-if="activeApp === 'home'" class="sp-home">
              <div class="sp-home-title">
                <span>小手机</span>
              </div>
              <div class="sp-balance-bar">
                <span class="sp-balance-label">余额</span>
                <span class="sp-balance-val">¥{{ balance.toLocaleString() }}</span>
              </div>
              <div class="sp-app-grid">
                <button
                  v-for="app in apps"
                  :key="app.id"
                  class="sp-app-btn"
                  @click="activeApp = app.id"
                >
                  <div class="sp-app-icon" :style="{ background: app.tint }">
                    <span>{{ app.icon }}</span>
                  </div>
                  <span class="sp-app-label">{{ app.label }}</span>
                </button>
              </div>
            </div>

            <!-- App screen -->
            <div v-else class="sp-app-screen">
              <div class="sp-app-header">
                <button class="sp-app-back" @click="activeApp = 'home'">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <span class="sp-app-title">{{ currentApp?.label }}</span>
                <div class="sp-app-header-spacer"></div>
              </div>
              <div class="sp-app-content">
                <!-- Settings app -->
                <div v-if="activeApp === 'settings'" class="sp-settings">
                  <div class="sp-settings-group">
                    <div class="sp-settings-label">界面适配</div>
                    <div class="sp-settings-options">
                      <button
                        class="sp-settings-option"
                        :class="{ 'sp-settings-option--active': mode === 'desktop' }"
                        @click="setMode('desktop')"
                      >
                        <i class="fa-solid fa-desktop"></i>
                        <span>电脑端</span>
                      </button>
                      <button
                        class="sp-settings-option"
                        :class="{ 'sp-settings-option--active': mode === 'mobile' }"
                        @click="setMode('mobile')"
                      >
                        <i class="fa-solid fa-mobile-screen"></i>
                        <span>手机端</span>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Status app -->
                <div v-else-if="activeApp === 'status'" class="sp-status">
                  <div v-if="charList.length === 0" class="sp-placeholder">
                    <span>暂无角色数据</span>
                  </div>
                  <div v-else class="sp-char-list">
                    <div
                      v-for="c in charList"
                      :key="c.name"
                      class="sp-char-card"
                    >
                      <div class="sp-char-card-top">
                        <span class="sp-char-name">{{ c.name }}</span>
                        <span class="sp-char-val">{{ c.affection }} / 500</span>
                      </div>
                      <div class="sp-char-bar-track">
                        <div
                          class="sp-char-bar-fill"
                          :style="{ width: (c.affection / 500 * 100) + '%', background: c.barColor }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Calendar app -->
                <div v-else-if="activeApp === 'calendar'" class="sp-calendar">
                  <div class="sp-cal-nav">
                    <button class="sp-cal-nav-btn" @click="prevMonth"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="sp-cal-nav-title">{{ calYear }}年{{ calMonth }}月</span>
                    <button class="sp-cal-nav-btn" @click="nextMonth"><i class="fa-solid fa-chevron-right"></i></button>
                  </div>
                  <div class="sp-cal-grid">
                    <div class="sp-cal-dow" v-for="d in dayOfWeekLabels" :key="d">{{ d }}</div>
                    <div
                      v-for="(cell, idx) in calCells"
                      :key="idx"
                      class="sp-cal-cell"
                      :class="{
                        'sp-cal-cell--other': !cell.inMonth,
                        'sp-cal-cell--today': cell.isToday,
                        'sp-cal-cell--has-event': cell.hasEvent,
                        'sp-cal-cell--selected': cell.date === calSelected,
                      }"
                      @click="calSelected = cell.date"
                    >
                      <span class="sp-cal-day">{{ cell.day }}</span>
                      <span v-if="cell.hasEvent" class="sp-cal-dot"></span>
                    </div>
                  </div>
                  <div v-if="calSelected && calEvents.length" class="sp-cal-events">
                    <div class="sp-cal-events-date">{{ calSelected }}</div>
                    <div v-for="(ev, i) in calEvents" :key="i" class="sp-cal-event-item">
                      <span class="sp-cal-event-id">{{ ev.eventId }}</span>
                      <span class="sp-cal-event-summary">{{ ev.summary }}</span>
                    </div>
                  </div>
                  <div v-else-if="calSelected" class="sp-placeholder" style="height:60px">
                    <span>该日无事件</span>
                  </div>
                </div>

                <!-- Backpack app -->
                <div v-else-if="activeApp === 'backpack'" class="sp-backpack">
                  <div class="sp-backpack-balance">
                    <span class="sp-backpack-balance-label">当前余额</span>
                    <span class="sp-backpack-balance-val">¥{{ balance.toLocaleString() }}</span>
                  </div>
                  <div class="sp-backpack-divider"></div>
                  <div v-if="cardList.length === 0" class="sp-placeholder">
                    <span>暂无卡牌</span>
                  </div>
                  <div v-else class="sp-card-list">
                    <div
                      v-for="c in cardList"
                      :key="c.id"
                      class="sp-card-item"
                      :style="{ borderLeftColor: c.gradeColor }"
                    >
                      <div class="sp-card-top">
                        <span class="sp-card-name">{{ c.名称 }}</span>
                        <button class="sp-card-remove" @click="removeCard(c.id)">
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div class="sp-card-tags">
                        <span class="sp-card-tag" :style="{ background: c.typeColor }">{{ c.类型 }}</span>
                        <span class="sp-card-grade" :style="{ background: c.gradeColor }">{{ c.等级 }}</span>
                      </div>
                      <div v-if="c.描述" class="sp-card-desc">{{ c.描述 }}</div>
                    </div>
                  </div>
                </div>

                <!-- Placeholder for other apps -->
                <div v-else class="sp-placeholder">
                  <span>{{ currentApp?.label }} 开发中</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Home indicator -->
          <div class="sp-home-bar"></div>
        </div>

        <!-- Close button (inside screen, top-right corner) -->
        <button class="sp-close-btn" style="pointer-events: auto" @click="toggleOpen">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePhoneStore, CALENDAR_DATA } from './store';

const store = usePhoneStore();
const { mode, open, phonePosition, phoneWidth, phoneHeight, characters, balance, backpack } = storeToRefs(store);
const { toggleOpen, setMode, setPhonePosition, setCharAffection, setBalance, addCard, removeCard } = store;

const phoneFrame = ref<HTMLElement | null>(null);
const activeApp = ref<'home' | string>('home');

// Calendar state
const dayOfWeekLabels = ['日', '一', '二', '三', '四', '五', '六'];
const calYear = ref(2012);
const calMonth = ref(4);
const calSelected = ref('');

const calEvents = computed(() => {
  return CALENDAR_DATA[calSelected.value] ?? [];
});

const calCells = computed(() => {
  const y = calYear.value;
  const m = calMonth.value;
  const firstDay = new Date(y, m - 1, 1).getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const daysInPrevMonth = new Date(y, m - 1, 0).getDate();

  const cells: { day: number; inMonth: boolean; isToday: boolean; hasEvent: boolean; date: string }[] = [];

  // Previous month tail
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const pm = m === 1 ? 12 : m - 1;
    const py = m === 1 ? y - 1 : y;
    const dateStr = `${py}-${String(pm).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, inMonth: false, isToday: false, hasEvent: !!CALENDAR_DATA[dateStr], date: dateStr });
  }

  // Current month
  const todayStr = `${y}-${String(m).padStart(2, '0')}`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${todayStr}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, inMonth: true, isToday: false, hasEvent: !!CALENDAR_DATA[dateStr], date: dateStr });
  }

  // Next month head
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    const nm = m === 12 ? 1 : m + 1;
    const ny = m === 12 ? y + 1 : y;
    for (let d = 1; d <= remaining; d++) {
      const dateStr = `${ny}-${String(nm).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ day: d, inMonth: false, isToday: false, hasEvent: !!CALENDAR_DATA[dateStr], date: dateStr });
    }
  }

  return cells;
});

function prevMonth() {
  if (calMonth.value === 4 && calYear.value === 2012) return;
  if (calMonth.value === 1) { calMonth.value = 12; calYear.value--; }
  else calMonth.value--;
  calSelected.value = '';
}

function nextMonth() {
  if (calMonth.value === 12) { calMonth.value = 1; calYear.value++; }
  else calMonth.value++;
  calSelected.value = '';
}

const apps = [
  { id: 'messages', icon: 'MSG', label: '消息', tint: '#6ecf8a' },
  { id: 'forum', icon: 'BBS', label: '论坛', tint: '#f09b7a' },
  { id: 'status', icon: 'STA', label: '状态', tint: '#5dc9c0' },
  { id: 'calendar', icon: 'CAL', label: '日历', tint: '#f5a97f' },
  { id: 'backpack', icon: 'BAG', label: '背包', tint: '#c9a0dc' },
  { id: 'settings', icon: 'SET', label: '设置', tint: '#9aa0ad' },
];

const currentApp = computed(() => apps.find(a => a.id === activeApp.value));

const GRADE_COLORS: Record<string, string> = {
  F: '#888', D: '#6ecf8a', C: '#4aa3df', B: '#7b6ef0',
  A: '#f59e0b', S: '#f07b4a', SS: '#ef4444', SSS: '#e040fb',
};
const TYPE_COLORS: Record<string, string> = {
  '物品卡': '#5dc9c0', '属性卡': '#f59e0b', '技能卡': '#7b6ef0',
  '事件卡': '#ef4444', '角色卡': '#6db9ef', '任务': '#f07b4a',
  '朋友卡': '#f09b7a', '命运卡': '#e040fb',
};

const cardList = computed(() => {
  return _(backpack.value)
    .entries()
    .map(([id, data]) => ({
      id,
      名称: data.名称,
      类型: data.类型,
      等级: data.等级,
      描述: data.描述,
      gradeColor: GRADE_COLORS[data.等级] ?? '#888',
      typeColor: TYPE_COLORS[data.类型] ?? '#888',
    }))
    .value();
});

const charList = computed(() => {
  return _(characters.value)
    .entries()
    .map(([name, data]) => {
      const val = data.好感度 ?? 0;
      const pct = val / 500;
      let barColor = '#6ecf8a';
      if (pct > 0.8) barColor = '#f59e0b';
      if (pct >= 0.95) barColor = '#ef4444';
      return { name, affection: val, barColor };
    })
    .value();
});

const currentTime = ref('');
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 30000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// Use base resolution and scale to fit the outer frame
const BASE_W = 375;
const BASE_H = 720;

const frameStyle = computed(() => ({
  width: `${phoneWidth.value}px`,
  height: `${phoneHeight.value}px`,
  left: `${phonePosition.value.x}px`,
  top: `${phonePosition.value.y}px`,
}));

// Drag via jquery-ui
onMounted(() => {
  if (phoneFrame.value) {
    $(phoneFrame.value).draggable({
      handle: '[data-drag-handle]',
      containment: 'window',
      stop: (_e: unknown, ui: { position: { left: number; top: number } }) => {
        setPhonePosition({ x: ui.position.left, y: ui.position.top });
      },
    });
  }
});
</script>

<style scoped>
/* ===== BACKDROP ===== */
.sp-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9997;
  background: rgba(0, 0, 0, 0.3);
}

/* ===== FLOATING BALL ===== */
.sp-ball {
  position: fixed;
  z-index: 9998;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #60a5fa, #2563eb);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: sp-ball-float 3s ease-in-out infinite;
}
.sp-ball:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 22px rgba(37, 99, 235, 0.55), 0 2px 6px rgba(0, 0, 0, 0.25);
}
.sp-ball--desktop {
  bottom: 24px;
  right: 24px;
}
.sp-ball--mobile {
  bottom: 100px;
  right: 12px;
}
@keyframes sp-ball-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* ===== FRAME ===== */
.sp-frame {
  position: fixed;
  z-index: 9999;
  overflow: visible;
  transition: left 0.2s ease, top 0.2s ease, width 0.2s ease, height 0.2s ease;
  animation: sp-frame-in 0.25s ease-out;
}
@keyframes sp-frame-in {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

/* ===== DEVICE BODY ===== */
.sp-device {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 0 0 4px #1a1a2e, 0 8px 32px rgba(0, 0, 0, 0.5);
  position: relative;
}

/* ===== SCREEN ===== */
.sp-screen {
  position: absolute;
  inset: 8px;
  border-radius: 18px;
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
}

/* ===== WALLPAPER ===== */
.sp-wallpaper {
  position: absolute;
  inset: 0;
  background: linear-gradient(140deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
}

/* ===== NOTCH ===== */
.sp-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 36%;
  max-width: 130px;
  height: 22px;
  background: #000;
  border-radius: 0 0 16px 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-notch-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1c1c2e;
  border: 1.5px solid #333;
  margin-top: -2px;
}

/* ===== STATUSBAR ===== */
.sp-statusbar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px 6px;
  color: #fff;
  cursor: grab;
  user-select: none;
}
.sp-statusbar:active {
  cursor: grabbing;
}
.sp-statusbar-left,
.sp-statusbar-right {
  display: flex;
  align-items: center;
  gap: 3px;
}
.sp-statusbar-time {
  font-size: 11px;
  font-weight: 500;
}
.sp-statusbar-icon {
  font-size: 9px;
}

/* ===== BODY ===== */
.sp-body {
  position: relative;
  z-index: 5;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.sp-body::-webkit-scrollbar {
  display: none;
}

/* ===== HOME ===== */
.sp-home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sp-home-title {
  text-align: center;
  padding: 20px 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

/* ===== APP GRID ===== */
.sp-app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 4px 20px;
  justify-items: center;
}
.sp-app-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.sp-app-icon {
  width: 48px;
  height: 48px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  transition: transform 0.15s;
}
.sp-app-btn:active .sp-app-icon {
  transform: scale(0.92);
}
.sp-app-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* ===== APP SCREEN ===== */
.sp-app-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sp-app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  color: #fff;
}
.sp-app-back {
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #fff;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 11px;
}
.sp-app-title {
  font-size: 13px;
  font-weight: 600;
}
.sp-app-header-spacer {
  width: 26px;
}
.sp-app-content {
  flex: 1;
  overflow-y: auto;
}
.sp-app-content::-webkit-scrollbar {
  display: none;
}

/* ===== STATUS APP ===== */
.sp-status {
  padding: 8px 12px;
}
.sp-char-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sp-char-card {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 12px;
}
.sp-char-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.sp-char-name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.sp-char-val {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}
.sp-char-bar-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  margin-bottom: 8px;
}
.sp-char-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease, background 0.3s ease;
}
.sp-char-card-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}
.sp-char-btn {
  width: 28px;
  height: 22px;
  border-radius: 6px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.sp-char-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.sp-char-btn--plus {
  background: rgba(99, 200, 130, 0.2);
  color: #6ecf8a;
}
.sp-char-btn--plus:hover {
  background: rgba(99, 200, 130, 0.35);
}

/* ===== BALANCE BAR ===== */
.sp-balance-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 0 4px;
}
.sp-balance-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
}
.sp-balance-val {
  font-size: 14px;
  font-weight: 700;
  color: #f59e0b;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* ===== BACKPACK APP ===== */
.sp-backpack {
  padding: 8px 12px;
}
.sp-backpack-balance {
  text-align: center;
  padding: 8px 0;
}
.sp-backpack-balance-label {
  display: block;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 2px;
}
.sp-backpack-balance-val {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #f59e0b;
  margin-bottom: 8px;
}
.sp-backpack-balance-actions {
  display: flex;
  gap: 4px;
  justify-content: center;
}
.sp-backpack-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 10px 0;
}
.sp-card-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sp-card-item {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  border-left: 3px solid #888;
  padding: 10px;
}
.sp-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.sp-card-name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.sp-card-remove {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 10px;
  padding: 2px 4px;
}
.sp-card-remove:hover {
  color: rgba(255, 255, 255, 0.7);
}
.sp-card-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}
.sp-card-tag,
.sp-card-grade {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  color: #fff;
}
.sp-card-desc {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.4;
}

/* ===== CALENDAR APP ===== */
.sp-calendar {
  padding: 4px 8px;
}
.sp-cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px;
}
.sp-cal-nav-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-cal-nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.sp-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
}
.sp-cal-dow {
  font-size: 10px;
  color: rgba(255,255,255,0.4);
  padding: 4px 0;
}
.sp-cal-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background 0.15s;
}
.sp-cal-cell:hover {
  background: rgba(255,255,255,0.08);
}
.sp-cal-cell--other {
  opacity: 0.25;
  pointer-events: none;
}
.sp-cal-cell--selected {
  background: rgba(59,130,246,0.3);
}
.sp-cal-day {
  font-size: 12px;
  color: rgba(255,255,255,0.85);
}
.sp-cal-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #f59e0b;
  position: absolute;
  bottom: 3px;
}
.sp-cal-events {
  margin-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 8px;
}
.sp-cal-events-date {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 6px;
}
.sp-cal-event-item {
  display: flex;
  gap: 6px;
  padding: 4px 0;
  font-size: 11px;
  line-height: 1.4;
}
.sp-cal-event-id {
  color: rgba(255,255,255,0.35);
  flex-shrink: 0;
}
.sp-cal-event-summary {
  color: rgba(255,255,255,0.75);
}

/* ===== SETTINGS ===== */
.sp-settings {
  padding: 12px 16px;
}
.sp-settings-group {
  margin-bottom: 16px;
}
.sp-settings-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.sp-settings-options {
  display: flex;
  gap: 8px;
}
.sp-settings-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}
.sp-settings-option i {
  font-size: 18px;
}
.sp-settings-option--active {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  color: #fff;
}

/* ===== PLACEHOLDER ===== */
.sp-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.35);
  font-size: 12px;
}

/* ===== HOME INDICATOR ===== */
.sp-home-bar {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
  z-index: 20;
}

/* ===== CLOSE BUTTON ===== */
.sp-close-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 30;
  -webkit-tap-highlight-color: transparent;
}
.sp-close-btn:active {
  background: rgba(0, 0, 0, 0.7);
}
</style>
