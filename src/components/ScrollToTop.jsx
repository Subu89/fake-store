import { ArrowUpward } from "@mui/icons-material";

const ScrollToTopButton = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <button onClick={handleClick} className="scroll-to-top">
            <ArrowUpward />
        </button>
    )
}

export default ScrollToTopButton