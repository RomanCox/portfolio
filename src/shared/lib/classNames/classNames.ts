export type Mods = Record<string, boolean | string | undefined>

export function classNames(
  cls: string | undefined,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      // ключ 'undefined' появляется, если класса нет в модуле (опечатка) — не пропускаем его в DOM
      .filter(([className, value]) => Boolean(value) && className !== 'undefined')
      .map(([className]) => className),
  ]
    .filter(Boolean)
    .join(' ')
}
