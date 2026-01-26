import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { createPortal } from 'react-dom';

const CustomCursor = () => {
    // RAW motion values for instant response (No Spring)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isClickable) setIsHovering(true);
            else setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible, cursorX, cursorY]);

    if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return null;
    }

    // Additional window width check just in case
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    if (!mounted) return null;

    return createPortal(
        <div className="pointer-events-none fixed inset-0 z-[2147483647] overflow-hidden hidden md:block">
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    width: isHovering ? 40 : 12,
                    height: isHovering ? 40 : 12,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
                    border: isHovering ? '2px solid white' : '0px solid white',
                    scale: isHovering ? 1 : 1
                }}
                transition={{
                    duration: 0.15,
                    ease: "easeInOut"
                }}
            />
        </div>,
        document.body
    );
};

export default CustomCursor;
