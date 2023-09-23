var canvas = document.getElementById('glcanvas');
/** @type {WebGLRenderingContext} */
var gl = canvas.getContext('webgl');

// Define the vertices for the letter "A" as lines
var verticesU = [
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
var verticesR = [
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
var verticesD = [
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

// Define main function
function main() {
    while (true) {
        setTimeout(drawLines(), 3000);
        setTimeout(drawTriangles(), 3000);
    }
}

// Create and bind vertex buffer
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Combine all vertices into a single array
// var allVertices = verticesA.concat(verticesB, verticesC);
var allVertices = verticesU.concat(verticesR, verticesD);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);

// Create and compile the vertex shader
var vertexShaderSource = `
            attribute vec2 aPosition;
            void main(void) {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Create and compile the fragment shader
var fragmentShaderSource = `
            void main(void) {
                gl_FragColor = vec4(0.502, 0.502, 0.502, 1.0);  // gray color
            }
        `;
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Create and link the shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Specify the vertex position attribute
var positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
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