export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="লোড হচ্ছে">
      {/* Header card */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-7 py-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-green-100" />
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-10 w-28 rounded-lg bg-gray-100" />
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-5 h-6 w-48 rounded bg-gray-200" />
        <div className="mb-2 h-4 w-12 rounded bg-gray-200" />
        <div className="h-12 w-full rounded-lg bg-gray-100" />
        <div className="mt-4 h-10 w-40 rounded-lg bg-green-100" />
      </div>
    </div>
  );
}