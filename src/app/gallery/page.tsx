export const metadata = {
  title: '战队风采',
  description: '训练日常、赛事瞬间、队员介绍',
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">战队风采</h1>
      <p className="mt-2 text-slate-600">
        训练日常照片、赛事精彩瞬间、机器人测试视频、战队宣传视频；核心队员介绍（照片、组别、负责方向、个人荣誉）。支持游客点赞、评论（需管理员审核）。
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400"
          >
            媒体素材
          </div>
        ))}
      </div>
    </div>
  );
}
