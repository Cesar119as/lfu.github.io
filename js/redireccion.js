// Redirigir a index.html 
if (
    !location.pathname.endsWith('index.html') &&
    location.pathname !== '/' &&
    !location.pathname.endsWith('/')
) {
    const ruta = location.pathname.split('/').pop();
    location.replace(`index.html#${ruta}`);
}