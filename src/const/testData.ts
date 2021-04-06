import { ColumnProps } from '../store'
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: string;
}

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2021-03-31 13:10:21',
    columnId: '1'
  },
  {
    id: 2,
    title: '这是我的第二篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2021-03-31 13:10:21',
    columnId: '1'
  },
  {
    id: 3,
    title: '这是我的第三篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2021-03-31 13:10:21',
    columnId: '1'
  }
]

export const testData: ColumnProps[] = [
  {
    _id: '1',
    title: '程小想的专栏',
    description: '这是程小想的专栏， 非常值得学习',
    avatar: { url: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png' }
  },
  {
    _id: '2',
    title: '娇娇的专栏',
    description: '这是娇娇的专栏， 非常值得学习',
    avatar: { url: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png' }
  },
  {
    _id: '3',
    title: '阿三的专栏',
    description: '这是阿三的专栏， 非常值得学习'
    // avatar: { url: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png' }
  },
  {
    _id: '4',
    title: '阿瑞的专栏',
    description: '这是阿瑞的专栏， 非常值得学习',
    avatar: { url: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png' }
  }
]
