# 第五批交付：事实冲突、归因与内链

给 Codex 验收用。本文件与 `batch5.patch`、`shots/batch5/` 一起构成交付。
两者都在工作目录下，未提交进 git。

---

## 1. 基线与环境限制

| 项 | 值 |
|---|---|
| 环境 | claude.ai 云端容器，Linux，Node v22.22.2 / npm 10.9.7 |
| 基线 | `origin/main` = `73f59b87dfea8c44d0006e198766d5dcbe446963`（与 Codex 快照一致） |
| 分支 | `claude/wonderful-knuth-j9h2oc`，从最新 `origin/main` 重开 |
| Codex 审查 HEAD | `65a1438e90dbd3ad7514d0125edf0c5f647a13de`（其 Vercel Preview 已由 Codex 独立核到 READY） |
| 当前 HEAD | 见文末「变更记录」，本文件随每次追加更新 |
| 提交 | 见 §3 |
| 补丁 | `batch5.patch` 为一次性导出，**会过期**；随时用 `git diff origin/main..HEAD` 重新生成 |

**明确的限制，不声称已验证的部分：**

- **生产环境无法访问。** 出口代理对 `www.dg-sdk.com` 与 `dg-sdk.com` 返回 CONNECT 403。
  **生产 SHA 未独立核实**，只核到远程 main 与快照 SHA 一致。
- **看不到 Mac 上 `/Users/henry/dgsdk-site` 的未提交修改。**
- **无 GSC 访问。** 收录状态全部引自简报，未自行查证，本批也**未向 GSC 请求索引**。
- **未 merge、未推 main、未做生产部署。** 分支已在 2026-09-27 经用户明确授权后推送，
  Vercel 因此产生了**公开 preview**（这是分支推送的必然结果，不是生产部署）。
  后续提交沿用该授权继续推同一分支。
- **未向真实收件人发送任何询盘。** 所有 Formspree 请求在浏览器层被拦截并本地应答。

`claude/wonderful-knuth-j9h2oc` 的 PR #21 早已 squash 合并（`330aa94`），
按规则从最新 default 分支重开、同名保留。

---

## 2. 逐条：URL、改了什么、依据

完整事实表在 `SEO-NOTES.md` §15（原句 → 冲突 → 依据 → 修订）。这里是索引。

### A. ST-G 的 pulsed AC 与「6.5 kV DC pulse」

> **本节理由已于 2026-09-27 更正，见 `SEO-NOTES.md` §16.1a。**
> 我原先写「DC 脉冲是单极性，所以与交替正负不能同真」—— **这是错的**。
> 仓库里厂方自己的 `mode-pulsed-dc.jpg`（图上写明 ST-F）和 `mode-hf-pulsed-dc.jpg`
> （图上写明 ST-E）都显示脉冲 DC **本身就有正负两种极性**，区别在「一个脉冲内极性变不变」。
> 业界命名同样不能反推电路：KEYENCE 把单针交替正负称 Pulse AC，Simco-Ion 使用 bipolar DC。
> 所以 `6.5 kV DC pulse` 对 ST-G **未必是矛盾**。

厂方资料同时说 ST-G 是 pulsed AC 和输出 6.5 kV **DC** 脉冲，这两句需要型号级资料才能判定。
而仓库里**没有任何一张图指名 ST-G**：唯一写 Pulsed AC 的 `operating-modes.jpg` 是泛指
「Shidike ionizing bars」，而且它标的是 **±7 kV，与全站规格表的 6.5 kV 对不上**（新冲突，未解决）。

所以输出改为 `rated 6.5 kV pulse output`，**理由是「没有型号级资料支持任何一种定语」**，
不是「DC 一定错」。**ST-G 的放电方式仍属待工厂核实**，站上现有的 pulsed AC 措辞只是
既有资料口径，不是已验证结论。

**ST-E / ST-F 保留 `DC pulse`** —— 这两款有厂方图**指名**，不做全局替换。

涉及 URL：`/products/static-eliminator/st-g-series`、`/st-e-series`、`/st-f-series`、
`/products/static-eliminator`、`/applications`、`/static-eliminator-manufacturer`、
`/guides/ionizing-bar-voltage-output`、`/guides/industrial-static-eliminator`、
`/guides/esd-control-products`、`/blog/st-g-ionizing-bar-guide`。

顺带：类目页 FAQ 曾写「±50/±80/±100 V 全都落在 sub-100 V 窗口内」——
±100 V 并不在窗口内，且把设备 ion balance 与材料残余表面电压混为一谈。
已按 §259 既定口径拆成四件事：供电 / 发射高压 / ion balance / 材料残压。

### B. 「非接触清洁机」其实是刷式机

