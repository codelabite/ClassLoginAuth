const joi = require('@hapi/joi')

const Register = (data) =>{
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(3),
  })
return schema.validate(data)
}

module.exports.Register = Register


const Login = (data) =>{
  const schema = joi.object({    
    email: joi.string().required().email(),
    password: joi.string().required().min(3),
  })
return schema.validate(data)
}

module.exports.Login = Login