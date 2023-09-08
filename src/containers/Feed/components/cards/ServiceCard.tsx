import { CONFIG } from "site.config"
import React from "react"
import { AiFillCodeSandboxCircle } from "react-icons/ai"

const ServiceCard: React.FC = () => {
  const element = CONFIG.projects.map(({ href, name }) => {
    return (
      <>
        <a
          href={`${href}`}
          rel="noreferrer"
          target="_blank"
          className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white"
        >
          <AiFillCodeSandboxCircle className="text-2xl" />
          <div className="text-sm">{name}</div>
        </a>
      </>)
  })

  return (
    element.length > 0 ?
      <>
        <div className="p-1 mb-3 dark:text-white">🌟 Projetos</div>
        <ul className="rounded-md mb-9 bg-white dark:bg-slate-900	 p-1 flex flex-col">
          {element}
        </ul>
      </>
      : null)
}

export default ServiceCard
