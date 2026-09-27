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
**从「磁悬浮」这个名称反推出来的结果性承诺**。
第一轮改完后 Codex 再核，发现**改得不够**：见下面「第二轮复核」。

### 逐项结果

| # | Codex 指出 | 处理 | 保留的依据 |
|---|---|---|---|
| 1 | `inspection` 155/178/237 仍有 `only flags genuine defects` | 删掉绝对结论。改为「清掉浮尘这一类干扰；之后 AOI 怎么判，取决于它的 recipe 与阈值，不取决于清洁机」 | 浮尘会被读成缺陷 —— 机理，可留 |
| 2 | `optical-film` 157/215 `safe for all standard optical film surfaces` 与 165 的样品确认冲突 | 统一到 165 的口径：是否耐受取决于涂层 / 表面 / 胶辊黏性 / 传输压力，**样品确认后才上生产卷** | 无研磨、无溶剂、无 UV —— 工艺事实，可留 |
| 3 | `polarizer` 166/220 `safe for functional layers` 与 72–73 的样品验证冲突 | 改为「功能层是否耐受由你自己材料上的样品试验判定，不由规格书判定」 | 同上 |
| 4 | `backlight` 76–77/91、`ccl` 76–77/90/153/180/233 的 `no damage` / 永不变形 / 零振动 / 防微裂纹 | 这些句子改了，但**换成了另一个推导**（「不走接触轴承」）—— 见第二轮复核第 3 条。微裂纹与振动已写**未发布实测数据** | 磁悬浮驱动本身、薄清洁层降低接触压力 —— 结构事实，可留 |
| 5 | `lcm` 115 把 detection 放在 Throughput 字段；154/170/222 的零颗粒 / 无轴承 / 显著延寿 | 规格表字段改为 **Detection & Recording**；颗粒数与寿命对比已写未发布。但「磁力承载、不走接触轴承」仍是推导 —— 见第二轮复核第 3 条 | 密封外壳隔离生产环境 —— 结构事实，可留。已改好的「1 片/秒检测」表述**未再改动** |
| 6 | `pcb-vertical` 152/160/218 的 60%：加前提不能证明数字 | 数字撤下了，但换成了 `well below`（**仍是无证据的大小比较**）—— 见第二轮复核第 1 条。同时不再从产品名反推刚性规则 —— 改为「板需在竖直传输中自持平整，**未发布最小刚度**，报板厚与材质来确认」 | 竖直 vs 卧式的占地差是布置决定的 —— 方向可留，数字不可留 |
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

### 第二轮复核（Codex 复核 PR #7 head `c4a4899`）

结构通过（14 页标签/属性序列无改，82 条 FAQ 与 schema 一致），但内容仍有同类残留。
**我上一轮犯的错：把一个推导换成了另一个推导。**

| # | 仍然残留 | 本轮改法 |
|---|---|---|
| 1 | `pcb-vertical` 152/160/218：60% 换成 `well below` —— **仍是无尺寸、无对照机型的大小比较** | **删掉全部大小比较**（含 46/50/62/80/137/145/152/160/218）。只说明**布置**：板在清洁路径上竖着走、卧式机是平放，所以占位方式不同。是否放得下请客户用**实际设备外形图 + 进出料间隙 + 辊子维修空间**确认 |
| 2 | `lcm` 143 `without generating particles`；`backlight` 166/182/235 `no friction particles` / `free of friction particles and vibration`；`ccl` 102 `eliminates noise and vibration`、112 `prevents deformation` | 全部改成**可证实的机构 + 用途 + 需验证的实际影响**。例：磁悬浮只说「传输设计 / specified for」，颗粒与振动一律写未发布实测值，实际影响请在自己材料上确认 |
| 3 | **`lcm` 154/170/222、`ccl` 57/181/234 断言无 contact bearings** —— 仓库里没有结构图或 BOM 能证明轴承构造 | 删掉轴承事实。**只保留产品资料确实给出的东西：磁悬浮驱动这个名称**（`lcm` 另有密封 + 专利，资料有，保留）。内部构造明确写未发布 |

**补充定位（同一次复核）**：`polarizer` 158「without stressing the polarizer's optical layers」、
`pcb-vertical` 50「without deforming PCB substrates」、`smt` 79「prevents deformation or creasing」、
`ccl` 112 —— 同一类保证，已一并收窄。

