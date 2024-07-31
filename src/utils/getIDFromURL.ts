export default function getIDfromURL(url: string): string {
    if (["", null, undefined].includes(url))
      throw new Error("An error has occurred while doing operation");
    try {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  
      const match = url.match(regExp);
  
      if (match && match[2].length === 11) {
        return match[2];
      }
    } catch (e) {
      console.error(e);
      return "";
    }
  
    return "";
  }