页面自己写刷子「run against the board」「brushing a dry surface generates charge」。
刷子接触基材，就是接触式。

**判据是站内自己已经发布的**：`/guides/what-is-web-cleaning` 写着
「按清洁时接触材料的部件分类；驱动类型、有无抽吸、没有胶黏都不决定是否非接触」
「刷式清洁仍是接触式，即使没有黏辊；磁力驱动也不使其清洁辊变成非接触」，
同页表格已把该工艺命名为 **Brush and vacuum cleaning**。

title / H1 / 面包屑 / 卡片 / 正文 / FAQ / schema 全部改为 Brush and Vacuum。
**URL `/products/cleaning-machine/non-contact-cleaning-machine` 不动。**
「non-contact」只保留在页面**纠正**它的地方（那是搜索词，纠正比断言更有用），
**没有虚构任何真正无接触的机型**。

原先站上有三套互相冲突的「非接触」定义，另外两套一并处理：产品页的
「没有黏性物压在表面上」，以及类目页 FAQ 的「非接触指输送用磁悬浮」（与指南逐字矛盾）。

### C. 有对象和条件才成立的数字

| 数字 | 缺什么 | 处理 |
|---|---|---|
| `99.9 %` 去除率 | 粒径、材料、计数方法 | 保留数字标为 rated，两页各写明一次缺失条件 |
| ST-F `2.5×` | 对照机型与测试条件（对照表早已写 rated，型号页与两份指南没写） | 全部改为 rated / nominal，并注明不是你线上的保证衰减时间 |
| `1 s` 衰减时间 | 初始电压、距离、测量方法（风机页已按距离与方法公布，棒没有） | 三个棒 spec 表标为 rated 并列出缺失条件 |
| `damage-free cleaning` | 无条件表面保证，同页正文却写「confirm it on your own film」 | 收窄 |
| 磁悬浮「runs through without curling」 | 由名称推出结果（§302 已定规矩） | 只留驱动名称 |

**发射针清洁周期不改** —— 四个页面本来就按环境分档，已经是 C 要求的条件化。

### D. 机械校验查出来的（**既有问题，不是本批改出来的**）

- `/guides/industrial-static-eliminator` 与 `/guides/esd-control-products`
  各有 3 条 FAQPage schema 文本与正文用词漂移。基线 build 完全相同的漂移。
  按 §270 既定方向，schema 同步到正文逐字一致。
- 其中一条方向相反：`esd-control-products` 正文说棒「available in standard lengths」，
  与全部型号页和 `static-eliminator-manufacturer` 的「made to order from 300 mm to 3 m,
  cut to the charged width … rather than to a catalogue size」矛盾。
  **这条是正文错、schema 对**，所以改的是正文。

### E. 清洁类目两条错误声明

- `/products/cleaning-machine/pcb-cleaner` 的 meta 说「Removes flux residues」，
  而同页 FAQ 写「dry adhesive roller cleaning … no water, solvents, or drying step required」，
  指南写干式辊清洁不是水洗/溶剂洗。flux 是化学残留 —— 去掉，
  并在 meta 里写明这不是湿洗/溶剂/助焊剂清洗（SMT 买家询价前就需要知道）。
- `products.js` 卷材机的 spec chip 写 `Unwind + rewind`，而该机 spec 表里
  没有放卷收卷项。这个 chip 会出现在导航和类目卡上，像是机器配置。
  改为 `Roll and sheet`，并在页面写一次交付边界：报价是清洁主机，
  放收卷 / 张力 / 下游工序是另行设备。

---

## 3. 提交

```
de9dfd1  fix(content)  事实冲突与无依据声明（A / B / C / D）
f056c60  fix(seo)      风机页的正文入口与标题层级
01240c3  fix(inquiry)  产品询盘归因 + 移除打不开的弹窗 + 键盘焦点
f13f364  fix(cleaning) 清洁类目两条错误声明 + 指南内链
4bd87de  docs(seo)     SEO-NOTES §15 事实表、§16 工程待核字段
```

24 个文件，+322 / −206。

---

## 4. 可发现性（三种状态分开陈述）

### 风机页 `/products/static-eliminator/ionizing-air-blowers`

先审计再动手：自 canonical、`robots index, follow`、在 `sitemap.xml` 内、45 页都有链接
—— 但**只因为它在导航里**。把 header / footer / nav 从每个 build 页面剥掉之后，
**45 页里只有 4 页**从正文链它，而 `/guides/what-is-an-ionizing-bar`
（站内 113 次点击里的 62 次、均位 8.4）**不在其中**：
那页讨论了两次 bar-vs-blower，链了全部三个棒型号，从没链过风机。

