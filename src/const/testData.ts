export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3的专栏， 非常值得学习'
    // avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  }
]
