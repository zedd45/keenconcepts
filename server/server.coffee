express = require 'express'
nodemailer = require 'nodemailer'

app = express()

  
  

app.all '*', ->
  if ( 'production' != app.get.env )
    app.use express.errorHandler()
    app.use(express.logger('dev'))
    
        
app.post '/contact/mail', (req, res) ->
  # encodeURIComponent  ? 
  email = req.params.emailAddy
  phone = res.params.phoneNumba
  message = res.params.contactMessage

  console.log("email: ", email);
  console.log("phone: ", phone);
  console.log("message: ", message);




# NOTE: technically the main script isn't supposed to start the server:
# http://package.json.jit.su/
app.listen 3000
console.log 'app started at 3000'
