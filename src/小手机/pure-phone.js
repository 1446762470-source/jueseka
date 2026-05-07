(function () {
  "use strict";

  var STYLE_ID = "sp-little-phone-style";
    var CSS = [
    '.sp-backdrop{position:fixed;inset:0;z-index:30000;background:rgba(0,0,0,0.45);backdrop-filter:blur(2px)}',
    '.sp-ball{position:fixed;z-index:30001;width:52px;height:52px;border-radius:50%;',
    'background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;',
    'cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;',
    'box-shadow:0 4px 20px rgba(102,126,234,0.45),0 1px 4px rgba(0,0,0,0.3);',
    'transition:all .3s cubic-bezier(.4,0,.2,1);animation:sp-ball-float 3.5s ease-in-out infinite}',
    '.sp-ball:hover{transform:scale(1.15);box-shadow:0 8px 28px rgba(102,126,234,0.6),0 2px 8px rgba(0,0,0,0.35)}',
    '.sp-ball--desktop{bottom:28px;right:28px}',
    '.sp-ball--mobile{bottom:100px;right:12px}',
    '@keyframes sp-ball-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
    '.sp-frame{position:fixed;z-index:30002;overflow:visible;transition:left .3s ease,top .3s ease,width .3s ease,height .3s ease;',
    'animation:sp-frame-in .35s cubic-bezier(.34,1.56,.64,1)}',
    '@keyframes sp-frame-in{from{opacity:0;transform:scale(.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}',
    '.sp-device{width:100%;height:100%;border-radius:28px;overflow:hidden;',
    'background:linear-gradient(180deg,#1a1a2e 0%,#0d0d1a 100%);',
    'box-shadow:0 0 0 3px #2a2a4a,0 0 0 6px #111122,0 12px 40px rgba(0,0,0,0.6);position:relative}',
    '.sp-screen{position:absolute;inset:10px;border-radius:20px;overflow:hidden;background:#0a0a14;display:flex;flex-direction:column}',
    '.sp-wallpaper{position:absolute;inset:0;overflow:hidden;',
    'background:linear-gradient(180deg,#c5dbe8 0%,#b0c8da 20%,#9ab5c9 40%,#7a9eb2 60%,#5c8799 80%,#4a7385 100%)}',
    '.sp-wallpaper::before{content:"";position:absolute;inset:0;',
    'background:radial-gradient(ellipse 60% 40% at 25% 20%,rgba(180,210,255,.3) 0%,transparent 50%),',
    'radial-gradient(ellipse 50% 50% at 75% 60%,rgba(255,200,220,.25) 0%,transparent 50%),',
    'radial-gradient(ellipse 40% 40% at 50% 80%,rgba(200,220,255,.2) 0%,transparent 40%)}',
    // Cherry blossom petals on wallapper (upper right area)
    '.sp-wallpaper::after{content:"";position:absolute;top:-20px;right:5%;width:14px;height:14px;',
    'background:radial-gradient(circle at 35% 35%,rgba(255,200,210,.7),rgba(255,180,200,.4) 40%,transparent 70%);',
    'border-radius:50% 0 50% 50%;animation:sp-wpPetal1 5s linear infinite;box-shadow:',
    '30px 8px 0 rgba(255,190,205,.5),-10px 20px 0 rgba(255,200,215,.4),50px 30px 0 rgba(255,180,200,.35),',
    '15px 45px 0 rgba(255,200,210,.3),40px -15px 0 rgba(255,210,220,.45),-25px 40px 0 rgba(255,190,205,.3),',
    '60px 60px 0 rgba(255,180,195,.25),-40px -5px 0 rgba(255,200,215,.35)}',
    '@keyframes sp-wpPetal1{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:0}',
    '10%{opacity:.8}80%{opacity:.3}100%{transform:translate(-50px,120vh) rotate(300deg) scale(.3);opacity:0}}',
    '.sp-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:38%;max-width:140px;',
    'height:24px;background:#0a0a14;border-radius:0 0 18px 18px;z-index:10;display:flex;align-items:center;justify-content:center}',
    '.sp-notch-dot{width:8px;height:8px;border-radius:50%;background:#1a1a30;border:1.5px solid #2a2a44;margin-top:-2px}',
    '.sp-statusbar{position:relative;z-index:10;display:flex;justify-content:space-between;align-items:center;',
    'padding:12px 18px 6px;color:#fff;cursor:grab;user-select:none;font-family:-apple-system,system-ui,sans-serif}',
    '.sp-statusbar:active{cursor:grabbing}',
    '.sp-statusbar-left,.sp-statusbar-right{display:flex;align-items:center;gap:4px}',
    '.sp-statusbar-time{font-size:12px;font-weight:600;letter-spacing:.3px}',
    '.sp-statusbar-icon{font-size:10px;opacity:.85}',
    '.sp-body{position:relative;z-index:5;flex:1;overflow-y:auto;overflow-x:hidden;scroll-behavior:smooth}',
    '.sp-body::-webkit-scrollbar{display:none}',
    '.sp-home{height:100%;display:flex;flex-direction:column;padding-top:8px}',
    '.sp-home-title{text-align:center;padding:24px 0 8px;font-size:18px;font-weight:800;color:#fff;',
    'letter-spacing:1px;text-shadow:0 2px 8px rgba(100,130,255,0.3)}',
    '.sp-balance-bar{display:flex;align-items:center;justify-content:center;gap:8px;',
    'padding:8px 16px;margin:0 20px 8px;background:rgba(255,255,255,.04);border-radius:16px;border:1px solid rgba(255,255,255,.06)}',
    '.sp-balance-label{font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px}',
    '.sp-balance-val{font-size:16px;font-weight:800;background:linear-gradient(135deg,#f59e0b,#fbbf24);',
    '-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
    '.sp-app-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:8px 28px;justify-items:center}',
    '.sp-app-btn{display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:none;',
    'cursor:pointer;padding:6px;transition:transform .2s}',
    '.sp-app-btn:hover{transform:translateY(-2px)}',
    '.sp-app-icon{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;',
    'font-size:24px;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.3);transition:all .2s;position:relative;overflow:hidden}',
    '.sp-app-icon::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.2) 0%,transparent 50%)}',
    '.sp-app-btn:active .sp-app-icon{transform:scale(.9)}',
    '.sp-app-label{font-size:11px;font-weight:500;color:rgba(255,255,255,.8);letter-spacing:.2px}',
    '.sp-app-screen{height:100%;display:flex;flex-direction:column}',
    '.sp-app-header{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;',
    'color:#fff;border-bottom:1px solid rgba(255,255,255,.06)}',
    '.sp-app-back{background:rgba(255,255,255,.1);border:none;color:#fff;width:28px;height:28px;border-radius:50%;',
    'display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;transition:background .2s}',
    '.sp-app-back:hover{background:rgba(255,255,255,.2)}',
    '.sp-app-title{font-size:14px;font-weight:700;letter-spacing:.3px}',
    '.sp-app-header-spacer{width:28px}',
    '.sp-app-content{flex:1;overflow-y:auto}',
    '.sp-app-content::-webkit-scrollbar{display:none}',
    '.sp-status{padding:10px 14px}',
    '.sp-char-list{display:flex;flex-direction:column;gap:10px}',
    '.sp-char-card{background:rgba(255,255,255,.05);border-radius:14px;padding:14px;',
    'border:1px solid rgba(255,255,255,.06);backdrop-filter:blur(10px);transition:background .2s}',
    '.sp-char-card:hover{background:rgba(255,255,255,.08)}',
    '.sp-char-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}',
    '.sp-char-name{font-size:14px;font-weight:700;color:#fff;letter-spacing:.3px}',
    '.sp-char-val{font-size:11px;color:rgba(255,255,255,.5);font-weight:500}',
    '.sp-char-bar-track{width:100%;height:8px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:2px}',
    '.sp-char-bar-fill{height:100%;border-radius:4px;transition:width .5s cubic-bezier(.4,0,.2,1),background .5s ease;',
    'box-shadow:0 0 8px currentColor}',
    '.sp-settings{padding:14px 18px}',
    '.sp-settings-group{margin-bottom:20px}',
    '.sp-settings-label{font-size:10px;color:rgba(255,255,255,.45);margin-bottom:10px;',
    'text-transform:uppercase;letter-spacing:1px;font-weight:600}',
    '.sp-settings-options{display:flex;gap:10px}',
    '.sp-settings-option{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 10px;',
    'border-radius:14px;background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.06);',
    'color:rgba(255,255,255,.5);cursor:pointer;font-size:12px;transition:all .25s;font-weight:500}',
    '.sp-settings-option i{font-size:22px;transition:transform .3s}',
    '.sp-settings-option:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8)}',
    '.sp-settings-option--active{background:rgba(90,140,170,.2);border-color:rgba(90,140,170,.5);color:#fff;',
    'box-shadow:0 0 20px rgba(90,140,170,.15)}',
    '.sp-settings-option--active i{transform:scale(1.1)}',
    '.sp-placeholder{display:flex;align-items:center;justify-content:center;height:100%;',
    'color:rgba(255,255,255,.25);font-size:13px;font-weight:500}',
    '.sp-home-bar{position:absolute;bottom:6px;left:50%;transform:translateX(-50%);width:120px;height:4px;',
    'background:rgba(255,255,255,.25);border-radius:3px;z-index:20}',
    '.sp-close-btn{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;',
    'background:rgba(0,0,0,.5);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;',
    'justify-content:center;font-size:13px;z-index:30;-webkit-tap-highlight-color:transparent;transition:background .2s}',
    '.sp-close-btn:hover{background:rgba(239,68,68,.6)}',
    '.sp-backpack{padding:10px 14px}',
    '.sp-backpack-balance{text-align:center;padding:12px 0}',
    '.sp-backpack-balance-label{display:block;font-size:10px;color:rgba(255,255,255,.4);',
    'margin-bottom:4px;text-transform:uppercase;letter-spacing:1px}',
    '.sp-backpack-balance-val{display:block;font-size:24px;font-weight:800;',
    'background:linear-gradient(135deg,#f59e0b,#fbbf24);-webkit-background-clip:text;',
    '-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px}',
    '.sp-backpack-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);margin:12px 0}',
    '.sp-card-list{display:flex;flex-direction:column;gap:10px}',
    '.sp-card-item{background:rgba(255,255,255,.04);border-radius:12px;border:1px solid rgba(255,255,255,.05);',
    'border-left:4px solid #888;padding:12px 14px;transition:transform .2s}',
    '.sp-card-item:hover{transform:translateX(2px)}',
    '.sp-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}',
    '.sp-card-name{font-size:14px;font-weight:700;color:#fff;letter-spacing:.2px}',
    '.sp-card-remove{background:rgba(255,255,255,.06);border:none;color:rgba(255,255,255,.3);cursor:pointer;',
    'font-size:10px;padding:4px 8px;border-radius:6px;transition:all .2s}',
    '.sp-card-remove:hover{background:rgba(239,68,68,.3);color:#fca5a5}',
    '.sp-card-tags{display:flex;gap:6px;margin-bottom:6px}',
    '.sp-card-tag,.sp-card-grade{font-size:9px;font-weight:700;padding:2px 8px;border-radius:6px;color:#fff;letter-spacing:.3px}',
    '.sp-card-desc{font-size:11px;color:rgba(255,255,255,.4);line-height:1.5;margin-top:4px}',
    '.sp-calendar{padding:6px 10px}',
    '.sp-cal-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 6px}',
    '.sp-cal-nav-btn{background:rgba(255,255,255,.08);border:none;color:#fff;width:30px;height:30px;border-radius:50%;',
    'cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:background .2s}',
    '.sp-cal-nav-btn:hover{background:rgba(255,255,255,.16)}',
    '.sp-cal-nav-title{font-size:15px;font-weight:700;color:#fff;letter-spacing:.5px}',
    '.sp-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center;margin-top:6px}',
    '.sp-cal-dow{font-size:10px;color:rgba(255,255,255,.35);padding:6px 0;font-weight:600;letter-spacing:.5px}',
    '.sp-cal-cell{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;',
    'border-radius:10px;cursor:pointer;position:relative;transition:all .15s}',
    '.sp-cal-cell:hover{background:rgba(255,255,255,.06)}',
    '.sp-cal-cell--other{opacity:.2;pointer-events:none}',
    '.sp-cal-cell--selected{background:rgba(90,140,170,.25);box-shadow:inset 0 0 0 2px rgba(90,140,170,.4)}',
    '.sp-cal-day{font-size:13px;color:rgba(255,255,255,.8);font-weight:500}',
    '.sp-cal-dot{width:5px;height:5px;border-radius:50%;background:#f59e0b;position:absolute;bottom:4px;box-shadow:0 0 4px rgba(245,158,11,.5)}',
    '.sp-cal-events{margin-top:12px;border-top:1px solid rgba(255,255,255,.06);padding-top:10px}',
    '.sp-cal-events-date{font-size:12px;color:rgba(255,255,255,.45);margin-bottom:8px;font-weight:600;letter-spacing:.3px}',
    '.sp-cal-event-item{display:flex;gap:8px;padding:5px 0;font-size:12px;line-height:1.5}',
    '.sp-cal-event-id{color:rgba(255,255,255,.3);flex-shrink:0;font-weight:600;font-size:11px}',
    '.sp-cal-event-summary{color:rgba(255,255,255,.7)}',
    // Splash screen
    '.sp-splash{position:absolute;inset:0;z-index:30010;display:flex;flex-direction:column;align-items:center;',
    'justify-content:center;background:linear-gradient(180deg,#b8cfde 0%,#a3becf 20%,#8faabb 45%,#7a96a5 70%,#68828f 100%);',
    'cursor:pointer;overflow:hidden}',
    '.sp-splash::before{content:"";position:absolute;inset:0;',
    'background:radial-gradient(ellipse 50% 30% at 25% 15%,rgba(150,200,240,.3) 0%,transparent 50%),',
    'radial-gradient(ellipse 60% 40% at 70% 60%,rgba(240,180,200,.2) 0%,transparent 50%);z-index:0}',
    '.sp-splash-title{position:relative;z-index:1;font-size:17px;font-weight:700;color:#fff;text-align:center;line-height:2;',
    'letter-spacing:1.5px;padding:0 24px;animation:sp-fadeInUp .8s ease-out;background:linear-gradient(135deg,#7eb8da 0%,#8fb8d0 25%,#b0b8c8 45%,#c8a8b8 65%,#d4a0b0 85%,#c898a8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;filter:drop-shadow(0 2px 8px rgba(150,180,200,.25))}',
    '.sp-splash-subtitle{position:relative;z-index:1;font-size:9px;color:rgba(255,255,255,.3);margin-top:18px;',
    'letter-spacing:3px;animation:sp-fadeInUp .8s ease-out .2s both}',
    '.sp-splash-hint{position:relative;z-index:1;font-size:10px;color:rgba(255,255,255,.25);margin-top:36px;animation:sp-hintPulse 2s ease-in-out infinite}',
    '.sp-wallpaper-input{width:100%;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.1);',
    'background:rgba(255,255,255,.06);color:#fff;font-size:11px;outline:none;transition:border .2s}',
    '.sp-wallpaper-input:focus{border-color:rgba(90,140,170,.5)}',
    '.sp-wallpaper-input::placeholder{color:rgba(255,255,255,.2)}',
    '@keyframes sp-fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes sp-hintPulse{0%,100%{opacity:.2}50%{opacity:.5}}',
    // Cherry petals (upper right area)
    '.sp-petal{position:absolute;width:10px;height:10px;z-index:1;',
    'background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.9) 0%,rgba(220,225,235,.6) 30%,rgba(190,200,215,.3) 55%,rgba(170,185,200,0) 70%);',
    'border-radius:50% 0 50% 50%;pointer-events:none;animation:sp-petalFall linear infinite}',
    '.sp-petal::after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;',
    'background:radial-gradient(circle at 70% 70%,rgba(255,200,220,.3) 0%,transparent 50%);border-radius:inherit}',
    '@keyframes sp-petalFall{0%{transform:translate(0,-10px) rotate(0deg) scale(1);opacity:0}',
    '15%{opacity:.9}80%{opacity:.3}100%{transform:translate(-40px,105vh) rotate(420deg) scale(.25);opacity:0}}'
  ].join('');

  // CALENDAR_DATA (generated safe)
  var CALENDAR_DATA = {
  "2012-04-08": [
    {
      "eventId": "M0.1",
      "summary": "比企谷八幡为救一只小狗而被高级轿车撞伤。"
    }
  ],
  "2012-04-10": [
    {
      "eventId": "M0.1",
      "summary": "在八幡住院期间，侍奉部成立了。"
    }
  ],

  "2012-04-15": [
    {
      "eventId": "M0.1",
      "summary": "八幡返校后，提交了一篇扭曲的作文，引起了平冢静的注意。"
    }
  ],
  "2012-04-16": [
    {
      "eventId": "M1.1",
      "summary": "比企谷八幡被平冢静老师强行带入侍奉部，与雪之下雪乃初次会面。"
    }
  ],
  "2012-04-19": [
    {
      "eventId": "M1.2",
      "summary": "由比滨结衣前来委托制作曲奇。"
    }
  ],
  "2012-04-20": [
    {
      "eventId": "M1.2",
      "summary": "侍奉部众人指导结衣制作曲奇，过程堪称灾难。"
    }
  ],
  "2012-04-26": [
    {
      "eventId": "M1.4",
      "summary": "户冢彩加前来委托，希望能帮助弱小的网球部。"
    }
  ],
  "2012-04-27": [
    {
      "eventId": "M1.4",
      "summary": "特训第一日：地狱体能训练。"
    }
  ],
  "2012-04-28": [
    {
      "eventId": "M1.4",
      "summary": "特训第二日：挥拍练习与应援风波。"
    }
  ],
  "2012-04-30": [
    {
      "eventId": "M1.4",
      "summary": "特训第三日：枯燥的对墙练习与二人独处。"
    }
  ],
  "2012-05-01": [
    {
      "eventId": "M1.4",
      "summary": "特训第四日：教科书般的发球练习。"
    }
  ],
  "2012-05-02": [
    {
      "eventId": "M1.4",
      "summary": "特训第五日：球场冲突。"
    }
  ],
  "2012-05-03": [
    {
      "eventId": "M1.4",
      "summary": "特训第六日：战术分析。"
    },
    {
      "eventId": "M1.4",
      "summary": "特训最终日：决战！"
    }
  ],
  "2012-05-08": [
    {
      "eventId": "M1.3",
      "summary": "材木座义辉带着他的小说原稿闯入侍奉部，强行委托评审。"
    }
  ],
  "2012-05-09": [
    {
      "eventId": "M1.3",
      "summary": "侍奉部对材木座的小说进行“公开处刑”。"
    }
  ],
  "2012-05-10": [
    {
      "eventId": "M1.3",
      "summary": "孤独的体育课与游戏社的挑战。"
    }
  ],
  "2012-05-15": [
    {
      "eventId": "M2.1",
      "summary": "由比滨看着考试范围表唉声叹气，并说出了那句经典的“念书没有意义”的台词。"
    }
  ],
  "2012-05-22": [
    {
      "eventId": "M2.2",
      "summary": "小町带着川崎大志来到侍奉部，正式委托调查川崎沙希晚归的秘密。"
    }
  ],
  "2012-05-23": [
    {
      "eventId": "M2.2",
      "summary": "由比滨提议让叶山隼人出马，利用他的“帅哥魅力”来攻略川崎，再次失败。"
    }
  ],
  "2012-05-24": [
    {
      "eventId": "M2.2",
      "summary": "八幡提出了一个既能解决问题，又能维护川崎尊严的方案。"
    }
  ],
  "2012-05-25": [
    {
      "eventId": "M2.3",
      "summary": "材木座再次来到侍奉部，委托与游戏社进行对决。"
    }
  ],
  "2012-05-28": [
    {
      "eventId": "M2.4",
      "summary": "叶山隼人前来委托侍奉部解决班级内的连锁邮件欺凌事件，但他提出的“不希望找出犯人”的奇怪要求，让侍奉部众人感到困惑。"
    }
  ],
  "2012-05-29": [
    {
      "eventId": "M2.4",
      "summary": "由比滨试图从她的社交圈打探消息，却因过于直接而失败。"
    }
  ],
  "2012-06-03": [
    {
      "eventId": "M2.4",
      "summary": "八幡在侍奉部内，向所有人揭示了他所发现的真相，并与雪乃、叶山产生了理念冲突。"
    }
  ],
  "2012-06-05": [
    {
      "eventId": "M2.5",
      "summary": "职场见习当天，三人小组名存实亡，八幡被彻底孤立。"
    }
  ],
  "2012-06-13": [
    {
      "eventId": "M3.2",
      "summary": "在侍奉部的僵局中感到烦躁的八幡，收到了来自户冢彩加一起出去玩的邀请，并立刻答应了下来。"
    }
  ],
  "2012-06-15": [
    {
      "eventId": "M3.3",
      "summary": "八幡和小町在报纸上看到了东京猫狗展的广告，决定在周末一同前往。"
    }
  ],
  "2012-06-16": [
    {
      "eventId": "M3.4",
      "summary": "眼见哥哥对侍奉部的僵局束手无策，小町一针见血地指出八幡的迟钝，并提出了为由比滨举办生日派对的“鬼点子”。"
    },
    {
      "eventId": "M3.5",
      "summary": "材木座义辉带着一份“轻小说&游戏企划大赛”的传单再次闯入侍奉部，并热情地发表了他那融合了剑与魔法的“史诗级”新企划。"
    }
  ],
  "2012-06-17": [
    {
      "eventId": "M3.4",
      "summary": "八幡、雪乃和小町三人一同前往LaLaport购物中心为由比滨挑选生日礼物，气氛微妙但和谐。"
    }
  ],
  "2012-06-18": [
    {
      "eventId": "M3.6",
      "summary": "在众人的祝福下，由比滨的生日派对在KTV包厢正式开始。虽然气氛热闹，但三人之间微妙的尴尬依然存在。"
    }
  ],
  "2012-06-20": [
    {
      "eventId": "M4.1",
      "summary": "结衣的感谢与夏天的预感"
    }
  ],
  "2012-06-26": [
    {
      "eventId": "M4.2",
      "summary": "在体育馆的练习中，八幡和户冢的“二人世界”被同样在练习的叶山小组打断。"
    }
  ],
  "2012-06-30": [
    {
      "eventId": "M4.2",
      "summary": "球技大会当日，八幡等人对阵叶山小组。"
    }
  ],
  "2012-07-01": [
    {
      "eventId": "M4.3",
      "summary": "期末考试的宣告与结衣的绝望"
    }
  ],
  "2012-07-02": [
    {
      "eventId": "M4.3",
      "summary": "侍奉部在图书馆举行学习会，在学习间隙，三人就文理分科的选择进行了第一次深入讨论。"
    }
  ],
  "2012-07-03": [
    {
      "eventId": "M4.3",
      "summary": "在家庭餐厅的学习会上，众人偶遇了叶山小组，两个团体之间的氛围形成了鲜明对比。"
    }
  ],
  "2012-07-18": [
    {
      "eventId": "M4.3",
      "summary": "审判日，考试结果公布，由比滨涉险过关。为了庆祝，她向八幡和雪乃提出了暑假一起出去玩的约定。"
    }
  ],
  "2012-07-19": [
    {
      "eventId": "M4.4",
      "summary": "川崎沙希在侍奉部活动室门口犹豫不决，最终被八幡发现。"
    }
  ],
  "2012-07-29": [
    {
      "eventId": "M4.5",
      "summary": "强制的志愿者活动与意外的同行者"
    },
    {
      "eventId": "M4.5",
      "summary": "抵达千叶村，众人安放行李，并初步了解了营地的情况和接下来三天的任务。"
    },
    {
      "eventId": "M4.5",
      "summary": "在野外定向活动中，侍奉部注意到了被孤立的少女——鹤见留美。"
    }
  ],
  "2012-07-30": [
    {
      "eventId": "M4.5",
      "summary": "第二天上午，众人去溪边玩水，八幡忘记带泳裤，只能在岸边围观。"
    }
  ],
  "2012-07-31": [
    {
      "eventId": "M4.5",
      "summary": "夏令营结束，众人准备返程时，雪之下阳乃的出现打破了平静。"
    }
  ],
  "2012-08-20": [
    {
      "eventId": "M5.0",
      "summary": "平冢静老师以“锻炼社会性”为由，将调查“校园七大不可思议”的委托强行交给了侍奉部。"
    }
  ],
  "2012-08-21": [
    {
      "eventId": "M5.0",
      "summary": "第二个怪谈：生物实验室里有一个放了一年都不会腐坏的三明治。"
    }
  ],
  "2012-08-22": [
    {
      "eventId": "M5.0",
      "summary": "第四个怪谈：废弃的旧体育馆里，每晚都会传来无人运球的声音。"
    }
  ],
  "2012-08-23": [
    {
      "eventId": "M5.0",
      "summary": "第六个怪谈：图书馆自动移动的书。"
    }
  ],
  "2012-08-24": [
    {
      "eventId": "M5.1",
      "summary": "由比滨结衣带着爱犬萨布雷突然拜访八幡家。"
    }
  ],
  "2012-08-25": [
    {
      "eventId": "M5.2",
      "summary": "八幡在津田沼的补习班遇到了同样来上课的川崎沙希。"
    }
  ],
  "2012-08-26": [
    {
      "eventId": "M5.3",
      "summary": "户冢彩加用短信向八幡发出了看电影的邀请。"
    }
  ],
  "2012-08-27": [
    {
      "eventId": "M5.3",
      "summary": "两人一起观看了恐怖电影，在黑暗的放映厅里，暧昧的气氛让八幡心跳不已。"
    }
  ],
  "2012-08-28": [
    {
      "eventId": "M5.4",
      "summary": "为了吃拉面而外出的八幡，意外在婚宴会场外遇到了独自一人的平冢静老师。"
    },
    {
      "eventId": "M5.6",
      "summary": "八幡与由比滨在约定的地点会合，一同前往烟火大会。"
    },
    {
      "eventId": "M5.7",
      "summary": "在回家的电车上，八幡被周围的热闹反衬出内心的孤独。"
    }
  ],
  "2012-09-01": [
    {
      "eventId": "M5.8",
      "summary": "开学第一天，校园里充满了久别重逢的喧闹，但这一切都与八幡无关。"
    }
  ],
  "2012-09-02": [
    {
      "eventId": "M3.1",
      "summary": "由比滨结衣已经一周没有来侍奉部了。社办里只有八幡和雪乃，气氛尴尬而沉闷。窗外的暴风雨预示着接下来的混乱。"
    },
    {
      "eventId": "M6.0",
      "summary": "新学期伊始，侍奉部活动室内气氛尴尬凝重，三人对话不畅，关系停滞不前。窗外的暴风雨预示着接下来的混乱。"
    }
  ],
  "2012-09-03": [
    {
      "eventId": "M6.0",
      "summary": "在海老名姬菜的主导下，2年F班决定上演腐向音乐剧《小王子》。八幡本想翘掉班会逃避，却被平冢静强行指定为男生方文化祭执行委员。"
    }
  ],
  "2012-09-04": [
    {
      "eventId": "M6.1",
      "summary": "在第一次执行委员会上，面对无人愿意担任“主任委员”的窘境，相模南再次抓住机会，以“想要成长”为由主动请缨，并成功当选。"
    }
  ],
  "2012-09-10": [
    {
      "eventId": "M6.1",
      "summary": "雪之下阳乃以毕业生身份意外造访执行委员会，她敏锐地洞察了现场的权力格局，并用她独特的方式开始介入。"
    }
  ],
  "2012-09-11": [
    {
      "eventId": "M6.1",
      "summary": "在阳乃的言语刺激下，能力不足的相模提出了允许委员优先班级活动的“归班令”，导致委员会大量成员缺席，工作陷入混乱。"
    }
  ],
  "2012-09-12": [
    {
      "eventId": "M6.2",
      "summary": "委员会工作停滞，在平冢静的暗示下，相模南来到侍奉部，请求雪之下等人帮助她完成主任委员的工作。"
    }
  ],
  "2012-09-13": [
    {
      "eventId": "M6.2",
      "summary": "雪乃以副委员长的身份正式加入执行部门，她迅速展现出惊人的工作能力，重新规划日程、追赶进度，严厉地向各组问责，让停滞的委员会重新运作起来。"
    }
  ],
  "2012-09-20": [
    {
      "eventId": "M6.2",
      "summary": "雪乃接管工作后，委员会效率大增。但这也导致了其他委员（尤其是相模）的心安理得的缺席，雪乃的工作负担在不知不觉中持续加重。"
    }
  ],
  "2012-09-26": [
    {
      "eventId": "M6.3",
      "summary": "由比滨无法忍受雪乃独自承担一切，两人在社办爆发争吵。之后，由比滨在走廊上向八幡表达了她的愤怒和不满。"
    }
  ],
  "2012-09-28": [
    {
      "eventId": "M6.3",
      "summary": "雪之下雪乃因病缺席，执行委员会陷入瘫痪。八幡和由比滨决定去探望她。"
    }
  ],
  "2012-10-05": [
    {
      "eventId": "M6.4.5",
      "summary": "文化祭第二天，八幡作为记录杂务组的成员在校园内进行拍摄工作。雪乃以“监视你有没有偷懒”为名，与他一同行动。"
    },
    {
      "eventId": "M6.4",
      "summary": "文化祭闭幕式前，主任委员相模南因无法承受压力和嫉妒而失踪，执行委员会陷入混乱。"
    },
    {
      "eventId": "M6.5",
      "summary": "庆功宴开始，喧嚣远去，八幡来到空无一人的侍奉部活动室，遇到了同样没有参加庆功宴的雪乃。"
    }
  ],
  "2012-10-15": [
    {
      "eventId": "M6.5.1",
      "summary": "校庆结束，秋意渐浓。在侍奉部悠闲的下午茶时间，平冢老师带来了新的委托人——学生会长城廻巡。"
    }
  ],
  "2012-10-27": [
    {
      "eventId": "M7.5.1",
      "summary": "平冢静老师带来了为地方杂志撰写“结婚特辑”的委托，但因自己未婚而苦恼。在处理了几封读者来信后，侍奉部决定帮助她。"
    }
  ],
  "2012-11-12": [
    {
      "eventId": "M7.1",
      "summary": "临近修学旅行，班级气氛热烈。户部翔在叶山隼人的带领下来到侍奉部，提出了希望能向海老名姬菜告白并成功的委托。"
    }
  ],
  "2012-11-14": [
    {
      "eventId": "M7.1",
      "summary": "在决定旅行分组的班会课上，为了方便执行委托，由比滨主动与叶山等人交涉，将八幡和户冢硬塞进了叶山的小组。"
    }
  ],
  "2012-11-18": [
    {
      "eventId": "M7.1",
      "summary": "在出发前夜，八幡对两个无法共存的委托感到烦恼。小町的无心之言给了他一丝启发，但他依然没有找到能够让所有人都幸福的方法。"
    }
  ],
  "2012-11-19": [
    {
      "eventId": "M7.2",
      "summary": "出发当天，在新干线上，八个主要角色因为奇怪的分组而坐在一起，气氛微妙而尴尬。"
    }
  ],
  "2012-11-20": [
    {
      "eventId": "M7.3",
      "summary": "在参观金阁寺时，三浦优美子再次因为叶山对所有人都很温柔而吃醋，并与由比滨发生了小小的争执。"
    }
  ],
  "2012-11-21": [
    {
      "eventId": "M7.5",
      "summary": "在修学旅行的最后一天，八幡在京都车站的屋顶与海老名独处，海老名向他道谢，并揭示了自己委托的真实意图。"
    }
  ],
  "2012-11-22": [
    {
      "eventId": "M7.5",
      "summary": "回到学校后，八幡在便利店偶遇三浦优美子。三浦就京都的事件向八幡表达了复杂的感谢和质问。"
    }
  ],
  "2012-11-25": [
    {
      "eventId": "M7.5",
      "summary": "在侍奉部，面对依旧冰冷的关系，八幡第一次对自己一直以来坚信的“正确”做法产生了怀疑。"
    }
  ],
  "2012-11-26": [
    {
      "eventId": "M8.1",
      "summary": "平冢静老师带着现任学生会长城回巡和一年级学妹一色彩羽来到侍奉部，提出了一色彩羽被人恶意推荐参选学生会长，希望侍奉部能帮她“在不丢脸的情况下落选”的委托。"
    }
  ],
  "2012-11-27": [
    {
      "eventId": "M7.5.2",
      "summary": "八幡在咖啡店偶遇国中时告白被拒的对象折本佳织，以及她的朋友仲町。随后，雪之下阳乃的出现和安排，让场面变得极其尴尬。"
    }
  ],
  "2012-11-28": [
    {
      "eventId": "M8.3",
      "summary": "在一家咖啡店，八幡再次偶遇雪之下阳乃。阳乃一针见血地指出了八幡计划中的矛盾，并再次用言语挑逗和试探他。"
    }
  ],
  "2012-11-29": [
    {
      "eventId": "M8.4",
      "summary": "八幡在图书馆找到一色，向她展示了自己伪造的“民意”，并分析了她如果当选会长的种种好处，试图说服她改变主意。"
    }
  ],
  "2012-12-01": [
    {
      "eventId": "M7.5.3",
      "summary": "由比滨拿着满是红字的成绩预警单，哭丧着脸来到侍奉部，请求八幡和雪乃为她进行考前辅导。"
    },
    {
      "eventId": "M9.1",
      "summary": "学生会长选举后，侍奉部活动室内气氛尴尬凝重，三人对话不畅，关系停滞不前。"
    }
  ],
  "2012-12-08": [
    {
      "eventId": "M7.5.3",
      "summary": "考试当天，在八幡和雪乃的“成果”下，由比滨虽然依旧磕磕绊绊，但总算没有交白卷。"
    }
  ],
  "2012-12-17": [
    {
      "eventId": "M9.1",
      "summary": "在平冢老师的“人生指导”下，八幡开始正视自己内心的真实愿望。"
    }
  ],
  "2012-12-20": [
    {
      "eventId": "M7.5.3",
      "summary": "成绩公布，由比滨奇迹般地“低空飞过”，免于补习。为了庆祝，三人决定一起去看圣诞灯饰。"
    }
  ],
  "2012-12-24": [
    {
      "eventId": "M6.5.BT",
      "summary": "圣诞夜，在社办悠闲度过的三人，由由比滨提议举办圣诞派对。但因八幡有家庭安排，派对改在第二天举行，并决定邀请小町、户冢等人作为“庆功宴”。"
    },
    {
      "eventId": "M9.2",
      "summary": "圣诞活动正式举办，戏剧表演大获成功，一色也因此获得了成长。"
    }
  ],
  "2012-12-25": [
    {
      "eventId": "M6.5.BT",
      "summary": "派对当天，侍奉部三人与小町、户冢、材木座一同前往购物中心采购。在玩具反斗城，众人因对钢普拉的兴趣而产生共鸣，但也遇到了同样“无所事事”的平冢老师。"
    }
  ],
  "2013-02-10": [
    {
      "eventId": "M11.1",
      "summary": "情人节将至，侍奉部迎来了复数的巧克力制作委托，一场混乱的联合料理教室拉开序幕。"
    }
  ],
  "2013-02-12": [
    {
      "eventId": "M11.1",
      "summary": "料理教室当日，各路人马齐聚，场面一度十分混乱。在活动的尾声，雪之下阳乃的突然出现，投下了重磅炸弹。"
    }
  ],
  "2013-02-13": [
    {
      "eventId": "M11.2",
      "summary": "在平冢静的“人生指导”后，八幡开始思考自己真正想要的东西。"
    },
    {
      "eventId": "M11.3",
      "summary": "在料理教室的风波后，八幡陷入了深深的自我怀疑，他察觉到三人关系中的“不对劲”，但又无法名状。"
    }
  ],
  "2013-02-14": [
    {
      "eventId": "M11.2",
      "summary": "由比滨结衣提出了“最后的委托”。"
    },
    {
      "eventId": "M12.1",
      "summary": "水族馆约会后，三人在归途中陷入沉默。雪之下母亲突然出现，强行中断了三人的同行。"
    }
  ],
  "2013-02-15": [
    {
      "eventId": "M12.2",
      "summary": "小町的入学考放榜，她向哥哥表达了一直以来的感谢，展现了惊人的成长。"
    }
  ],
  "2013-02-18": [
    {
      "eventId": "M10.5-1",
      "summary": "材木座义辉突然拜访侍奉部，宣称自己放弃了轻小说家的梦想，想要成为一名编辑。"
    },
    {
      "eventId": "M12.2",
      "summary": "侍奉部活动停摆，八幡在空无一人的社办里，感受到了前所未有的孤独。"
    }
  ],
  "2013-02-19": [
    {
      "eventId": "M12.2",
      "summary": "在消沉中，户冢彩加的出现如同一缕阳光，短暂地治愈了八幡。"
    }
  ],
  "2013-02-20": [
    {
      "eventId": "M10.5-3",
      "summary": "一色伊吕波为了在年度结算前用完学生会预算，决定制作一本免费情报志，并向侍奉部求助。"
    }
  ],
  "2013-02-21": [
    {
      "eventId": "M12.3",
      "summary": "一色彩羽以“舞会企划”为由，强行将无所事事的八幡拖去学生会办公室帮忙。"
    }
  ],
  "2013-02-22": [
    {
      "eventId": "M10.5-2",
      "summary": "一色伊吕波以“工作”为名，半强迫地约八幡周末在千叶车站见面。"
    },
    {
      "eventId": "M12.3",
      "summary": "在宣传影片的拍摄过程中，三人再次以一种不自然的形式聚在一起。"
    }
  ],
  "2013-02-25": [
    {
      "eventId": "M12.3",
      "summary": "舞会企划遭到PTA（以雪之下母亲为代表）的反对，陷入危机。"
    }
  ],
  "2013-02-26": [
    {
      "eventId": "M12.4",
      "summary": "八幡向平冢静老师确认了情况的严重性，并向一色提出了自己的“解决方案”——举办一场对台戏。"
    }
  ],
  "2013-02-28": [
    {
      "eventId": "M10.5-4",
      "summary": "深夜，八幡发现为中考而努力学习的小町肚子饿了，决定亲自为她下厨。"
    },
    {
      "eventId": "M12.4",
      "summary": "“伪舞会”方案正式公布，在学生中引发了热烈讨论，成功地对校方和PTA形成了舆论压力。"
    }
  ],
  "2013-03-02": [
    {
      "eventId": "M12.4",
      "summary": "在平冢静和阳乃的斡旋下，校方最终同意了雪乃的方案，但要求合并两个企划的优点。舞会得以保留。"
    }
  ],
  "2013-03-05": [
    {
      "eventId": "M13.1",
      "summary": "舞会结束后，八幡在教职员办公室被平冢静叫住，进行了最后一次的“人生指导”。"
    }
  ],
  "2013-03-06": [
    {
      "eventId": "M13.1",
      "summary": "八幡在学生会办公室被一色伊吕波堵住，对方就舞会后续以及八幡的“责任”问题，对他进行了一番“质问”。"
    }
  ],
  "2013-03-08": [
    {
      "eventId": "M13.2",
      "summary": "八幡主动联系由比滨，约定周末见面，以回应她的“愿望”。"
    }
  ],
  "2013-03-09": [
    {
      "eventId": "M13.2",
      "summary": "约会当天，两人一起逛街、看电影、唱卡拉OK，重温着过去一起做过的事情。"
    }
  ],
  "2013-03-10": [
    {
      "eventId": "M13.4",
      "summary": "舞会结束后的第二天，叶山在教室里，从周围同学的议论中，间接确认了八幡和雪乃走到了一起的事实。"
    },
    {
      "eventId": "M14.1",
      "summary": "毕业典礼上，八幡在送辞和答辞中，回顾着自己这即将结束的一年，感慨万千。"
    }
  ],
  "2013-03-18": [
    {
      "eventId": "M13.5",
      "summary": "毕业典礼后，海老名姬菜在天台上，与同样在“逃避现实”的八幡相遇。"
    }
  ],
  "2013-03-20": [
    {
      "eventId": "M14.5",
      "summary": "在联合舞会圆满结束后，平冢静在离职前，最后一次将八幡叫到了她的办公室，进行了最后的人生指导。"
    }
  ],
  "2013-03-28": [
    {
      "eventId": "M13.6",
      "summary": "由比滨结衣再次敲开了侍奉部的门，带来了一个全新的委托。"
    }
  ],
  "2014-01-01": [
    {
      "eventId": "M14.5-1",
      "summary": "新年第一天，八幡被小町从被窝里拽起来，两人一同前往浅间神社进行新年参拜。"
    }
  ]
};

  var ROOT_ID = "sp-little-phone-root";
  var GRADE_COLORS = {
    'F': '#888', 'D': '#6ecf8a', 'C': '#4aa3df', 'B': '#7b6ef0',
    'A': '#f59e0b', 'S': '#f07b4a', 'SS': '#ef4444', 'SSS': '#e040fb'
  };
  var TYPE_COLORS = {
    '物品卡': '#5dc9c0', '属性卡': '#f59e0b', '技能卡': '#7b6ef0',
    '事件卡': '#ef4444', '角色卡': '#6db9ef', '任务': '#f07b4a',
    '朋友卡': '#f09b7a', '命运卡': '#e040fb'
  };
  var APPS = [
    { id: 'status', icon: '❤️', label: '状态', tint: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
    { id: 'calendar', icon: '📅', label: '日历', tint: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { id: 'backpack', icon: '🎒', label: '背包', tint: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
    { id: 'settings', icon: '⚙️', label: '设置', tint: 'linear-gradient(135deg,#6b7280,#4b5563)' }
  ];
  var DEFAULT_SETTINGS = {
    mode: 'desktop',
    phonePosition: { x: 16, y: 80 },
    open: true,
    balance: 30000,
    backpack: {},
    characters: {},
    showSplash: true,
    wallpaper: ''
  };

  function loadSettings() {
    var s = $.extend(true, {}, DEFAULT_SETTINGS);
    // UI state from script variables
    try {
      var sv = getVariables({ type: 'script', script_id: getScriptId() });
      if (sv.mode) s.mode = sv.mode;
      if (sv.phonePosition) s.phonePosition = sv.phonePosition;
      if (typeof sv.open === 'boolean') s.open = sv.open;
      if (typeof sv.showSplash === 'boolean') s.showSplash = sv.showSplash;
      if (typeof sv.wallpaper === 'string') s.wallpaper = sv.wallpaper;
    } catch (e) {}
    // Game data from character variables (synced with world book)
    try {
      var cv = getVariables({ type: 'character' });
      if (cv.主角 && typeof cv.主角.余额 === 'number') s.balance = cv.主角.余额;
      if (cv.主角 && cv.主角.卡牌背包) s.backpack = $.extend(true, {}, cv.主角.卡牌背包);
      if (cv.角色列表) {
        var chars = {};
        for (var name in cv.角色列表) {
          if (cv.角色列表[name].好感度 != null) {
            chars[name] = { '好感度': cv.角色列表[name].好感度 };
          }
        }
        if (Object.keys(chars).length > 0) s.characters = chars;
      }
    } catch (e) {}
    return s;
  }

  function saveSettings(s) {
    // Only save UI state to script variables
    var uiState = { mode: s.mode, phonePosition: s.phonePosition, open: s.open, showSplash: s.showSplash, wallpaper: s.wallpaper };
    try {
      insertOrAssignVariables(uiState, { type: 'script', script_id: getScriptId() });
    } catch (e) {}
    // Game data saved to character variables (synced with world book)
    try {
      var gameData = {
        主角: { 余额: s.balance, 卡牌背包: $.extend(true, {}, s.backpack) },
        角色列表: {}
      };
      for (var name in s.characters) {
        gameData.角色列表[name] = { '好感度': s.characters[name]['好感度'] || 0 };
      }
      insertOrAssignVariables(gameData, { type: 'character' });
    } catch (e) {}
  }

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getCalendarCells() {
    var y = calYear, m = calMonth;
    var firstDay = new Date(y, m - 1, 1).getDay();
    var daysInMonth = new Date(y, m, 0).getDate();
    var daysInPrevMonth = new Date(y, m - 1, 0).getDate();
    var cells = [];
    for (var i = firstDay - 1; i >= 0; i--) {
      var d = daysInPrevMonth - i;
      var pm = m === 1 ? 12 : m - 1;
      var py = m === 1 ? y - 1 : y;
      var ds = py + '-' + ('0' + pm).slice(-2) + '-' + ('0' + d).slice(-2);
      cells.push({ day: d, inMonth: false, isToday: false, hasEvent: !!CALENDAR_DATA[ds], date: ds });
    }
    var mp = y + '-' + ('0' + m).slice(-2);
    for (var d2 = 1; d2 <= daysInMonth; d2++) {
      var ds2 = mp + '-' + ('0' + d2).slice(-2);
      cells.push({ day: d2, inMonth: true, isToday: false, hasEvent: !!CALENDAR_DATA[ds2], date: ds2 });
    }
    var rem = 7 - (cells.length % 7);
    if (rem < 7) {
      var nm = m === 12 ? 1 : m + 1;
      var ny = m === 12 ? y + 1 : y;
      for (var d3 = 1; d3 <= rem; d3++) {
        var ds3 = ny + '-' + ('0' + nm).slice(-2) + '-' + ('0' + d3).slice(-2);
        cells.push({ day: d3, inMonth: false, isToday: false, hasEvent: !!CALENDAR_DATA[ds3], date: ds3 });
      }
    }
    return cells;
  }

  var settings = loadSettings();
  var activeApp = 'home';
  var calYear = 2012, calMonth = 4;
  var calSelected = '';
  var timer = null;
  var $root, $ball, $backdrop, $frame, $timeEl, $appContent;

  function updateTime() {
    if ($timeEl && $timeEl.length) {
      $timeEl.text(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    }
  }

  function updateBallPosition() {
    $ball.removeClass('sp-ball--mobile sp-ball--desktop')
         .addClass(settings.mode === 'mobile' ? 'sp-ball--mobile' : 'sp-ball--desktop');
  }

  function updateFrameSize() {
    var w = settings.mode === 'mobile' ? 280 : 360;
    var h = settings.mode === 'mobile' ? 540 : 640;
    $frame.css({ width: w + "px", height: h + "px",
      left: settings.phonePosition.x + 'px', top: settings.phonePosition.y + 'px' });
  }

  function getCurrentApp() {
    for (var i = 0; i < APPS.length; i++) {
      if (APPS[i].id === activeApp) return APPS[i];
    }
    return null;
  }

  function renderAppScreen() {
    var app = getCurrentApp();
    var html = '';
    html += '<div class="sp-app-screen">';
    html += '<div class="sp-app-header">';
    html += '<button class="sp-app-back sp-back-btn"><i class="fa-solid fa-chevron-left"></i></button>';
    html += '<span class="sp-app-title">' + esc(app ? app.label : '') + '</span>';
    html += '<div class="sp-app-header-spacer"></div>';
    html += '</div><div class="sp-app-content">';

    switch (activeApp) {
      case 'settings':
        html += '<div class="sp-settings"><div class="sp-settings-group">';
        html += '<div class="sp-settings-label">界面适配</div>';
        html += '<div class="sp-settings-options">';
        html += '<button class="sp-settings-option' + (settings.mode === 'desktop' ? ' sp-settings-option--active' : '') + '" data-mode="desktop">';
        html += '<i class="fa-solid fa-desktop"></i><span>电脑端</span></button>';
        html += '<button class="sp-settings-option' + (settings.mode === 'mobile' ? ' sp-settings-option--active' : '') + '" data-mode="mobile">';
        html += '<i class="fa-solid fa-mobile-screen"></i><span>手机端</span></button>';
        html += '</div></div>';
        // Wallpaper setting
        html += '<div class="sp-settings-group">';
        html += '<div class="sp-settings-label">壁纸图片</div>';
        html += '<input class="sp-wallpaper-input" type="text" placeholder="输入图片URL（本地请用 http://localhost/... ）" value="' + esc(settings.wallpaper || '') + '">';
        html += '<div style="font-size:9px;color:rgba(255,255,255,.25);margin-top:4px">留空则使用默认渐变背景</div>';
        html += '</div></div>';
        break;
      case 'status':
        html += '<div class="sp-status">';
        var names = Object.keys(settings.characters);
        if (names.length === 0) {
          html += '<div class="sp-placeholder"><span>暂无角色数据</span></div>';
        } else {
          html += '<div class="sp-char-list">';
          for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var data = settings.characters[name];
            var val = data['好感度'] || 0;
            var pct = val / 500;
            var bc = '#6ecf8a';
            if (pct > 0.95) bc = '#ef4444';
            else if (pct > 0.8) bc = '#f59e0b';
            html += '<div class="sp-char-card">';
            html += '<div class="sp-char-card-top">';
            html += '<span class="sp-char-name">' + esc(name) + '</span>';
            html += '<span class="sp-char-val">' + val + ' / 500</span>';
            html += '</div>';
            html += '<div class="sp-char-bar-track">';
            html += '<div class="sp-char-bar-fill" style="width:' + (val / 500 * 100) + '%;background:' + bc + '"></div>';
            html += '</div></div>';
          }
          html += '</div>';
        }
        html += '</div>';
        break;
      case 'calendar':
        html += '<div class="sp-calendar">';
        html += '<div class="sp-cal-nav">';
        html += '<button class="sp-cal-nav-btn sp-cal-prev"><i class="fa-solid fa-chevron-left"></i></button>';
        html += '<span class="sp-cal-nav-title">' + calYear + '年' + calMonth + '月</span>';
        html += '<button class="sp-cal-nav-btn sp-cal-next"><i class="fa-solid fa-chevron-right"></i></button>';
        html += '</div><div class="sp-cal-grid">';
        var dl = ['日','一','二','三','四','五','六'];
        for (var di = 0; di < 7; di++) html += '<div class="sp-cal-dow">' + dl[di] + '</div>';
        var cells = getCalendarCells();
        for (var ci = 0; ci < cells.length; ci++) {
          var c = cells[ci];
          var cls = 'sp-cal-cell';
          if (!c.inMonth) cls += ' sp-cal-cell--other';
          if (c.isToday) cls += ' sp-cal-cell--today';
          if (c.hasEvent) cls += ' sp-cal-cell--has-event';
          if (c.date === calSelected) cls += ' sp-cal-cell--selected';
          html += '<div class="' + cls + '" data-date="' + c.date + '">';
          html += '<span class="sp-cal-day">' + c.day + '</span>';
          if (c.hasEvent) html += '<span class="sp-cal-dot"></span>';
          html += '</div>';
        }
        html += '</div>';
        if (calSelected && CALENDAR_DATA[calSelected] && CALENDAR_DATA[calSelected].length) {
          html += '<div class="sp-cal-events">';
          html += '<div class="sp-cal-events-date">' + calSelected + '</div>';
          var evts = CALENDAR_DATA[calSelected];
          for (var ei = 0; ei < evts.length; ei++) {
            var ev = evts[ei];
            html += '<div class="sp-cal-event-item">';
            html += '<span class="sp-cal-event-id">' + esc(ev.eventId) + '</span>';
            html += '<span class="sp-cal-event-summary">' + esc(ev.summary) + '</span>';
            html += '</div>';
          }
          html += '</div>';
        } else if (calSelected) {
          html += '<div class="sp-placeholder" style="height:60px"><span>该日无事件</span></div>';
        }
        html += '</div>';
        break;
      case 'backpack':
        html += '<div class="sp-backpack">';
        html += '<div class="sp-backpack-balance">';
        html += '<span class="sp-backpack-balance-label">当前余额</span>';
        html += '<span class="sp-backpack-balance-val">¥' + settings.balance.toLocaleString() + '</span>';
        html += '</div><div class="sp-backpack-divider"></div>';
        var cardIds = Object.keys(settings.backpack);
        if (cardIds.length === 0) {
          html += '<div class="sp-placeholder"><span>暂无卡牌</span></div>';
        } else {
          html += '<div class="sp-card-list">';
          for (var ci2 = 0; ci2 < cardIds.length; ci2++) {
            var cid = cardIds[ci2];
            var card = settings.backpack[cid];
            var gc = GRADE_COLORS[card['等级']] || '#888';
            var tc = TYPE_COLORS[card['类型']] || '#888';
            html += '<div class="sp-card-item" style="border-left-color:' + gc + '">';
            html += '<div class="sp-card-top">';
            html += '<span class="sp-card-name">' + esc(card['名称']) + '</span>';
            html += '<button class="sp-card-remove" data-card-id="' + esc(cid) + '">';
            html += '<i class="fa-solid fa-xmark"></i></button>';
            html += '</div><div class="sp-card-tags">';
            html += '<span class="sp-card-tag" style="background:' + tc + '">' + esc(card['类型']) + '</span>';
            html += '<span class="sp-card-grade" style="background:' + gc + '">' + esc(card['等级']) + '</span>';
            html += '</div>';
            if (card['描述']) html += '<div class="sp-card-desc">' + esc(card['描述']) + '</div>';
            html += '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
        break;
      default:
        html += '<div class="sp-placeholder"><span>' + esc(app ? app.label : '') + ' 开发中</span></div>';
        break;
    }
    html += '</div></div>';
    $appContent.html(html);

    $appContent.find('.sp-back-btn').on('click', function () {
      activeApp = 'home';
      renderHomeScreenFull();
    });

    $appContent.find('.sp-wallpaper-input').on('change', function () {
      settings.wallpaper = $(this).val() || '';
      saveSettings(settings);
      // Apply immediately
      var $wp = $('.sp-wallpaper');
      if (settings.wallpaper) {
        $wp.css({ backgroundImage: 'url(' + settings.wallpaper + ')', backgroundSize: 'cover', backgroundPosition: 'center' });
      } else {
        $wp.css({ backgroundImage: '', backgroundSize: '', backgroundPosition: '' });
      }
    });

    $appContent.find('.sp-settings-option').on('click', function () {
      var mode = $(this).data('mode');
      settings.mode = mode;
      settings.phonePosition = mode === 'mobile' ? { x: 8, y: 120 } : { x: 16, y: 80 };
      saveSettings(settings);
      updateBallPosition();
      updateFrameSize();
      renderHomeScreenFull();
    });

    $appContent.find('.sp-cal-prev').on('click', function () {
      if (calMonth === 4 && calYear === 2012) return;
      if (calMonth === 1) { calMonth = 12; calYear--; }
      else calMonth--;
      calSelected = '';
      renderAppScreen();
    });
    $appContent.find('.sp-cal-next').on('click', function () {
      if (calMonth === 12) { calMonth = 1; calYear++; }
      else calMonth++;
      calSelected = '';
      renderAppScreen();
    });
    $appContent.find('.sp-cal-cell').on('click', function () {
      calSelected = $(this).data('date');
      renderAppScreen();
    });
    $appContent.find('.sp-card-remove').on('click', function () {
      var cid = $(this).data('card-id');
      delete settings.backpack[cid];
      saveSettings(settings);
      renderAppScreen();
    });
  }

  function renderSplash() {
    var html = '';
    html += '<div class="sp-splash" id="sp-splash-screen">';
    // Cherry blossom petals falling from upper right
    for (var p = 0; p < 10; p++) {
      var right = Math.floor(Math.random() * 35) + 2;
      var delay = Math.random() * 5;
      var dur = 3 + Math.random() * 4;
      var size = 6 + Math.random() * 10;
      var opacity = 0.3 + Math.random() * 0.5;
      html += '<div class="sp-petal" style="top:' + (-10 - Math.random()*30) + 'px;right:' + right + '%;';
      html += 'animation-delay:' + delay.toFixed(1) + 's;animation-duration:' + dur.toFixed(1) + 's;';
      html += 'width:' + size + 'px;height:' + size + 'px;opacity:' + opacity.toFixed(2) + '"></div>';
    }
    html += '<div class="sp-splash-title">やはり俺の<br>青春ラブコメは<br>まちがっている。</div>';
    html += '<div class="sp-splash-subtitle">YAHARI ORE NO SEISHUN LOVE COME WA MACHIGATTEIRU.</div>';
    html += '<div class="sp-splash-hint">—— 触摸屏幕 ——</div>';
    html += '</div>';
    var $body = $appContent.closest('.sp-body');
    $body.append(html);
    $body.find('#sp-splash-screen').on('click', function () {
      settings.showSplash = false;
      saveSettings(settings);
      $(this).fadeOut(350, function () { $(this).remove(); });
    });
  }

  function renderHomeScreenFull() {
    if (activeApp === 'home') {
      var html = '<div class="sp-home">';
      html += '<div class="sp-home-title"><span>小手机</span></div>';
      html += '<div class="sp-balance-bar">';
      html += '<span class="sp-balance-label">余额</span>';
      html += '<span class="sp-balance-val">¥' + settings.balance.toLocaleString() + '</span>';
      html += '</div><div class="sp-app-grid">';
      for (var i = 0; i < APPS.length; i++) {
        var app = APPS[i];
        html += '<button class="sp-app-btn" data-app-id="' + app.id + '">';
        html += '<div class="sp-app-icon" style="background:' + app.tint + '">' + app.icon + '</div>';
        html += '<span class="sp-app-label">' + app.label + '</span>';
        html += '</button>';
      }
      html += '</div></div>';
      $appContent.html(html);
      $appContent.find('.sp-app-btn').on('click', function () {
        activeApp = $(this).data('app-id');
        renderAppScreen();
      });
    } else {
      renderAppScreen();
    }
  }

  function buildUI() {
    $('#' + ROOT_ID).remove();
    $('#' + STYLE_ID).remove();
    $('<style>').attr('id', STYLE_ID).text(CSS).appendTo('head');
    $root = $('<div>').attr('id', ROOT_ID).appendTo('body');
    $ball = $('<button>').addClass('sp-ball')
      .addClass(settings.mode === 'mobile' ? 'sp-ball--mobile' : 'sp-ball--desktop')
      .html('<i class="fa-solid fa-mobile-screen-button"></i>').appendTo($root);
    if (settings.open) $ball.hide();
    $backdrop = $('<div>').addClass('sp-backdrop').appendTo($root);
    if (!settings.open) $backdrop.hide();
    var w = settings.mode === 'mobile' ? 280 : 360;
    var h = settings.mode === 'mobile' ? 540 : 640;
    $frame = $('<div>').addClass('sp-frame').css({ width: w + 'px', height: h + 'px',
      left: settings.phonePosition.x + 'px', top: settings.phonePosition.y + 'px' }).appendTo($root);
    var $device = $('<div>').addClass('sp-device').appendTo($frame);
    $('<button>').addClass('sp-close-btn').css('pointer-events','auto')
      .html('<i class="fa-solid fa-xmark"></i>').appendTo($device);
    var $screen = $('<div>').addClass('sp-screen').appendTo($device);
    var $wp = $('<div>').addClass('sp-wallpaper').appendTo($screen);
    if (settings.wallpaper) {
      $wp.css({ backgroundImage: 'url(' + settings.wallpaper + ')', backgroundSize: 'cover', backgroundPosition: 'center' });
    }
    $('<div>').addClass('sp-notch').append('<div class="sp-notch-dot">').appendTo($screen);
    $('<div>').addClass('sp-home-bar').appendTo($screen);
    var $sb = $('<div>').addClass('sp-statusbar').attr('data-drag-handle','phone').appendTo($screen);
    $timeEl = $('<span>').addClass('sp-statusbar-time').appendTo($('<div>').addClass('sp-statusbar-left').appendTo($sb));
    updateTime();
    var $sbR = $('<div>').addClass('sp-statusbar-right').appendTo($sb);
    $sbR.append('<i class="fa-solid fa-signal sp-statusbar-icon">');
    $sbR.append('<i class="fa-solid fa-wifi sp-statusbar-icon">');
    $sbR.append('<i class="fa-solid fa-battery-full sp-statusbar-icon">');
    var $body = $('<div>').addClass('sp-body').appendTo($screen);
    $appContent = $('<div>').appendTo($body);
    console.info('[小手机] 渲染主屏');
    renderHomeScreenFull();
    if (settings.showSplash) {
      console.info('[小手机] 渲染启动页(叠在主屏上方)');
      renderSplash();
    }
    if (!settings.open) $frame.hide();
    $frame.draggable({
      handle: '[data-drag-handle]',
      containment: 'window',
      stop: function (_e, ui) {
        settings.phonePosition = { x: ui.position.left, y: ui.position.top };
        saveSettings(settings);
      }
    });
    $ball.on('click', toggleOpen);
    $backdrop.on('click', toggleOpen);
    $device.find('.sp-close-btn').on('click', toggleOpen);
  }

  function toggleOpen() {
    settings.open = !settings.open;
    saveSettings(settings);
    if (settings.open) { $ball.hide(); $backdrop.show(); $frame.show(); }
    else { $ball.show(); $backdrop.hide(); $frame.hide(); }
  }

  function init() {
    console.info('[小手机] 初始化...');
    console.info('[小手机] 构建UI, settings=', JSON.stringify({mode:settings.mode,open:settings.open,showSplash:settings.showSplash,wallpaper:settings.wallpaper?'有':'无'}));
    buildUI();
    console.info('[小手机] UI构建完成');
    timer = setInterval(updateTime, 30000);
  }

  function destroy() {
    console.info('[小手机] 卸载');
    if (timer) clearInterval(timer);
    $('#' + ROOT_ID).remove();
    $('#' + STYLE_ID).remove();
  }

  $(function () {
    console.info('[小手机] DOM ready, 开始加载');
    init();
    $(window).on('pagehide', destroy);
  });
})();