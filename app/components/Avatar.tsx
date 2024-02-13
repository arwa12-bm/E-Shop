'use client'
import { FaUserCircle } from "react-icons/fa";


import Image from "next/image";

interface AvatarProps{
    src?: string | null | undefined ;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
        if (src) {
        return (
            <Image
            src={src}
            alt="Avatar"
            height="30"
            width="30"
            />
        );
        }
    
        // You might want to provide a default behavior or return null if src is falsy
        return (<FaUserCircle />);
    };
    

export default Avatar;