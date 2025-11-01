"use client"
import { TriviaGame } from "@/lib/store/Trivia/TriviaId";
import { useEffect, useRef, useState } from "react";

const id = ({ params }: { params: Promise<{ id: string }> }) => {

    const triviaData = TriviaGame((state) => state.trivia)
    const currentQuestion = TriviaGame((state) => state.currentQuestion)
    const selectedAnswer = TriviaGame((state) => state.selectedAnswer)
    const selectIdTrivia = TriviaGame((state) => state.selectIdTrivia)
    const nextTrivia = TriviaGame((state) => state.nextTrivia)
    const previusTrivia = TriviaGame((state) => state.previusTrivia)
    const [progress, setProgress] = useState(0);
    const targetRef = useRef(0);
    const animationRef = useRef<number | null>(null);
    const countSelect = triviaData.reduce((acc, t) => acc + (t.userselect !== undefined ? 1 : 0), 0);
    console.log(countSelect)


    const triviaInfo = triviaData[currentQuestion]

    const animate = () => {
        setProgress(prev => {
            const diff = targetRef.current - prev;
            if (Math.abs(diff) < 0.5) {

                cancelAnimationFrame(animationRef.current!);
                animationRef.current = null;
                return targetRef.current;
            }
            console.log("stop animation", targetRef.current);
            return prev + diff * 0.1;
        });

        animationRef.current = requestAnimationFrame(animate);
    };

    // Cada vez que cambia currentQuestion
    useEffect(() => {

        targetRef.current = ((currentQuestion) / (triviaData.length - 1)) * 100;

        if (animationRef.current === null) {
            animationRef.current = requestAnimationFrame(animate);
        }
    }, [currentQuestion]);




    return (
        <div className="relative h-auto w-full bg-white border border-gray-300 shadow-2xl rounded-4xl p-10 flex flex-col gap-5">
            {/* Fondo con conic-gradient */}
            <div
                className="absolute inset-[-3px] rounded-4xl z-[-1] "
                style={{
                    "--angle": `${progress * 3.6}deg`,
                    background:
                        "conic-gradient(#3b82f6 0deg, #3b82f6 var(--angle), white var(--angle), white 360deg)",
                    mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "3px",
                    transition: "var(--angle) 0.5s ease", // funciona porque es numérica
                } as React.CSSProperties}
            ></div>
            <div className="flex justify-center">
                <span className="text-xl text-blue-500 font-semibold text-center">{triviaInfo.quest}</span>
            </div>

            {/* Contenido encima */}
            <div className="relative text-center flex flex-col gap-3.5">
                {triviaInfo.alternative.map((value, index) => (
                    <div key={index} className="flex grow border-1 border-gray-300 rounded-xl overflow-hidden shadow-sm">
                        <input type="radio" name="quest" id={value.answer} className="hidden peer" checked={triviaInfo.userselect === index} onChange={() => selectedAnswer(index)} />
                        <label htmlFor={value.answer} className="peer-checked:bg-blue-500 grow cursor-pointer flex px-4 py-3 transition-colors hover:bg-gray-50 hover:text-black text-sm
             peer-checked:hover:bg-blue-600 peer-checked:hover:text-white duration-300 leading-5  peer-checked:text-white">
                            <span className="grow text-left">{value.answer}</span>
                        </label>
                    </div>
                ))}


            </div>
            <div id="options-button" className="flex items-center h-7 relative justify-between ">
                {currentQuestion >= 1 && <button
                    className="cursor-pointer z-1 min-w-7 h-7 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold block"
                    onClick={previusTrivia}
                >
                    &lt;
                </button>}
                <div
                    id="scroll-x"
                    className="scroll-x absolute left-0 right-0 flex h-full justify-start overflow-x-auto w-[calc(100%-6rem)] mx-auto"
                >
                    <div className="flex justify-center gap-2 mx-auto">
                        {triviaData.map((value, index) => {


                            return (
                                <div
                                    key={index}
                                    className={`h-full min-w-7 cursor-pointer flex items-center justify-center rounded-full text-white text-sm font-semibold ${currentQuestion !== index ? value.userselect ? "bg-blue-300" : "bg-gray-400/60" : "bg-blue-500"} flex-shrink-0`}
                                    onClick={() => selectIdTrivia(index)}
                                >
                                    {index + 1}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {((currentQuestion < triviaData.length - 1) || countSelect === triviaData.length) && (
                    <button
                        className="cursor-pointer z-1 min-w-7 h-7 ml-auto rounded-full bg-blue-500 text-white items-center justify-center text-sm font-semibold block"
                        onClick={nextTrivia}
                    >
                        &gt;
                    </button>
                )}


            </div>
        </div>
    )
}

export default id