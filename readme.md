##Thought-line Back End

For Local Copy 

`npm i --s`
`npm run dev`

###Routes

####Auth Routes

`http POST :3000/api/v1/signup`
  body must contain username password email

`http GET :3000/api/v1/signin`
  basic auth: supply username and password
  will recieve a JWT response.

`http PUT :3000/api/v1/changepassword`
  bearer auth - JWT
  supply old password and new password
  response will be 204 status code.

####Target Routes

`http POST :3000/api/v1/target`
  bearer auth
  body contains target info:
      name : { type: String, required: true},
      email : { type: String, required: false},
      photo : {type: String, required: false},

`http GET :3000/api/v1/target/:id ?`
  bearer auth 
  if target id supplied returns that target or returns all targets for that user.


