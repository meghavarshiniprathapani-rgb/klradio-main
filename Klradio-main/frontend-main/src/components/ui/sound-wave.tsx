'use client';

export function SoundWave() {
    return (
        <>
        <style>{`
            @keyframes wave {
                0% { height: 10px; y: 35; }
                50% { height: 70px; y: 5; }
                100% { height: 10px; y: 35; }
            }
            .wave-bar {
                animation: wave 1.5s infinite ease-in-out;
            }
            .wave-bar:nth-child(1) { animation-delay: 0s; }
            .wave-bar:nth-child(2) { animation-delay: 0.1s; }
            .wave-bar:nth-child(3) { animation-delay: 0.2s; }
            .wave-bar:nth-child(4) { animation-delay: 0.3s; }
            .wave-bar:nth-child(5) { animation-delay: 0.4s; }
            .wave-bar:nth-child(6) { animation-delay: 0.5s; }
            .wave-bar:nth-child(7) { animation-delay: 0.6s; }
            .wave-bar:nth-child(8) { animation-delay: 0.7s; }
            .wave-bar:nth-child(9) { animation-delay: 0.8s; }
            .wave-bar:nth-child(10) { animation-delay: 0.9s; }
            .wave-bar:nth-child(11) { animation-delay: 1s; }
            .wave-bar:nth-child(12) { animation-delay: 1.1s; }
            .wave-bar:nth-child(13) { animation-delay: 1.2s; }
            .wave-bar:nth-child(14) { animation-delay: 1.3s; }
            .wave-bar:nth-child(15) { animation-delay: 1.4s; }
            .wave-bar:nth-child(16) { animation-delay: 1.5s; }
            .wave-bar:nth-child(17) { animation-delay: 1.6s; }
            .wave-bar:nth-child(18) { animation-delay: 1.7s; }
            .wave-bar:nth-child(19) { animation-delay: 1.8s; }
            .wave-bar:nth-child(20) { animation-delay: 1.9s; }
            .wave-bar:nth-child(21) { animation-delay: 2s; }
            .wave-bar:nth-child(22) { animation-delay: 2.1s; }
            .wave-bar:nth-child(23) { animation-delay: 2.2s; }
            .wave-bar:nth-child(24) { animation-delay: 2.3s; }
            .wave-bar:nth-child(25) { animation-delay: 2.4s; }
            .wave-bar:nth-child(26) { animation-delay: 2.5s; }
            .wave-bar:nth-child(27) { animation-delay: 2.6s; }
            .wave-bar:nth-child(28) { animation-delay: 2.7s; }
            .wave-bar:nth-child(29) { animation-delay: 2.8s; }
            .wave-bar:nth-child(30) { animation-delay: 2.9s; }
            .wave-bar:nth-child(31) { animation-delay: 3s; }
            .wave-bar:nth-child(32) { animation-delay: 3.1s; }
            .wave-bar:nth-child(33) { animation-delay: 3.2s; }
            .wave-bar:nth-child(34) { animation-delay: 3.3s; }
            .wave-bar:nth-child(35) { animation-delay: 3.4s; }
            .wave-bar:nth-child(36) { animation-delay: 3.5s; }
            .wave-bar:nth-child(37) { animation-delay: 3.6s; }
            .wave-bar:nth-child(38) { animation-delay: 3.7s; }
            .wave-bar:nth-child(39) { animation-delay: 3.8s; }
            .wave-bar:nth-child(40) { animation-delay: 3.9s; }
            .wave-bar:nth-child(41) { animation-delay: 4s; }
            .wave-bar:nth-child(42) { animation-delay: 4.1s; }
            .wave-bar:nth-child(43) { animation-delay: 4.2s; }
            .wave-bar:nth-child(44) { animation-delay: 4.3s; }
            .wave-bar:nth-child(45) { animation-delay: 4.4s; }
            .wave-bar:nth-child(46) { animation-delay: 4.5s; }
            .wave-bar:nth-child(47) { animation-delay: 4.6s; }
            .wave-bar:nth-child(48) { animation-delay: 4.7s; }
        `}</style>
        <div
            className="relative -top-8 left-1/2 -translate-x-1/2 w-[100%] h-24 opacity-30"
            style={{
                background:
                    'radial-gradient(50% 50% at 50% 50%, hsl(var(--primary)) 0%, rgba(219, 44, 44, 0) 100%)',
            }}
        >
            <svg
                className="w-full h-full text-primary"
                width="100%"
                height="100%"
                viewBox="0 0 1200 80"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g opacity="0.7" filter="url(#glow)" fill="currentColor">
                    {Array.from({ length: 48 }).map((_, i) => (
                         <rect key={i} className="wave-bar" x={i * 25} y="30" width="15" height="20" rx="3" />
                    ))}
                </g>
            </svg>
        </div>
        </>
    );
}
