import Image from "next/image";

export default function Logo() {
    return (
        <div className="relative w-16 h-16 bg-white rounded-full">
            <Image
                src="/logo/logoIcon.png"
                alt="Logo"
                layout="fill"
            />
        </div>
    )
    }