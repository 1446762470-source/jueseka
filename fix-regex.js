const fs = require('fs');
const yaml = fs.readFileSync('src/春物剧情/index.yaml', 'utf8');
const cdn = 'https://testingcf.jsdelivr.net/gh/1446762470-source/jueseka@main/src/%E6%98%A5%E7%89%A9%E5%89%A7%E6%83%85/%E7%95%8C%E9%9D%A2/%E8%A7%92%E8%89%B2%E5%88%9B%E5%BB%BA/index.html';

// Find the 角色创建 regex content and replace it
const start = yaml.indexOf("      内容: |-\n        ```\n        <body>\n        <script>\n        var f=document.createElement(\"iframe\");\n        f.style.cssText=\"position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999\";\n        f.src=\"'+dataUri+'\";\n        document.body.appendChild(f);\n        <\\/script>\n        </body>\n        ```");

if (start < 0) {
  console.log('Content block not found');
  // Print the area around 角色创建
  const idx = yaml.indexOf('[界面]角色创建');
  console.log(yaml.substring(idx, idx + 600));
  process.exit(1);
}

const old = yaml.substring(start, start + 300); // approximate
console.log('Old block found, replacing...');

const newBlock = `      内容: |-
        \`\`\`
        <body>
        <script>
        fetch('${cdn}').then(function(r){return r.text()}).then(function(h){var b=new Blob([h],{type:'text/html'});var u=URL.createObjectURL(b);var f=document.createElement('iframe');f.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999';f.src=u;document.body.appendChild(f)})
        <\\/script>
        </body>
        \`\`\``;

const newYaml = yaml.substring(0, start) + newBlock + yaml.substring(start + 282); // 282 = length of old block

fs.writeFileSync('src/春物剧情/index.yaml', newYaml, 'utf8');
console.log('Fixed. Has fetch+blob:', newYaml.indexOf('fetch') >= 0);
