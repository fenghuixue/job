class User {
    name: string
    age: number
    height: number
    
}


interface Person {
    name: string,
    age: number
}
function test(person: Person) {
    return person.name + ' is ' + person.age + ' years old.'
}
