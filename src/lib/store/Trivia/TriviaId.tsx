import { TriviaClient, TriviaView } from "@/lib/types/ts/Quest";
import { TriviaViewMock } from "@/mock/QuizView";
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
  resultTrivia?: TriviaView 
  addTrivia: (trivia: TriviaClient[]) => void
  previusTrivia: () => void
  nextTrivia: () => void
  selectIdTrivia: (id: number) => void
  selectedAnswer: (answerIndex: number) => void
}




export const TriviaGame = create<TriviaGameState>((set, get) => ({
  trivia: TriviaViewMock["array"],
  resultTrivia: undefined, 
  currentQuestion: 0,
  addTrivia: (trivia: TriviaClient[]) => {
    const shuffledAlternatives = deepShuffle(trivia)
    set({ trivia: shuffledAlternatives });
  },
  selectedAnswer: (answerIndex: number) => {
    const { trivia, currentQuestion } = get();
    console.log("Answer selected:", answerIndex);
    const triviaClone = structuredClone(trivia);
    const selectIndex = triviaClone[currentQuestion].alternative.findIndex(alt => alt.correct);

    triviaClone[currentQuestion] = {
      ...triviaClone[currentQuestion],
      userselect: answerIndex,
      iscorrect: selectIndex === answerIndex
    }

    console.log(triviaClone[currentQuestion]);

    set({ trivia: triviaClone });
  },
  previusTrivia: () => {
    const { currentQuestion } = get();

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
  nextTrivia: () => {
    const { currentQuestion, trivia } = get();

    const countSelect = trivia.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);

    if (currentQuestion + 1 < trivia.length) {
      set({ currentQuestion: currentQuestion + 1 });
    }

    if (countSelect === trivia.length && currentQuestion + 1 === trivia.length) {
      set({
        resultTrivia: {
          id: 1,
          title: "The Binding of Isaac",
          category: "General",
          difficulty: "medium",
          questions: trivia.length,
          answer: {
            correct: trivia.filter(t => t.iscorrect).length,
            incorrect: trivia.filter(t => !t.iscorrect).length,
        }
      }})
    }

  }
}))