**语义同类搜索（不只匹配原句）** 又查出 Codex 未点到的同类：
`fpc-8-axis` 142/169/221（`eliminates all mechanical vibration`、`without mechanical stress`）、
`fpc-4-axis` 92/169/221（`frictionless`、`vibration-free`、`does not stress or deform`）、
`pcb-cleaner` 93/147（`frictionless`、`vibration-free`、`without compromising the foil integrity`）、
`polarizer` 93、`optical-film` 93/165/169/217/218、`roll-chip` 49/73/83/99/100、
`ccl` 124 规格表 `Magnetic Levitation (frictionless)`、`ccl`/`roll-chip` 的 `Material Safe` 卡片标题。
全部按同一口径改完。

### 这一类的统一口径（以后照这个写）

1. **只写产品资料给出的东西**：驱动叫「磁悬浮」可以写；由这个名字推出「无接触轴承」「frictionless」**不行** —— 那是结构图和 BOM 才能证明的。
2. **机构可以写，结果不能保证**：写「specified for 平稳传输」，不写「消除振动」。
3. **没有实测值就明说没有**：「我们未发布该驱动的实测颗粒数 / 振动值」，然后给出验证路径（样品试跑 / 索取图纸）。
4. **不变形 / 不损伤 / 不受应力**一律改成「压力与胶辊黏性按材料设定，样品确认」。
5. **大小比较必须有本机尺寸 + 对照机型**；两者缺一，就只描述布置方式，让客户拿外形图自己核。

---

## 14. 三款离子棒之间的比较口径（2026-09-12，第四批）

### 先说一个查证结果：`index.astro` 的 `desc` 字段根本没有渲染

Codex 定位的 11 / 18 / 25 行（ST-G「best ion balance in the range」、ST-E 的 +150 %
推导、ST-F 的 2.5×）都在 `barProducts[].desc` 里。**这个字段全站没有任何地方用到** ——
卡片只渲染 `code` / `name` / `specs`（216–226 行），JSON-LD 只取 `name` / `url` / `image`
（147–153 行）。`dist/` 里搜 `all-round bar`、`wide-span bar`、`speed model` 全部为 0。

所以这三条 **从未出现在生产 HTML 或结构化数据里**。真正上线的是 `specs` 芯片，
`+150 % ion output` 和 `2.5× faster neutralizing` 就在里面 —— 这两条是实打实的线上问题。

`desc` 还是照改了：留着错的源码，下次谁把这个字段接上就直接上线了。
**但验收时要知道哪些是线上、哪些是死代码**，别把它当成生产状态。

### 原始资料实际支持什么

把三个型号页读完，这两个数字是**整个智能棒系列的共同标称值**，不是某一款的差异点：

| 出现位置 | 原文 |
|---|---|
| `st-g-series:166`、`st-e-series:104`、`st-f-series:104` | `Neutralizes twice as fast as a conventional bar, using a supersonic structure` |
| `st-g-series:167`、`st-e-series:105`、`st-f-series:105` | `150 % more ion generation than a conventional design` |

三款棒**逐字都有这两条**。所以：
- **+150 % 不是 ST-E 独有**，把它包装成 ST-E 的差异点是错的；
- ST-E 真正的差异点是**交替排列的固定极性针**（每根针只管一种极性），型号页
  对比表本来就是这么写的 —— 宽幅表现应该归给这个结构，不是归给那个数字。

**2.5× 的比较对象是常规棒。** 但 `st-g-series:364`/`516` 写的是
「supersonic 结构让 ST-G 比常规棒快约 2 倍；……**the ST-F is 2.5× faster still**」——
`still` 让人读成「在 2 倍之上再快 2.5 倍」（即 5 倍常规，或比 ST-G 快 2.5 倍）。
实际是 ST-F 标称 2.5× 常规、ST-G 标称 2× 常规，**ST-F 只比 ST-G 快 1.25 倍**。已改。

### 资料缺口（缺这些就不能把数字写成结果保证）

| 缺什么 | 影响 |
|---|---|
| +150 % 的对照机型与测试条件 | 不能由这个数字推出宽幅/长距离均匀性 |
| 2× / 2.5× 的对照机型与测试条件 | 不能把速度写成保证，只能写标称倍数 |
| ST-G 与 ST-F 在同一条件下的实测衰减时间 | 不能说 ST-F 比 ST-G 快多少 |

