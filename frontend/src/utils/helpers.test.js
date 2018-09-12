import { formatData } from '../utils/helpers.js'

describe('[Function] formatData', () => {
  it('timestamp should be proper formatted date', () => {
    expect(formatData(1234567890000)).toEqual('02/13/2009, 9:31:30 PM')
  })
})
