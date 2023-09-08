import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"

type Props = {
  className?: string
}

const ProfileCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="rounded-md bg-white dark:bg-slate-900	 w-full md:p-4 lg:p-4 mb-9 ">
        <div className="relative w-full after:content-[''] after:block after:pb-[100%] max-w-[50%] m-auto ">
          <Image src={CONFIG.profile.image} layout="fill" alt="" />
        </div>
        <div className="bg-white p-2 flex flex-col items-center dark:bg-slate-900	 dark:text-white">
          <div className=" text-xl font-bold">{CONFIG.profile.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {CONFIG.profile.role}
          </div>
          <div className="text-sm mb-2">{CONFIG.profile.bio}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
