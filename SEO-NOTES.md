# SEO / GEO 工作基线

这份文件记录**已经核实过的结论**，目的是让下一轮工作不必重新推导。

分工：Codex 负责调研，Claude 负责核验与写代码，用户决策。调研结论到代码之间要过一道核验 ——
站外数据看得见需求，只有仓库和构建产物能证明站内实况，两边对上才动手。

**读法**：带日期的是快照，会过期；不带日期的是从仓库本身得出的结论，改代码才会变。

---

## 0. 生产状态（2026-09-12）

写清楚以免把中途状态当结论 —— 这一条每次部署后都要更新，或者直接实测。

- `79a5927` 于 **11:58:15Z** 合并入 main（PR #5，squash）。
- **12:07:24Z 公网实测**：`/products/static-eliminator/ionizing-air-blowers` 与
  `/guides/what-is-web-cleaning` 均返回 **200**，title / H1 / canonical 正确。
  这两个 URL 在合并前是 404，**合并后已上线**。
- 无 www 的 `dg-sdk.com`（首页与深层 URL）均 **307 → www**。详见 §11。

实测由 Codex 执行。Claude 所在的云端环境出口代理屏蔽 `www.dg-sdk.com`，
**无法自行验证线上状态** —— 线上结论一律需外部实测，不要从仓库或构建产物推断。

---

## 1. 核心词

`ionizing bar` / `ionizing bars` 是核心词，这是站点结构本身的事实，不是选择：

| | 标题 | H1 | H2/H3 | 全站出现 |
|---|---|---|---|---|
| `ionizing bar` | 8 页 | 9 页 | 10 页 | 232 次 |
| `ionizing bars` | 4 页 | 2 页 | 9 页 | 187 次 |
| 其余所有 bar 变体合计 | 0 页 | 0 页 | 5 页 | 79 次 |

两个形态合计 419 次，覆盖标题、H1、H2 三个层级；其他词加起来不到它五分之一，一个标题都没占。

---

## 2. 头部词排不上，瓶颈不在页面关键词

这条最容易被误判，请先读它再决定要不要继续堆词。

`ionizing bar`（搜索量 320）是站内压得最重的词，**但完全没有排名**。同期关键词重叠（2026-09-11 快照）：

```
dg-sdk.com      21
simco-ion.com  218
exair.com      2.2K
keyence.com    8K
```

已经写到饱和仍然进不了榜，而站内 0 次的变体反而能排第 6 —— 因为那些词竞争者少。
**结论：头部词的差距是域名权重（外链与站点规模），不是关键词密度。继续堆 `ionizing bar` 无效。**

---

## 3. 最高杠杆：已排名但站内几乎不提的词

2026-09-11/12 快照。这批词站内几乎不提却已排进前 15，把词自然补进对应页面，
是从第 7 推到前 3，比开新战场划算得多。

| 关键词 | 排名 | 搜索量 | KD | 落地页 |
|---|---|---|---|---|
| `assembly line ionizer bars` | 6 | 210 | 0 | what-is-an-ionizing-bar |
| `ionizer bar` | 7 | 320 | 10 | what-is-an-ionizing-bar |
| `bar ionizer` | 7 | 260 | 11 | what-is-an-ionizing-bar |
| `ionization bars` | 7 | 210 | 4 | what-is-an-ionizing-bar |
| `ionizing bars` | 8 | 90 | 2 | what-is-an-ionizing-bar |
| `static ionizing bar` | 9 | 70 | 0 | what-is-an-ionizing-bar |
| `ion bars` | 10 | 90 | 0 | what-is-an-ionizing-bar |
| `ion bar` | 11 | 390 | 3 | 分类页 + ST-G |
| `ionization bar` | 14 | 210 | 9 | what-is-an-ionizing-bar |
| `ionizing bars static control` | 23 | 170 | 13 | 分类页 |

分类页词族（排名更弱，第 22–38）：`ionizing bar static eliminator`(260/KD16)、
`industrial static control system`(210/20)、`industrial static control`(320/20)、
`static control equipment`(260/9)。

风机词族：`ionizing air blower`(170/KD5，DG 未检出)、`ionizing blower`(110/KD8)、
`ESD ionizer fan`(40/KD0) —— 同义词共用 `/products/static-eliminator/ionizing-air-blowers` 一页，不另建 fan 同义页。

