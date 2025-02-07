import getUsers from "@/lib/users";

export async function GET(request, { params }) {
    const {id} = await params
    
    let users = getUsers();
    let usuario = users.find(user => user.id == id)

    return Response.json(usuario)
}

export async function PUT(request, { params }) {
    const content = request.headers.get('content-type')

    if (content != 'application/json')
        return Response.json({ message: 'Debes proporcionar datos JSON' })

    const {id} = await params

    let users = getUsers();
    // Obtenemos posición    
    const pos = users.findIndex(user => user.id == id)

    // Modificamos usuario
    const newUser = await request.json()
    users.splice(pos, 1, { id: Number(id), ...newUser })

    return Response.json(users)
}


export async function DELETE(request, { params }) {
    const {id} = await params
    
    let users = getUsers();
    // Obtenemos posición    
    const pos = users.findIndex(user => user.id == Number(id))

    // Eliminamos usuario
    if (pos != -1)  // Si es encontrado
        users.splice(pos, 1)

    return Response.json(users)
}