按交接要求**没有编造测试条件，也没有加 `up to` 之类的限定词** —— 缺就写明「未发布
对照机型与测试条件」。

### 顺带修掉的同页矛盾

`index.astro:11` 的「best ion balance in the range at ±50 V」与**同页风机 `0 V ±10 V`**
直接矛盾（41–56 行三款风机都是 ±10 V）。已限定为「三款离子棒中最紧」——
型号页 `st-g-series:340`/`468` 本来就写的是 `the tightest of the three Shidike bar series`，
索引页是唯一的例外。同理 `index.astro:128` 的 meta 由 `ion balance from ±50 V`
改为 `bar ion balance from ±50 V`（该页同时列了风机）。

### 一条方法记录

**定位声明时要确认它是否真的渲染。** 这一批三条里有三条在死字段里。
源码 grep 到的行号不等于线上内容 —— 要回到 `dist/` 里确认。

---

## 15. 第五批：事实冲突、归因与内链（2026-09-27）

基线 `origin/main` = `73f59b87dfea8c44d0006e198766d5dcbe446963`。
云端**无法访问生产**（出口代理对 `www.dg-sdk.com` CONNECT 403），也看不到 Mac 未提交修改，
所以生产 SHA 未独立核实，只核到远程 main 与 Codex 快照一致。

### 事实表（原句 → 依据 → 修订）

| # | 原句与位置 | 冲突/缺口 | 依据 | 修订 |
|---|---|---|---|---|
| A1 | `st-g/e/f-series` 各一处：`All three bar series run a 6.5 kV DC pulse` | **本行理由已于 2026-09-27 更正，见 §16.1a。** 原写「DC 脉冲是单极性，两者不能同真」—— 这是错的，厂方自己的 ST-E / ST-F 图里脉冲 DC 就是正负双极性的 | 真正的依据：catalog 第 11 页参数表把 `Output Mode` 写成 **`AC pulse / DC pulse 6.5 KV`** —— 原文自己并列了两种模式，没有给出单一定语 | 结果不变：`rated 6.5 kV pulse output`，这正是对一句并列原文的忠实转述。**放电方式本身有 catalog 支持（Pulse-AC），不属待核**；待核的是这一栏并列的含义与 6.5 kV 的定义 |
| A2 | `st-g-series` 6/53/64/199、`products.js:22-23`、`blog/st-g-…:178,193`、`applications:57,95`、`static-eliminator/index:39,76,122`、`static-eliminator-manufacturer:98`、两份指南 ST-G 行、`ionizing-bar-voltage-output` 全页、`sitemap-images:300` | 同上，ST-G 自身口径 | 同上（理由见 §16.1a / §16.1b） | 同上。**ST-E / ST-F 保留 `DC pulse`** —— 两款各有指名型号的图，方向与 catalog 一致，不做全局替换 |
| A3 | `static-eliminator/index:39`：`±50/±80/±100 V — all inside the sub-100 V window` | ±100 V 不在 sub-100 V 窗口内；且把设备 ion balance 与材料残压混为一谈（§259 已在 `applications` 修过，此处残留） | §259 既定口径 | 拆成四件事：供电 / 发射高压 / ion balance / 材料残余表面电压（由客户工艺定义） |
| B1 | `non-contact-cleaning-machine` title/H1/breadcrumb/卡片/FAQ | 标题写 non-contact，正文写「刷子 run against the board」「brushing a dry surface generates charge」—— 刷子接触基材即接触式 | `guides/what-is-web-cleaning:44,57`：「按清洁时接触材料的部件分类。驱动类型、有无抽吸、没有胶黏都不决定是否非接触」「刷式清洁仍是接触式，即使没有黏辊；磁力驱动也不使其清洁辊变成非接触」；同页表格已命名该工艺为 **Brush and vacuum cleaning** | 全部改为 Brush and Vacuum。**URL 不动**。「non-contact」只在页面**纠正**它的地方保留（那是搜索词）；**不虚构真正无接触机型** |
| B2 | `cleaning-machine/index:38`：`Non-contact refers to the transport: a magnetic levitation drive…` | 与指南第 57 行逐字矛盾 | 同上 | 换成指南的判据 |
| C1 | `contact-` / `non-contact-cleaning-machine` 的 `99.9 %`、`products.js` 三条 chip、类目卡两条 | 无粒径、无材料、无计数方法 | 无一手资料 | 保留数字，标为 rated，并在两页各写明缺失条件一次 |
| C2 | `st-f-series` title/desc/43/52/69/97/100/244/336、`products.js:36-37`、两份指南 183/211 与对照表 | 对照表早已写 rated 且注明无对照机型与测试条件，型号页仍当事实陈述 | §365 既定：只能写标称倍数 | 全部改为 rated / nominal，并补一句「非你线上的保证衰减时间」 |
| C3 | 三款离子棒 spec 表 `Static decay time 1 s` | 无初始电压、无距离、无测量方法（风机页已按距离与方法公布） | 风机页既有写法 | 标为 rated 并列出缺失条件 |
| C4 | `backlight-cleaner:104` `damage-free cleaning` | 无条件表面保证，同页正文却写「confirm it on your own film」 | 同页正文 | 收窄为「清洁过程不应留痕，是否留痕以你的膜为准」 |
| C5 | `contact-cleaning-machine:113` 磁悬浮「runs through without curling or folding a corner」 | 由「磁悬浮」这个名称推出结果 | §302 既定：名称可写，结果不可 | 只留驱动名称，结果交样品确认 |
| D1 | `industrial-static-eliminator` / `esd-control-products` 各 3 条 FAQPage schema | schema 文本与正文用词漂移（**既有问题**，基线 build 完全相同） | §270 既定方向 | schema 同步到正文逐字一致 |
| D2 | `esd-control-products:206`：棒「available in standard lengths」 | 与全部型号页及 `static-eliminator-manufacturer:15`「made to order from 300 mm to 3 m … rather than to a catalogue size」矛盾 | 同上 | **这条是正文错、schema 对**，改正文 |
| E1 | `pcb-cleaner:6` meta：`Removes flux residues` | 同页 FAQ 写「dry adhesive roller cleaning … no water, solvents, or drying step」；指南写干式辊清洁不是水洗/溶剂洗 | 同页 FAQ + 指南 | 去掉 flux；保留 dust/particles，并写明这不是湿洗/溶剂/助焊剂清洗 |
| E2 | `products.js:150` chip `Unwind + rewind` | 该机 spec 表无放卷收卷项；chip 出现在导航与类目卡上像是机器配置 | 同页 spec 表 | 改为 `Roll and sheet`。**交付边界这一条后来又改了一次**：仓库里没有任何报价单或供货范围表，「规格表没列」不能证明「默认不含」，所以页面最终写的是**请在报价中确认是否包含**放收卷 / 张力 / 下游工序，不写成确定排除 |

