/* eslint-disable react/prop-types */
// export const UserIcon = ({className, width, height}) => (

// )

export const IconCart = ({ className, width = "3rem", height = "3rem" }) => (
  <svg
    stroke="currentColor"
    className={className}
    width={width}
    height={height}
    fill="none"
    strokeWidth="0"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    ></path>
  </svg>
);

export const IconSearch = ({ className, width = "3rem", height = "3rem" }) => (
  <svg
    className={className}
    width={width}
    height={height}
    data-e2e=""
    viewBox="0 0 48 48"
    fill="rgba(0, 0, 0, .9)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
    ></path>
  </svg>
);



export const IconArrowRight = ({ className, width = "3rem", height = "3rem" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className}
  width={width}
  height={height} 
  viewBox="0 0 22 22"
  >
    <g>
      <path 
        xmlns="http://www.w3.org/2000/svg" 
        d="m4 13c-.26901 0-.50292-.0994-.70175-.2982-.19883-.1989-.29825-.4328-.29825-.7018 0-.2807.09942-.5146.29825-.7018.19883-.1988.43274-.2982.70175-.2982h16c.2807 0 .5146.0994.7018.2982.1988.1872.2982.4211.2982.7018 0 .269-.0994.5029-.2982.7018-.1872.1988-.4211.2982-.7018.2982zm9.7018 6.7018c-.1755.1988-.4094.2982-.7018.2982-.269 0-.5029-.0994-.7018-.2982-.1988-.1989-.2982-.4328-.2982-.7018 0-.2924.0994-.5263.2982-.7018l6.8948-6.8947c.0585-.0585.0994.0292.1228.2632.0234.2222.0234.4503 0 .6842-.0234.2222-.0643.3041-.1228.2456l-6.8948-6.89475c-.1988-.18713-.2982-.42105-.2982-.70175s.0994-.51462.2982-.70176c.1989-.19882.4328-.29824.7018-.29824.2924 0 .5263.09942.7018.29824l6.8947 6.89476c.2222.2105.3333.4795.3333.807 0 .3158-.1111.5848-.3333.807z"
        >
      </path>
    </g>
  </svg>
);

