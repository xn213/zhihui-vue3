import { rest } from 'msw'

export const handlers = [
  // post
  rest.post('/login', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      ctx.status(200)
    )
  }),

  // get
  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated')
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized'
        })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin'
      })
    )
  })
]
