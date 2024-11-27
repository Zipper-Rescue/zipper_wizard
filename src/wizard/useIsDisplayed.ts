import { useLocation } from "wouter";

export default function useIsDisplayed() {
    const [location] = useLocation();
    return location === '/';
}
