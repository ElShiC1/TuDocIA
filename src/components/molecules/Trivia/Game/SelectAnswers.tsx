import { TriviaClient } from "@/lib/types/ts/Quest"

function playClickSound() {
  const audioCtx = new AudioContext() // solo AudioContext moderno
  
  const oscillator = audioCtx.createOscillator()
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime)

  const gainNode = audioCtx.createGain()
  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 0.1)
}

export const SelectAnswers = ({ triviaInfo, selectedAnswer, preview }: { triviaInfo: TriviaClient, selectedAnswer: (id: number) => void, preview: boolean }) => {

    const getColor = (correct: boolean, index: number) => {
        console.log(correct, index)
        if (preview) {
            if (index === triviaInfo.userselect) {
                return triviaInfo.iscorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }

            if (correct) {
                return 'bg-green-300'
            }
        }

        return "peer-checked:hover:bg-blue-600 hover:bg-gray-50"
    }

    return (
        <div className="relative text-center flex flex-col gap-3.5">
            {triviaInfo.alternative.map((value, index) => (
                <div key={index} className="flex grow border-1 border-gray-300 rounded-xl overflow-hidden shadow-sm">
                    <input disabled={preview} type="radio" name="quest" id={value.answer} className="hidden peer" checked={triviaInfo.userselect === index} onChange={() => {
                        selectedAnswer(index)
                        playClickSound()
                        }} />
                    <label htmlFor={value.answer} className={`${!preview ? "peer-checked:bg-blue-500" : ""} grow cursor-pointer flex px-4 py-3  hover:text-black text-sm
              peer-checked:hover:text-white duration-300 leading-5  peer-checked:text-white ${getColor(value.correct, index)}`}>
                        <span className="grow text-left">{value.answer}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}