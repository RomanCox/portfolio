'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Единая точка регистрации плагинов GSAP
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Анимации от прокрутки — только без prefers-reduced-motion
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
