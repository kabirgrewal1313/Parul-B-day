type MemoryImageProps = {
  alt: string;
  src: string;
  className?: string;
  maxHeightClass?: string;
};

export function MemoryImage({
  alt,
  src,
  className = "",
  maxHeightClass = "max-h-[min(70vh,480px)]"
}: MemoryImageProps) {
  return (
    <div className={`overflow-hidden bg-[#edf6ff]/40 ${className}`}>
      <img
        alt={alt}
        className={`mx-auto block h-auto w-full object-contain ${maxHeightClass}`}
        src={src}
      />
    </div>
  );
}
