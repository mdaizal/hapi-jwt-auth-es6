export default{
  method: 'GET',
  path: '/api/counter',
  config: {
    auth: false,
    cors: true
  },
  handler: (req, res) => {
    res({ start: 10 })
  }
}