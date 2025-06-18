export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <img
        src="/favicon/android-chrome-192x192.png"
        alt="On&Off 로고"
        width={128}
        height={128}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
