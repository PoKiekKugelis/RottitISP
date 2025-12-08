import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface HeaderImgProps {
  src: string;
  alt: string;
  fallBack: string;
}

export default function HeaderImg({ src, alt, fallBack }: HeaderImgProps) {
  return (
    <div className="w-full relative">
      <div className="w-full h-32 relative">
        <Image src={src} alt={alt} fill priority />
      </div>
    </div>
  );
}
