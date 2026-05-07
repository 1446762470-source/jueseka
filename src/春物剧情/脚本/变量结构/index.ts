import { Schema } from '../../schema';

export function buildVariableSchemaText(): string {
  const shape = Schema.shape;
  const lines: string[] = [];

  function walk(obj: any, prefix: string = '') {
    if (obj instanceof z.ZodObject) {
      for (const [key, val] of Object.entries(obj.shape)) {
        const path = prefix ? prefix + '/' + key : key;
        if (val instanceof z.ZodObject) {
          walk(val, path);
        } else if (val instanceof z.ZodRecord) {
          lines.push(path + '/* — 动态键 */');
        } else {
          const type = val instanceof z.ZodNumber || val._def?.coerce ? 'number' :
                       val instanceof z.ZodBoolean ? 'boolean' :
                       val instanceof z.ZodEnum ? 'enum' : 'string';
          lines.push(path + ' — ' + type);
        }
      }
    }
  }
  walk(shape);
  return lines.join('\n');
}

// 将 schema 转为变量结构文本并暴露给变量框架
console.info('[变量结构] 春物剧情 变量结构已加载');
