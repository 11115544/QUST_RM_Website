export const metadata = {
  title: '战队简介 - 青岛科技大学 YKTKEMIAO 战队',
  description: '青岛科技大学 RoboMaster 战队成立时间、发展历程、核心宗旨与组织架构',
};

const foundersTable = [
  { name: '蒋远志', role: '队长兼电控', amount: 5000 },
  { name: '辛琨鹏', role: '项目管理兼机械', amount: 1000 },
  { name: '吕海坤', role: '运营兼算法', amount: 1000 },
  { name: '周伟超', role: '机械兼电控', amount: 1500 },
];

const freshmen2025 = ['李昱辰', '谷金城', '徐兴震', '訾玉', '陈雨微', '官琳旺'];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-200 pb-8">
        <div className="flex gap-4 shrink-0">
          <img
            src="/images/qust-badge.png"
            alt="青岛科技大学校徽"
            className="h-20 w-20 object-contain"
          />
          <img
            src="/images/team-logo.png"
            alt="YKTKEMIAO 战队 Logo"
            className="h-20 w-20 object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            青岛科技大学 <span className="text-primary">YKTKEMIAO</span> 战队
          </h1>
          <p className="mt-1 text-slate-600">
            QUST · RoboMaster 机甲大师 · 赛课机器人队
          </p>
        </div>
      </div>

      <p className="mt-6 text-slate-600">
        本战队隶属于<strong className="text-slate-800">青岛科技大学</strong>，参与 RoboMaster
        机甲大师赛事。以下为战队发展历程与组织概况。（2026 赛季队史将在后续补充。）
      </p>

      {/* 2025 赛季队史 */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          2025 赛季队史
        </h2>
        <p className="mt-1 text-sm text-slate-500">2024 年下半年 — 2025 年上半年</p>

        <div className="mt-6 space-y-6 text-slate-700 leading-relaxed">
          <p>
            YKTKEMiAO 战队的建队过程可谓异常艰辛与无助，但每个人都从未有过放弃梦想的想法。队伍的四名大二成员为原青岛科技大学机器人研发中心实验室成员。在 2024 年的 6、7、8、9 四个月份里，实验室走访了潍坊科技学院、青岛理工大学、青岛大学等学校的机器人实验室，感到巨大落差。此三所学校的实验室都以 RC、RM 等大型赛事为主要支撑，技术相当过硬，而我们的实验室却以小型机器人比赛为主，甚至产生了技术断代，逐渐转向无实物的创意类赛事，越发不景气。也就是从那时起，一部分实验室成员有了尝试 RC、RM 的想法，而这也恰恰成为了冲突与分裂的开始。
          </p>

          <p>
            10 月初，机器人研发中心在关于新生培训资格的问题上产生了纠纷，大三学长取消了队长的实验室负责人身份，否决了技术改革和转向 Robomaster 的目标，而其余三名战队创始人也因实验室硬件资源和管理权分配不公而产生不满。四人商量后，决心退出实验室，奋力一搏，开始自力更生的 RM 战队创建道路。
          </p>

          <p>
            十月末，我们参观请教了青岛大学未来战队，未来战队的队长和项目管理等人非常热情地接待了我们。那时我们还在到底参加 Robomaster 还是 Robocon 的问题上踌躇不决，因为 Robocon 赛事只需要做至多 2 台机器人，似乎成本也更低，而 Robomaster 则需要做更多机器人，表面上成本更大。但是未来战队和潍坊科技学院的电控组长建议我们尝试报名 RM 的步兵对抗赛，只需要做一台步兵即可（这里真的万分感谢 RM 组委会，这个赛项让我们看到了希望）。至此，我们开启了集资与研发的道路。
          </p>

          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">插曲</h3>
            <p>
              我们从微博得知青岛科技大学在 2018 年左右曾经有过 Robomaster 战队，名叫永恒之蓝，后改名为 F&amp;W，曾参加当时的华北站赛事，大概 2019 年左右便再没了消息，相关的硬件残留也无从寻找。
            </p>
          </div>

          <p>
            在十月末刚开始准备建队时，没有老师知道我们的计划，我们也不太认为从学校能申请到资金，因为近年来包括智能汽车竞赛等等学科竞赛全部都是自费，学校没有资金支持。我们打算宿舍教室两点一线，在宿舍完成步兵的设计和制作，如果人多就改往教室。最开始的计划是购买官方 AI 步兵机器人，先尝试参加一年积累经验，但是考虑到官方步兵没有小陀螺，战斗力有待提升，我们还是决定自行设计。而紧接着发布的高校联盟赛步兵对抗赛规则里也明确指出参加过 3V3 的队伍将不再参加步兵对抗赛，这也使得我们信心大增。
          </p>

          <p>
            四人商议后，决定自费集资。截至大约十一月中期，我们在参考东北大学、香港科技大学、南京理工大学和北方工业大学的步兵机器人的基础上，确定了使用全向轮底盘，而云台则设计为中供弹。紧接着我们便找商家定做了第一批铝管和玻纤管，并从二手平台购置了整车所需的电机和电调。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-b border-slate-200 px-4 py-2 text-left font-semibold text-slate-800">成员名</th>
                  <th className="border-b border-slate-200 px-4 py-2 text-left font-semibold text-slate-800">职位</th>
                  <th className="border-b border-slate-200 px-4 py-2 text-left font-semibold text-slate-800">出资（元）</th>
                </tr>
              </thead>
              <tbody>
                {foundersTable.map((row) => (
                  <tr key={row.name} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.role}</td>
                    <td className="px-4 py-2">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-500">（此次集资后的剩余出资未在统计表中）</p>
          </div>

          <p>
            十一月下旬，我们完成了单个轮组的组装，大家很高兴并且更有信心，决定尝试找老师以获取支持。我们最开始联系了智能制造工程专业的班主任钟老师，但对方因为工作调动未能给我们支持，仅帮助我们完成了队伍注册。后来我们联系了李红宾老师，李老师年纪不大，但是有责任心敢作为，对我们本科生很关照，为我们购置了两张桌子，我们终于有了能安心做机器的地方。
          </p>

          <p>
            有了地方以后，我们招募了六名大一成员，正式组建 Robomaster 战队，由李红宾老师担任领队老师，另有几名指导老师，我们的建队之路也终于更加顺利。
          </p>

          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">2025 赛季大一成员</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-slate-700">
              {freshmen2025.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <p className="text-slate-700 font-medium">
            祝愿 YKTKEMIAO 战队能在本赛季中取得成绩，代表青岛科技大学重返 RM 赛场！
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-800">组织架构</h2>
        <p className="mt-2 text-slate-600">
          机械组、电控组、算法组、运营组、宣传组等分工说明；领队老师与指导老师配置由管理员更新。
        </p>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        2026 赛季队史（2025 年下半年 — 2026 年上半年）将在后续补充。
      </p>
    </div>
  );
}
