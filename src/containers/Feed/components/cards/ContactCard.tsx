import { CONFIG } from "site.config"
import React from "react"
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineMail,
  AiFillLinkedin,
} from "react-icons/ai"

const ContactCard: React.FC = () => {
  return (
    <>
      <div className="p-1 mb-3 dark:text-white">💬 Contatos</div>
      <ul className="rounded-md bg-gray-100 dark:bg-slate-900	 p-1 flex flex-col border-solid border-2 border-gray-200">
        {CONFIG.profile.github && (
          <a
            href={`https://github.com/${CONFIG.profile.github}`}
            rel="noreferrer"
            target="_blank"
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer flex items-center gap-3 text-gray-900 dark:text-white hover:text-black dark:hover:text-white "
          >
            <AiOutlineGithub className="text-2xl" />
            <div className="text-sm">GitHub</div>
          </a>
        )}
        {CONFIG.profile.instagram && (
          <a
            href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
            className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer flex items-center gap-3 text-gray-900 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineInstagram className="text-2xl" />
            <div className="text-sm">Instagram</div>
          </a>
        )}
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            className="overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer flex items-center gap-3 text-gray-900 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiOutlineMail className="text-2xl flex-shrink-0" />
            <div className="text-sm">Email</div>
          </a>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}`}
            rel="noreferrer"
            target="_blank"
            className="  overflow-hidden p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer flex items-center gap-3 text-gray-900 dark:text-white hover:text-black dark:hover:text-white"
          >
            <AiFillLinkedin className="text-2xl flex-shrink-0" />
            <div className="text-sm">Linkedin</div>
          </a>
        )}
      </ul>
    </>
  )
}

export default ContactCard
