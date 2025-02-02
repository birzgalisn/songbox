import { useFormStatus } from 'react-dom';

export default function LoadingSpinner() {
  const { pending } = useFormStatus();

  return (
    <div
      data-pending={pending ? '' : undefined}
      className="absolute top-1/2 right-3 -translate-y-1/2 transition-opacity duration-300"
    >
      <svg className="h-5 w-5" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray="282.7"
          strokeDashoffset="282.7"
          className={pending ? 'animate-fill-clock' : ''}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
}
