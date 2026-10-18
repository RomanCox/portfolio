import { describe, expect, it } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('только базовый класс', () => {
    expect(classNames('button')).toBe('button')
  })

  it('пустые моды', () => {
    expect(classNames('button', {})).toBe('button')
  })

  it('без базового класса', () => {
    expect(classNames(undefined, { active: true })).toBe('active')
    expect(classNames(undefined)).toBe('')
  })

  it('включённые и выключенные моды', () => {
    expect(classNames('button', { active: true, disabled: false, hovered: undefined })).toBe(
      'button active'
    )
  })

  it('отбрасывает ключ "undefined" (класса нет в модуле)', () => {
    const missing: string | undefined = undefined
    expect(classNames('button', { [String(missing)]: true, active: true })).toBe('button active')
  })

  it('внешний className и варианты', () => {
    expect(classNames('button', {}, ['external', 'primary'])).toBe('button external primary')
  })

  it('пропускает undefined в additional', () => {
    expect(classNames('button', {}, [undefined, 'external'])).toBe('button external')
  })

  it('порядок: базовый, additional, моды', () => {
    expect(classNames('button', { active: true }, ['external'])).toBe('button external active')
  })
})
