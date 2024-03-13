const fs = require('fs');

class UserManager {
    // Propiedad estática, almacena todos los eventos que se vayan creando
    static events = [];

    // Constructor ahora acepta un parámetro para el nombre del archivo JSON
    constructor(fileName) {
        this.fileName = fileName;
        this.events = this.loadEvents();
    }

    // Cargar eventos desde el archivo JSON
    loadEvents() {
        try {
            const data = fs.readFileSync(`./data/${this.fileName}.json`, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retorna un array vacío
            return [];
        }
    }

    // Guardar eventos en el archivo JSON
    saveEvents() {
        fs.writeFileSync(`./data/${this.fileName}.json`, JSON.stringify(this.events, null, 2), 'utf8');
    }

    // Método para agregar un evento
    create(data) {
        const newEvent = {
            id: this.events.length === 0 ? 1 : this.events[this.events.length - 1].id + 1,
            name: data.name,
            photo: data.photo,
            email: data.email,
        };

        this.events.push(newEvent);
        this.saveEvents();
    }

    // Método para leer todos los eventos
    read() {
        return this.events;
    }

    // Método para leer un evento por ID
    readOne(id) {
        return this.events.find(event => event.id === Number(id));
    }
}

// Crear la carpeta 'data' si no existe
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Nombre del archivo JSON (sin la extensión .json)
const jsonFileName = 'users';

// Crear una instancia de UserManager con el nombre del archivo JSON
const userManager = new UserManager(jsonFileName);

// Añadir eventos
userManager.create({
    name: 'Carlos Rodriguez',
    photo: 'photoIV',
    email: 'carlos.rodriguez@gmail.com',
});
userManager.create({
    name: 'Ana Lopez',
    photo: 'photoIV',
    email: 'alopez@gmail.com',
});
userManager.create({
    name: 'Alejandro Gomez',
    photo: 'photoIV',
    email: 'ale.gomez@gmail.com',
});

// Mostrar todos los eventos
console.log(userManager.read());

// Mostrar un evento por ID
console.log(userManager.readOne(2));
