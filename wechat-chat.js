const fs = require('fs');
let js = fs.readFileSync('src/小手机/pure-phone.js', 'utf8');

// ═══ 1. Replace chat CSS with WeChat style ═══
const oldChatCSS = `    '.sp-chat{display:flex;flex-direction:column;height:100%}',
    '.sp-chat-msgs{flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px}',
    '.sp-chat-msgs::-webkit-scrollbar{display:none}',
    '.sp-chat-bubble{max-width:82%;padding:8px 12px;border-radius:14px;font-size:12px;line-height:1.5;word-break:break-word}',
    '.sp-chat-bubble--user{align-self:flex-end;background:linear-gradient(135deg,#5c8fa0,#48788a);color:#e8f0f4;border-bottom-right-radius:4px}',
    '.sp-chat-bubble--ai{align-self:flex-start;background:rgba(255,255,255,.06);color:#d5dfe6;border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:4px}',
    '.sp-chat-bubble--error{align-self:center;background:rgba(239,68,68,.15);color:#fca5a5;font-size:10px}',
    '.sp-chat-input-wrap{display:flex;gap:6px;padding:8px 10px;border-top:1px solid rgba(255,255,255,.06)}',
    '.sp-chat-input{flex:1;padding:8px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#fff;font-size:12px;font-family:inherit;outline:none}',
    '.sp-chat-input:focus{border-color:rgba(120,170,195,.4)}',
    '.sp-chat-input::placeholder{color:rgba(255,255,255,.2)}',
    '.sp-chat-send{width:32px;height:32px;border-radius:50%;border:none;background:linear-gradient(135deg,#5c8fa0,#48788a);color:#fff;font-size:13px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s}',
    '.sp-chat-send:hover{transform:scale(1.08)}',
    '.sp-chat-send:disabled{opacity:.4;transform:none}',
    '.sp-chat-typing{font-size:10px;color:rgba(255,255,255,.3);padding:0 12px 4px;display:none}',
    '.sp-chat-empty{flex:1;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.2);font-size:12px}',`;

const newChatCSS = `    '.sp-chat{display:flex;flex-direction:column;height:100%;background:#ededed}',
    '.sp-chat-header{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#ededed;border-bottom:1px solid #d9d9d9}',
    '.sp-chat-header-title{font-size:14px;font-weight:700;color:#000}',
    '.sp-chat-header-back{width:26px;height:26px;border-radius:50%;background:none;border:none;color:#000;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}',
    '.sp-chat-msgs{flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:2px}',
    '.sp-chat-msgs::-webkit-scrollbar{display:none}',
    '.sp-chat-msg-row{display:flex;gap:8px;margin-bottom:8px;align-items:flex-start}',
    '.sp-chat-msg-row--self{flex-direction:row-reverse}',
    '.sp-chat-avatar{width:34px;height:34px;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}',
    '.sp-chat-bubble{max-width:72%;padding:8px 12px;border-radius:4px;font-size:12px;line-height:1.5;word-break:break-word;position:relative}',
    '.sp-chat-bubble--self{background:#95ec69;color:#000;margin-right:0}',
    '.sp-chat-bubble--other{background:#fff;color:#000;margin-left:0}',
    '.sp-chat-bubble--self::after{content:"";position:absolute;right:-4px;top:10px;border:4px solid transparent;border-left-color:#95ec69;border-right:0}',
    '.sp-chat-bubble--other::after{content:"";position:absolute;left:-4px;top:10px;border:4px solid transparent;border-right-color:#fff;border-left:0}',
    '.sp-chat-bubble--error{background:rgba(239,68,68,.1);color:#b91c1c;font-size:10px;max-width:90%}',
    '.sp-chat-sysmsg{text-align:center;font-size:10px;color:#999;margin:6px 0}',
    '.sp-chat-input-bar{display:flex;gap:6px;padding:6px 10px;background:#f7f7f7;border-top:1px solid #d9d9d9;align-items:center}',
    '.sp-chat-input{flex:1;padding:8px 12px;border-radius:4px;border:none;background:#fff;color:#000;font-size:12px;font-family:inherit;outline:none}',
    '.sp-chat-input::placeholder{color:#999}',
    '.sp-chat-send-btn{width:32px;height:32px;border-radius:4px;border:none;background:#07c160;color:#fff;font-size:14px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
    '.sp-chat-send-btn:disabled{opacity:.4}',
    '.sp-chat-typing{font-size:10px;color:#999;padding:2px 12px;display:none}',
    '.sp-chat-npc-bar{display:flex;gap:6px;padding:6px 10px;overflow-x:auto;background:#f7f7f7;border-bottom:1px solid #d9d9d9}',
    '.sp-chat-npc-bar::-webkit-scrollbar{display:none}',
    '.sp-chat-npc{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;opacity:.5;transition:opacity .2s}',
    '.sp-chat-npc.active{opacity:1}',
    '.sp-chat-npc-avatar{width:30px;height:30px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff}',
    '.sp-chat-npc-name{font-size:8px;color:#666;max-width:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.sp-chat-empty{flex:1;display:flex;align-items:center;justify-content:center;color:#999;font-size:12px;background:#ededed}',`;

