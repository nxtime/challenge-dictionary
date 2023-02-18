import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDebounce } from "usehooks-ts";
import { SearchIcon, TriangleIcon, PauseIcon } from './assets/icons'
import Header from "./components/layout/Header"
import { Link, useLoaderData } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

export async function loader({ params }: any) {
  return { word: params?.word ?? '' };
}

function App() {
  const { word }: any = useLoaderData();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentWord, setCurrentWord] = useState<string>(word);
  const deferedWord = useDebounce(currentWord, 500)

  useEffect(() => {
    setCurrentWord(word);
  }, [word])

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSerif, setIsSerif] = useState<boolean>(true);
  const [sectionContext, setSectionContext] = useState<any>({
    word: '',
    definition: '',
    pronunciation: '',
    audio: '',
    meanings: [],
    source: ''
  });
  const { isLoading, error, data } = useQuery({
    queryKey: ['word', deferedWord],
    queryFn: async () => {
      try {
        const res = await axios(`https://api.dictionaryapi.dev/api/v2/entries/en/${deferedWord}`);
        window.history.replaceState(null, `Dictionary - ${deferedWord}`, "/" + deferedWord);
        return res.data;
      } catch (e) {
        return await Promise.reject(e);
      }
    },
    enabled: !!deferedWord && deferedWord !== '',
  })

  useEffect(() => {
    if (data) {
      const wordData = data[0];

      const phonetic = wordData.phonetics.filter((phonetic: any) => phonetic.audio !== '')[0] ?? wordData.phonetic;

      setSectionContext((prevContext: any) => ({
        ...prevContext,
        word: wordData.word,
        pronunciation: phonetic?.text ?? deferedWord,
        meanings: wordData.meanings,
        audio: phonetic?.audio ?? '',

      }));

      if (!audioRef.current) return

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = phonetic?.audio;
    }
  }, [data])


  return (
    <main className="text-zinc-900 bg-zinc-100 dark:text-zinc-100 dark:bg-zinc-900 transition-colors">
      <div
        className={`
        min-h-screen max-w-xl px-4 mx-auto flex flex-col gap-4 items-center 
        ${isSerif ? 'font-serif' : 'font-sans'}
      `}
      >
        <Header
          isSerif={isSerif}
          setIsSerif={() => setIsSerif(p => !p)}
        />
        <div
          className="w-full relative h-14 flex items-center rounded-xl bg-violet-100 dark:bg-violet-700 overflow-hidden"
        >
          <input
            type="text"
            id="search"
            className="h-full px-6 w-full outline-none bg-transparent font-bold"
            value={currentWord}
            onChange={(e) => {
              setCurrentWord((e.target.value));
            }}
          />
          <label htmlFor="search" className="cursor-pointer absolute hover:bg-violet-200 dark:hover:bg-violet-500 right-4 h-10 w-10 flex items-center justify-center rounded-full transition-colors">
            <SearchIcon className="text-violet-500 dark:text-violet-200 h-4 w-4" />
          </label>
          <audio className="hidden" ref={audioRef} />
        </div>
        <AnimatePresence mode="wait">
          {
            isLoading && (sectionContext.meanings.length > 0 && !error) ? (
              <motion.span
                key="loading"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="mt-[calc(100vh/2-12rem)] h-8 w-8 rounded-full border-4 border-r-transparent border-violet-500 animate-spin"
              ></motion.span>
            ) :
              error ? (
                <motion.span
                  key="error"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="mt-[calc(100vh/2-12rem)] text-red-500"
                >
                  Word was not found
                </motion.span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={deferedWord}
                    initial={{
                      opacity: 0,
                      y: 25
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: 50
                    }}
                    transition={{
                      duration: 0.8
                    }}
                    className="flex flex-col gap-4 w-full">
                    <header className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <h2 className="text-4xl font-bold">{sectionContext.word}</h2>
                        <button
                          className="h-16 disabled:opacity-50 w-16 bg-fuchsia-200 rounded-full flex items-center justify-center"
                          disabled={isPlaying}
                          onClick={() => {
                            if (audioRef.current === null) return;

                            setIsPlaying(true);

                            audioRef.current.play();
                            const checkIfStillPlaying = setInterval(() => {
                              if (audioRef.current?.paused) {
                                setIsPlaying(false);
                                clearInterval(checkIfStillPlaying);
                              }
                            }, 500)
                          }}
                        >
                          {
                            !isPlaying ? (
                              <TriangleIcon className="text-fuchsia-600 h-6 w-8" />
                            ) : (
                              <PauseIcon className="text-fuchsia-600 h-6 w-8" />
                            )
                          }
                        </button>
                      </div>
                      <span className="text-violet-500 font-medium">{sectionContext.pronunciation}</span>
                    </header>
                    <section className="">
                      <ul className="flex flex-col gap-4">
                        {
                          sectionContext?.meanings?.map(({ partOfSpeech, definitions, synonyms }: any, meaningIndex: number) => (
                            <li key={partOfSpeech + '-' + meaningIndex}>
                              <span className="text-lg text-zinc-700 dark:text-zinc-300 font-bold">{partOfSpeech}</span>
                              <div className="flex flex-col gap-2">
                                <h3 className="text-lg text-zinc-400">Meaning</h3>
                                <ul className="ml-8 list-disc flex flex-col gap-2">
                                  {
                                    definitions.map((def: any, defIndex: number) => (
                                      <li key={`definition-${partOfSpeech}-${defIndex}`}>
                                        <span className="text-sm">{def.definition}</span>
                                      </li>
                                    ))
                                  }
                                </ul>
                                <ul className="flex gap-2 flex-wrap">
                                  <li>
                                    <span className="text-md text-zinc-400">Synonyms</span>
                                  </li>
                                  {
                                    synonyms?.map((synonym: string, synonymIndex: number) => (
                                      <li key={`synonym-${partOfSpeech}-${synonymIndex}`}>
                                        <Link
                                          to={'/' + synonym}
                                          className="text-sm text-violet-500"
                                        >{synonym}
                                        </Link>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </section>
                  </motion.div>
                </AnimatePresence>
              )
          }
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
