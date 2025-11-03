import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface AvatarProps {
  src: string;
  alt: string;
  fallBack: string;
}

export default function AvatarImg({
  src,
  alt,
  fallBack
}:AvatarProps) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallBack}</AvatarFallback>
      </Avatar>
    </div>
  )
}