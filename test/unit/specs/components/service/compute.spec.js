import compute from "@/components/service/compute";

describe('compute.js module', () => {
  it('function initAdds exists', () => {
    expect(typeof compute.initAdds).toEqual('function');
  })

  it('function initSubstracts exists', () => {
    expect(typeof compute.initSubstracts).toEqual('function');
  })

  it('function initAdds create array', () => {
    const add_list = compute.initAdds(0, 3)
    expect(add_list.length).toEqual(16)
  })

  it('function initSubstracts create array', () => {
    const add_list = compute.initAdds(0, 3)
    const sub_list = compute.initSubstracts(add_list)
    expect(sub_list.length).toEqual(16)
  })

  it('function initMutiplies create array', () => {
    const multiply_list = compute.initMutiplies(0, 3)
    expect(multiply_list.length).toEqual(16)
  })

  it('function initDivides create array', () => {
    const multiply_list = compute.initMutiplies(0, 3)
    const divide_list = compute.initDivides(multiply_list)

    expect(divide_list.length).toEqual(12)
  })

  it('function pick create array', () => {
    const multiply_list = compute.initMutiplies(0, 3)
    const result = compute.pick(multiply_list, 5)
    expect(result.length).toEqual(5)
  })
})