import { qnTypes } from "../types/Survey";

// switch zamieniający typ pytania na ładniejszą wersje
function prettyQnType(type: qnTypes) {
  switch (type) {
    case qnTypes.YES_NO:
      return "Pytanie tak lub nie";
    case qnTypes.SINGLE:
      return "Pytanie pojedyńczej odpowiedzi";
    case qnTypes.MULTI:
      return "Pytanie wielokrotnej odpowiedzi";
    case qnTypes.SHORT:
      return "Krótka odpowiedź";
    case qnTypes.LONG:
      return "Długa odpowiedź";
    default:
      return "Inne";
  }
}

export { prettyQnType };
