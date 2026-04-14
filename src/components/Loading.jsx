export default function Loading({ size = 'md', text = 'Ładowanie...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div className={`${sizeClasses} border-2 border-primary border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
}