**不改、已经是对的**：发射针清洁周期。四个页面本来就按环境分档（标准工况月度到季度 /
粉尘油雾每周 / 洁净室三到六个月），这正是 C 要求的条件化，无需再动。

### 可发现性（只改可改的，不声称收录）

- 风机页 `/products/static-eliminator/ionizing-air-blowers`：自 canonical、`robots index, follow`、
  在 `sitemap.xml` 内、45 页都有链接 —— 但**只因为它在导航里**。剥掉 header/footer/nav 后
  **45 页里只有 4 页**从正文链它，而 `/guides/what-is-an-ionizing-bar`（站内 113 次点击里的 62 次、
  均位 8.4）**不在其中**。已从该指南的对照表与 bar-vs-blower 问答、类目页风机段与结尾段
  补 4 个正文入口（都是给已有词加链接，不加文案、不复制表格）。
- 该页标题层级原为 H1 → H3 → H2（侧栏 `Browse Categories` 用了 h3）。另两个类目页早已用 h2。
  各页有自己的 scoped 样式块，本页写 `.products-sidebar-box h3`、另两页写 h2，所以**选择器随元素一起改**。
  Chromium 前后实测 12.5px / 700 / rgb(125,141,151) / 10px / 15px 行盒三页一致，视觉零变化。
- `what-is-web-cleaning`（已收录、均位 15）原本只有 3 个列表页从正文链它，**没有一个清洁产品页**。
  已从类目页、两个工艺页、卷材机补 4 条，3/45 → 7/45。
