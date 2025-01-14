import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const DEFAULT_LANGUAGE = 'en';

const LANGUAGES = {
  en: require('./en.json'),
  vi: require('./vi.json'),
};

export const t = (res, langPath, defaultValue = '', langForced = null) => {
  const lang = langForced || res.locals.lang;

  const langJson = LANGUAGES[lang];
  if (!langJson) {
    return defaultValue;
  }

  const keys = langPath.split('.');
  let result = langJson;

  for (let key of keys) {
    if (result[key] === undefined) {
      result = defaultValue;
      break;
    }
    result = result[key];
  }

  if (!result && !langForced && lang !== DEFAULT_LANGUAGE) {
    // fallback to default
    return t(res, langPath, '', DEFAULT_LANGUAGE);
  }

  return result;
};
