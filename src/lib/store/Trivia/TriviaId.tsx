import { TriviaClient, TriviaView, TriviaViewEx } from "@/lib/types/ts/Quest";
import { TudotIA } from "@/service/global/TudotIA";
import { create } from "zustand";



function deepShuffle(array: TriviaClient[]) {
  // Copia profunda de objetos y sus alternative
  const newArray = structuredClone(array);

  // Barajar array principal
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Barajar alternativas de cada objeto
  for (const item of newArray) {
    const alt = item.alternative;
    for (let k = alt.length - 1; k > 0; k--) {
      const l = Math.floor(Math.random() * (k + 1));
      [alt[k], alt[l]] = [alt[l], alt[k]];
    }
  }

  return newArray;
}



interface TriviaGameState {
  trivia: TriviaClient[]
  currentQuestion: number
  resultTrivia?: TriviaViewEx
  preview: boolean,
  loading: boolean
  previusTrivia: () => void
  nextTrivia: () => void
  selectIdTrivia: (id: number) => void
  selectedAnswer: (answerIndex: number) => void
  getTriviaId: (id: number) => Promise<void>
  reset: () => void
  initial: () => void
}




export const TriviaGame = create<TriviaGameState>((set, get, store) => ({
  trivia: [],
  resultTrivia: undefined,
  loading: true,
  currentQuestion: 0,
  preview: false,
  initial: () => {
    set(store.getInitialState)
  },
  reset: () => {
    const { trivia, resultTrivia } = get()

    let clonetrivia = structuredClone(trivia)
    let cloneresultTrivia = structuredClone(resultTrivia)

    clonetrivia.forEach((data) => {
      data.userselect = undefined
      delete data.iscorrect
    })

    if (cloneresultTrivia)
      cloneresultTrivia = {
        ...cloneresultTrivia,
        answer: {
          correct: 0,
          incorrect: 0
        }
      }

    set({
      trivia: deepShuffle(clonetrivia),
      resultTrivia: cloneresultTrivia,
      currentQuestion: 0
    })
  },
  getTriviaId: async (id) => {
    set({ loading: true })

    const result = await TudotIA.trivia.getTriviaId(id)

    if (result.success) {
      const { getTrivia, getTriviaArray } = result.data
      const resulTrivia = getTrivia.questions === (getTrivia.answer.correct + getTrivia.answer.incorrect)
      const ramdom = resulTrivia ? getTriviaArray : deepShuffle(getTriviaArray)

      // 🔹 Añade un pequeño delay antes de mostrar
      await new Promise(resolve => setTimeout(resolve, 300)) // un poco menos de medio segundo

      set({
        trivia: ramdom,
        resultTrivia: getTrivia,
        currentQuestion: resulTrivia ? getTriviaArray.length - 1 : 0,
        preview: false,
        loading: false, // 🔹 mueve esto aquí
      })
    }


    set({loading: false})
  },
  selectedAnswer: (answerIndex: number) => {
    const { trivia, currentQuestion, preview } = get();

    if (preview) return;

    const triviaClone = structuredClone(trivia);

    triviaClone[currentQuestion] = {
      ...triviaClone[currentQuestion],
      userselect: answerIndex,
    }

    console.log(triviaClone[currentQuestion]);

    set({ trivia: triviaClone });
  },
  previusTrivia: () => {
    const { trivia, currentQuestion, preview, resultTrivia } = get();

    const triviaResult = trivia.length === ((resultTrivia?.answer.correct ? resultTrivia?.answer.correct : 0) + (resultTrivia?.answer.incorrect ? resultTrivia?.answer.incorrect : 0));
    console.log(triviaResult, "trivia result");
    const countSelect = trivia.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);
    console.log(currentQuestion + 1 === trivia.length)
    if (!preview && countSelect === trivia.length && currentQuestion + 1 === trivia.length && triviaResult) {
      set({ preview: true });
      return;
    }


    console.log("Previous question");

    if (currentQuestion - 1 >= 0) {
      set({ currentQuestion: currentQuestion - 1 });
    }
  },
  selectIdTrivia: (id: number) => {
    const { trivia } = get();


    if (id >= 0 && id < trivia.length) {
      set({ currentQuestion: id });
    }



  },
  nextTrivia: async () => {
    const { currentQuestion, trivia, resultTrivia } = get();

    const countSelect = trivia.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);

    if (currentQuestion + 1 < trivia.length) {
      set({ currentQuestion: currentQuestion + 1 });
    }

    if (resultTrivia && resultTrivia.id && countSelect === trivia.length && currentQuestion + 1 === trivia.length) {
      const result = await TudotIA.trivia.updateTrivia(resultTrivia.id, trivia)
      if (result.success) {
        set({ resultTrivia: result.data.getTrivia, trivia: result.data.getTriviaArray, preview: false })
      }
    }
  }
}))