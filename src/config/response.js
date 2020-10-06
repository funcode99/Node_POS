const Response = (req, res, value) => {
    const token = (req.newToken || null)
  
    if (value.code >= 500) {
      const filename = new Date().getTime()
      const message = {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        error: {
          url: req.originalUrl,
          error: value.errMsg
        }
      }

    }
  
    const resSend = {
      code: (value.code || 200),
      values: (value.values || null),
      success: (value.success || false),
      error: (value.error || false),
      token: token,
      errMsg: (value.errMsg || null)
    }
    
    return res.send(resSend)
  }
  
  module.exports = Response 