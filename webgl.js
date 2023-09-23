var canvas = document.getElementById('glcanvas');
/** @type {WebGLRenderingContext} */
var gl = canvas.getContext('webgl');

// Define vertices iable
let verticesU, verticesR, verticesD;

// Define all the needed 
let vertexBuffer, allVertices, vertexShaderSource, vertexShader, fragmentShaderSource, fragmentShader;
let shaderProgram, positionAttributeLocation;

function linesVertices() {
    // Define the vertices for the letter "A" as lines
    verticesU = [
        // Left vertical line
        -0.6, 0.5,
        -0.6, -0.5,

        // Right vertical line
        -0.6, -0.5,
        -0.3, -0.5,

        // Horizontal line
        -0.3, -0.5,
        -0.3, 0.5
    ];

    // Define the vertices for the letter "B" as lines
    verticesR = [
        // Left vertical line
        -0.15, -0.5,
        -0.15, 0.5,

        // Top vertical line
        -0.15, 0.5,
        0.15, 0.5,

        // Top right vertical line
        0.15, 0.5,
        0.15, 0.1,

        // Mid horizontal line
        0.15, 0.1,
        -0.15, 0.1,

        // Diagonal line
        -0.15, 0.1,
        0.15, -0.5
    ];

    // Define the vertices for the letter "C" as lines
    verticesD = [
        // Left vertical line
        0.3, -0.5,
        0.3, 0.5,

        // Top line
        0.3, 0.5,
        0.6, 0.25,

        // Right line
        0.6, 0.25,
        0.6, -0.25,

        // Bottom line
        0.6, -0.25,
        0.3, -0.5,
    ];

    // Create and bind vertex buffer
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Combine all vertices into a single array
    //  allVertices = verticesA.concat(verticesB, verticesC);
    allVertices = verticesU.concat(verticesR, verticesD);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);


    // Create and compile the vertex shader
    vertexShaderSource = `
            attribute vec2 aPosition;
            void main(void) {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Create and compile the fragment shader
    fragmentShaderSource = `
            void main(void) {
                gl_FragColor = vec4(0.502, 0.502, 0.502, 1.0);  // Red color
            }
        `;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create and link the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Specify the vertex position attribute
    positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Draw the characters as lines
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw character "A"
    gl.drawArrays(gl.LINES, 0, verticesU.length / 2);

    // Draw character "B"
    gl.drawArrays(gl.LINES, verticesU.length / 2, verticesR.length / 2);

    // Draw character "C"
    gl.drawArrays(gl.LINES, (verticesU.length + verticesR.length) / 2, verticesD.length / 2);
}

function trianglesVertices() {
    verticesU = [
        // Left Triangle
        -0.62, 0.5,
        -0.62, -0.5,
        -0.6, -0.5,

        // Triangle 2
        -0.62, 0.5,
        -0.6, 0.5,
        -0.6, -0.5,

        // Bottom triangle
        -0.6, -0.5,
        -0.3, -0.5,
        -0.3, -0.48,

        -0.3, -0.48,
        -0.6, -0.48,
        -0.6, -0.5,

        // Right Triangle
        -0.32, 0.5,
        -0.3, 0.5,
        -0.3, -0.5,

        -0.3, -0.5,
        -0.32, -0.5,
        -0.32, 0.5,
    ];

    verticesR = [
        // Left Triangles
        -0.16, 0.5,
        -0.16, -0.5,
        -0.14, -0.5,

        -0.16, 0.5,
        -0.14, 0.5,
        -0.14, -0.5,

        // Top Triangles
        -0.14, 0.5,
        0.14, 0.5,
        0.14, 0.48,

        0.14, 0.48,
        -0.14, 0.48,
        -0.14, 0.5,

        // Right Triangles
        0.14, 0.48,
        0.14, 0.12,
        0.12, 0.12,

        0.12, 0.12,
        0.12, 0.48,
        0.14, 0.48,

        // Middle Triangles
        0.12, 0.12,
        -0.14, 0.12,
        -0.14, 0.14,

        -0.14, 0.14,
        0.12, 0.14,
        0.12, 0.12,

        // Diagonal Triangles
        -0.14, 0.12,
        0.12, -0.5,
        0.14, -0.48,

        0.14, -0.48,
        -0.14, 0.12,
        -0.12, 0.14,
    ];

    verticesD = [
        // Left Triangles
        0.3, 0.5,
        0.3, -0.5,
        0.32, -0.5,

        0.32, -0.5,
        0.32, 0.5,
        0.3, 0.5,

        // Top Triangles
        0.32, 0.5,
        0.6, 0.3,
        0.6, 0.26,

        0.32, 0.5,
        0.32, 0.46,
        0.6, 0.26,

        // Right Triangles
        0.6, 0.26,
        0.6, -0.25,
        0.58, -0.25,

        0.58, -0.25,
        0.58, 0.28,
        0.6, 0.26,

        // Bottom Triangles
        0.32, -0.5,
        0.58, -0.22,
        0.6, -0.25,

        0.58, -0.22,
        0.3, -0.48,
        0.32, -0.5
    ];

    // Create and bind vertex buffer
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Combine all vertices into a single array
    //  allVertices = verticesA.concat(verticesB, verticesC);
    allVertices = verticesU.concat(verticesR, verticesD);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);

    // Create and compile the vertex shader
    vertexShaderSource = `
            attribute vec2 aPosition;
            void main(void) {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Create and compile the fragment shader
    fragmentShaderSource = `
            void main(void) {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  // Red color
            }
        `;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create and link the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Specify the vertex position attribute
    positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Draw the characters as lines
    gl.clearColor(0.502, 0.502, 0.502, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw character "A"
    gl.drawArrays(gl.TRIANGLES, 0, verticesU.length / 2);

    // Draw character "B"
    gl.drawArrays(gl.TRIANGLES, verticesU.length / 2, verticesR.length / 2);

    // Draw character "C"
    gl.drawArrays(gl.TRIANGLES, (verticesU.length + verticesR.length) / 2, verticesD.length / 2);
}

let drawLines = true;
function draw() {
    if (drawLines) {
        linesVertices();
    } else {
        trianglesVertices();
    }
    drawLines = !drawLines;
}

draw();
setInterval(draw, 2000);