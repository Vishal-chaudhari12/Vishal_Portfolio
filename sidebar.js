// Sidebar Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Check if elements exist
    if (!mobileMenuToggle || !sidebar) {
        console.error('Sidebar or toggle button not found');
        return;
    }
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
        
        // Toggle menu icon
        const menuIcon = mobileMenuToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
    
    // Add click event to toggle button
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSidebar();
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleSidebar();
        }
    });
    
    // Close sidebar when clicking on a navigation link
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    // Initialize sidebar state
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}); 