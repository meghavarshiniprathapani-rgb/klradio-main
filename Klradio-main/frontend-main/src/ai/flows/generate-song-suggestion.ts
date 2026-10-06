'use server';

/**
 * @fileOverview A GenAI-powered tool to generate song suggestions based on a prompt.
 *
 * - generateSongSuggestion - A function that handles the song suggestion generation process.
 * - GenerateSongSuggestionInput - The input type for the generateSongSuggestion function.
 * - GenerateSongSuggestionOutput - The return type for the generateSongSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSongSuggestionInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate song suggestions from.'),
});
export type GenerateSongSuggestionInput = z.infer<typeof GenerateSongSuggestionInputSchema>;

const SongSchema = z.object({
    title: z.string().describe('The title of the song.'),
    artist: z.string().describe('The artist of the song.'),
    movie: z.string().describe('The movie the song is from.'),
});

const GenerateSongSuggestionOutputSchema = z.object({
  songs: z.array(SongSchema).describe('A list of suggested songs.'),
});
export type GenerateSongSuggestionOutput = z.infer<typeof GenerateSongSuggestionOutputSchema>;

export async function generateSongSuggestion(input: GenerateSongSuggestionInput): Promise<GenerateSongSuggestionOutput> {
  return generateSongSuggestionFlow(input);
}

const generateSongSuggestionPrompt = ai.definePrompt({
  name: 'generateSongSuggestionPrompt',
  input: {schema: GenerateSongSuggestionInputSchema},
  output: {schema: GenerateSongSuggestionOutputSchema},
  prompt: `You are a music expert and curator for KL Radio, specializing in melodious and decent songs. Your task is to answer user queries related to music by providing a list of 5 relevant song suggestions. The songs should be appropriate for a general audience. For each suggestion, provide the song title, artist, and the movie it is from.

  Prompt: {{{prompt}}}`,
});

const generateSongSuggestionFlow = ai.defineFlow(
  {
    name: 'generateSongSuggestionFlow',
    inputSchema: GenerateSongSuggestionInputSchema,
    outputSchema: GenerateSongSuggestionOutputSchema,
  },
  async input => {
    const {output} = await generateSongSuggestionPrompt(input);
    return output!;
  }
);
