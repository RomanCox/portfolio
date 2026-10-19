import { TAPE_PRIMARY, TAPE_SECONDARY } from '@/data/tape'
import { ScrollMarquee } from '@/effects/ScrollMarquee/ScrollMarquee'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tape.module.scss'

// Слова повторяются, чтобы лента была шире окна; дорожка из одинаковых копий
// сдвигается от прокрутки и не показывает разрыва
const REPEAT = 2

function track(words: readonly string[]) {
  return Array.from({ length: REPEAT * 2 }, () => words).flat()
}

interface TapeProps {
  className?: string
}

// Декоративные ленты под hero: tablet/desktop — две косые полосы, mobile — одна ровная
export function Tape({ className }: TapeProps) {
  return (
    <div className={classNames(cls.tape, {}, [className])} aria-hidden="true">
      <div className={classNames(cls.band, {}, [cls.bandPrimary])}>
        <ScrollMarquee className={cls.track} direction="left">
          {track(TAPE_PRIMARY).map((word, i) => (
            <span key={i} className={cls.item}>
              <span className={cls.word}>{word}</span>
              <span>◆</span>
            </span>
          ))}
        </ScrollMarquee>
      </div>
      <div className={classNames(cls.band, {}, [cls.bandSecondary])}>
        <ScrollMarquee className={cls.track} direction="right">
          {track(TAPE_SECONDARY).map((word, i) => (
            <span key={i} className={cls.item}>
              <span className={cls.word}>{word}</span>
              <span className={cls.slash}>/</span>
            </span>
          ))}
        </ScrollMarquee>
      </div>
    </div>
  )
}
