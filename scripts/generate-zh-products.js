// Script to generate all Chinese product detail pages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Translation maps ──────────────────────────────────────────
const UI = {
  // Buttons / labels
  'Get a Quote': '获取报价',
  'WhatsApp': 'WhatsApp',
  'Your Name': '您的姓名', 'Your Email': '您的邮箱',
  'Your Phone': '您的电话', 'Your Message': '您的留言',
  'Send Message': '发送留言',
  'If you have any questions about this product, please leave your contact\n        details and we will get back to you as soon as possible.':
    '如有产品相关问题，请留下联系方式，我们将尽快与您联系。',
  // Section headings
  'Product Description': '产品描述',
  'Product Features': '产品特点',
  'Technical Advantages': '技术优势',
  'Technical Specifications': '技术规格',
  'Industry Applications': '应用行业',
  'Related Products': '相关产品',
  // Breadcrumb
  '>Home<': '>首页<',
  '>Products<': '>产品<',
  '>Static Eliminator<': '>静电消除<',
  '>Cleaning Machine<': '>清洁机<',
  '>Precision Machined Parts<': '>精密加工零件<',
  '>Automation Equipment<': '>自动化设备<',
};

const SPEC_NAMES = {
  'Power Supply': '电源',
  'Operating Voltage': '工作电压',
  'Power': '功率',
  'Ion Balance': '离子平衡',
  'Operating Temperature': '工作温度',
  'Operating Humidity': '工作湿度',
  'Static Elimination Time': '消静时间',
  'Working Distance': '工作距离',
  'Dimensions': '尺寸',
  'Size': '尺寸',
  'Weight': '重量',
  'Air Volume': '风量',
  'Air Coverage': '覆盖面积',
  'Current Consumption': '电流消耗',
  'Product Type': '产品类型',
  'Main Function': '主要功能',
  'Application': '应用领域',
  'Control Mode': '控制方式',
  'Structure': '结构',
  'Installation': '安装方式',
  'Material Handling': '物料处理',
  'Customization': '定制',
  'Cleaning Method': '清洁方式',
  'Cleaning Width': '清洁宽度',
  'Machine Dimensions': '机器尺寸',
  'Lead Time': '交货期',
  'Material': '材料',
  'Output': '输出',
  'Voltage': '电压',
  'Frequency': '频率',
};

const APP_TAGS = {
  'Electronics': '电子制造', 'Electronics Assembly': '电子装配',
  'Printing': '印刷', 'Optoelectronics': '光电',
  'Textile': '纺织', 'Packaging': '包装',
  'SMT Production': 'SMT生产', 'PCB Manufacturing': 'PCB制造',
  'FPC Production': 'FPC生产', 'Display Manufacturing': '显示屏制造',
  'Optical Film': '光学薄膜', 'Precision Assembly': '精密装配',
  'Workstations': '工作台', 'Testing Benches': '检验台',
  'Small-Scale Production': '小批量生产', 'Cleanroom': '洁净室',
  'Semiconductor': '半导体', 'Automation Production': '自动化生产',
  'LCM Assembly': 'LCM装配', 'Backlight Production': '背光板生产',
  'CCL Processing': 'CCL加工', 'Inspection Lines': '检验线',
  'CNC Machining': 'CNC加工', 'Industrial Equipment': '工业设备',
  'Industrial Production': '工业生产', 'Automation Lines': '自动化生产线',
  'Diffusion Plate Processing': '扩散板加工', 'Cleaning Lines': '清洁生产线',
  'Inspection Systems': '检验系统', 'Sheet Material Handling': '片材处理',
  'Custom Industrial Lines': '定制工业生产线',
  'Precision Automation': '精密自动化', 'Robotic Systems': '机器人系统',
  'Display Panel Production': '显示面板生产', 'Measurement Systems': '测量系统',
  'Quality Control': '质量控制', 'Polarizer Production': '偏光片生产',
};

const ADVANTAGES = {
  'Fast': '快速', 'High Performance': '高性能', 'Safe': '安全可靠',
  'Desktop Friendly': '桌面友好', 'Adjustable': '可调节', 'Dependable': '稳定可靠',
  'Line Integration': '线体集成', 'Inspection Support': '检验支持',
  'Flexible Design': '灵活设计', 'Inline Design': '在线设计',
  'Dual Roller': '双辊清洁', 'Stable Output': '稳定输出',
  'Compact': '小巧紧凑', 'Efficient': '高效', 'Reliable': '可靠',
  'Precision': '高精度', 'Customizable': '可定制', 'Durable': '耐用',
  'Integrated': '集成化', 'Automated': '自动化', 'Accurate': '精确',
};