**已完成**：`ion bar`、`ionizer bar`、`bar ionizer`、`ionization bar`、`static ionizing bar`、
`assembly line ionizer bars`、`industrial static control system`、`ionizing bar static eliminator` 均已自然融入。

---

## 4. 不是这门生意的主题 —— 不要做

关键词工具会按 KD 低推荐一大批看似容易的词。2026-09 那份 357 行的策略文件里，
新建部分 250 个词、总搜索量 76,640，其中**约 76% 与业务无关**。已筛掉的类别：

| 类别 | 代表词 | 为什么不做 |
|---|---|---|
| 激光清洗 | `laser cleaning machine`(5400) | 另一个产品品类 |
| 洗地机 | `floor cleaning machine`(3600) | 不是产品线 |
| 家用负离子/空气净化 | `ionizer ionizer`(3600)、`home air ionizer` | 消费品 |
| 除尘/吸尘系统、木工除尘 | `dust collector vacuum`、`woodworking dust extractor` | 不是产品线 |
| 衣物/人体/家居静电 | `how to eliminate static from clothes`(880) | 消费者话题，无采购意图 |
| **油漆滚筒清洗** | `spin out roller cleaner`(320) | **装修工具，纯字面撞词** |
| 防静电耗材/穿戴 | `esd strap`(1000)、`esd protectors`(880) | 不生产 |
| 清洁剂/喷剂 | `anti static spray for electronics` | 不生产 |
| 超声波清洗 | `ultrasonic cleaner pcb` | 另一种工艺，不生产 |
| 擦显示器 | `cleaning lcd computer monitor` | 消费者用品 |
| 泛物理科普 | `electrostatic attraction`(1000)、`electrostatic machine`(880) | 与采购意图无关 |

**判定要落到单个关键词，不能按主题一刀切。** 混杂的例子：`home air ionizer` 主题里有
`ionizing air blowers`(KD 0，是产品)；`ioniser air conditioner` 里有 `ionizing bar electrode`、
`compressed air ionizer`、`industrial ionizer`（都相关）；反过来 `cleaner for circuit boards`
主题里的 `ultrasonic circuit board cleaner` 要剔除。

**KD 低 ≠ 值得做。** 那批词的「潜在流量」列绝大多数是 0 —— KD 低常常是因为没人搜到有商业价值的东西。

---

## 5. 不可断言的参数（无资料，只给条件边界）

这些是核验中发现的**超出产品页依据的表述**，已改成条件边界。拿到一手资料前不要改回保证式说法。

| 事项 | 原断言 | 实况 |
|---|---|---|
| sub-100V | 「电子/PCB/光学所需的 sub-100V 窗口」 | 无标准如此规定；限值随器件敏感度等级与工艺而定 |
| ST-G 监测能力 | 「built-in balance monitoring」 | 产品页只记载：检测异常放电 → 报警 → 自动切断高压 + 网络端口。**无持续离子平衡监测** |
| 洁净室选型 | 「洁净室优先选 DC / 需要低臭氧 DC 型号」 | **与产品线矛盾** —— ST-G 是脉冲 AC 且离子平衡最紧（±50 V），定位显示/PCB/光学。缺 ST-G 臭氧数据，只能陈述判据 |
| ST-S200 离子平衡 | 「Within 3 s at 300 mm」 | 离子平衡单位是伏特。这是 300 mm 处的衰减时间被错标；该型号**未公布偏置电压** |
| SMT600 规格 | `50–600 mm width` / `Static to <30 V` / `0–45 m/min` / `By-pass mode` | **四条全部无据**，详情页规格表全是定性项。已换成可溯源的四条 |

**经核实为真、不要改的**：ST-F「2.5× @ ±100 V」与产品页一致；维护周期（标准工况月度到季度 /
粉尘油雾环境每周 / 洁净室三到六个月）三处已一致。

---

## 6. 已在站上的事实（不必再问）

- **耗材供货**（`/static-eliminator-manufacturer` FAQ）：接触式清洁机两种耗材 = 弹性体清洁辊 + 胶纸卷。
  纸为上下双卷、**芯径 3.0"**、**20 m/卷**、**800 D 黏性**、免刀换卷。
  仍缺：型号编号、幅宽、对应机型清单。
- **四个风机型号**：ST-S200 450×450 mm / ≤48.2 CFM / DC 24 V；ST101A 40×60 cm / 45–110 CFM；
  ST104A 60×120 cm / 70–120 CFM；ST1200 140×120 cm / 150–360 CFM。
  ST1200 **未标湿度**（另两台标 22 °C / 75% RH）。
