exports.handler = function (context, event, callback) {
  const TWILIO_ACCOUNT_SID = context.ACCOUNT_SID
  const TWILIO_API_KEY = context.API_KEY_SID
  const TWILIO_API_SECRET = context.API_KEY_SECRET
  const ACCESS_TOKEN_IDENTITY = Math.random().toString(36).substring(2, 15)

  const roomName = event?.identity
  const AccessToken = require('twilio').jwt.AccessToken
  const VideoGrant = AccessToken.VideoGrant

  const videoGrant = new VideoGrant({
    room: roomName,
  })
  const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET)

  accessToken.addGrant(videoGrant)
  accessToken.identity = ACCESS_TOKEN_IDENTITY
  callback(null, {
    token: accessToken.toJwt(),
    roomName: roomName,
  })
}
