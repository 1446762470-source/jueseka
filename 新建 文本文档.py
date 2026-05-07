import json

with open('C:/Users/14467/Desktop/tavern_helper_template-main/src/酒馆助手脚本-手机助手-八改 (1).json', 'r', encoding='utf-8') as f:
    data = json.load(f)
content = data['content']

# Read the forum generation section
print('=== Forum related (~121162 to 123000) ===')
print(content[121162:123000])