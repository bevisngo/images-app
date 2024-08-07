import { useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore, hasMore]
  );

  return <div ref={lastElementRef} className="h-[2px] w-[100px] bg-white" />;
};

export default InfiniteScroll;
