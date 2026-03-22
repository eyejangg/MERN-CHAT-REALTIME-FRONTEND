const MessageSkeleton = () => {
  // Create an array of 6 items for the skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className="flex gap-2 max-w-[60%]">
            {idx % 2 === 0 && (
              <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse shrink-0" />
            )}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-base-300 animate-pulse rounded" />
              <div className="h-16 w-48 bg-base-300 animate-pulse rounded-xl" />
            </div>
            {idx % 2 !== 0 && (
              <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse shrink-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
