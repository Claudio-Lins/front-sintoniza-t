import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex w-[50px] h-[50px] sm:w-[64px] sm:h-[64px] border-2 border-white justify-center items-center bg-white rounded-full">
            <a 
            target={'_blank'}
            href="/"
            >
            <Image
                src="/logo/logoIcon.png"
                alt="Logo"
                width={64}
                height={64}
                objectFit="cover"
                objectPosition="center"
            />
            </a>
        </div>
    )
    }