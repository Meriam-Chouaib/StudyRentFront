export default function BackgroundIllustration() {
  return (
    <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
      <radialGradient id="a" cx="50%" cy="46.801102%" r="95.497112%">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#919eab" stopOpacity=".48" />
      </radialGradient>
      <path
        d="m88 86h512v512h-512z"
        fill="url(#a)"
        fillRule="evenodd"
        transform="translate(-88 -86)"
      />
    </svg>
  );
}
