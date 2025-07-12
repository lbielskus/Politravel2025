import Image from 'next/image';

export default function SmartImage({
  src,
  alt,
  width,
  height,
  aspectRatio = '16/9',
  className = '',
  imgClassName = '',
  ...props
}) {
  if (width && height) {
    // Fixed size
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName || className}
        {...props}
      />
    );
  }
  // Responsive fill
  return (
    <div className={`relative w-full aspect-[${aspectRatio}] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imgClassName || 'object-cover rounded-2xl'}
        {...props}
      />
    </div>
  );
}
