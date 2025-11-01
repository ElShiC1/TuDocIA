export const Icon = {
    FileJson: ({ className }: { className: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /><path d="M14 2v4a2 2 0 0 0 2 2h4M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1m4 0a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" /></svg>
    ),
    Check: ({ className }: { className: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32"></path></svg>),
    Incorrect: ({ className }: { className: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-6.489 5.8a1 1 0 0 0-1.218 1.567L10.585 12l-1.292 1.293l-.083.094a1 1 0 0 0 1.497 1.32L12 13.415l1.293 1.292l.094.083a1 1 0 0 0 1.32-1.497L13.415 12l1.292-1.293l.083-.094a1 1 0 0 0-1.497-1.32L12 10.585l-1.293-1.292l-.094-.083z"></path></svg>),
    Neutral: ({ className }: { className: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M9.01 9l-.127.007a1 1 0 0 0 0 1.986L9 11l.127-.007a1 1 0 0 0 0-1.986zm6 0l-.127.007a1 1 0 0 0 0 1.986L15 11l.127-.007a1 1 0 0 0 0-1.986z"></path></svg>),
    Add: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>  
    ),
    Filter: ({ className }: { className: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M11 18q-.425 0-.712-.288T10 17t.288-.712T11 16h2q.425 0 .713.288T14 17t-.288.713T13 18zm-4-5q-.425 0-.712-.288T6 12t.288-.712T7 11h10q.425 0 .713.288T18 12t-.288.713T17 13zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"></path></svg>
    )
}