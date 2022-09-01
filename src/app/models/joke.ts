import { Flags } from "./flags";

export interface Joke {
    category: string;
    type: 'twopart' | 'single';
    setup: string;
    delivery: string;
    joke: string;
    flags: Flags;
    id: number;
    error: boolean
}