js = js.replace(oldChatCSS, newChatCSS);

// ═══ 2. Update chat HTML (WeChat-style with NPC bar) ═══
const oldChatHTML = `      case 'chat':
        html += '<div class=\"sp-chat\" id=\"sp-chat-container\">';
        html += '<div class=\"sp-chat-msgs\" id=\"sp-chat-msgs\">';
        if (settings.chatMessages.length === 0) {
          html += '<div class=\"sp-chat-empty\">开始一段对话吧</div>';
        }
        html += '</div>';
        html += '<div class=\"sp-chat-typing\" id=\"sp-chat-typing\">正在输入...</div>';
        html += '<div class=\"sp-chat-input-wrap\">';
        html += '<input class=\"sp-chat-input\" id=\"sp-chat-input\" placeholder=\"输入消息...\" maxlength=\"500\">';
        html += '<button class=\"sp-chat-send\" id=\"sp-chat-send\"><i class=\"fa-solid fa-paper-plane\"></i></button>';
        html += '</div></div>';
        break;`;

const newChatHTML = `      case 'chat':
        // NPC bar
        html += '<div class=\"sp-chat\" id=\"sp-chat-container\">';
        html += '<div class=\"sp-chat-header\">';
        html += '<button class=\"sp-chat-header-back\"><i class=\"fa-solid fa-chevron-left\"></i></button>';
        html += '<span class=\"sp-chat-header-title\">群聊 (' + (activeNpcs.length + 1) + ')</span>';
        html += '</div>';
        html += '<div class=\"sp-chat-npc-bar\" id=\"sp-chat-npc-bar\">';
        var npcNames = Object.keys(settings.characters);
        for (var ni = 0; ni < npcNames.length; ni++) {
          var nn = npcNames[ni];
          var active = activeNpcs.indexOf(nn) >= 0;
          var nc = npcColors[nn] || '#888';
          html += '<div class=\"sp-chat-npc' + (active ? ' active' : '') + '\" data-npc=\"' + esc(nn) + '\">';
          html += '<div class=\"sp-chat-npc-avatar\" style=\"background:' + nc + '\">' + esc(nn.charAt(0)) + '</div>';
          html += '<span class=\"sp-chat-npc-name\">' + esc(nn) + '</span>';
          html += '</div>';
        }
        html += '</div>';
        // Messages
        html += '<div class=\"sp-chat-msgs\" id=\"sp-chat-msgs\">';
        if (settings.chatMessages.length === 0) {
          html += '<div class=\"sp-chat-empty\">开始对话吧</div>';
        }
        html += '</div>';
        html += '<div class=\"sp-chat-typing\" id=\"sp-chat-typing\">对方正在输入...</div>';
        html += '<div class=\"sp-chat-input-bar\">';
        html += '<input class=\"sp-chat-input\" id=\"sp-chat-input\" placeholder=\"输入消息...\" maxlength=\"500\">';
        html += '<button class=\"sp-chat-send-btn\" id=\"sp-chat-send\"><i class=\"fa-solid fa-paper-plane\"></i></button>';
        html += '</div></div>';
        break;`;

js = js.replace(oldChatHTML, newChatHTML);

