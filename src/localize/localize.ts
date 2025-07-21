import { HomeAssistant } from '../ha/types';
import * as en from './languages/en.json';
import * as pl from './languages/pl.json';
import * as cs from './languages/cs.json';

const languages: Record<string, unknown> = {
  en,
  pl,
  cs
}

const DEFAULT_LANG = "en";

function getTranslatedString(key: string, lang: string = DEFAULT_LANG): string | undefined {
  try {
    return key.split('.').reduce((o, i) => (o as Record<string, unknown>)[i],
      languages[lang]
    ) as string;
  } catch (_) {
    return undefined;
  }
}

export default function localize(hass: HomeAssistant, key: string): string {
  const lang = hass.locale.language || DEFAULT_LANG;

  let translatedString = getTranslatedString(key, lang);
  if (!translatedString) {
    translatedString = getTranslatedString(key, DEFAULT_LANG);
  }
  return translatedString ?? key;
}
