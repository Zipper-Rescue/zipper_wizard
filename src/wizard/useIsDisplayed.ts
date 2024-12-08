import { useLocation } from "wouter";

/* Whether the current nested wouter Route is selected. */
export default function useIsDisplayed() {
    const [location] = useLocation();
    return location === '/';
}