// ═══ 3. Remove wallpaper setting HTML ═══
js = js.replace(
  `        html += '<div class=\"sp-settings-group\">';
        html += '<div class=\"sp-settings-label\">壁纸图片</div>';
        html += '<input class=\"sp-wallpaper-input\" type=\"text\" placeholder=\"输入图片URL...\" value=\"' + esc(settings.wallpaper || '') + '\">';
        html += '<div style=\"font-size:9px;color:rgba(255,255,255,.25);margin-top:4px\">留空则使用默认渐变背景</div>';
        html += '</div>';`,
  ``
);

// ═══ 4. Add model fetch button in API settings ═══
js = js.replace(
  `        html += '<div><input class=\"sp-wallpaper-input\" id=\"sp-api-model\" type=\"text\" placeholder=\"模型名称\" value=\"' + esc(settings.apiModel || 'gpt-3.5-turbo') + '\"></div>';`,
  `        html += '<div style=\"display:flex;gap:6px\"><input class=\"sp-wallpaper-input\" id=\"sp-api-model\" type=\"text\" placeholder=\"模型名称\" value=\"' + esc(settings.apiModel || 'gpt-3.5-turbo') + '\" style=\"flex:1\"><button class=\"sp-chat-send-btn\" id=\"sp-fetch-models\" style=\"width:auto;padding:0 12px;font-size:10px;border-radius:8px\">拉取</button></div>';
        html += '<select class=\"sp-wallpaper-input\" id=\"sp-model-list\" style=\"display:none;margin-top:4px;font-size:10px\"></select>';`
);

// ═══ 5. Add NPC state and colors ═══
const npcState = `
  var activeNpcs = [];
  var npcColors = {};
  (function(){
    var colors = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63','#00bcd4','#ff5722'];
    var names = Object.keys(settings.characters);
    for(var ci=0;ci<names.length;ci++) npcColors[names[ci]]=colors[ci%colors.length];
  })();
`;

js = js.replace("  var activeApp = 'home';", "  var activeApp = 'home';\n" + npcState);

// ═══ 6. Update chat bindings (WeChat-style rendering, NPC toggle) ═══
const oldChatBinding = `    // Chat: render existing messages
    var $chatMsgs = $appContent.find('#sp-chat-msgs');
    if ($chatMsgs.length) {
      for (var ci = 0; ci < settings.chatMessages.length; ci++) {
        var cm = settings.chatMessages[ci];
        var cls = 'sp-chat-bubble sp-chat-bubble--' + (cm.role === 'user' ? 'user' : 'ai');
        $chatMsgs.append($('<div>').addClass(cls).text(cm.content));
      }
      if ($chatMsgs.children().length) $chatMsgs.scrollTop($chatMsgs[0].scrollHeight);
    }

    // Chat: send message
    $appContent.find('#sp-chat-send').on('click', sendChatMessage);
    $appContent.find('#sp-chat-input').on('keydown', function (e) { if (e.key === 'Enter') sendChatMessage(); });`;

const newChatBinding = `    // Chat: NPC toggle
    $appContent.find('.sp-chat-npc').on('click', function () {
      var npc = $(this).data('npc');
      var idx = activeNpcs.indexOf(npc);
      if (idx >= 0) { activeNpcs.splice(idx, 1); $(this).removeClass('active'); }
      else { activeNpcs.push(npc); $(this).addClass('active'); }
    });

    // Chat: render existing messages (WeChat style)
    var $chatMsgs = $appContent.find('#sp-chat-msgs');
    if ($chatMsgs.length) {
      for (var ci = 0; ci < settings.chatMessages.length; ci++) {
        var cm = settings.chatMessages[ci];
        if (cm.role === 'system') {
          $chatMsgs.append($('<div>').addClass('sp-chat-sysmsg').text(cm.content));
        } else {
          var isSelf = cm.role === 'user';
          var row = $('<div>').addClass('sp-chat-msg-row' + (isSelf ? ' sp-chat-msg-row--self' : ''));
          var avatarBg = isSelf ? '#07c160' : (npcColors[cm.name] || '#888');
          var avatarTxt = isSelf ? '我' : (cm.name ? cm.name.charAt(0) : '?');
          row.append($('<div>').addClass('sp-chat-avatar').css('background', avatarBg).text(avatarTxt));
          row.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--' + (isSelf ? 'self' : 'other')).text(cm.content));
          $chatMsgs.append(row);
        }
      }
      if ($chatMsgs.children().length) $chatMsgs.scrollTop($chatMsgs[0].scrollHeight);
    }

    // Chat: send message
    $appContent.find('#sp-chat-send-btn').on('click', sendChatMessage);
    $appContent.find('#sp-chat-input').on('keydown', function (e) { if (e.key === 'Enter') sendChatMessage(); });

    // Model fetch
    $appContent.find('#sp-fetch-models').on('click', function () {
      var url = ($appContent.find('#sp-api-url').val() || settings.apiUrl || '').trim();
      var key = ($appContent.find('#sp-api-key').val() || settings.apiKey || '').trim();
      if (!url || !key) { alert('请先填写API URL和Key'); return; }
      var base = url.replace(/\/chat\/completions\/?$/,'').replace(/\/v1\/?$/,'') + '/v1/models';
      var $btn = $appContent.find('#sp-fetch-models');
      $btn.text('...').prop('disabled', true);
      fetch(base, {headers:{'Authorization':'Bearer '+key}})
      .then(function(r){return r.json()})
      .then(function(d){
        var models = (d.data||[]).map(function(m){return m.id}).sort();
        var $sel = $appContent.find('#sp-model-list');
        $sel.empty().append('<option>-- 选择模型 --</option>');
        for(var mi=0;mi<models.length;mi++) $sel.append('<option>'+models[mi]+'</option>');
        $sel.show().on('change',function(){$appContent.find('#sp-api-model').val($(this).val());settings.apiModel=$(this).val();saveSettings(settings)});
      })
      .catch(function(e){alert('拉取失败: '+e.message)})
      .finally(function(){$btn.text('拉取').prop('disabled',false)});
    });`;