- **未做并记录原因**：风机页是唯一不在 `sitemap-images.xml` 的产品详情页，但它那四张型号图
  已在各自型号页下列出，补上只是重复条目、无发现增益。
- **三种状态分开**：以上只改变「可被发现的程度」。公开可抓取 ≠ Google 已抓取 ≠ 实际收录。
  本批**不向 GSC 请求索引**。

### 询盘归因（实测，全程拦截，未向真实收件人发送任何询盘）

| 怀疑 | 实测结果 |
|---|---|
| 21 产品页重复 `#quoteModal` 导致双提交 | **不成立**。一次点击 = 恰好一个请求（桌面与 390px 均如此）。两段脚本都取到第一个元素、都加同一个 class，幂等 |
| 重复 ID 导致丢单 | **不成立**。用户看得见的那个表单就是会提交的那个 |
| 真正的后果 | `Layout.astro` 的全站弹窗**在 45 页全部打不开**：产品页上它是第二个 `#quoteModal`；其余 24 页**没有任何 `.quote-btn`**（导航的「Get a Quote」是指向 `/contact` 的链接）。没有任何已发布 JS 引用它。已移除 —— 同时消掉 21 页的重复 ID 与 45 页的一个隐藏 Formspree 表单 |
| `public/js/inquiry.js` | 仓库里**不存在**，与「线上 404」一致。不视为已启用，不搬运 |
| **归因本身** | `quoteFormProduct` 原本只发 website/name/email/phone/message —— 从 ST-G 页发出的询盘与从 FPC 清洁机页发出的**无法区分**。`/contact` 与首页表单本就带上下文。已补隐藏字段：`_subject` / `source=product-page` / `product` / `model`（有 sku 时）/ `page` / `entry`。`entry` 区分同页三个按钮（Get a Quote / Ask an Engineer / Request a Quote），它们本来也无法区分 |
| 只记页面/产品/入口 | 未新增任何个人字段，未引入任何分析调用 |

键盘与焦点（改前 → 改后，逐项实测）：Escape 不关闭 → 关闭并解锁滚动；焦点留在按钮上 →
落到第一个输入框；Tab 走出弹窗到 WhatsApp/About Shidike → Tab 环锁在弹窗内；
背景仍可滚动 → 打开时锁定、关闭时还原；无 role/aria-modal → `role="dialog"`、
`aria-modal="true"`、由自身标题标注；关闭后焦点无处可去 → 回到打开它的那个按钮。
表单标记与提交处理除隐藏字段外未改动。

**成功响应 ≠ 实际收到 ≠ 合格询盘。** 本批只让第一种变得可归因。

---

## 15b. `dateModified` 是手工维护的，已经漂了两次（2026-09-27）

站上 10 个 Article schema 的 `dateModified` 没有任何脚本在管，全靠手写。
这一轮先漂了一次（3 页停在 09-01，2 页差 11 天），我修完之后**又漏了 5 页** ——
因为我 grep 只写了双引号键 `"dateModified"`，而一半页面用的是单引号 JS 写法
`dateModified: '…'`。11 个日期字段只看见 5 个。

**教训**：找字段不要只按一种引号写法 grep，先确认这个键在仓库里有几种写法。

**当前口径**（与 `scripts/sync-sitemap.js` 对 `<lastmod>` 的规则一致）：
取**最后一次改变该页自身内容**的提交日期；
**不算**全站 banner / 版式这类共享改动 —— 所以 `what-is-web-cleaning` 保持 2026-09-12，
它那两次 09-17 提交是 banner（#22/#23），不是文章内容。

**建议（尚未实施，等你或 Codex 定）**：把这个字段也接进 `sync-sitemap.js` 的同一套推导，
加 `--check` 让 CI 拦住漂移。`lastmod` 当初就是因为同样的手工维护出过问题才改成从 git 推导的。
本轮按「只做收尾两项、不自行扩范围」没有动脚本。

## 16. 工程待核字段（本批只整理，不写进公开页）

只列**真实存在**的待核项。没有一手记录前不得包装成实测数据，不造手册、不做占位下载按钮。
拿到后复用 Resources，不新建耗材页 / 测试指南 / 案例页 / 德语页（本批不创建）。

### 16.1 ST-G 离子棒

