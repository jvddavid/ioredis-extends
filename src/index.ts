import {
  Redis,
  type Callback,
  type RedisKey,
  type Result
} from 'ioredis'

interface Context {
  type: 'default'
}

type Condition = 'NX' | 'XX' | 'GT' | 'LT'

class RedisExtends extends Redis {
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, callback?: Callback<number[]>): Result<number[], Context>
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, nx: 'NX', callback?: Callback<number[]>): Result<number[], Context>
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, xx: 'XX', callback?: Callback<number[]>): Result<number[], Context>
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, gt: 'GT', callback?: Callback<number[]>): Result<number[], Context>
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, lt: 'LT', callback?: Callback<number[]>): Result<number[], Context>
  hexpire(key: RedisKey, field: string | string[], seconds: number | string, condition?: Condition | Callback<number[]>, callback?: Callback<number[]>): Result<number[], Context> {
    const cb = callback ?? (typeof condition !== 'string' ? condition : undefined)
    const cnd = typeof condition === 'string' ? condition : undefined
    const fields = Array.isArray(field) ? field : [field]
    const keyStr = key.toString()
    const args = [
      keyStr,
      seconds.toString(),
      cnd,
      'FIELDS',
      fields.length.toString(),
      ...fields
    ].filter(Boolean) as string[]
    return new Promise<number[]>((resolve, reject) => {
      this.call('hexpire', args, (err: Error | null, res: number[] | null) => {
        if (err) {
          cb?.(err)
          reject(err)
        } else {
          if (res === null) {
            const err = new Error('The key does not exist.')
            cb?.(err)
            reject(err)
          } else {
            cb?.(null, res)
            resolve(res)
          }
        }
      }).catch(reject)
    })
  }
}

export default RedisExtends
