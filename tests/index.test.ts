import {
  describe
} from 'vitest'
import RedisExtends from '../src'

function makeSut() {
  const sut = new RedisExtends()
  return {
    sut
  }
}

describe(
  'Index',
  (it) => {
    it(
      'should be a field of hash expired',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const records = {
          field: 'value',
          foo: 'bar'
        }
        const key = 'hash:test:key'
        const seconds = 1
        const resDel = await sut.del(key)
        expect(resDel).toBeGreaterThanOrEqual(0)
        const resSet = await sut.hmset(key, records)
        expect(resSet).toBe('OK')
        const resExpire = await sut.hexpire(key, 'field', seconds)
        expect(resExpire).deep.equals([1])
        await new Promise((resolve) => setTimeout(resolve, 1100))
        const resExists = await sut.hexists(key, 'field')
        expect(resExists).toBe(0)
      }
    )
    it(
      'should be a throw error when the key does not is a hash',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const key = 'hash:test:key:2'
        const seconds = 1
        const resSet = await sut.set(key, 'value')
        expect(resSet).toBe('OK')
        const resExpire = sut.hexpire(key, 'field', seconds)
        await expect(resExpire).rejects.toThrowError('WRONGTYPE Operation against a key holding the wrong kind of value')
      }
    )
    it(
      'should be return -2 when the key does not exist',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const key = 'hash:test:key:3'
        const seconds = 1
        const resExpire = await sut.hexpire(key, 'field', seconds)
        expect(resExpire).deep.equals([-2])
      }
    )
    it(
      'should be return 0 when the condition is not satisfied',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const records = {
          field: 'value',
          foo: 'bar'
        }
        const key = 'hash:test:key:4'
        const seconds = 1
        const resDel = await sut.del(key)
        expect(resDel).toBeGreaterThanOrEqual(0)
        const resSet = await sut.hmset(key, records)
        expect(resSet).toBe('OK')
        const resExpire = await sut.hexpire(key, 'field', seconds, 'XX')
        expect(resExpire).deep.equals([0])
        const resExists = await sut.hexists(key, 'field')
        expect(resExists).toBe(1)
      }
    )
    it(
      'should be return 1 when success and the condition is satisfied',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const records = {
          field: 'value',
          foo: 'bar'
        }
        const key = 'hash:test:key:5'
        const seconds = 1
        const resDel = await sut.del(key)
        expect(resDel).toBeGreaterThanOrEqual(0)
        const resSet = await sut.hmset(key, records)
        expect(resSet).toBe('OK')
        const resExpire = await sut.hexpire(key, 'field', seconds, 'NX')
        expect(resExpire).deep.equals([1])
        const resExists = await sut.hexists(key, 'field')
        expect(resExists).toBe(1)
      }
    )
    it(
      'should be return 2 when is called with 0 seconds',
      async({
        expect
      }) => {
        const {
          sut
        } = makeSut()
        const records = {
          field: 'value',
          foo: 'bar'
        }
        const key = 'hash:test:key:6'
        const seconds = 0
        const resDel = await sut.del(key)
        expect(resDel).toBeGreaterThanOrEqual(0)
        const resSet = await sut.hmset(key, records)
        expect(resSet).toBe('OK')
        const resExpire = await sut.hexpire(key, 'field', seconds)
        expect(resExpire).deep.equals([2])
        const resExists = await sut.hexists(key, 'field')
        expect(resExists).toBe(0)
      }
    )
  }
)
