import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MAXIMUM_TITLE_LENGTH } from "./constants.ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isUrl(input: string | null | undefined) {
  if(!input || input == undefined) return false
  return input.startsWith("http") || input.startsWith("www")
}

export function isTitleTooLong(input: string) {
  return input.length > MAXIMUM_TITLE_LENGTH
}

export function shortenTitleToMaxLength(input:string): string {
  let newLength = 0;
  let shortenedInput : string = ""
  const words =  input.split(" ");

  words.map((word)=>{
    if(newLength > MAXIMUM_TITLE_LENGTH) return
    shortenedInput+= " " + word
    newLength += (word.length + 1)
  })

  if(shortenedInput.length < input.length){
    shortenedInput += "..."
  }

  return shortenedInput;

}