js = js.replace(oldChatBinding, newChatBinding);

// ═══ 7. Update sendChatMessage for WeChat + NPC context ═══
const oldSendChat = `  function sendChatMessage() {
    var $input = $appContent.find('#sp-chat-input');
    var text = $input.val().trim();
    if (!text) return;

    var $msgs = $appContent.find('#sp-chat-msgs');
    var $empty = $msgs.find('.sp-chat-empty');
    if ($empty.length) $empty.remove();

    // Add user message
    settings.chatMessages.push({ role: 'user', content: text });
    $msgs.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--user').text(text));
    $msgs.scrollTop($msgs[0].scrollHeight);
    $input.val('').focus();

    // Check API config
    if (!settings.apiUrl || !settings.apiKey) {
      settings.chatMessages.push({ role: 'ai', content: '[错误] 请先在设置中配置API' });
      $msgs.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--error').text('请先在设置中配置API'));
      return;
    }

    // Show typing
    var $typing = $appContent.find('#sp-chat-typing');
    var $sendBtn = $appContent.find('#sp-chat-send');
    $typing.show(); $sendBtn.prop('disabled', true);

    // Build messages array for API
    var apiMessages = [{ role: 'system', content: '你是一个友好的AI助手，正通过手机聊天应用与用户对话。回答简洁，使用中文。' }];
    for (var ai = 0; ai < settings.chatMessages.length; ai++) {
      apiMessages.push({ role: settings.chatMessages[ai].role, content: settings.chatMessages[ai].content });
    }

    // Call API
    fetch(settings.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
      body: JSON.stringify({ model: settings.apiModel, messages: apiMessages, max_tokens: 500, temperature: 0.7 })
    })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '[空回复]';
      settings.chatMessages.push({ role: 'ai', content: reply });
      $msgs.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--ai').text(reply));
      $msgs.scrollTop($msgs[0].scrollHeight);
      saveSettings(settings);
    })
    .catch(function (err) {
      var errMsg = '[错误] ' + (err.message || '网络请求失败');
      settings.chatMessages.push({ role: 'ai', content: errMsg });
      $msgs.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--error').text(errMsg));
    })
    .finally(function () {
      $typing.hide(); $sendBtn.prop('disabled', false);
      saveSettings(settings);
      $msgs.scrollTop($msgs[0].scrollHeight);
    });
  }`;

