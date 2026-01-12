const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-primary-300 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-primary-300 text-lg font-semibold tracking-wide">
        Loading, Mohon Ditunggu
      </p>
    </div>
  );
};

export default LoadingScreen;