所以缺口不是可抓取性，是**所有入口都是样板链接**。
已从该指南的对照表与 bar-vs-blower 问答、类目页风机段与结尾段补 4 个正文入口 ——
都是**给句中已有的词加链接**，不加文案、不复制表格、不新增声明，
FAQ schema 与正文仍逐字一致。4/45 → 5/45 页有正文入口（指南与类目页各多条）。

标题层级原为 H1 → H3 → H2（侧栏 `Browse Categories` 用 h3），跳级且把导航侧栏
排在第一个正文小节之上。另两个类目页早已用 h2。各页有自己的 scoped 样式块，
本页写 `.products-sidebar-box h3`、另两页写 h2，所以**选择器随元素一起改**。

> 这里我一开始判断错了：先量了三页当前都是 12.5px，就以为换元素不影响渲染；
> 改完再量发现变成 32px。是**改后复测**发现的，不是推断出来的。补上选择器后
> 三页重新一致：12.5px / 700 / rgb(125,141,151) / 10px 下边距 / 15px 行盒。

**未做并记录原因**：风机页是唯一不在 `sitemap-images.xml` 的产品详情页，
但它那四张型号图已在各自型号页下列出，补上只是重复条目、无发现增益。

### `/guides/what-is-web-cleaning`（已收录、均位 15）

原本只有 3 个列表页从正文链它，**没有一个清洁产品页** ——
而这页恰恰是本批 B 组判据的来源。已从类目页、两个工艺页、卷材机补 4 条，3/45 → 7/45。

### 状态分开

以上只改变「可被发现的程度」。**公开可抓取 ≠ Google 已抓取 ≠ 实际收录。**
本批不向 GSC 请求索引，也不承诺加页/加链必然带来增长。

---

## 5. 询盘归因审计（实测）

全程在 Chromium 里做，每一个 Formspree 请求都被拦截并本地应答 200。
**没有任何询盘到达真实收件人。**

| 怀疑 | 实测结果 |
|---|---|
| 21 产品页重复 `#quoteModal` 导致双提交 | **不成立**。一次点击 = 恰好一个请求，桌面与 390px 均如此。两段脚本都取到第一个元素、都加同一个 class，幂等 |
| 重复 ID 导致丢单 | **不成立**。用户看得见的那个表单就是会提交的那个 |
| 真正的后果 | `Layout.astro` 的全站弹窗**在 45 页全部打不开**：产品页上它是第二个 `#quoteModal`；其余 24 页**没有任何 `.quote-btn`**（导航的「Get a Quote」是指向 `/contact` 的链接）。没有任何已发布 JS 引用它 |
| `public/js/inquiry.js` | 仓库里不存在，与「线上 404」一致。不视为已启用，不搬运 |

**移除**那个打不开的弹窗，一并消掉 21 页的重复 ID 和 45 页上一个隐藏的 Formspree 表单。
产品页现在是：一个弹窗、一个表单、0 个重复 ID（实测 `{}`）。

**归因本身才是这一节的主题。** `quoteFormProduct` 原本只发
`website/name/email/phone/message` —— 从 ST-G 页发出的询盘与从 FPC 清洁机页发出的
**无法区分**。`/contact`（`ct_type`/`product`）与首页表单（`source=homepage`）本就带上下文，
**21 个产品页是缺口**。现在补的隐藏字段：

```
_subject = Product enquiry — <产品名>
source   = product-page
product  = <产品名>
model    = <sku>          （仅当该页设了 sku）
page     = <canonical URL>
entry    = Get a Quote | Ask an Engineer | Request a Quote
```

`entry` 区分同一页上三个按钮 —— 它们打开同一个表单，原先也无法区分。
**只记页面 / 产品 / 入口**，未新增任何个人字段，未引入任何分析调用。

键盘与焦点，逐项实测：

| | 改前 | 改后 |
|---|---|---|
| Escape | 不关闭 | 关闭，并还原滚动锁 |
| 打开时焦点 | 留在背后的按钮上 | 落到第一个输入框 |
| Tab | 走出弹窗到 WhatsApp / About Shidike | 锁在弹窗内循环 |
| 背景滚动 | 仍可滚动 | 打开时锁定、关闭时还原 |
| 语义 | 无 role / aria-modal | `role="dialog"`、`aria-modal="true"`、由自身标题标注 |
| 关闭后焦点 | 无处可去 | 回到打开它的那个按钮 |

表单标记与提交处理**除隐藏字段外未改动**，成功路径改走同一个 close 函数，
所以发送成功后滚动与焦点也会还原。

**成功响应 ≠ 实际收到 ≠ 合格询盘。** 本批只让第一种变得可归因。

---

## 6. 验证结果

### 机械校验（对照 `origin/main` 的 build）