- **三个离子棒系列**：ST-G 脉冲 AC ±50 V（最紧）；ST-E 高频脉冲 DC ±80 V，离子产生量 +150%；
  ST-F 脉冲 DC ±100 V，中和快 2.5 倍。三者共用 6.5 kV DC 脉冲、24 V DC 供电、30–1000 mm 工作距离、按长度定制。

---

## 7. 仓库机制（会强制执行，别绕）

- **`npm run check-search`** 把 `src/pages/products/` 下每个页面都视为产品页，
  搜索索引（`public/js/scripts.js`）缺条目就**退出 1**。新增产品页必须加索引，`kw` 手写、脚本不碰。
  guides 不入该索引 —— 它只收产品页。
- **`npm run build` = `node scripts/minify-css.js && astro build`**。
  `src/styles/nav.css` 是可读源码，`public/css/nav.css` 是生成产物，别直接改后者。
  压缩脚本会自校验（花括号、选择器、注释），对不上就退出 1 不写文件。
- **Astro 的 `<style>` 是组件作用域。** 分类页的 `.pcard` / `.finder` / `.pl-group`
  **到不了兄弟页面**。新建产品列表页需要自带一份，这是既有约定，不是冗余。

---

## 8. 页面约定

- **guides 页不带 `<style>`**，全用共享样式表的类（`category-info-block`、`spec-table`、
  `advantage-grid`、`faq-list` / `faq-item` / `faq-question` / `faq-answer`）。编号列表用朴素
  `<ol><li><strong>标题</strong> — 正文</li></ol>`。
- **JSON-LD 用独立 `<script>` 块**，不用 `@graph`（站内其余 guides 的写法）。
- **guides 索引卡片必须带 `data-aos`**，与其余卡片一致。
- **清洁机分类页每张卡片恰好 4 条 specs**。删数字时替换而非留空。
- **产品页不要出现 `"@type": "Product"`** —— 见下一节。
- 标题标签 **≤75 字符**（Semrush 阈值），理想 ≤60。

---

## 9. 已修复、不要回退的问题

- **42 个 Product snippet 错误**：`Product` 缺 `offers`/`review`/`aggregateRating` 会被判无效。
  询价制无价格，所以详情页用 `ItemPage`、列表页把 name/url/image 直接放在 `ListItem` 上、
  manufacturer 页用 `knowsAbout`。**新建产品页不要用 `Product` 类型**，除非同时提供真实价格。
  风机汇总页用的是 `CollectionPage + ItemList(WebPage)`。
- **重复页会自相竞争**。`benefits-of-ionizing-bars` 与 `what-is-an-ionizing-bar` 9 节里 8 节同题、
  主题词重叠 17/29，已合并 + 301。新建 guide 前先比对现有 guides 的 H2。
- **首页有两个 URL**。`https://www.dg-sdk.com` 与 `.../` 被算作不同页面。
  站内链首页统一用 `href="/"`。

---

## 10. Semrush 报告里的误报

- **43 个「外部链接失效」** = `wa.me/61436605126` 返回 **429**（WhatsApp 对爬虫限流）。
  链接对真实用户正常，改代码解决不了。**应在 Semrush 里设为「排除检查项」。**
- **「FAQ 富结果」已被 Google 停用** —— 不作为验收收益，也不因此改全站模板。
  保留有用的可见问答并与 schema 一致即可。无需 AI 专用 schema；`llms.txt` 不影响 Google 排名。
- **不同快照不可拼接**。Gap / Overview / Magic 的搜索量与 KD 取样不同，
  `KD 0` 不等于本站易抢（还要看个人难度 PKD）。

---

## 11. 未处理的待办

- **无 www 的重定向是 307，不是「没有重定向」。** 2026-09-12 12:07 公网实测：
  `dg-sdk.com` 首页与深层 URL 均 **307 → www**（由 Vercel 域名设置处理，所以 `vercel.json` 里查不到规则 ——
  早前「没有 301」的记录是从 `vercel.json` 反推的，结论错了）。
  307 是临时重定向，长期主域可评估换成 301/308，但**不紧急，也未改设置**。
- `package-lock.json` 里 **325/327 条 `resolved` 指向 `registry.npmmirror.com`**。
  Vercel 能构建，但海外 CI 环境会 403。要改就用官方源重新生成。
