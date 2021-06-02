const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if(current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}

const objToArr = <T>(obj: { [ key: string ]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

interface TestProps {
  _id?: string;
  name: string;
}

const testData1: TestProps[] = [
  { _id: '1', name: 'a'},
  { _id: '2', name: 'b'}
]
const result1 = arrToObj(testData1)
console.log('arrToObj testData1', result1)

const testData2: { [key: string]: TestProps} = {
  111: { _id: '111', name: 'aaa'},
  222: { name: '222'}
}
const result2 = objToArr(testData2)
console.log('objToArr testData', result2)
