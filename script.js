document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // Create placeholder topology image if needed
    function createPlaceholderTopology() {
        const canvas = document.createElement('canvas');
        const topologyImage = document.querySelector('.topology-image img');
        
        if (topologyImage.getAttribute('src') === 'placeholder-topology.png') {
            canvas.width = 800;
            canvas.height = 500;
            const ctx = canvas.getContext('2d');
            
            // Set background
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw network elements
            drawNetworkDiagram(ctx, canvas.width, canvas.height);
            
            // Convert to data URL and set as image source
            const dataUrl = canvas.toDataURL('image/png');
            topologyImage.src = dataUrl;
        }
    }
    
    function drawNetworkDiagram(ctx, width, height) {
        // Draw title
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.fillText('Network Topology Diagram', width/2, 40);
        
        // Draw OSPF cloud (left side)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
        ctx.ellipse(width/4, height/2, 200, 150, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // OSPF Label
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.fillText('OSPF', width/4, height/2 - 120);
        
        // Draw EIGRP cloud (right side)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(231, 76, 60, 0.2)';
        ctx.ellipse(3*width/4, height/2, 200, 150, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // EIGRP Label
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.fillText('EIGRP', 3*width/4, height/2 - 120);
        
        // Draw OSPF Areas
        const ospfAreas = [
            { name: 'Area 0', x: width/4 - 50, y: height/2 },
            { name: 'Area 1', x: width/4 - 100, y: height/2 - 60 },
            { name: 'Area 2', x: width/4 - 100, y: height/2 + 60 },
            { name: 'Area 3', x: width/4 + 80, y: height/2 + 20 },
        ];
        
        ospfAreas.forEach(area => {
            drawRouter(ctx, area.x, area.y, '#3498db');
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            ctx.textAlign = 'center';
            ctx.fillText(area.name, area.x, area.y + 35);
        });
        
        // Draw EIGRP AS
        const eigrpAS = [
            { name: 'AS 1', x: 3*width/4 - 90, y: height/2 - 40 },
            { name: 'AS 2', x: 3*width/4 + 50, y: height/2 - 40 },
            { name: 'AS 3', x: 3*width/4, y: height/2 + 50 },
        ];
        
        eigrpAS.forEach(as => {
            drawRouter(ctx, as.x, as.y, '#e74c3c');
            ctx.font = '14px Arial';
            ctx.fillStyle = '#2c3e50';
            ctx.textAlign = 'center';
            ctx.fillText(as.name, as.x, as.y + 35);
        });
        
        // Draw redistribution point
        const redist1X = width/2;
        const redist1Y = height/2 - 20;
        
        drawRouter(ctx, redist1X, redist1Y, '#27ae60');
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.fillText('Redistribution', redist1X, redist1Y + 35);
        
        // Draw connection lines
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 2;
        
        // Connect OSPF areas
        drawConnection(ctx, ospfAreas[0].x, ospfAreas[0].y, ospfAreas[1].x, ospfAreas[1].y);
        drawConnection(ctx, ospfAreas[0].x, ospfAreas[0].y, ospfAreas[2].x, ospfAreas[2].y);
        drawConnection(ctx, ospfAreas[0].x, ospfAreas[0].y, ospfAreas[3].x, ospfAreas[3].y);
        
        // Connect EIGRP AS
        drawConnection(ctx, eigrpAS[0].x, eigrpAS[0].y, eigrpAS[1].x, eigrpAS[1].y);
        drawConnection(ctx, eigrpAS[0].x, eigrpAS[0].y, eigrpAS[2].x, eigrpAS[2].y);
        drawConnection(ctx, eigrpAS[1].x, eigrpAS[1].y, eigrpAS[2].x, eigrpAS[2].y);
        
        // Connect redistribution point
        drawConnection(ctx, ospfAreas[0].x, ospfAreas[0].y, redist1X, redist1Y);
        drawConnection(ctx, eigrpAS[0].x, eigrpAS[0].y, redist1X, redist1Y);
    }
    
    function drawRouter(ctx, x, y, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    function drawConnection(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Check if we need to create a placeholder topology
    window.addEventListener('load', createPlaceholderTopology);
}); 