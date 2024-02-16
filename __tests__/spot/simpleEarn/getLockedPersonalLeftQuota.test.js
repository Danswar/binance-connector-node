/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'

describe('#getLockedPersonalLeftQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getLockedPersonalLeftQuota('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should redeem flexible product', () => {
    const parameters = {
      productId
    }
    nockMock(`/sapi/v1/simple-earn/locked/personalLeftQuota?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getLockedPersonalLeftQuota(productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})