| 待核字段 | 为什么需要 | 没有它不能说 |
|---|---|---|
| **ST-G 的放电方式 —— 有 catalog 型号原文支持，保留**（见 §16.1b） | `SHIDIKE CATALOG v3.pdf` 第 11 页标题 `MODEL: ST-G (AC INTEGRATED)` 与 Product Introduction 明写 Pulse-AC、单针交替正负 | 可以写「ST-G 采用 pulsed AC」这一**产品资料描述**；**不能**写成独立实测已验证，不能给 6.5 kV 补 ±。待核的是参数表 `AC pulse / DC pulse` 并列的含义，不是放电方式本身 |
| **6.5 kV 的定义：Vmax / Vmin / Vpp，以及测量参考点** | 现在无定语。注意：**Vpp = Vmax − Vmin**，只有在相对同一参考点正负峰等幅对称时，6.5 kVpp 才等于单侧 3.25 kV；+4 kV / −2.5 kV 同样是 6.5 kVpp | 不能与 KEYENCE / Simco-Ion / Meech 的 kV 数字直接比较；不能把 `6.5 kV pulse output` 写成 `±6.5 kV`；不能由 Vpp 反推单侧幅值 |
| 型号版本号与出厂标识（哪一版对应现售） | 资料版本不明 | 不能写「当前型号」的任何差异点 |
| `Static decay time 1 s` 的初始表面电压、测点距离、测量方法、正/负分别数值 | 现为裸值 | 不能写成你线上的衰减时间；不能与风机的 1.5 s @150 mm 对比 |
| 2× / 150 % 的对照机型与测试条件 | §365 已记，仍缺 | 不能由此推出宽幅或高速下的均匀性 |
| 臭氧浓度与颗粒发生量（测法、距离、风量条件） | §11 已记 | 不能写洁净室适用性、不能写「低臭氧」 |
| 尺寸安装：30 × 82 mm 截面之外的端部接口尺寸、air fitting 规格、安装支架型号、`P = L − 120 mm` 的适用长度范围 | 安装可行性靠这些判断 | 不能承诺装得下 |
| 维护：发射针更换件号、单售与否、更换扭矩/工具 | 耗材页本批不建，但询价要问得准 | 不能列耗材价格或周期承诺 |
| 原始记录：出厂检验报告、CE 文件编号与范围 | 目前只有「CE marked」（风机） | 不能给棒加任何认证声明 |

### 16.1a 撤回与更正记录：ST-G 放电方式（2026-09-27，两次）

**第一次撤回 —— 我把一句疑问当成了产品工程确认。**
用户说「不就是 AC 脉冲吗」，那是**疑问**；随后他明确说「所以 ST-G 是什么的，我也不知道」。
我据此写下「已定 / James Hu 确认」并提交。**撤回的是这个归属** ——
不是「ST-G 用 Pulse-AC」这件事本身。不拿用户的口头反问当型号确认。

**第二次更正 —— 我只在 repo 里找证据，找不到就写成「没有资料」。**
我上一版写过「仓库里没有任何一张图指名 ST-G，所以没有型号级资料支持任何一种定语」。
前半句对（限于本仓库），后半句错：**用户手上的产品目录里 ST-G 是整页专章，明确指名**。
「本仓库里没有」不等于「不存在」，何况用户此前提过 catalog。已改正，见 §16.1b。

**技术论证的更正（这条仍然成立）。** 我写过「DC pulse 必然单极性，所以与交替正负冲突」——
这个前提不成立：厂方 ST-F 图里 pulsed DC 就是正负轮流输出的，区别在「单个脉冲内极性变不变」；
KEYENCE 把单针交替正负称 Pulse AC，Simco-Ion 使用 bipolar DC 命名，**标签不决定电路**。

**算术更正（仍然成立）。** 我说过「若为峰峰值则单侧只有 3.25 kV」。
只有在**相对同一参考点、正负峰等幅对称**时才成立（Vpp = Vmax − Vmin）；
+4 kV / −2.5 kV 同样是 6.5 kVpp。不能由 Vpp 反推单侧幅值。

### 16.1b 证据状态：ST-G 的 Pulse-AC **有型号原始资料支持**

**一手来源（由 Codex 在用户 Mac 上找到、逐页抽取并目视核对；我在云端无法访问该文件，
未亲自查验，以下为转述）：**