```
1. URL 集合          45 → 45，无新增、无删除、无移动
2. canonical / robots / hreflang / JSON-LD @type    45 页全部逐字未变
3. title / H1 / description                         仅 11 处变化，全部在事实表内
4. FAQPage schema 与可见正文                        34 页承载 schema，0 处不一致
                                                    （改前有 2 页既有漂移）
5. 站内链接                                         无任何指向不存在页面的链接
6. 冲突串                                           7 条全部从 HTML 中消失
   修订后措辞                                       6 条全部出现在 HTML 中
```

`npm run build` 通过，45 页。`npm run check-sitemap` 干净。
sitemap 的 `lastmod` 按既有脚本从 git 推导，18 个页面变为 2026-09-27。

### 浏览器（桌面 1440×950 / 移动 390×844，18 页 × 2）

- **没有任何页面出现横向滚动**，两个视口都没有。
- `section` 数量全部不变。
- 每页 `h2` 少 1 个 —— 正是被移除的全站弹窗里那个 `Get a Quote` 标题。
  风机页因 h3→h2 抵消，净变化为 0，与预期一致。
- 页面高度变化 0 ~ +382px，全部来自新增的句子与条件说明；无布局回退。
- 截图 41 张在 `shots/batch5/`（该目录已在 `.gitignore`）。
  重点几张：`brush-machine-top.png`、`quote-dialog.png`（可见焦点环落在第一个输入框）、
  `blower-sidebar.png`、`stg-specs.png`、`cleaning-index-top.png`。

### 没验到的

- **生产环境**：代理不通，未验。
- **部署后表现**：未部署。
- **Google 抓取与收录**：未查、未请求。
- **真实收件**：未发送，故未验。

---

## 7. 待你与工厂决定

1. **ST-G 的放电方式与 6.5 kV 的定义 —— 只有工厂能定。**
   要问的六项已整理在 `SEO-NOTES.md` §16.1c：现售型号与资料版本号；每根针是交替正负
   还是正负针分组；测量参考点；Vmax / Vmin / Vpp 三个值；频率与占空比；已有测试记录。
   拿不到就保持现状措辞并注明未确认 —— **不要再替任何人确认**。
2. **99.9 % 的条件**：粒径、采样方法、前后计数、重复次数、环境洁净度、表面检查判据。
3. **卷材机的供货范围**：报价默认含不含放收卷 / 张力控制。仓库里没有任何报价单或
   供货范围表，所以页面现在是**请客户在报价中确认**，没有写成确定排除。
4. 以下本批**未创建**，按简报要求：耗材独立页、测试指南、新案例、德语页。

---

## 变更记录

本文件按提交主题列，不写自身所在提交的 SHA（写不了 —— 那个 SHA 在本文件被提交后才存在）。
取当前 HEAD 用 `git log --oneline origin/main..HEAD`。

**第一轮（Codex 审查基线 `65a1438`）**

| 提交主题 | 内容 |
|---|---|
| `fix(content): resolve the published spec conflicts…` | A / B / C / D 四组事实冲突 |
| `fix(seo): give the blower page a real route in…` | 风机页正文入口 + 标题层级 |
| `fix(inquiry): attribute product enquiries…` | 产品询盘归因 + 移除打不开的弹窗 + 键盘焦点 |
| `fix(cleaning): drop two claims the pages contradict…` | 清洁类目两条错误声明 + 指南内链 |
| `docs(seo): this batch's fact table…` | SEO-NOTES §15 / §16 |
| `docs: hand-off notes for this batch…` | 本文件 |
| `docs(seo): ST-G's discharge method is settled…` | **已被下一轮撤回，见下** |

**第二轮（Codex 验收发现的漏项，2026-09-27）**

| 提交主题 | 对应验收项 |
|---|---|
| `fix(content): the sentences the rename and narrowing passes did not reach` | 1 搜索/llms 同步、2 刷式机同页矛盾、3 型号页性能推导与离子平衡、4 `1 s` 条件、6 卷材机供货边界、7 Contact 按钮文案 |
| `docs(seo): retract the ST-G confirmation, and correct the argument behind it` | 0 / 5 撤回与技术论证更正、6 `dateModified` 与本文件状态 |

**撤回的一条（重要）**：`docs(seo): ST-G's discharge method is settled` 这个提交里写的
「已定 / James Hu 确认：ST-G 就是 AC 脉冲」**已撤回**。那句话来自一个疑问（「不就是 AC 脉冲吗」），
不是产品工程确认；用户随后明确说「所以 ST-G 是什么的，我也不知道」。
同一提交里的技术论证（「DC 脉冲必然单极性」）也是错的，一并更正。
详见 `SEO-NOTES.md` §16.1a / §16.1b / §16.1c。**代码没有因此回退** —— 站上措辞不变，
变的是理由和证据状态。
