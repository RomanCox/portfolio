import { THEMES, THEME_STORAGE_KEY } from '@/shared/lib/theme/theme'

// Выполняется синхронно в <head> до первой отрисовки: ставит сохранённую тему,
// иначе атрибут не трогает — системную тему подхватывает @media в tokens.css.
const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(THEMES)}.indexOf(t)!==-1)document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
