import { createPool } from "mysql2"

export async function MySQL() {
    const MySQL = createPool({
        database: "noelle",
        port: 3306,
        user: 'root',
        password: "Ufx7kjtsey",
        host: "127.0.0.1"
    })
    
    MySQL.getConnection((err, ok) => {console.error(err); if (ok) { console.log('database connected!') } })
    return MySQL
}