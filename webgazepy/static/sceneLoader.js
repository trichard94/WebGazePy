import { SceneTemplate } from './scenes/SceneTemplate.js';
let streaming = false;
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const sceneSelector = document.getElementById('sceneSelector');

var scene = new SceneTemplate(engine).getScene();
createBaseSphere(scene, 2);

sceneSelector.addEventListener('change', async (event) => {
    const selectedScene = event.target.value;
    switch (selectedScene) {
        case 'sphere':
            streaming = false;
            scene = new SceneTemplate(engine).getScene();
            createBaseSphere(scene, 2);
            break;
        case 'cube':
            streaming = false;
            scene = new SceneTemplate(engine).getScene();
            createBaseCube(scene, 1);
            break;
        case 'pointCloudSimple':
            streaming = false;
            scene = new SceneTemplate(engine).getScene();
            createPCL(scene, 10000);
            break;
        case 'generated':
            scene = new SceneTemplate(engine).getScene();
            fetchGeneratedPointCloudData().then(points => {
                createPointCloud(points, scene);
            });
            break;
        case 'stream':
            streaming = true;
            runStreamingScene();
            break;
        default:
            break;
    }
});

async function fetchPointCloudStream() {
    const response = await fetch('/get_vertices_data');
    const data = await response.json();
    if (data.vertices) {
        console.log(`Received data with ${data.vertices.length} vertices`);
        return data.vertices;
    } else {
        console.error('Invalid data format');
    }
}

async function runStreamingScene() {
    scene = new SceneTemplate(engine).getScene();
    var ppp = new BABYLON.PointsCloudSystem("pc_streamed", 1, scene);

    // Function to continuously update point cloud based on streamed data
    const updatePointCloud = async () => {
        while (streaming) {
            let data = [];
            try {
                data = await fetchPointCloudStream();
                var createFunction = function(particle, i, s) {
                    particle.position = new BABYLON.Vector3(data[i][0], data[i][1], data[i][2]);
                }
                ppp.addPoints(data.length, createFunction);
                ppp.buildMeshAsync();
            } catch (error) {
                //
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    // Run the updatePointCloud function in a separate thread
    updatePointCloud();
}

engine.runRenderLoop(() => {
    scene.render();
});


window.addEventListener('resize', () => {
    engine.resize();
});


function createBaseSphere(scene, diameter) {
    const sphereOpts = { segments: 32, diameter: diameter };
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", sphereOpts, scene);
    sphere.position = new BABYLON.Vector3(0, 1, 0);
}

function createBaseCube(scene, size) {
    const cubeOpts = { size: size};
    const cube = BABYLON.MeshBuilder.CreateBox("cube", cubeOpts, scene);
    cube.position = new BABYLON.Vector3(0, 0.5, 0);
}

function createPCL(scene, count) {
    const pcs = new BABYLON.PointsCloudSystem("pcs", 1, scene) 
    pcs.addPoints(count);
    pcs.pointSize = 3;
    pcs.buildMeshAsync();
}

function createPointCloud(data, scene) {
    var pcl_size = data.length;
    console.log("Incoming point count:" + pcl_size);

    var pcs = new BABYLON.PointsCloudSystem("pc_generated", 1, scene) 
    var createFunction = function(particle, i, s) {
        particle.position = new BABYLON.Vector3(data[i][0], data[i][1], data[i][2]);
    }
    pcs.addPoints(pcl_size, createFunction);
    pcs.buildMeshAsync();
}

async function fetchGeneratedPointCloudData() {
    const response = await fetch('/get_point_cloud');
    const data = await response.json();
    console.log("Fetch from Flask complete");
    return data.points;
}