| 项 | 值 |
|---|---|
| 文件 | `/Users/henry/Desktop/Business_DGSDK/史帝克图片/SHIDIKE CATALOG v3.pdf`（18 页） |
| SHA256 | `743654231bfaf9a7cc135280377eacaec84d554e1e261204f7ff40a9a0612996` |
| 交叉核对 | `SHIDIKE CATALOG.pdf`，SHA256 `8a2e229ce06369027d5ac8631fef1886ba03c71f1a6c393f28ffb6439fa51ae3`，G/E/F 对应页抽取文字与 v3 一致 |
| 页码 | **第 11 页（ST-G 整页）** |

**第 11 页原文（决定性的是标题与正文，不是配图）：**

- 标题：`SHIDIKE SMART IONIZING BAR / MODEL: ST-G (AC INTEGRATED)`
- Product Introduction：`The ST-G series Smart Ionizing Bar uses Pulse-AC mode for high
  efficiency and a small form factor. Pulse-AC alternately applies "+" and "-" high voltage
  to a single electrode pin to generate ions of both polarities.`
- 同页右侧 Operating Mode 图标注 Pulsed AC Mode，`0.1 Hz to 100 Hz`（**辅助证据**）
- 参数表：`Product Model ST-G` / `Input Voltage DC 24V` / `Power 12 W` /
  `Ion Generation Method Corona discharge` / **`Output Mode AC pulse / DC pulse 6.5 KV`** /
  `Ion Balance ±50 V`

**结论：站上「ST-G 采用 pulsed AC、单针交替正负」这一资料描述有型号原文支持，保留。**
它是**产品资料依据**，不是独立实测硬件 —— 两者仍要分清，但已足够支撑产品文案。

### 16.1c 真正还没解决的（不要再扩大成「整个放电方式没依据」）

1. **参数表 `Output Mode: AC pulse / DC pulse 6.5 KV` 的含义。**
   同一栏并列写了两种模式。可能是多模式可选，可能是三个系列共用的通用表。
   **不得直接判为笔误**，也不得据此否认同页指名 ST-G 的 Pulse-AC 说明。
2. **6.5 kV 的定义：Vmax / Vmin / Vpp，以及测量参考点 —— 用户本人也不知道（2026-09-27）。**
   他明确说不清楚这是峰值还是有效值。**这句话不构成数值定义**，和之前那句「不就是 AC 脉冲吗」
   一样，属于聊天，不是资料。此项维持待核。

   网站维持 catalog 的 `6.5 kV` 原值，**不加** peak / RMS / peak-to-peak / `±`，
   **不做换算**，**不做跨品牌电压性能结论**。
   Codex 那句「倾向脉冲幅值 / 峰值」是**低把握推测**，
   **不得进入规格表，也不得写进任何「已确认」记录**。

3. **对标品牌：Simco，但具体型号不明（用户本人不记得）。**
   Simco-Ion 不同型号的电压口径本就不同。**未知对应型号时，不得用任何 Simco 规格反推 ST-G**，
   也不得据此判断 6.5 kV 是哪一种定义。站上目前**没有出现任何竞品名**，保持如此。
4. **仓库那三张 JPEG 的来源。** 带 Shidike 抬头**不等于**未经改写的厂家原图。
   其中 `operating-modes.jpg` 纵轴标 **±7 kV**，与 catalog 的 6.5 kV 不一致，
   且该图**不指名型号**。**不要用这类泛指图去覆盖 catalog 的型号数据，也不要从它推导型号事实。**
   待办：追溯这三张图的出处，确认是否出自同一份 catalog 的哪一页。

| 文件 | 图上写明的型号 | 状态 |
|---|---|---|
| `mode-pulsed-dc.jpg` | ST-F | 与 catalog 方向一致，来源待追溯 |
| `mode-hf-pulsed-dc.jpg` | ST-E | 同上 |
| `operating-modes.jpg` | **无型号** | **±7 kV 与 catalog 6.5 kV 冲突；不作为 ST-G 依据** |

### 16.1c-bis 一条长期规则（第三次踩到了）

**聊天不是资料。** 已经有三次把对话内容误当依据的风险点：
「不就是 AC 脉冲吗」（疑问）、「我也不知道」（不知道）、「对标 Simco」（不记得型号）。
这些都**不能**写进规格、不能写进「已确认」、不能作为推导前提。
能进规格的只有：**指名型号的原始资料**（如 catalog 第 11 页），或**带原始记录的实测**。
第三方（Codex 或我）的倾向性推测，无论多合理，都停在「推测」这一栏。

