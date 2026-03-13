export function Loader() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      />
    </svg>
  );
}