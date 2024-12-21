import { cn } from "@/lib/utils";

type AppAvatarProps = {
  id?: string;
  imageUrl?: string;
  size?: number;
  strokeWidth?: number;
  className?: string | undefined;
  imageDefault?: string;
};
export const AppAvatar = ({
  id = "avatar",
  imageUrl,
  size = 56,
  strokeWidth = 0,
  className,
  imageDefault = "/images/defaults/avatar.svg",
}: AppAvatarProps) => {
  return (
    <div
      className={`h-[${size}px] w-[${size}px] transition-all group-hover/avatar:scale-[1.2]`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 56 56`}
        fill="none"
        role="none"
      >
        <mask id={id}>
          <path
            d="M0 28C0 14.8007 -3.51354e-07 8.20102 4.1005 4.1005C8.20102 -3.51354e-07 14.8007 0 28 0C41.1992 0 47.7989 -3.51354e-07 51.8996 4.1005C56 8.20102 56 14.8007 56 28C56 41.1992 56 47.7989 51.8996 51.8996C47.7989 56 41.1992 56 28 56C14.8007 56 8.20102 56 4.1005 51.8996C-3.51354e-07 47.7989 0 41.1992 0 28Z"
            fill="white"
          />
        </mask>
        <path
          d="M0 28C0 14.8007 -3.51354e-07 8.20102 4.1005 4.1005C8.20102 -3.51354e-07 14.8007 0 28 0C41.1992 0 47.7989 -3.51354e-07 51.8996 4.1005C56 8.20102 56 14.8007 56 28C56 41.1992 56 47.7989 51.8996 51.8996C47.7989 56 41.1992 56 28 56C14.8007 56 8.20102 56 4.1005 51.8996C-3.51354e-07 47.7989 0 41.1992 0 28Z"
          fill="none"
          strokeWidth={strokeWidth}
          className={cn("-z-1  transition-all", className)}
        />
        <g mask={`url(#${id})`}>
          <path
            d="M0 28C0 14.8007 -3.51354e-07 8.20102 4.1005 4.1005C8.20102 -3.51354e-07 14.8007 0 28 0C41.1992 0 47.7989 -3.51354e-07 51.8996 4.1005C56 8.20102 56 14.8007 56 28C56 41.1992 56 47.7989 51.8996 51.8996C47.7989 56 41.1992 56 28 56C14.8007 56 8.20102 56 4.1005 51.8996C-3.51354e-07 47.7989 0 41.1992 0 28Z"
            fill="none"
            strokeWidth={strokeWidth}
            className="relative -z-10 fill-background transition-all"
          />
          <image
            x="0"
            y="0"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            width="100%"
            xlinkHref={imageUrl || imageDefault}
            className="relative z-20"
          />

          <path
            d="M0 28C0 14.8007 -3.51354e-07 8.20102 4.1005 4.1005C8.20102 -3.51354e-07 14.8007 0 28 0C41.1992 0 47.7989 -3.51354e-07 51.8996 4.1005C56 8.20102 56 14.8007 56 28C56 41.1992 56 47.7989 51.8996 51.8996C47.7989 56 41.1992 56 28 56C14.8007 56 8.20102 56 4.1005 51.8996C-3.51354e-07 47.7989 0 41.1992 0 28Z"
            fill="none"
            strokeWidth={strokeWidth}
            className="relative z-10 stroke-primary transition-all"
          />
        </g>
      </svg>
    </div>
  );
};
