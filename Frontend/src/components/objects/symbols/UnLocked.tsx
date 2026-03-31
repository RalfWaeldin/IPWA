type LockProperties = {
  width: string;
  height: string;
  color?: string;
};

export default function UnLocked(props: LockProperties) {
  const lockwidth: string = props.width;
  const lockheight: string = props.height;
  const lockcolor = props.color ? props.color : "#000000";
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={lockwidth}
      height={lockheight}
      fill={lockcolor}
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M15 7a2 2 0 1 1 4 0v4a1 1 0 1 0 2 0V7a4 4 0 0 0-8 0v3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V7Zm-5 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
