const fs = require('fs');
const crypto = require('crypto')

module.exports = class UserManager {  //exportacion
    constructor (file) {
        this.file = file;
    }

    async getAllUsers() {
        try {
            const users = await fs.promises.readFile(this.file,'utf-8');

            return JSON.parse(users);
        } catch (error) {
            console.error(error.message)
            return []; //comienzo con un array vacío
        }
    }

    async createUser(user) {

        if(!user.UserName || !user.Password) return 'Please provide user and password'

        const newUser = {
            Name: user.Name ?? 'No name provided for user',
            LastName: user.LastName ?? 'No lastname provided for user',
            UserName: user.UserName,
            Password: this.getHash(user.Password)  //encriptado de contraseña hexadecimal
        }

        const users = await this.getAllUsers();

        users.push(newUser);

        try {
            await fs.promises.writeFile(this.file, JSON.stringify(users, null, '\t'));
            
            return 'User generated correctly'
        } catch (error) {
            console.error(error.message);
            return 'An error has occurred while creating the user'
        }
    }
    
    getHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex'); //encripto password
    }

    async userValidator(user) {
        const userValidate = {
            UserName: user.UserName,
            Password: user.Password
        }

        const users = await this.getAllUsers();

        for(let key in users) {
            if(userValidate.UserName === users[key].UserName) {
                if(this.getHash(userValidate.Password) === users[key].Password) 
                return 'User logged'
                } else {
                return 'Incorrect user or password'
            }
        }
        return 'Usuario no encontrado'
    }
}