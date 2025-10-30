'use server'
import { unstable_cache } from "next/cache";

export async function getUnsplashImage(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        return data.results[0].urls.small;
    } catch (error) {
        console.error("Error getting unsplash image", error.message);
        return null;
    }
}

export const getDailyPrompt = unstable_cache(async () => {
try {
    const response = await fetch("https://api.adviceslip.com/advice",{
        cache: "no-store",
    });
    const data = await response.json();
    return data.slip.advice;
} catch (error) {
    return {
        success: false,
        data:"What's on your mind today?",
    }
}
},["daily-prompt"],{
    revalidate: 60 * 60 * 24,
    tags: ["daily-prompt"],
});