- **`public/js/inquiry.js` 未交付云端。** `79a5927` 的 `public/js/` 只有 `scripts.js`（已核实）。
  事件开关为 false，**不能称询盘统计已上线**。
- Codex 本地有两份草稿曾未交付云端（已于 2026-09-12 交付并整合）。
  **交接时请标注该事实在云端还是本地** —— 这个区分不清曾各花一轮核验。

---

## 12. 已按资料边界收窄的过度声明（2026-09-12 完成）

由 Codex 在已合并的 `79a5927` 中定位，Claude 逐条核验行号后改写。
**原则：给条件边界，不换成另一个保证。** 可见正文与 FAQ / JSON-LD 同步，模板未动。

| 页面 | 原表述 | 改成 |
|---|---|---|
| `applications.astro` | 「ion balance 保持在**光学作业所需的** sub-100 V 窗口」 | 由你的光学工艺设定，常见低于 100 V，但以自己零件要求的数字为准 |
| `ccl-cleaner` | 要求「清除 dust、**oil residue**、颗粒」+「ST-DT1340 **removes these contaminants**」 | 要求只列 dust 与颗粒；机器改为 **lifts dry particles**。干式胶辊清不掉油 |
| `lcm-cleaner` | 3 处（含 JSON-LD）把 `1 piece/second` **检测速率**写成 throughput / 产能 | 统一为 inspection and recording at up to 1 piece per second，并注明清洁速率跟随设定线速 |
| `inspection-cleaner` | 「AOI **无法**区分真缺陷与浮尘」 | 浮尘会被读成缺陷，**除非系统被设置为可区分** |
| `inspection-cleaner` | 「误剔率**通常 3–8%**」（无出处） | 删除数字，改为「取决于你的颗粒负载、光学配置与判废阈值，**在自己线上测**，不要用行业数字」 |
| `optical-film-cleaner` | 「不会损伤」（答「No.」） | 「Not by design」+ 是否耐受取决于涂层与胶辊黏性，**按膜分级黏性并样品确认** |
| `polarizer-cleaner` | 「去除亚微米颗粒**而不损伤**敏感膜面」 | 黏性按膜而非按颗粒分级；**是否耐受由样品试验判定，不由规格书判定** |
| `backlight-cleaner` | 「**不划伤**膜面」「传输机构**不产生**颗粒或振动」 | 无化学品、无二次污染保留（有依据）；划伤与否改为按涂层与黏性、样品确认 |
| `pcb-vertical-cleaner` | 160/218 的 60% **丢了「同等清洁能力」前提**（152 行有） | 三处一致带回前提 |

**仍缺的数据**：`pcb-vertical-cleaner` 的 60% 占地节省**全站没有实际尺寸**。
补上实测占地（本机 vs 同等能力卧式机）才能从「约 60%」变成可核验的对比。

**一条方法记录**：`applications.astro` 的 sub-100V 与 §5 第一条是同一个断言，
上一轮只改了发现它的 `industrial-static-eliminator.astro`。
**改全站性表述要全文搜索一遍**，不能只改发现它的那个文件。

**一条核验记录**：CCL 这条我第一次读漏了 —— 只看到场景段把 oil residue 列进污染物，
判为「暗示性」过度声明；实际后文明确写着 `removes these contaminants`，是字面断言。
**引用行号的证据要把整段读完，不能只读被引的那一行。**

---

## 13. Codex 验收后补修（2026-09-12，第三批）

Codex 在已合并的 `4a1e1ee` 上逐字核验 7 个产品页 41 条 FAQ / JSON-LD，
确认 §12 的改动已落地，但发现**前半句加了条件、后半句仍在保证**的残留，以及
**从「磁悬浮」这个名称反推出来的结果性承诺**。本轮全部处理。

### 逐项结果

