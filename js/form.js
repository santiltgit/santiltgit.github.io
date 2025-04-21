document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authButton = document.getElementById('auth-button');
    
    // Verificar credenciales existentes
    const savedEmail = localStorage.getItem('todoEmail');
    const savedPass = localStorage.getItem('todoPass');
    
    if (savedEmail && savedPass) {
        authTitle.textContent = 'Iniciar Sesión';
        authButton.textContent = 'Ingresar';
    }
    
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Reset errores
        document.getElementById('email-error').textContent = '';
        document.getElementById('password-error').textContent = '';
        
        // Validar email
        if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'Ingrese un correo válido (ej: usuario@dominio.com)';
            return;
        }
        
        // Validar contraseña
        if (!validatePassword(password)) {
            document.getElementById('password-error').textContent = 'La contraseña no cumple los requisitos';
            return;
        }
        
        if (!savedEmail || !savedPass) {
            // REGISTRO
            localStorage.setItem('todoEmail', email);
            localStorage.setItem('todoPass', password);
            localStorage.setItem('isLoggedIn', 'true');
            alert('¡Registro exitoso!');
            window.location.href = 'index.html';
        } else {
            // LOGIN
            if (email === savedEmail && password === savedPass) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'list.html';
            } else {
                document.getElementById('password-error').textContent = 'Email o contraseña incorrectos';
            }
        }
    });
    
    // Validación de email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validación de contraseña fuerte
    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
    }
});