/* eslint @typescript-eslint/ban-types: off */
import { Request, Response, NextFunction } from 'express'

export {}

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  type Ctrl = (req: Request, res: Response, next: NextFunction) => void

  type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K
  }[keyof T]

  type NonFunctionProperties<T, Optional extends keyof T = never> = Omit<
    Pick<T, NonFunctionPropertyNames<T>>,
    Optional
  > & {
    [K in Optional]?: T[K]
  }
}
