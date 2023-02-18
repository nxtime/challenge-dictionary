import { useState } from 'react';
import { ArrowIcon, DarkModeIcon, DictionaryIcon } from '../../assets/icons';
import '../../styles/header.sass'

const Header = ({
  isSerif,
  setIsSerif,
}:
  {
    isSerif: boolean,
    setIsSerif: () => void,
  }) => {
  const htmlContainer = document.querySelector('html') as HTMLElement;
  const darkMode = htmlContainer.classList.contains('dark');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode ?? false);

  return (
    <header className="w-full h-32 flex justify-between items-center">
      <DictionaryIcon className="text-zinc-400" />
      <ul className="flex items-center gap-4">
        <li className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md flex gap-2 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700"
            onClick={setIsSerif}
          >
            <span>{isSerif ? 'Serif' : 'Sans Serif'}</span>
            <ArrowIcon className="h-[0.375rem] text-violet-700" />
          </button>
        </li>
        <li className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="dark-mode"
            className="checkbox"
            checked={isDarkMode}
            onChange={() => {
              setIsDarkMode(b => !b);
              htmlContainer.classList.toggle('dark');
            }}
          />
          <label
            htmlFor="dark-mode"
            className="flex gap-2 items-center cursor-pointer"
          >
            <DarkModeIcon className="h-5 text-zinc-700" />
          </label>
        </li>
      </ul>
    </header>
  )
}

export default Header;
