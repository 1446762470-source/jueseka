const fs = require('fs');
let js = fs.readFileSync('src/小手机/pure-phone.js', 'utf8');

// ─── Add splash CSS (before CSS closing] ) ───
const cssEnd = `'.sp-cal-event-summary{color:rgba(255,255,255,0.7)}'
  ].join('');`;

const splashCSS = `'.sp-cal-event-summary{color:rgba(255,255,255,0.7)}',
    '.sp-splash{position:absolute;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;',
    'justify-content:center;background:linear-gradient(160deg,#0a0a1a 0%,#12122a 30%,#1a1a3e 60%,#0f2340 100%);',
    'cursor:pointer}',
    '.sp-splash-title{font-size:18px;font-weight:700;color:#fff;text-align:center;line-height:1.8;',
    'letter-spacing:1px;text-shadow:0 2px 12px rgba(200,220,255,0.3);padding:0 24px;',
    'animation:sp-fadeInUp .8s ease-out}',
    '.sp-splash-subtitle{font-size:10px;color:rgba(255,255,255,0.35);margin-top:16px;',
    'letter-spacing:2px;animation:sp-fadeInUp .8s ease-out .15s both}',
    '.sp-splash-hint{font-size:10px;color:rgba(255,255,255,0.3);margin-top:32px;',
    'animation:sp-pulse 2s ease-in-out infinite}',
    '@keyframes sp-fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes sp-pulse{0%,100%{opacity:.3}50%{opacity:.6}}',
    '.sp-petal{position:absolute;width:12px;height:12px;background:radial-gradient(circle,#fff 0%,rgba(255,230,240,0.6) 40%,rgba(255,200,220,0) 70%);',
    'border-radius:50% 0 50% 50%;pointer-events:none;animation:sp-petalFall linear infinite}',
    '@keyframes sp-petalFall{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0}',
    '10%{opacity:1}90%{opacity:.4}100%{transform:translate(-30px,100vh) rotate(360deg) scale(.3);opacity:0}}'
  ].join('');`;

js = js.replace(cssEnd, splashCSS);

// ─── Add showSplash to DEFAULT_SETTINGS ───
const defaultSettingsEnd = `    characters: {}
  };`;

const defaultSettingsNew = `    characters: {},
    showSplash: true
  };`;

js = js.replace(defaultSettingsEnd, defaultSettingsNew);

// ─── Add showSplash to loadSettings (load from script vars) ───
const loadSplashLine = `      if (typeof sv.open === 'boolean') s.open = sv.open;`;
const loadSplashNew = `      if (typeof sv.open === 'boolean') s.open = sv.open;
      if (typeof sv.showSplash === 'boolean') s.showSplash = sv.showSplash;`;

js = js.replace(loadSplashLine, loadSplashNew);

// ─── Add showSplash to saveSettings (save to script vars) ───
const saveUILine = `    var uiState = { mode: s.mode, phonePosition: s.phonePosition, open: s.open };`;
const saveUINew = `    var uiState = { mode: s.mode, phonePosition: s.phonePosition, open: s.open, showSplash: s.showSplash };`;

js = js.replace(saveUILine, saveUINew);

// ─── Add splash rendering function ───
// Insert before renderHomeScreenFull
const renderHomeFn = `  function renderHomeScreenFull() {`;
const splashFn = `  function renderSplash() {
    var html = '';
    html += '<div class=\"sp-splash\" id=\"sp-splash-screen\">';
    // Cherry blossom petals
    html += '<div class=\"sp-petal\" style=\"top:-20px;right:10%;animation-delay:0s;animation-duration:4s\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-30px;right:25%;animation-delay:1.5s;animation-duration:4.5s;width:8px;height:8px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-15px;right:18%;animation-delay:3s;animation-duration:5s;width:10px;height:10px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-40px;right:30%;animation-delay:0.8s;animation-duration:3.8s;width:14px;height:14px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-25px;right:6%;animation-delay:2.2s;animation-duration:4.2s;width:9px;height:9px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-10px;right:22%;animation-delay:3.8s;animation-duration:5.2s;width:11px;height:11px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-35px;right:14%;animation-delay:1s;animation-duration:3.5s;width:7px;height:7px\"></div>';
    html += '<div class=\"sp-petal\" style=\"top:-18px;right:28%;animation-delay:2.8s;animation-duration:4.8s;width:13px;height:13px\"></div>';
    // Title
    html += '<div class=\"sp-splash-title\">やはり俺の<br>青春ラブコメは<br>まちがっている。</div>';
    html += '<div class=\"sp-splash-subtitle\">MY YOUTH ROMANTIC COMEDY<br>IS WRONG, AS I EXPECTED</div>';
    html += '<div class=\"sp-splash-hint\">—— 点击屏幕进入 ——</div>';
    html += '</div>';
    $appContent.append(html);
    $appContent.find('#sp-splash-screen').on('click', function () {
      settings.showSplash = false;
      saveSettings(settings);
      $(this).fadeOut(300, function () { $(this).remove(); });
    });
  }

  function renderHomeScreenFull() {`;

js = js.replace(renderHomeFn, splashFn + '\n' + renderHomeFn);

// ─── Call renderSplash in buildUI after $appContent is created ───
const afterAppContent = `    $appContent = $('<div>').appendTo($body);
    renderHomeScreenFull();`;

const afterAppContentNew = `    $appContent = $('<div>').appendTo($body);
    if (settings.showSplash) {
      renderSplash();
    }
    renderHomeScreenFull();`;

js = js.replace(afterAppContent, afterAppContentNew);

// ─── Verify ───
try { new Function(js); console.log('JS syntax: OK'); } catch(e) { console.log('ERROR:', e.message); process.exit(1); }

fs.writeFileSync('src/小手机/pure-phone.js', js, 'utf8');

const json = {type:'script',enabled:true,name:'小手机',id:'e8a7b3c1-2d4f-5e6a-8b9c-0d1e2f3a4b5c',content:js,info:'',button:{enabled:true,buttons:[]},data:{},export_with:{data:true,button:true}};
fs.writeFileSync('src/小手机.json', JSON.stringify(json));
fs.writeFileSync('dist/小手机/小手机.js', js, 'utf8');
console.log('Updated src/小手机.json & dist/小手机/小手机.js');
