document.getElementById('filterInput').addEventListener('input', function() {
    var input = this.value.toLowerCase();
    var containers = document.querySelectorAll('.produto');
    
    containers.forEach(function(container) {
        var text = container.textContent.toLowerCase();
        if (text.includes(input)) {
            container.style.display = '';
        } else {
            container.style.display = 'none';
        }
    });
});