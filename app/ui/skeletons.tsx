// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function SidebarSkeleton() {
  return (
    <>
      <div className={`${shimmer} relative overflow-hidden bg-gray-100 p-0.5 mb-5 shadow-sm`}>
        <div className="flex h-40 p-4"></div>
        <div className="flex items-start flex-col justify-start truncate bg-white pt-4 pb-8 px-3">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
          <div className="h-7 w-60 rounded-md bg-gray-200 my-5 w" />
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className={`${shimmer} relative overflow-hidden bg-gray-100 p-0.5 mb-5 shadow-sm`}>
        <div className="flex h-40 p-4"></div>
        <div className="flex items-start flex-col justify-start truncate bg-white pt-4 pb-8 px-3">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
          <div className="h-7 w-60 rounded-md bg-gray-200 my-5 w" />
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className={`${shimmer} relative overflow-hidden bg-gray-100 p-0.5 mb-5 shadow-sm`}>
        <div className="flex h-40 p-4"></div>
        <div className="flex items-start flex-col justify-start truncate bg-white pt-4 pb-8 px-3">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
          <div className="h-7 w-60 rounded-md bg-gray-200 my-5 w" />
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </>
  );
}