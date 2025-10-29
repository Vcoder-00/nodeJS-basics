class Person {
    constructor(name){
    this.name = name;
    }

    sayMyName(){
        return `Houve uma alteração: ${this.name}`;
    }
}


module.exports = {
    Person,
}