| # | Codex 指出 | 处理 | 保留的依据 |
|---|---|---|---|
| 1 | `inspection` 155/178/237 仍有 `only flags genuine defects` | 删掉绝对结论。改为「清掉浮尘这一类干扰；之后 AOI 怎么判，取决于它的 recipe 与阈值，不取决于清洁机」 | 浮尘会被读成缺陷 —— 机理，可留 |
| 2 | `optical-film` 157/215 `safe for all standard optical film surfaces` 与 165 的样品确认冲突 | 统一到 165 的口径：是否耐受取决于涂层 / 表面 / 胶辊黏性 / 传输压力，**样品确认后才上生产卷** | 无研磨、无溶剂、无 UV —— 工艺事实，可留 |
| 3 | `polarizer` 166/220 `safe for functional layers` 与 72–73 的样品验证冲突 | 改为「功能层是否耐受由你自己材料上的样品试验判定，不由规格书判定」 | 同上 |
| 4 | `backlight` 76–77/91、`ccl` 76–77/90/153/180/233 的 `no damage` / 永不变形 / 零振动 / 防微裂纹 | 全部撤下。磁悬浮只描述**机构**（不走接触轴承、传输平稳），不再推导零颗粒 / 零振动 / 无轴承 / 延寿；微裂纹与振动明确写**未发布实测数据，请在自己基材上验证** | 磁悬浮驱动本身、薄清洁层降低接触压力 —— 结构事实，可留 |
| 5 | `lcm` 115 把 detection 放在 Throughput 字段；154/170/222 的零颗粒 / 无轴承 / 显著延寿 | 规格表字段改为 **Detection & Recording**；三处收窄为「磁力承载、不走接触轴承，**无实测颗粒数、无与开放轴承的寿命对比**」 | 密封外壳隔离生产环境 —— 结构事实，可留。已改好的「1 片/秒检测」表述**未再改动** |
| 6 | `pcb-vertical` 152/160/218 的 60%：加前提不能证明数字 | **撤下 60%**，改为「竖直布置使沿线占地明显低于同等清洁能力的卧式机，**但本机占地与对照机型均未发布**，图纸索取」。同时不再从产品名反推刚性规则 —— 改为「板需在竖直传输中自持平整，**未发布最小刚度**，报板厚与材质来确认」 | 竖直 vs 卧式的占地差是布置决定的 —— 方向可留，数字不可留 |
| 7 | `applications` 47 的 `commonly under 100 V` 无来源，且混了设备 ion balance 与材料 residual | 删掉通用数值。改为「静电控制按**你自己零件能容忍的残余表面电压**设定 —— 这是与消静电器 ion balance **不同的指标**，由你的工艺定义」 | 光学面软、带涂层、不能受重压 —— 可留 |

### 同类残留：Codex 未审的 5 个页面也有

同一句式不止在那 7 页。全站搜索后，`pcb-cleaner`、`smt-cleaner`、
`fpc-4-axis-cleaner`、`fpc-8-axis-cleaner`、`roll-chip-cleaner` 同样带
`no noise, no vibration` / `safe for…` / `never deformed` / `generates no secondary particles`。
**本轮一并改了**，口径与上表一致（收敛到 `polarizer-cleaner:81` 本来就有的窄写法
`smooth, stable operation`）。只改 7 页会留 5 页线上继续保证，下一轮还得再来一次 ——
§12 的方法记录（全站性表述要全文搜索）就是为此。

### 顺带修掉的 body / schema 漂移

`guides/what-is-an-ionizing-bar.astro` 的 FAQPage **11 条里有 6 条**
schema 文本仍是合并前的旧版（正文已经是收窄后的版本）。
这不是本轮改出来的，`4a1e1ee` 上就有。已把 schema 同步到正文逐字一致。
建立了机械校验：解析 `dist/` 全部 FAQPage，与正文 `.faq-answer` 逐条比对。

### 仍缺原始资料（写了边界，不阻塞）

| 缺什么 | 影响的页面 | 没有它就不能说 |
|---|---|---|
| STC-640 实际占地 + 对照卧式机型号 | `pcb-vertical-cleaner` | 任何占地百分比 |
| STC-640 最小板刚度 / 板厚下限（需图纸） | `pcb-vertical-cleaner` | 「适合标准厚度、不适合超薄」这条规则 |
| 磁悬浮驱动实测颗粒数、振动值 | `ccl`、`lcm`、`optical-film` 等 | 零颗粒 / 零振动 / 防微裂纹 / 延寿 |
| ST-G 臭氧 / 颗粒数据 | `st-g-series` | §11 已记 |
| SMT600 原始尺寸 | `smt-cleaner` | §11 已记 |

### 收录状态 ≠ 生产 200

GSC 显示风机页当前**未索引 / URL unknown**，但实时测试**可抓取、可索引**。
这是两件事：**生产环境返回 200 不等于已被收录**。
不要因为 GSC 显示 unknown 就去重建页面，也不要因为线上 200 就当已收录。