const newSendChat = `  function sendChatMessage() {
    var $input = $appContent.find('#sp-chat-input');
    var text = $input.val().trim();
    if (!text) return;

    var $msgs = $appContent.find('#sp-chat-msgs');
    var $empty = $msgs.find('.sp-chat-empty');
    if ($empty.length) $empty.remove();

    // Add user message (WeChat style)
    settings.chatMessages.push({ role: 'user', content: text, name: '{{user}}' });
    var row = $('<div>').addClass('sp-chat-msg-row sp-chat-msg-row--self');
    row.append($('<div>').addClass('sp-chat-avatar').css('background','#07c160').text('我'));
    row.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--self').text(text));
    $msgs.append(row);
    $msgs.scrollTop($msgs[0].scrollHeight);
    $input.val('').focus();

    // Check API config
    if (!settings.apiUrl || !settings.apiKey) {
      settings.chatMessages.push({ role: 'system', content: '请先在设置中配置API' });
      $msgs.append($('<div>').addClass('sp-chat-sysmsg').text('请先在设置中配置API'));
      return;
    }

    // Build system prompt with NPC context
    var npcDesc = '';
    for (var ni = 0; ni < activeNpcs.length; ni++) {
      var nn = activeNpcs[ni];
      var cd = settings.characters[nn];
      npcDesc += nn + '(好感度:' + (cd ? cd['好感度'] || 0 : 0) + '); ';
    }
    var systemPrompt = '你正在一个微信群聊中扮演以下角色。请根据对话内容，判断该由哪个角色回复，并以该角色的语气、性格说话。回复格式：[角色名]: 内容。\n\n当前参与的角色: ' + (npcDesc || '无特定NPC') + '\n玩家: {{user}}\n\n注意：一次只扮演一个角色。保持角色性格一致。使用中文。';

    // Show typing
    var $typing = $appContent.find('#sp-chat-typing');
    var $sendBtn = $appContent.find('#sp-chat-send-btn');
    $typing.show(); $sendBtn.prop('disabled', true);

    // Build API messages
    var apiMessages = [{ role: 'system', content: systemPrompt }];
    for (var ai = 0; ai < settings.chatMessages.length; ai++) {
      var m = settings.chatMessages[ai];
      if (m.role === 'system') continue;
      var c = (m.role === 'user' ? '{{user}}' : (m.name || 'AI')) + ': ' + m.content;
      apiMessages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: c });
    }

    // Call API
    fetch(settings.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + settings.apiKey },
      body: JSON.stringify({ model: settings.apiModel, messages: apiMessages, max_tokens: 500, temperature: 0.8 })
    })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
      if (!reply) reply = '[空回复]';
      // Parse [角色名]: format
      var npcName = 'AI';
      var npcContent = reply;
      var match = reply.match(/^\[(.+?)\]:\s*(.+)/s);
      if (match) { npcName = match[1]; npcContent = match[2]; }
      settings.chatMessages.push({ role: 'ai', content: npcContent, name: npcName });
      var isSelf = false;
      var row2 = $('<div>').addClass('sp-chat-msg-row');
      var bg2 = npcColors[npcName] || '#888';
      row2.append($('<div>').addClass('sp-chat-avatar').css('background',bg2).text(npcName.charAt(0)));
      row2.append($('<div>').addClass('sp-chat-bubble sp-chat-bubble--other').text(npcContent));
      $msgs.append(row2);
      saveSettings(settings);
    })
    .catch(function (err) {
      var errMsg = '错误: ' + (err.message || '网络请求失败');
      settings.chatMessages.push({ role: 'system', content: errMsg });
      $msgs.append($('<div>').addClass('sp-chat-sysmsg').text(errMsg));
    })
    .finally(function () {
      $typing.hide(); $sendBtn.prop('disabled', false);
      saveSettings(settings);
      $msgs.scrollTop($msgs[0].scrollHeight);
    });
  }`;

js = js.replace(oldSendChat, newSendChat);

// ═══ 8. Update wallpaper hidden in buildUI (keep functional but remove UI) ═══
// Already done in step 3

// ═══ Verify ═══
try { new Function(js); console.log('JS syntax: OK'); } catch(e) { console.log('ERR:', e.message); process.exit(1); }

fs.writeFileSync('src/小手机/pure-phone.js', js, 'utf8');
const json = {type:'script',enabled:true,name:'小手机',id:'f9b8c4d2-3e5f-6a7b-9c0d-1e2f3a4b5c6d',content:js,info:'',button:{enabled:true,buttons:[]},data:{},export_with:{data:true,button:true}};
fs.writeFileSync('src/小手机.json', JSON.stringify(json));
fs.writeFileSync('dist/小手机/小手机.js', js, 'utf8');
console.log('Done. Size:', js.length);
