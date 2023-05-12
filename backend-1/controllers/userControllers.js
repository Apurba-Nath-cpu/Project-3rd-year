fs = require('fs')
const userModel = require('../models/t_costModel')

// Modified Dijkstra's algorithm

const NO_PARENT = -1;
var result = '', endVertex = -1, reachable = false;
const locations = ['L1', 'L2', 'L3', 'L4'];

function dijkstra(adjacencyMatrix, startVertex, endVertex_p) {
const nVertices = adjacencyMatrix[0].length;
endVertex = endVertex_p

// shortestDistances[i] will hold the shortest distance from startVertex to i
const shortestDistances = new Array(nVertices).fill(Number.MAX_SAFE_INTEGER);

// added[i] will true if vertex i is included in shortest path tree
// or shortest distance from startVertex to i is finalized
const added = new Array(nVertices).fill(false);

// Initialize all distances as infinite and added[] as false
for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	shortestDistances[vertexIndex] = Number.MAX_SAFE_INTEGER;
	added[vertexIndex] = false;
}

// Distance of source vertex from itself is always 0
shortestDistances[startVertex] = 0;

// Parent array to store shortest path tree
const parents = new Array(nVertices).fill(NO_PARENT);

// The starting vertex does not have a parent
parents[startVertex] = NO_PARENT;

// Find shortest path for all vertices
for (let i = 1; i < nVertices; i++) {
	// Pick the minimum distance vertex from the set of vertices not yet processed.
	// nearestVertex is always equal to startVertex in first iteration.
	let nearestVertex = -1;
	let shortestDistance = Number.MAX_SAFE_INTEGER;

	for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	if (!added[vertexIndex] && shortestDistances[vertexIndex] < shortestDistance) {
		nearestVertex = vertexIndex;
		shortestDistance = shortestDistances[vertexIndex];
	}
	}

	// Mark the picked vertex as processed
	added[nearestVertex] = true;

	// Update dist value of the adjacent vertices of the picked vertex.
	for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
	const edgeDistance = adjacencyMatrix[nearestVertex][vertexIndex];

	if (edgeDistance > 0 && shortestDistance + edgeDistance < shortestDistances[vertexIndex]) {
		parents[vertexIndex] = nearestVertex;
		shortestDistances[vertexIndex] = shortestDistance + edgeDistance;
	}
	}
}

printSolution(startVertex, shortestDistances, parents);
}

// A utility function to print the constructed distances array and shortest paths
function printSolution(startVertex, distances, parents) {
    const nVertices = distances.length;
    console.log("Vertex\t Distance\tPath");

    for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
        if (vertexIndex !== startVertex) {
            process.stdout.write(`\n ${startVertex} -> ${vertexIndex}\t\t ${distances[vertexIndex]}\t\t`);
            // console.log(vertexIndex, endVertex)
            if(vertexIndex == endVertex) {
                result += `${locations[startVertex]} => ${locations[vertexIndex]}:     `
            }
            printPath(vertexIndex, vertexIndex, parents);
        }
    }
}

// Function to print shortest path from source to currentVertex using parents array
function printPath(currentVertex, vertexIndex, parents) {
    // Base case: Source node has been processed
    if (currentVertex === NO_PARENT) {
        // if(vertexIndex == endVertex && currentVertex != endVertex){
        //     result = 'Unreachable';
        // }
        return;
    }

    printPath(parents[currentVertex], vertexIndex, parents);
    process.stdout.write(`${currentVertex} `);
    if(vertexIndex == endVertex) {
        if(currentVertex == endVertex){
            reachable = true;
            result += `${locations[currentVertex]}`
        }
        else{
            result += `${locations[currentVertex]} -> `
        }
    }
}

// Driver code

const adjacencyMatrix = [ [0, 12, 47, 33],
[12, 0, 41, 15],
[47, 41, 0, 6],
[33, 15, 6, 0]
];




function getUser(req, res) {
    console.log('getUser called')
    console.log('req.body -> ', req.body)
    
}

module.exports.getUsers = async function getUsers(req, res){
    console.log('getUsers')
    let allUsers = await userModel.find()
    let currentUser = await userModel.findOne({from: req.body.from, to: req.body.to})
    console.log(currentUser)
    var user_i = allUsers[0]
    var u = -1, v = -1, cu = -1, cv = -1
    var u_i_from = '', u_i_to = '', uv_cost = 0
    for (let i = 0; i < allUsers.length; i++) {
        user_i = allUsers[i]
        console.log(user_i["from"])
        u_i_from = user_i["from"], u_i_to = user_i["to"], uv_cost = Number(user_i["cost"])
        switch (u_i_from) {
            case "L1":
                u = 0;
                break;
            case "L2":
                u = 1;
                break;
            case "L3":
                u = 2;
                break;
            case "L4":
                u = 3;
        }

        switch (u_i_to) {
            case "L1":
                v = 0;
                break;
            case "L2":
                v = 1;
                break;
            case "L3":
                v = 2;
                break;
            case "L4":
                v = 3;
        }
        adjacencyMatrix[u][v] = adjacencyMatrix[v][u] = uv_cost
        if(currentUser['from'] == u_i_from && currentUser['to'] == u_i_to){
            cu = u
            cv = v
        }
    }
    dijkstra(adjacencyMatrix, cu, cv);
    res.json({
        message: `Travel path from ${req.body.from} to ${req.body.to}: `,
        path: result
    })
}

module.exports.postUser = function postUser(req, res) {
    console.log(req.body)
    users = req.body
    res.json({
        message: "data updated successfully",
        user: req.body
    })
}

module.exports.postUser2 = async function postUser2(req, res) {
    T_Cost = req.body
    console.log(T_Cost)
    res.json({
        message: "data updated successfully",
        T_Cost: req.body
    })
    let data = await userModel.create(T_Cost)
}

// module.exports.updateUser = async function updateUser(req, res) {
//     console.log('req.body -> ', req.body)
//     let dataToBeUpdated = req.body

//     let user = await userModel.findOneAndUpdate({
//         email: 'test1234@gmail.com'
//     },
//     dataToBeUpdated)
//     // for(key in dataToBeUpdated){
//     //     users[key] = dataToBeUpdated[key]
//     // }
//     res.json({
//         message: "data updated successfully",
//         user: req.body
//     })
// }

module.exports.updateUser2 = async function updateUser2(req, res) {
    
    console.log('req.body -> ', req.body)
    let cam_update = req.body
    const data = fs.readFileSync('../yolov7/yolov7/traffic_res.txt', { encoding: 'utf8', flag: 'r' });
    cam_update.cost = data
    console.log(cam_update)

    let found_user = await userModel.findOneAndUpdate({
        from: cam_update.from,
        to: cam_update.to,
    },
    cam_update)
    console.log(found_user)
    res.json({
        message: "data updated successfully",
        user: found_user
    })
}

module.exports.deleteUser = async function deleteUser(req, res) {
    let dataDataTobneDeleted = req.body
    let user = await userModel.findOneAndDelete(dataDataTobneDeleted)
    // users = {}
    res.date = new Date()
    res.json({
        message: "data deleted successfully",
        data: user
    })
}

module.exports.getUserById = function getUserById(req, res) {
    console.log(req.params.id)
    let paramId = req.params.id
    let obj = {}
    for(let i = 0; i < users.length; i++) {
        if(users[i]['id'] == paramId){
            obj = users[i]
        }
    }
    res.json({
        "message": "req received",
        "data": obj
    })
}

