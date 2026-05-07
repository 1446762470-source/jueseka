export const Schema = z.object({
  世界状态: z.object({
    时间: z.object({
      日期: z.string().prefault('2012-04-08'),
      当前片段: z.string().prefault('早晨'),
    }),
    季节: z.string().prefault('春'),
    天气: z.string().prefault('晴天'),
  }),

  主角: z.object({
    余额: z.coerce.number().prefault(30000),
    卡牌背包: z
      .record(
        z.string().describe('卡牌id'),
        z.object({
          名称: z.string(),
          类型: z.enum(['物品卡', '属性卡', '技能卡', '事件卡', '角色卡', '任务', '朋友卡', '命运卡']),
          等级: z.enum(['F', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS']),
          描述: z.string().prefault(''),
        }),
      )
      .prefault({}),
  }),

  角色列表: z
    .record(
      z.string().describe('角色名'),
      z.object({
        好感度: z.coerce.number().transform(v => _.clamp(v, 0, 500)).prefault(0),
      }),
    )
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