### 16.1d 要向工厂问的（ST-G）

1. 参数表 `AC pulse / DC pulse` 并列：是可选双模式，还是通用表沿用？
2. 现售型号与 catalog 版本号（v3 是否为现行版）。
3. 每根针交替正负，还是正负针分组。
4. 测量参考点（针对地 / 针对针 / 对被测板）。
5. **Vmax / Vmin / Vpp 三个值**，不要只给一个「6.5 kV」。
6. 频率与占空比（Ton / Toff / T）；0.1–100 Hz 是范围还是典型值。
7. 已有测试记录：出厂波形图、charged plate monitor 原始数据、检验单。

### 16.2 一款资料最成熟的风机：ST-S200

选它是因为站上已有最完整的可核数据（450 × 450 mm、≤1.5 s @150 mm、300 mm 处 3 s、
≤48.2 CFM、≤38.9 dB、0.05 ppm 臭氧、±5000 V、128 × 53.5 × 180 mm、400 g、CE、一年保）。

| 待核字段 | 说明 |
|---|---|
| **距离与测点**：1.5 s 与 3 s 各自的测点位置、被测板尺寸、初始电压、终止电压阈值 | 现只写「measured 150 mm in front of the outlet」，缺初始/终止电压 |
| **风量档位**：≤48.2 CFM 是哪一档；各档对应的衰减时间与噪音 | 现为单值加「fan speed is adjustable」 |
| **离子平衡（offset voltage）**：ST-S200 未公布偏置电压（§126 已记） | 另三款风机（ST101A / ST104A / ST1200）都写 0 V ±10 V；ST-S200 的 spec 表明写「No offset voltage published for this model」 |
| **正/负分别的起止电压与衰减时间** | ST101A / ST104A / ST1200 有正负分列（如 ST101A 300 mm 处正 1.2 s、负 1.3 s），ST-S200 只有合并值 |
| 仪器：charged plate monitor 型号、板尺寸、电容、环境温湿度 | 所有衰减数字的前提 |
| 0.05 ppm 臭氧的测点、距离、运行时长、仪器 | 现为裸值 |
| 原始记录：出厂测试单、CE 证书编号与适用指令 | 现只写「CE marked」 |

### 16.3 一款清洁配置：STMT750（刷+抽吸，已改名 Brush and Vacuum）

| 待核字段 | 说明 |
|---|---|
| **材料**：适用基材清单、表面处理/涂层、禁用材料 | 现只写「set from your sample」 |
| **幅宽与厚度**：750 mm 之外的可做幅宽区间；厚度上下限（`Roller gap adjusts automatically` 的实际行程） | 厚度区间完全缺 |
| **速度**：0–45 m/min 与清洁效果的关系（各速度下的去除率） | 现为裸区间 |
| **接触面**：两种刷（cotton-nylon / Tetoron）的毛径、密度、转速、压入量、更换周期 | 决定会不会刮伤 |
| **输送接口**：进出料辊高度、辊距、与上下游的对接方式、所需前后留空 | 现只写「inline unit with roller conveyors either side」 |
| **标准配置与选配的分界**：黏辊与低静电纸卷是标配还是选配；VJ-2.2HLS 集尘器是否随机 | 现写「carries adhesive rollers as well」「a separate collector sits beside the machine」，界线不清 |
| **抽吸与收集**：2200 m³/h 是集尘器额定还是机口实测；8 m² Toray 滤芯件号、过滤等级、更换周期；30 L 抽屉满载时长 | 混了两套数据 |
| **去除率 99.9 % 的条件**：粒径区间、采样方法、清洁前后计数、重复次数、环境洁净度、表面检查判据 | 本批已标 rated 并写明缺失，这是补齐它需要的全部字段 |
| **静电 <100 V**：测点、仪器、初始电压、是进料侧还是出料侧 | 现为裸值 |
| 原始记录：出厂检验单、辊胶卷尺寸与零件号、可公开的许可/认证范围 | 耗材单售与适配关系也在此确认 |

### 16.4 本批明确不做

耗材独立页、测试指南、新案例页、德语页 —— 不创建。
未拿到一手数据前不写任何实测数字，不放待补参数占位，不放空下载按钮。