// ── Product-specific Chinese content ─────────────────────────
const PRODUCTS = {
  // ── Static Eliminators ──
  'st-g-series': {
    h1: 'ST-G 系列智能静电消除棒',
    short: '高性能离子棒，专为快速稳定消除静电而设计，适用于电子、印刷、纺织及自动化工业生产线。',
    highlights: [
      { h4: '快速消除静电', p: '强劲离子输出，高效消除工件表面静电。' },
      { h4: '工业级可靠性', p: '适用于高要求生产环境的连续稳定运行。' },
      { h4: '便于集成', p: '紧凑结构，方便安装于自动化生产线。' },
    ],
    desc: ['ST-G系列智能静电消除棒专为高速工业静电控制而研发。快速高效去除静电荷，减少产品缺陷，提高生产质量。',
           '广泛应用于电子制造、印刷、光电、纺织、包装等需要严格静电控制的行业。'],
    features: ['高速消静，提升生产线效率', '高性能离子产生系统，静电控制稳定', '内置异常放电检测，操作更安全', '适用于电子和精密制造', '稳定耐用，适合工业长期运行'],
    adv: [{ color: 'blue', h3: '快速', p: '相较传统产品显著提升消静速度，助力提高生产线效率。' },
          { color: 'yellow', h3: '高性能', p: '增强的离子发生量，为苛刻工业环境提供更强的静电消除能力。' },
          { color: 'green', h3: '安全可靠', p: '内置异常放电检测，保护设备安全，保障生产运行。' }],
    tags: ['电子制造', '印刷', '光电', '纺织', '包装', 'SMT生产'],
  },
  'st-e-series': {
    h1: 'ST-E 系列智能离子棒',
    short: '紧凑型智能离子棒，静电消除稳定可靠，适用于电子装配、传送带及精密工业生产线。',
    highlights: [
      { h4: '紧凑设计', p: '小巧机身，便于集成到各类工业设备中。' },
      { h4: '稳定消静', p: '高效离子输出，持续稳定消除静电。' },
      { h4: '易于安装', p: '结构简单，可快速安装于传送线和设备上。' },
    ],
    desc: ['ST-E系列智能离子棒专为在线静电控制而设计，帮助消除传送带、生产线和工件表面的静电荷。',
           '适用于电子装配、SMT、光学薄膜和各类需要精确静电控制的工业环境。'],
    features: ['在线静电消除，适用传送带和生产线', '紧凑结构，集成安装便捷', '稳定离子输出，静电控制可靠', '适用于电子和精密工业应用', '耐用设计，适合工业长期运行'],
    adv: [{ color: 'blue', h3: '紧凑集成', p: '紧凑外形，方便安装于各类传送线和工业设备上。' },
          { color: 'yellow', h3: '稳定消静', p: '持续稳定的离子输出，有效控制生产过程中的静电问题。' },
          { color: 'green', h3: '可靠耐用', p: '工业级设计，适合连续生产环境的长期稳定运行。' }],
    tags: ['电子制造', 'SMT生产', '光学薄膜', '精密装配', '包装', '自动化生产线'],
  },
  'st-f-series': {
    h1: 'ST-F 系列智能离子棒',
    short: '先进工业离子棒，适用于宽幅面静电控制，广泛应用于薄膜、光学及电子制造行业。',
    highlights: [
      { h4: '宽幅覆盖', p: '有效覆盖更大工作面积，适合宽幅工业应用。' },
      { h4: '高速消静', p: '快速离子化性能，适合高节拍生产线。' },
      { h4: '稳定性能', p: '可靠的工业级设计，保障长期稳定运行。' },
    ],
    desc: ['ST-F系列智能离子棒专为宽幅面高速静电控制而设计，适用于需要大范围静电消除的工业环境。',
           '广泛应用于薄膜、光学元件、电子装配及各类精密工业生产线。'],
    features: ['高速宽幅消静，适合大面积生产线应用', '稳定离子输出，适用于连续工业生产', '紧凑耐用结构，安装调试方便', '适用于薄膜、光学、电子行业', '工业级设计，适合长期稳定运行'],
    adv: [{ color: 'blue', h3: '宽幅覆盖', p: '更宽的有效覆盖范围，满足大幅面工业应用需求。' },
          { color: 'yellow', h3: '高速消静', p: '快速离子化输出，有效配合高节拍自动化生产线。' },
          { color: 'green', h3: '稳定可靠', p: '工业级耐用设计，支持长期稳定生产运行。' }],
    tags: ['光学薄膜', '电子制造', '印刷', '薄膜生产', 'SMT生产', '自动化生产线'],
  },
  'st-s200': {
    h1: 'ST-S200 迷你离子风机',
    short: '紧凑型离子风机，适用于工作台、机械手臂和精密装配工位的局部静电消除。',
    highlights: [
      { h4: '小巧轻便', p: '紧凑外形，适合桌面及小空间安装使用。' },
      { h4: '局部消静', p: '精准离子风输出，有效消除工位局部静电。' },
      { h4: '灵活安装', p: '多种安装方式，方便集成到各类工装设备。' },
    ],
    desc: ['ST-S200迷你离子风机专为局部静电消除而设计，适合工作台、机械手臂末端和精密装配工位。',
           '小巧的外形使其便于在狭小空间内安装，适用于电子装配、SMT及精密工业应用。'],
    features: ['迷你设计，适合局部和小空间静电消除', '灵活安装方式，可适配多种工装设备', '稳定离子输出，消静效果可靠', '适用于电子装配和精密工业', '轻便易移动，使用灵活方便'],
    adv: [{ color: 'blue', h3: '小巧紧凑', p: '迷你外形，方便在工作台和狭小空间内灵活使用。' },
          { color: 'yellow', h3: '灵活安装', p: '多种安装方式，适配各类工装设备和机械手末端。' },
          { color: 'green', h3: '稳定消静', p: '可靠的离子输出，有效满足局部精密静电控制需求。' }],
    tags: ['电子装配', '精密装配', 'SMT生产', '工作台', '机械手臂', '洁净室'],
  },
  'st-101a': {
    h1: 'ST101A 台式离子鼓风机',
    short: '紧凑型桌面离子鼓风机，专为近距离局部静电消除设计，安装方便，风量可调。',
    highlights: [
      { h4: '小巧机身', p: '适合桌面使用和小型工作空间环境。' },
      { h4: '风量可调', p: '灵活调节风量，满足不同静电控制需求。' },
      { h4: '稳定输出', p: '内置高压发生器，离子性能持续可靠。' },
    ],
    desc: ['工件表面、组件和物料上的静电荷会导致吸尘、装配错误和ESD损害，这在电子装配、SMT和精密制造中成本代价尤为高昂。ST101A台式离子鼓风机专为在工作台处近距离中和这些静电荷而设计。',
           '采用交流离子化技术，ST101A产生均衡的正负离子流，有效中和工作范围内的表面静电。紧凑的桌面造型便于安置在装配工位、检验台或包装线上，不占用宝贵的地面空间。'],
    features: ['桌面机型，定位和操作方便', '风量可调，适应不同使用条件', '内置高压发生器，离子输出稳定', '适合小面积静电消除任务', '安装维护方便'],
    adv: [{ color: 'blue', h3: '桌面友好', p: '紧凑机型，理想用于工作台级别和工位防静电控制。' },
          { color: 'yellow', h3: '可调节', p: '可变风量设置，提高不同应用场景的适应性。' },
          { color: 'green', h3: '稳定可靠', p: '集成高压系统，支持持续稳定的离子化性能。' }],
    tags: ['电子装配', '工作台', '检验台', '包装', '精密装配', '小批量生产'],
  },
  'st-104a': {
    h1: 'ST104A 卧式离子鼓风机',
    short: '卧式桌面离子鼓风机，增强型离子输出，适用于洁净室、电子制造和SMT生产线。',
    highlights: [
      { h4: '卧式设计', p: '宽幅横向送风，覆盖更大工作区域。' },
      { h4: '增强离子输出', p: '强劲离子发生能力，有效消除较大范围静电。' },
      { h4: '稳定运行', p: '可靠工业设计，适合连续生产环境使用。' },
    ],
    desc: ['ST104A卧式离子鼓风机专为需要较大覆盖范围的桌面静电消除应用而设计，增强的离子输出能力使其适合电子制造、SMT和洁净室环境。',
           '卧式结构提供更宽的离子风覆盖面积，适用于较大工作台面和精密装配工位的防静电控制。'],
    features: ['卧式机型，覆盖范围更宽', '增强离子输出，消静能力更强', '适用于洁净室和精密制造环境', '稳定可靠，适合连续工业生产', '安装维护方便'],
    adv: [{ color: 'blue', h3: '宽幅覆盖', p: '卧式送风设计，提供比台式更大的有效覆盖面积。' },
          { color: 'yellow', h3: '增强消静', p: '强化离子输出能力，满足较大工作区域的消静需求。' },
          { color: 'green', h3: '可靠稳定', p: '工业级设计，支持电子制造和SMT环境的长期稳定运行。' }],
    tags: ['电子制造', 'SMT生产', '洁净室', '精密装配', '工作台', '包装'],
  },
  'st-1200': {
    h1: 'ST1200 卧式离子风机',
    short: '大风量卧式离子风机，宽幅静电控制，适用于大型工作台、工业包装和显示屏制造。',
    highlights: [
      { h4: '大幅面覆盖', p: '宽幅离子气流，覆盖更大工作区域。' },
      { h4: '强劲风量', p: '大风量输出，适合对消静范围要求较高的应用。' },
      { h4: '工业级耐用', p: '坚固设计，适合工业生产线的长期稳定使用。' },
    ],
    desc: ['ST1200卧式离子风机专为需要大范围静电控制的工业工作台和生产线而设计，宽幅离子气流能有效覆盖较大工作面积。',
           '适用于大型工作台面、工业包装、显示屏制造和其他对静电控制覆盖范围要求较高的应用场景。'],
    features: ['大幅面宽覆盖，适合大型工作台和生产线', '强劲风量输出，消静效率高', '工业级耐用设计，稳定长期运行', '适用于显示屏制造和工业包装', '安装灵活，维护方便'],
    adv: [{ color: 'blue', h3: '宽幅覆盖', p: '大范围有效覆盖，满足工业工作台和大型生产线需求。' },
          { color: 'yellow', h3: '强劲风量', p: '大风量输出设计，提升大面积消静效率。' },
          { color: 'green', h3: '工业耐用', p: '坚固可靠的工业级设计，支持长期稳定生产运行。' }],
    tags: ['显示屏制造', '工业包装', '工作台', 'SMT生产', '电子制造', '自动化生产线'],
  },

  // ── Cleaning Machines ──
  'polarizer-cleaner': {
    h1: '偏光片精密清洁机',
    short: '高精度偏光片清洁设备，有效去除贴合、检验和包装前的灰尘、纤维、颗粒及静电污染。',
    highlights: [
      { h4: '精密清洁', p: '专为敏感偏光片表面设计，清洁效果稳定可靠。' },
      { h4: '防静电处理', p: '集成静电消除功能，减少清洁过程中的静电吸尘。' },
      { h4: '定制化配置', p: '可根据物料尺寸和产线布局进行定制配置。' },
    ],
    desc: ['偏光片表面极为敏感，灰尘、纤维和颗粒污染物会直接导致贴合缺陷和良率损失。偏光片精密清洁机专为去除这些污染物而开发，有效降低生产不良率。',
           '设备采用滚筒清洁原理，配合静电消除功能，确保偏光片在贴合前保持洁净表面，提升产品良率和生产稳定性。'],
    features: ['专为偏光片精密清洁而设计', '集成静电消除，减少静电吸附', '滚筒清洁方式，清洁效果稳定', '支持根据物料尺寸定制', '适用于贴合、检验和包装前处理'],
    adv: [{ color: 'blue', h3: '精密清洁', p: '专业清洁方案，有效去除偏光片表面污染物，保障产品质量。' },
          { color: 'yellow', h3: '静电消除', p: '集成防静电功能，减少静电吸尘对清洁效果的影响。' },
          { color: 'green', h3: '定制配置', p: '根据产线物料尺寸和布局需求进行定制配置。' }],
    tags: ['显示屏制造', '偏光片生产', '光学薄膜', '贴合工艺', 'LCD制造', '精密装配'],
  },
  'fpc-4-axis-cleaner': {
    h1: 'FPC四轴高精度清洁机',
    short: '精密四轴清洁系统，专为FPC柔性电路材料设计，提升印刷、贴合及检验工序前的表面洁净度。',
    highlights: [
      { h4: '四轴精密清洁', p: '四轴结构设计，传送稳定，清洁精准。' },
      { h4: '柔性材料适配', p: '专为FPC等柔性材料优化，防止物料损伤。' },
      { h4: '工艺兼容性强', p: '适用于印刷、贴合、检验等多道工序前处理。' },
    ],
    desc: ['FPC柔性电路在印刷、贴合和检验工序前对表面洁净度要求极高，微小颗粒污染即可导致工艺失效。FPC四轴高精度清洁机专为解决这一问题而设计。',
           '四轴传送结构确保物料平稳传输，配合精密清洁系统有效去除表面污染物，支持高精度FPC生产的洁净工艺要求。'],
    features: ['四轴结构传送稳定，清洁精准', '专为FPC柔性材料优化设计', '有效去除颗粒、纤维和静电污染', '适用于印刷、贴合、检验前处理', '支持定制尺寸和工艺配置'],
    adv: [{ color: 'blue', h3: '四轴精密', p: '四轴传送结构确保物料平稳，清洁过程精准可控。' },
          { color: 'yellow', h3: '柔性适配', p: '专为FPC柔性材料设计，防止物料在清洁过程中损伤。' },
          { color: 'green', h3: '工艺兼容', p: '广泛适用于FPC生产中多道工序的前处理清洁需求。' }],
    tags: ['FPC生产', '电子制造', 'SMT生产', '精密装配', '贴合工艺', '印刷工艺'],
  },
  'fpc-8-axis-cleaner': {
    h1: 'FPC八轴高端清洁机',
    short: '先进八轴清洁系统，为高端FPC生产提供更精准的传送、更强的工艺灵活性和稳定清洁性能。',
    highlights: [
      { h4: '八轴高精度', p: '八轴传送结构，物料传输更精准，适合高端FPC生产。' },
      { h4: '强工艺灵活性', p: '更强的工艺参数调整能力，适应复杂生产需求。' },
      { h4: '稳定清洁性能', p: '高端制造配置，确保每批次一致稳定的清洁效果。' },
    ],
    desc: ['对于高端FPC生产环境，更复杂的工艺要求更精准的物料传送和更灵活的清洁配置。FPC八轴高端清洁机正是为此而设计。',
           '八轴传送系统提供更高的传送精度和工艺灵活性，满足高端FPC产品在印刷、贴合和检验前处理的严格洁净要求。'],
    features: ['八轴传送结构，精度更高', '工艺灵活性强，适应复杂生产需求', '有效去除颗粒、纤维和静电污染', '适用于高端FPC生产工序前处理', '支持定制配置和工艺优化'],
    adv: [{ color: 'blue', h3: '高精度传送', p: '八轴传送系统，为高端FPC生产提供更精准的物料控制。' },
          { color: 'yellow', h3: '工艺灵活', p: '更丰富的工艺参数配置，满足复杂高端FPC生产需求。' },
          { color: 'green', h3: '稳定清洁', p: '高端制造配置，保证每批次一致稳定的清洁质量。' }],
    tags: ['FPC生产', '高端电子', 'SMT生产', '精密装配', '贴合工艺', '印刷工艺'],
  },
  'optical-film-cleaner': {
    h1: '大尺寸光学薄膜清洁机',
    short: '大幅面光学薄膜工业清洁设备，有效去除贴合、检验前的灰尘、纤维和颗粒污染。',
    highlights: [
      { h4: '大幅面清洁', p: '支持大尺寸光学薄膜的高效表面清洁处理。' },
      { h4: '高精度清洁', p: '专为光学薄膜敏感表面优化的清洁方案。' },
      { h4: '稳定传送', p: '稳定的物料传送系统，防止薄膜表面损伤。' },
    ],
    desc: ['大尺寸光学薄膜在贴合前对表面洁净度要求极高，任何颗粒或纤维污染都会导致光学缺陷。大尺寸光学薄膜清洁机专为解决这一问题而开发。',
           '设备支持大幅面光学薄膜的精密清洁处理，有效去除灰尘、纤维、颗粒和静电污染，保障贴合工序的产品质量。'],
    features: ['支持大尺寸光学薄膜清洁处理', '高精度清洁，有效去除微小污染物', '稳定传送，防止物料损伤', '集成静电消除功能', '适用于贴合、检验和包装前处理'],
    adv: [{ color: 'blue', h3: '大幅面支持', p: '专为大尺寸光学薄膜设计，支持宽幅高效清洁处理。' },
          { color: 'yellow', h3: '光学级清洁', p: '针对光学薄膜敏感表面优化，清洁精度满足光学应用要求。' },
          { color: 'green', h3: '稳定传送', p: '可靠的物料传送系统，确保薄膜不受损伤地完成清洁。' }],
    tags: ['光学薄膜', '显示屏制造', '偏光片生产', 'LCD制造', '贴合工艺', '精密清洁'],
  },
  'lcm-cleaner': {
    h1: 'LCM模组工业清洁机',
    short: 'LCM模组生产专用工业清洁设备，有效去除装配、检验和包装前的灰尘、颗粒和静电污染。',
    highlights: [
      { h4: 'LCM专用', p: '专为LCM模组生产工序前处理而设计优化。' },
      { h4: '全面清洁', p: '有效去除灰尘、颗粒、纤维和静电污染物。' },
      { h4: '生产兼容', p: '适用于LCM模组装配、检验和包装等多道工序。' },
    ],
    desc: ['LCM模组在装配、检验和包装工序前需要保持严格的表面洁净度，以避免灰尘和颗粒污染导致的产品缺陷。LCM模组工业清洁机专为此而设计。',
           '设备专为LCM模组处理优化，有效去除各类表面污染物，支持显示屏装配产线的稳定高效运行。'],
    features: ['专为LCM模组清洁处理而设计', '有效去除颗粒、纤维、灰尘和静电', '适用于装配、检验和包装前处理', '稳定传送，防止模组损伤', '支持定制尺寸配置'],
    adv: [{ color: 'blue', h3: 'LCM专用', p: '专为LCM模组生产环境设计，满足模组处理的特定清洁需求。' },
          { color: 'yellow', h3: '全面清洁', p: '高效去除各类表面污染，保障模组清洁质量稳定一致。' },
          { color: 'green', h3: '灵活配置', p: '可根据模组尺寸和产线布局进行定制配置。' }],
    tags: ['LCM装配', '显示屏制造', '模组生产', '精密清洁', '电子制造', 'LCD制造'],
  },
  'pcb-cleaner': {
    h1: 'PCB表面清洁机',
    short: '在线PCB清洁设备，专为印刷、涂布、焊接和检验前去除灰尘、纤维、颗粒和静电污染。',
    highlights: [
      { h4: '在线PCB清洁', p: '适用于PCB制造各工序前的在线清洁处理。' },
      { h4: '多工艺兼容', p: '支持印刷、涂布、焊接和检验前的表面清洁需求。' },
      { h4: '稳定清洁效果', p: '一致稳定的清洁性能，保障PCB生产质量。' },
    ],
    desc: ['PCB在印刷、涂布、焊接和检验工序前需要保持严格的表面洁净，灰尘和颗粒污染会直接影响工艺质量和产品可靠性。PCB表面清洁机专为解决这一问题而设计。',
           '在线清洁方案有效去除PCB表面的灰尘、纤维、颗粒和静电污染，支持PCB制造和检验工序的稳定高效运行。'],
    features: ['在线PCB清洁，适合多道工序前处理', '有效去除灰尘、纤维、颗粒和静电', '稳定传送，防止PCB损伤', '兼容不同尺寸PCB板', '支持定制尺寸和工艺配置'],
    adv: [{ color: 'blue', h3: '在线清洁', p: '在线集成方案，无缝融入PCB生产工艺流程。' },
          { color: 'yellow', h3: '多工艺适配', p: '广泛适用于PCB印刷、涂布、焊接和检验前处理。' },
          { color: 'green', h3: '稳定可靠', p: '一致稳定的清洁效果，保障每批次PCB的表面质量。' }],
    tags: ['PCB制造', '电子制造', 'SMT生产', '印刷工艺', '焊接工艺', '检验线'],
  },
  'pcb-vertical-cleaner': {
    h1: 'PCB垂直清洁系统',
    short: '垂直式PCB清洁设备，紧凑布局设计，适合工厂空间受限的PCB制造和检验前处理应用。',
    highlights: [
      { h4: '垂直紧凑设计', p: '垂直布局节省工厂地面空间，适合空间受限的生产环境。' },
      { h4: '高效PCB清洁', p: '有效去除PCB表面污染，保障工艺质量。' },
      { h4: '工序兼容', p: '适用于PCB制造各关键工序前的表面清洁处理。' },
    ],
    desc: ['对于地面空间有限的PCB工厂，传统水平式清洁机占用面积较大。PCB垂直清洁系统采用垂直布局设计，有效节省工厂空间。',
           '垂直清洁方案在保证清洁效果的同时，减少设备占地面积，适合空间紧凑的PCB制造和检验工序前处理应用。'],
    features: ['垂直布局，有效节省地面空间', '高效去除PCB表面灰尘和颗粒污染', '适用于制造和检验前关键工序', '稳定传送，PCB运输平稳', '支持定制尺寸配置'],
    adv: [{ color: 'blue', h3: '垂直节空间', p: '垂直布局设计，大幅减少设备地面占用面积。' },
          { color: 'yellow', h3: '高效清洁', p: '有效的PCB表面清洁性能，保障工艺质量要求。' },
          { color: 'green', h3: '灵活配置', p: '支持根据PCB尺寸和工艺需求进行定制配置。' }],
    tags: ['PCB制造', '电子制造', 'SMT生产', '检验线', '印刷工艺', '工业生产'],
  },
  'roll-chip-cleaner': {
    h1: '滚轮通用清洁机',
    short: '滚轮式通用清洁系统，适用于卷材和片式产品的颗粒、纤维和表面污染去除。',
    highlights: [
      { h4: '通用清洁', p: '适用于多种卷材和片式产品的表面清洁处理。' },
      { h4: '双辊清洁', p: '双辊结构确保两面同步高效清洁。' },
      { h4: '稳定传送', p: '平稳的物料传送，防止卷材和片材损伤。' },
    ],
    desc: ['滚轮通用清洁机采用双辊清洁原理，专为卷材和片式产品的表面清洁而设计，广泛应用于薄膜、标签、PCB和其他片材类产品的生产处理。',
           '通用化设计使其能够适应多种物料类型，有效去除颗粒、纤维和表面污染，支持多种工业生产工序前处理需求。'],
    features: ['双辊清洁结构，两面同步清洁', '适用于卷材和多种片材类产品', '有效去除颗粒、纤维和表面污染', '稳定传送，防止物料损伤', '支持多种物料类型和尺寸'],
    adv: [{ color: 'blue', h3: '双辊清洁', p: '双辊结构实现物料两面同步高效清洁。' },
          { color: 'yellow', h3: '通用适配', p: '广泛适用于卷材、片材等多种物料类型的清洁处理。' },
          { color: 'green', h3: '稳定传送', p: '可靠的传送系统，确保各类物料平稳完成清洁过程。' }],
    tags: ['电子制造', '薄膜生产', 'PCB制造', '工业包装', '卷材处理', '精密清洁'],
  },
  'smt-cleaner': {
    h1: 'SMT在线清洁机（SMT600系列）',
    short: 'SMT生产专用在线清洁设备，有效去除贴装、焊接等关键工序前的灰尘、颗粒和静电污染。',
    highlights: [
      { h4: 'SMT专用', p: '专为SMT生产工序前处理而优化设计。' },
      { h4: '在线集成', p: '无缝集成于SMT生产线，不影响生产节拍。' },
      { h4: '高效清洁', p: '有效去除静电和颗粒污染，提升SMT工艺质量。' },
    ],
    desc: ['SMT生产中，灰尘、颗粒和静电污染是导致贴装缺陷和焊接不良的主要原因之一。SMT在线清洁机专为解决这一问题而设计。',
           'SMT600系列在线清洁机可无缝集成于SMT生产线，在贴装、焊接等关键工序前进行高效清洁处理，有效降低生产缺陷率。'],
    features: ['专为SMT生产工序前处理而优化', '在线集成，不影响产线节拍', '有效去除颗粒、纤维和静电污染', '兼容不同尺寸PCB和载板', '支持定制配置和产线集成'],
    adv: [{ color: 'blue', h3: 'SMT专用', p: '专为SMT生产环境优化，满足贴装和焊接前的洁净要求。' },
          { color: 'yellow', h3: '在线集成', p: '无缝集成于现有SMT产线，操作简便，不影响生产效率。' },
          { color: 'green', h3: '高效清洁', p: '有效去除各类污染物，显著降低SMT生产缺陷率。' }],
    tags: ['SMT生产', '电子制造', 'PCB制造', '贴装工艺', '焊接工艺', '精密清洁'],
  },
  'backlight-cleaner': {
    h1: '背光板清洁机',
    short: '背光板及显示屏相关组件专用精密清洁设备，有效去除装配、检验前的灰尘、颗粒和静电污染。',
    highlights: [
      { h4: '背光板专用', p: '专为背光板清洁处理优化，适合显示屏组装前工序。' },
      { h4: '精密清洁', p: '有效去除背光板表面各类污染物，保障显示质量。' },
      { h4: '稳定传送', p: '稳定的物料传送，防止背光板表面和结构损伤。' },
    ],
    desc: ['背光板在显示屏装配前的表面洁净度直接影响最终显示效果和产品良率。背光板清洁机专为去除装配检验前的各类表面污染而设计。',
           '设备专为背光板和相关显示屏组件优化，提供稳定高效的精密清洁，支持显示屏制造产线的质量控制需求。'],
    features: ['专为背光板精密清洁而设计', '有效去除颗粒、纤维、灰尘和静电', '稳定传送，防止背光板损伤', '适用于装配和检验前处理', '支持定制尺寸配置'],
    adv: [{ color: 'blue', h3: '背光板专用', p: '专为背光板特性优化，满足显示屏制造的洁净需求。' },
          { color: 'yellow', h3: '精密清洁', p: '有效去除各类表面污染，保障背光板洁净质量。' },
          { color: 'green', h3: '稳定传送', p: '可靠传送系统，确保背光板安全平稳地完成清洁过程。' }],
    tags: ['背光板生产', '显示屏制造', 'LCD制造', '光学薄膜', '精密清洁', '电子制造'],
  },
  'ccl-cleaner': {
    h1: '史帝克CCL清洁机 ST DT1340',
    short: '覆铜板（CCL）工业清洁设备，有效去除后道工序前的灰尘、颗粒、纤维和静电污染。',
    highlights: [
      { h4: 'CCL专用', p: '专为覆铜板清洁处理优化，适合CCL制造工序。' },
      { h4: '高效清洁', p: '有效去除CCL表面污染物，保障后道工序质量。' },
      { h4: '稳定运行', p: '工业级设计，支持CCL制造产线长期稳定运行。' },
    ],
    desc: ['覆铜板（CCL）在钻孔、压合、蚀刻等后道工序前需要保持严格的表面洁净度，污染物会直接影响工艺质量。史帝克CCL清洁机ST DT1340专为解决这一问题而设计。',
           '设备为CCL制造工序前的表面清洁提供稳定高效的解决方案，有效去除灰尘、颗粒、纤维和静电污染，保障CCL生产的工艺质量。'],
    features: ['专为CCL制造工序前处理设计', '有效去除颗粒、纤维、灰尘和静电', '稳定传送，适合CCL批量生产', '工业级耐用设计，稳定长期运行', '支持定制尺寸和工艺配置'],
    adv: [{ color: 'blue', h3: 'CCL专用', p: '专为CCL覆铜板制造优化，满足后道工序的洁净要求。' },
          { color: 'yellow', h3: '高效清洁', p: '有效去除各类表面污染物，保障CCL制造工艺质量。' },
          { color: 'green', h3: '工业耐用', p: '坚固可靠的工业设计，支持CCL产线长期高效运行。' }],
    tags: ['CCL加工', 'PCB制造', '电子制造', '工业生产', '精密清洁', '印制电路板'],
  },
  'inspection-cleaner': {
    h1: '检验台清洁机（STXT系列）',
    short: '检验工位专用清洁设备，为精密生产工作流提供集成的表面清洁和检验前处理支持。',
    highlights: [
      { h4: '检验前处理', p: '专为检验工序前表面清洁准备而优化设计。' },
      { h4: '集成清洁', p: '清洁与检验工序无缝集成，提升检验效率。' },
      { h4: '精密工艺', p: '适用于各类精密制造产品的检验前洁净处理。' },
    ],
    desc: ['检验前的表面洁净度直接影响检验结果的准确性。检验台清洁机STXT系列专为精密制造产品的检验前表面清洁处理而设计。',
           '设备可无缝集成于检验工位，在产品进入检验程序前进行高效清洁，去除灰尘、颗粒和静电污染，保障检验数据的准确性。'],
    features: ['专为检验工序前清洁处理而设计', '有效去除颗粒、纤维、灰尘和静电', '清洁与检验无缝集成，不影响节拍', '适用于多种精密制造产品', '支持定制配置和产线集成'],
    adv: [{ color: 'blue', h3: '检验集成', p: '与检验工位无缝集成，为精密检验提供可靠的前处理保障。' },
          { color: 'yellow', h3: '精密清洁', p: '高效去除各类表面污染，确保检验结果的准确可靠。' },
          { color: 'green', h3: '工艺适配', p: '广泛适用于不同精密制造产品的检验前洁净需求。' }],
    tags: ['检验线', '电子制造', 'PCB制造', '精密装配', '质量控制', 'SMT生产'],
  },

  // ── Precision Machined Parts ──
  'custom-precision-machined-parts': {
    h1: '定制精密加工零件',
    short: '根据客户图纸和规格定制的高精度CNC加工零件，支持OEM制造和原型开发。',
    highlights: [
      { h4: '定制加工', p: '根据客户提供的图纸和规格进行精密加工。' },
      { h4: '高精度公差', p: '严格的尺寸和公差控制，保障零件装配精度。' },
      { h4: 'OEM支持', p: '支持OEM制造、样品开发和批量生产。' },
    ],
    desc: ['在工业设备制造和自动化系统集成中，标准零件往往无法满足特定应用的精确尺寸和结构要求，定制加工零件是实现精准装配的关键。',
           '我们根据客户提供的图纸、3D模型或规格要求，提供高精度CNC加工零件，支持OEM制造、样品开发、小批量和批量生产，满足各类工业应用需求。'],
    features: ['根据客户图纸和规格定制加工', '严格的尺寸和公差控制', '支持CNC铣削、车床加工等多种工艺', '适用于OEM制造、样品和批量生产', '支持多种金属材料加工'],
    adv: [{ color: 'blue', h3: '定制精密', p: '完全按照客户图纸和规格要求进行高精度定制加工。' },
          { color: 'yellow', h3: '公差保障', p: '严格的尺寸控制，确保零件精度满足装配要求。' },
          { color: 'green', h3: 'OEM服务', p: '全面的OEM制造支持，从样品到批量生产的一站式服务。' }],
    tags: ['CNC加工', '工业设备', '精密制造', 'OEM生产', '自动化设备', '机械零件'],
  },
  'cnc-milled-front-panel-rubber-roller-assembly': {
    h1: 'CNC铣削前面板橡胶辊组件',
    short: '精密CNC铣削前面板，专为橡胶辊组装系统设计，适用于清洁机和精密设备集成。',
    highlights: [
      { h4: 'CNC精密铣削', p: '高精度CNC铣削加工，尺寸和公差控制严格。' },
      { h4: '辊组件专用', p: '专为橡胶辊组装系统设计，安装精准可靠。' },
      { h4: '工业耐用', p: '优质材料加工，适合工业设备长期稳定使用。' },
    ],
    desc: ['CNC铣削前面板橡胶辊组件是清洁机和精密传送设备中的关键结构零件，其加工精度直接影响辊组件的安装精度和设备运行稳定性。',
           '采用高精度CNC铣削工艺加工，确保面板的尺寸精度和表面质量，支持橡胶辊组件的精准安装和可靠固定。'],
    features: ['高精度CNC铣削加工，尺寸控制严格', '专为橡胶辊组件安装设计', '优质材料，工业级耐用性', '适用于清洁机和精密传送设备', '支持定制尺寸和规格'],
    adv: [{ color: 'blue', h3: '精密铣削', p: '高精度CNC铣削工艺，确保零件尺寸和安装精度。' },
          { color: 'yellow', h3: '辊系统专用', p: '专为橡胶辊组件安装需求设计，保证装配精准可靠。' },
          { color: 'green', h3: '工业耐用', p: '高质量材料和工艺，满足工业设备长期稳定运行需求。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '清洁机零件', '机械零件', 'OEM生产'],
  },
  'cnc-wing-connection-block': {
    h1: 'CNC翼型连接块',
    short: '高精度CNC铣削翼型连接块，用于工业设备结构连接和精密装配系统集成。',
    highlights: [
      { h4: '精密连接', p: '高精度加工，确保结构连接的精准性和可靠性。' },
      { h4: 'CNC铣削', p: '精密CNC铣削工艺，尺寸公差控制严格。' },
      { h4: '结构可靠', p: '优质材料加工，连接稳固，适合工业长期使用。' },
    ],
    desc: ['CNC翼型连接块是工业自动化设备和精密装配系统中的重要结构零件，用于连接和固定设备的各个功能模块。',
           '采用高精度CNC铣削工艺加工，严格控制尺寸精度和表面质量，确保连接可靠、装配精准，满足工业设备的结构强度和精度要求。'],
    features: ['高精度CNC铣削加工，公差控制严格', '翼型结构设计，连接稳固可靠', '适用于工业设备模块连接', '优质材料，耐用性强', '支持定制尺寸和规格'],
    adv: [{ color: 'blue', h3: '精密加工', p: '高精度CNC铣削确保连接块的尺寸精度和装配可靠性。' },
          { color: 'yellow', h3: '结构稳固', p: '翼型连接设计，提供可靠的结构支撑和连接强度。' },
          { color: 'green', h3: '耐用可靠', p: '优质材料和精密工艺，满足工业设备长期稳定使用。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '自动化设备', '机械零件', 'OEM生产'],
  },
  'lathe-machined-bearing-outer-retainer-plate': {
    h1: '车床加工轴承外圆固定板',
    short: '高精度车床加工轴承外圆固定板，确保轴承系统的精准定位和长期可靠固定。',
    highlights: [
      { h4: '精密车削', p: '高精度车床加工，圆度和同轴度控制精准。' },
      { h4: '轴承专用', p: '专为轴承外圆定位和固定设计，安装精准。' },
      { h4: '稳定耐用', p: '优质材料加工，适合轴承系统长期可靠使用。' },
    ],
    desc: ['轴承外圆固定板是确保轴承系统精准定位和稳定运行的关键零件，其加工精度直接影响轴承的安装精度和设备整体运行稳定性。',
           '采用高精度车床加工工艺，严格控制外圆尺寸和同轴度，确保固定板与轴承的精准配合，支持工业设备轴承系统的长期可靠运行。'],
    features: ['高精度车床加工，圆度控制严格', '专为轴承外圆定位固定设计', '优质材料，耐磨耐用', '适用于工业设备轴承系统', '支持定制尺寸和材料规格'],
    adv: [{ color: 'blue', h3: '精密车削', p: '高精度车床工艺确保外圆尺寸和同轴度满足轴承装配要求。' },
          { color: 'yellow', h3: '可靠固定', p: '专为轴承外圆固定优化，保证轴承系统长期精准定位。' },
          { color: 'green', h3: '耐磨耐用', p: '优质材料选用和精密加工，满足工业环境长期使用要求。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '轴承系统', '机械零件', 'OEM生产'],
  },
  'lathe-machined-shaft-end-fixing-component': {
    h1: '车床加工轴端固定件',
    short: '高精度车床加工轴端固定件，用于工业设备轴端精准定位和稳定固定。',
    highlights: [
      { h4: '精密车削', p: '高精度车床加工，尺寸和同轴度控制严格。' },
      { h4: '轴端专用', p: '专为轴端定位和固定设计，安装精准可靠。' },
      { h4: '工业耐用', p: '优质材料加工，适合工业设备长期稳定使用。' },
    ],
    desc: ['轴端固定件是工业传动系统和精密设备中的重要零件，其加工精度直接影响轴端的定位精度和传动系统的运行稳定性。',
           '采用高精度车床加工工艺，严格控制轴端尺寸和同轴度，确保固定件与轴的精准配合，提供可靠的轴端定位和固定功能。'],
    features: ['高精度车床加工，公差控制严格', '专为轴端定位固定设计', '优质材料，强度和耐磨性好', '适用于工业传动和精密设备', '支持定制尺寸和材料规格'],
    adv: [{ color: 'blue', h3: '精密车削', p: '高精度车床工艺确保轴端尺寸精度满足装配要求。' },
          { color: 'yellow', h3: '轴端固定', p: '专为轴端定位优化，保证传动系统的运行精度和稳定性。' },
          { color: 'green', h3: '耐用可靠', p: '优质材料和精密工艺，满足工业传动系统长期使用需求。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '传动系统', '机械零件', 'OEM生产'],
  },
  'milled-front-inner-fixing-plate-paper-roll-guide-rail': {
    h1: '铣削前内固定板纸卷导轨',
    short: '精密铣削加工前内固定板，专为纸卷和物料导引应用设计，提供稳定可靠的导轨支撑。',
    highlights: [
      { h4: '精密铣削', p: '高精度铣削加工，平面度和尺寸控制严格。' },
      { h4: '导轨专用', p: '专为纸卷和物料导引系统设计，安装精准。' },
      { h4: '稳定支撑', p: '优质材料加工，提供可靠的导轨结构支撑。' },
    ],
    desc: ['纸卷导轨前内固定板是物料传送和导引系统中的关键结构零件，其加工精度直接影响导引系统的运行精度和物料传送的稳定性。',
           '采用高精度铣削工艺加工，严格控制平面度和尺寸精度，确保固定板与导轨系统的精准配合，支持物料传送导引系统的稳定运行。'],
    features: ['高精度铣削加工，平面度控制严格', '专为纸卷导轨系统设计', '优质材料，耐磨性好', '适用于物料传送和导引系统', '支持定制尺寸和规格'],
    adv: [{ color: 'blue', h3: '精密铣削', p: '高精度铣削工艺确保固定板平面度和尺寸精度。' },
          { color: 'yellow', h3: '导轨专用', p: '专为纸卷导引系统优化，保证物料传送的精准和稳定。' },
          { color: 'green', h3: '耐磨耐用', p: '优质材料和工艺，满足导引系统长期稳定使用需求。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '物料传送', '机械零件', 'OEM生产'],
  },
  'precision-bearing-bracket-cnc-milled': {
    h1: '精密轴承支架（CNC铣削）',
    short: '高精度CNC铣削轴承支架，稳定公差控制，适用于工业设备轴承支撑和精密装配系统。',
    highlights: [
      { h4: 'CNC精密铣削', p: '高精度CNC铣削加工，尺寸公差控制严格稳定。' },
      { h4: '轴承支撑专用', p: '专为轴承支撑和定位设计，安装精准可靠。' },
      { h4: '结构坚固', p: '优质材料加工，结构坚固，适合工业长期使用。' },
    ],
    desc: ['轴承支架是工业传动设备和精密机械中的重要支撑零件，其刚性和加工精度直接影响轴承的运行精度和设备整体稳定性。',
           '采用高精度CNC铣削工艺，严格控制安装面的平面度、孔位精度和轮廓公差，确保轴承支架与设备机架的精准装配，支持工业设备的可靠稳定运行。'],
    features: ['高精度CNC铣削加工，公差稳定', '专为轴承支撑和定位优化设计', '优质材料，结构强度高', '适用于工业传动和精密设备', '支持定制尺寸和材料规格'],
    adv: [{ color: 'blue', h3: '精密铣削', p: '高精度CNC铣削确保支架尺寸精度和装配可靠性。' },
          { color: 'yellow', h3: '稳定公差', p: '严格的公差控制，保证轴承系统的运行精度和稳定性。' },
          { color: 'green', h3: '坚固耐用', p: '高强度材料和精密工艺，满足工业设备长期可靠使用。' }],
    tags: ['CNC加工', '精密制造', '工业设备', '轴承系统', '传动设备', 'OEM生产'],
  },

  // ── Automation ──
  'product-a': {
    h1: '扩散板清洗检验生产线',
    short: '集清洗、检验和连续传送为一体的自动化生产线，工作流稳定高效，适用于扩散板加工。',
    highlights: [
      { h4: '工序集成', p: '清洗、检验和传送集成为一条连续生产线。' },
      { h4: '工作流稳定', p: '提升工序协调性，保持生产节拍一致性。' },
      { h4: '自动化支持', p: '适用于需要高效处理和检验集成的工业产线。' },
    ],
    desc: ['扩散板清洗检验生产线专为需要连续物料传送、表面清洗、检验协调和稳定生产节拍的工业应用而开发。',
           '适用于扩散板加工及其他对集成自动化、清洗质量和检验效率有较高要求的片材类产品工作流。'],
    features: ['集成清洗和检验的一体化生产线设计', '连续传送结构，工作流稳定', '适用于扩散板和片材类产品处理', '提升生产效率和检验协调性', '支持根据项目需求定制自动化配置'],
    adv: [{ color: 'blue', h3: '线体集成', p: '减少工序分离，提升整体生产效率。' },
          { color: 'yellow', h3: '检验支持', p: '维持稳定的表面检验和工作流一致性。' },
          { color: 'green', h3: '灵活设计', p: '可根据产品尺寸、产能和工艺需求定制。' }],
    tags: ['扩散板加工', '清洁生产线', '检验系统', '自动化生产', '片材处理', '定制工业生产线'],
  },
  'product-b': {
    h1: '机器人自动上下料清洗机',
    short: '机械手自动上下料清洗设备，提升生产效率，减少人工搬运，保持稳定清洗质量。',
    highlights: [
      { h4: '机器人集成', p: '机械手自动上下料，减少人工操作干预。' },
      { h4: '生产效率高', p: '自动化上下料提升生产节拍和整体效率。' },
      { h4: '清洗质量稳定', p: '自动化流程确保每批次一致稳定的清洗效果。' },
    ],
    desc: ['机器人自动上下料清洗机将机械手自动上下料与工业清洗功能集成为一体，有效减少人工搬运，提升生产效率和清洗质量的一致性。',
           '适用于需要高效自动化上下料的工业清洗应用，通过机器人集成降低人工成本，提高生产节拍和产品洁净度的稳定性。'],
    features: ['机械手自动上下料，减少人工操作', '自动化流程，提升生产效率', '稳定清洗质量，批次一致性好', '适用于工业清洗自动化应用', '支持定制化自动化配置'],
    adv: [{ color: 'blue', h3: '机器人集成', p: '机械手自动上下料，显著减少人工操作需求。' },
          { color: 'yellow', h3: '效率提升', p: '自动化上下料提升生产节拍，降低人工成本。' },
          { color: 'green', h3: '稳定质量', p: '自动化流程确保每批次清洗质量一致可靠。' }],
    tags: ['机器人系统', '自动化生产', '工业清洗', '精密自动化', '电子制造', '定制工业生产线'],
  },
  'product-c': {
    h1: '偏光片吸收轴角度测量仪',
    short: '定制化自动化设备，提升偏光片吸收轴角度测量的效率、工艺稳定性和生产一致性。',
    highlights: [
      { h4: '精密测量', p: '高精度偏光片吸收轴角度自动检测。' },
      { h4: '自动化集成', p: '自动化测量流程，提升检测效率和一致性。' },
      { h4: '质量保障', p: '准确的角度测量，确保偏光片品质符合要求。' },
    ],
    desc: ['偏光片吸收轴角度是LCD和显示屏制造中影响产品光学性能的关键参数，精确测量是质量控制的重要环节。偏光片吸收轴角度测量仪专为自动化检测此关键参数而设计。',
           '定制化自动化测量设备，提供稳定高效的偏光片吸收轴角度检测，提升工艺稳定性和生产一致性，支持显示屏制造的严格质量控制要求。'],
    features: ['高精度偏光片吸收轴角度自动测量', '自动化检测流程，测量效率高', '稳定一致的测量结果，质量可靠', '适用于LCD和显示屏制造质量控制', '支持定制化自动化配置'],
    adv: [{ color: 'blue', h3: '精密测量', p: '高精度自动测量系统，确保偏光片角度数据准确可靠。' },
          { color: 'yellow', h3: '自动化检测', p: '自动化测量流程，显著提升检测效率和产能。' },
          { color: 'green', h3: '质量保障', p: '稳定一致的测量结果，为显示屏制造提供可靠的质量支撑。' }],
    tags: ['偏光片生产', '显示屏制造', '测量系统', '质量控制', 'LCD制造', '精密自动化'],
  },
};

// ── Related products by category ─────────────────────────────
const RELATED = {
  'static-eliminator': [
    { key: 'st-g-series', img: '/assets/img/static-eliminator/st-g.jpg', name: 'ST-G 系列智能离子棒' },
    { key: 'st-e-series', img: '/assets/img/static-eliminator/st-e.jpg', name: 'ST-E 系列智能离子棒' },
    { key: 'st-f-series', img: '/assets/img/static-eliminator/st-f.jpg', name: 'ST-F 系列智能离子棒' },
    { key: 'st-s200', img: '/assets/img/static-eliminator/st-s200.jpg', name: 'ST-S200 迷你离子风机' },
    { key: 'st-101a', img: '/assets/img/static-eliminator/st-101a.webp', name: 'ST101A 台式离子鼓风机' },
    { key: 'st-104a', img: '/assets/img/static-eliminator/st-104a.jpg', name: 'ST104A 卧式离子鼓风机' },
    { key: 'st-1200', img: '/assets/img/static-eliminator/st-1200.jpg', name: 'ST1200 卧式离子风机' },
  ],
  'cleaning-machine': [
    { key: 'polarizer-cleaner', img: '/assets/img/cleaning-machine/polarizer-cleaner.jpg', name: '偏光片精密清洁机' },
    { key: 'fpc-4-axis-cleaner', img: '/assets/img/cleaning-machine/fpc-4-axis-cleaner.jpg', name: 'FPC四轴高精度清洁机' },
    { key: 'fpc-8-axis-cleaner', img: '/assets/img/cleaning-machine/fpc-8-axis-cleaner.jpg', name: 'FPC八轴高端清洁机' },
    { key: 'optical-film-cleaner', img: '/assets/img/cleaning-machine/optical.jpg', name: '大尺寸光学薄膜清洁机' },
    { key: 'lcm-cleaner', img: '/assets/img/cleaning-machine/lcm-cleaner.jpg', name: 'LCM模组工业清洁机' },
    { key: 'pcb-cleaner', img: '/assets/img/cleaning-machine/pcb-cleaner.jpg', name: 'PCB表面清洁机' },
    { key: 'pcb-vertical-cleaner', img: '/assets/img/cleaning-machine/stick-pcb-vertical-cleaning-machine.jpg', name: 'PCB垂直清洁系统' },
    { key: 'roll-chip-cleaner', img: '/assets/img/cleaning-machine/roll-chip-cleaner.jpg', name: '滚轮通用清洁机' },
    { key: 'smt-cleaner', img: '/assets/img/cleaning-machine/smt-cleaner.jpg', name: 'SMT在线清洁机' },
    { key: 'backlight-cleaner', img: '/assets/img/cleaning-machine/backlight-cleaner.jpg', name: '背光板清洁机' },
    { key: 'ccl-cleaner', img: '/assets/img/cleaning-machine/ccl-cleaner.jpg', name: '史帝克CCL清洁机' },
    { key: 'inspection-cleaner', img: '/assets/img/cleaning-machine/inspection-cleaner.jpg', name: '检验台清洁机' },
  ],
  'precision-machined-parts': [
    { key: 'custom-precision-machined-parts', img: '/assets/img/precision-machined-parts/precision-machined-parts.jpg', name: '定制精密加工零件' },
    { key: 'cnc-milled-front-panel-rubber-roller-assembly', img: '/assets/img/precision-machined-parts/cnc-milled-front-panel-rubber-roller-assembly.jpg', name: 'CNC铣削前面板橡胶辊组件' },
    { key: 'cnc-wing-connection-block', img: '/assets/img/precision-machined-parts/cnc-milled-wing-connection-block.jpg', name: 'CNC翼型连接块' },
    { key: 'lathe-machined-bearing-outer-retainer-plate', img: '/assets/img/precision-machined-parts/lathe-machined-bearing-outer-retainer-plate.jpg', name: '车床加工轴承外圆固定板' },
    { key: 'lathe-machined-shaft-end-fixing-component', img: '/assets/img/precision-machined-parts/lathe-machined-shaft-end-fixing-component.jpg', name: '车床加工轴端固定件' },
    { key: 'milled-front-inner-fixing-plate-paper-roll-guide-rail', img: '/assets/img/precision-machined-parts/milled-front-inner-fixing-plate-paper-roll-guide-rail.jpg', name: '铣削前内固定板纸卷导轨' },
    { key: 'precision-bearing-bracket-cnc-milled', img: '/assets/img/precision-machined-parts/precision-bearing-bracket-cnc-milled.jpg', name: '精密轴承支架（CNC铣削）' },
  ],
  'automation': [
    { key: 'product-a', img: '/assets/img/automation/product-a.jpg', name: '扩散板清洗检验生产线' },
    { key: 'product-b', img: '/assets/img/automation/product-b.jpg', name: '机器人自动上下料清洗机' },
    { key: 'product-c', img: '/assets/img/automation/product-c.jpg', name: '偏光片吸收轴角度测量仪' },
  ],
};

// ── Page list ──────────────────────────────────────────────────
const PAGES = [
  // static-eliminator
  { slug: 'st-g-series', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-g-series.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-g.jpg', alt: 'ST-G Series Thumbnail 1' },
             { src: '/assets/img/static-eliminator/st-g2.jpg', alt: 'ST-G Series Thumbnail 2' }] },
  { slug: 'st-e-series', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-e-series.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-e.jpg', alt: 'ST-E Thumbnail 1' }] },
  { slug: 'st-f-series', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-f-series.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-f.jpg', alt: 'ST-F Thumbnail 1' }] },
  { slug: 'st-s200', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-s200.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-s200.jpg', alt: 'ST-S200 Thumbnail 1' }] },
  { slug: 'st-101a', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-101a.webp',
    thumbs: [{ src: '/assets/img/static-eliminator/st-101a.webp', alt: 'ST101A Thumbnail 1' },
             { src: '/assets/img/static-eliminator/st-101a2.jpg', alt: 'ST101A Thumbnail 2' },
             { src: '/assets/img/static-eliminator/st-101a3.jpg', alt: 'ST101A Thumbnail 3' }] },
  { slug: 'st-104a', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-104a.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-104a.jpg', alt: 'ST104A Thumbnail 1' }] },
  { slug: 'st-1200', cat: 'static-eliminator', img: '/assets/img/static-eliminator/st-1200.jpg',
    thumbs: [{ src: '/assets/img/static-eliminator/st-1200.jpg', alt: 'ST1200 Thumbnail 1' }] },
  // cleaning-machine
  { slug: 'polarizer-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/polarizer-cleaner.webp',
    thumbs: [{ src: '/assets/img/cleaning-machine/polarizer-cleaner.jpg', alt: '偏光片清洁机缩略图' }] },
  { slug: 'fpc-4-axis-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/fpc-4-axis-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/fpc-4-axis-cleaner.jpg', alt: 'FPC四轴缩略图' }] },
  { slug: 'fpc-8-axis-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/fpc-8-axis-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/fpc-8-axis-cleaner.jpg', alt: 'FPC八轴缩略图' }] },
  { slug: 'optical-film-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/optical.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/optical.jpg', alt: '光学薄膜清洁机缩略图' }] },
  { slug: 'lcm-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/lcm-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/lcm-cleaner.jpg', alt: 'LCM清洁机缩略图' }] },
  { slug: 'pcb-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/pcb-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/pcb-cleaner.jpg', alt: 'PCB清洁机缩略图' }] },
  { slug: 'pcb-vertical-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/stick-pcb-vertical-cleaning-machine.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/stick-pcb-vertical-cleaning-machine.jpg', alt: 'PCB垂直清洁缩略图' }] },
  { slug: 'roll-chip-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/roll-chip-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/roll-chip-cleaner.jpg', alt: '滚轮清洁机缩略图' }] },
  { slug: 'smt-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/smt-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/smt-cleaner.jpg', alt: 'SMT清洁机缩略图' }] },
  { slug: 'backlight-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/backlight-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/backlight-cleaner.jpg', alt: '背光板清洁机缩略图' }] },
  { slug: 'ccl-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/ccl-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/ccl-cleaner.jpg', alt: 'CCL清洁机缩略图' }] },
  { slug: 'inspection-cleaner', cat: 'cleaning-machine', img: '/assets/img/cleaning-machine/inspection-cleaner.jpg',
    thumbs: [{ src: '/assets/img/cleaning-machine/inspection-cleaner.jpg', alt: '检验台清洁机缩略图' }] },
  // precision-machined-parts
  { slug: 'custom-precision-machined-parts', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/precision-machined-parts.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/precision-machined-parts.jpg', alt: '定制精密零件缩略图' }] },
  { slug: 'cnc-milled-front-panel-rubber-roller-assembly', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/cnc-milled-front-panel-rubber-roller-assembly.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/cnc-milled-front-panel-rubber-roller-assembly.jpg', alt: 'CNC前面板缩略图' }] },
  { slug: 'cnc-wing-connection-block', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/cnc-milled-wing-connection-block.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/cnc-milled-wing-connection-block.jpg', alt: 'CNC翼型连接块缩略图' }] },
  { slug: 'lathe-machined-bearing-outer-retainer-plate', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/lathe-machined-bearing-outer-retainer-plate.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/lathe-machined-bearing-outer-retainer-plate.jpg', alt: '轴承固定板缩略图' }] },
  { slug: 'lathe-machined-shaft-end-fixing-component', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/lathe-machined-shaft-end-fixing-component.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/lathe-machined-shaft-end-fixing-component.jpg', alt: '轴端固定件缩略图' }] },
  { slug: 'milled-front-inner-fixing-plate-paper-roll-guide-rail', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/milled-front-inner-fixing-plate-paper-roll-guide-rail.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/milled-front-inner-fixing-plate-paper-roll-guide-rail.jpg', alt: '铣削固定板缩略图' }] },
  { slug: 'precision-bearing-bracket-cnc-milled', cat: 'precision-machined-parts', img: '/assets/img/precision-machined-parts/precision-bearing-bracket-cnc-milled.jpg',
    thumbs: [{ src: '/assets/img/precision-machined-parts/precision-bearing-bracket-cnc-milled.jpg', alt: '精密轴承支架缩略图' }] },
  // automation
  { slug: 'product-a', cat: 'automation', img: '/assets/img/automation/product-a.jpg',
    thumbs: [{ src: '/assets/img/automation/product-a.jpg', alt: '扩散板生产线缩略图' }] },
  { slug: 'product-b', cat: 'automation', img: '/assets/img/automation/product-b.jpg',
    thumbs: [{ src: '/assets/img/automation/product-b.jpg', alt: '机器人清洗机缩略图' }] },
  { slug: 'product-c', cat: 'automation', img: '/assets/img/automation/product-c.jpg',
    thumbs: [{ src: '/assets/img/automation/product-c.jpg', alt: '偏光片测量仪缩略图' }] },
];

// ── Category breadcrumb labels ─────────────────────────────────
const CAT_LABELS = {
  'static-eliminator': '静电消除',
  'cleaning-machine': '清洁机',
  'precision-machined-parts': '精密加工零件',
  'automation': '自动化设备',
};

// ── Template ───────────────────────────────────────────────────
function generatePage(page) {
  const d = PRODUCTS[page.slug];
  const related = RELATED[page.cat];
  const catLabel = CAT_LABELS[page.cat];

  const thumbsHTML = page.thumbs.map((t, i) =>
    `            <img\n              class="thumb-image${i === 0 ? ' active-thumb' : ''}"\n              src="${t.src}"\n              alt="${t.alt}"\n              data-full="${t.src}"\n            />`
  ).join('\n');

  const highlightsHTML = d.highlights.map(h =>
    `            <div class="highlight-item">\n              <h4>${h.h4}</h4>\n              <p>${h.p}</p>\n            </div>`
  ).join('\n');

  const descHTML = d.desc.map(p => `        <p>\n          ${p}\n        </p>`).join('\n');

  const featuresHTML = d.features.map(f => `          <li>${f}</li>`).join('\n');

  const advHTML = d.adv.map(a =>
    `          <div class="advantage-card ${a.color}">\n            <h3>${a.h3}</h3>\n            <p>${a.p}</p>\n          </div>`
  ).join('\n');

  const tagsHTML = d.tags.map(t => `          <span>${t}</span>`).join('\n');

  const relatedHTML = related.map(r =>
    `            <a href="/zh/products/${page.cat}/${r.key}" class="related-slide-card" data-key="${r.key}">\n              <img src="${r.img}" alt="${r.name}" loading="lazy" />\n              <h4>${r.name}</h4>\n            </a>`
  ).join('\n');

  return `---
import ZhProductLayout from '../../../../layouts/ZhProductLayout.astro';
---

<ZhProductLayout title="${d.h1} | DGSDK 史帝克"
  description="${d.short}"
  image="${page.img}">
  <section class="product-detail-page">
    <div class="container">
      <div class="breadcrumb">
        <a href="/zh/">首页</a>
        <span>/</span>
        <a href="/zh/products">产品</a>
        <span>/</span>
        <a href="/zh/products/${page.cat}">${catLabel}</a>
        <span>/</span>
        <span>${d.h1}</span>
      </div>

      <div class="product-top">
        <div class="product-gallery">
          <div class="product-main-image slider-wrapper">
            <button class="slider-arrow left" id="prevImage">‹</button>
            <img
              id="mainProductImage"
              src="${page.thumbs[0].src}"
              alt="${d.h1}"
            />
            <button class="slider-arrow right" id="nextImage">›</button>
          </div>

          <div class="product-thumbs">
${thumbsHTML}
          </div>
        </div>

        <div class="product-summary">
          <h1>${d.h1}</h1>
          <p class="product-short-desc">
            ${d.short}
          </p>

          <div class="product-actions">
            <button class="quote-btn" type="button">获取报价</button>
            <a href="https://wa.me/61436605126" target="_blank" class="whatsapp-btn">WhatsApp</a>
          </div>

          <div class="product-highlights">
${highlightsHTML}
          </div>
        </div>
      </div>

      <section class="detail-block">
        <h2>产品描述</h2>
${descHTML}
      </section>

      <section class="detail-block">
        <h2>产品特点</h2>
        <ul class="feature-list">
${featuresHTML}
        </ul>
      </section>

      <section class="detail-block">
        <h2>技术优势</h2>
        <div class="advantage-grid">
${advHTML}
        </div>
      </section>

      <section class="detail-block">
        <h2>应用行业</h2>
        <div class="application-tags">
${tagsHTML}
        </div>
      </section>

      <section class="detail-block">
        <div class="related-slider-wrap" data-current="${page.slug}">
          <div class="related-slider-header">
            <h2>相关产品</h2>
            <div class="related-slider-nav">
              <button class="related-slider-btn related-slider-prev" type="button">‹</button>
              <button class="related-slider-btn related-slider-next" type="button">›</button>
            </div>
          </div>
          <div class="related-slider-track">
${relatedHTML}
          </div>
        </div>
      </section>
    </div>
  </section>
</ZhProductLayout>
`;
}

// ── Generate files ─────────────────────────────────────────────
let count = 0;
for (const page of PAGES) {
  const dir = path.join(ROOT, 'src/pages/zh/products', page.cat);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${page.slug}.astro`);
  fs.writeFileSync(filePath, generatePage(page), 'utf8');
  console.log(`✓ Created: zh/products/${page.cat}/${page.slug}.astro`);
  count++;
}

console.log(`\nDone! Generated ${count} Chinese product pages.`);
