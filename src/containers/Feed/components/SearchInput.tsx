import React, { InputHTMLAttributes, ReactNode } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="mb-4 md:mb-8">
      <label htmlFor="SearchPost" className="p-1 dark:text-white">🔎 Pesquisar</label>
      <div>
        <input
          id="SearchPost"
          className="rounded-md px-5 py-2 w-full dark:bg-slate-900	 dark:text-white focus:bg-white focus:shadow-xl outline-none transition mt-3"
          type="text"
          placeholder="Pesquise por um post..."
          {...props}
        />
      </div>
    </div>
  )
}

export default SearchInput
