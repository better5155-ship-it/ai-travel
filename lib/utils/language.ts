export function detectLanguage(text: string) {

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/

  if (koreanRegex.test(text)) {
    return "ko"
  }

  return "en"
}