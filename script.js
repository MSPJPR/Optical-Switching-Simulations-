document.addEventListener('DOMContentLoaded', () => {
    let packetsGenerated = 0;
    let latency = 0;
    let throughput = 0;
    const networkContainer = document.getElementById('network');
    const packetsCountElement = document.getElementById('packets-count');
    const latencyElement = document.getElementById('latency');
    const throughputElement = document.getElementById('throughput');
    let nodes = [];
    let connections = [];

    function updateMetrics() {
        packetsCountElement.textContent = packetsGenerated;
        latencyElement.textContent = `${latency} ms`;
        throughputElement.textContent = `${throughput} Mbps`;
    }

    document.getElementById('add-node').addEventListener('click', () => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = `Node ${nodes.length + 1}`;
        networkContainer.appendChild(node);
        nodes.push(node);
        positionNodes();
    });

    document.getElementById('remove-node').addEventListener('click', () => {
        if (nodes.length > 0) {
            const node = nodes.pop();
            networkContainer.removeChild(node);
            positionNodes();
        }
    });

    document.getElementById('generate-packet').addEventListener('click', () => {
        packetsGenerated++;
        latency = Math.floor(Math.random() * 100);
        throughput = Math.floor(Math.random() * 10) + 1;
        updateMetrics();
        simulatePacketRouting();
    });

    function positionNodes() {
        nodes.forEach((node, index) => {
            const angle = (index / nodes.length) * 2 * Math.PI;
            const radius = 150;
            const x = Math.cos(angle) * radius + (networkContainer.offsetWidth / 2);
            const y = Math.sin(angle) * radius + (networkContainer.offsetHeight / 2);
            node.style.position = 'absolute';
            node.style.left = `${x - node.offsetWidth / 2}px`;
            node.style.top = `${y - node.offsetHeight / 2}px`;
        });
    }

    function simulatePacketRouting() {
        if (nodes.length < 2) return;
        const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (sourceNode === targetNode) return;

        const connection = document.createElement('div');
        connection.classList.add('connection');
        networkContainer.appendChild(connection);

        const sourceRect = sourceNode.getBoundingClientRect();
        const targetRect = targetNode.getBoundingClientRect();

        const x1 = sourceRect.left + sourceRect.width / 2;
        const y1 = sourceRect.top + sourceRect.height / 2;
        const x2 = targetRect.left + targetRect.width / 2;
        const y2 = targetRect.top + targetRect.height / 2;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        connection.style.width = `${length}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.left = `${x1}px`;
        connection.style.top = `${y1}px`;

        connections.push(connection);

        setTimeout(() => {
            networkContainer.removeChild(connection);
            connections = connections.filter(conn => conn !== connection);
        }, 1000);
    }
});
